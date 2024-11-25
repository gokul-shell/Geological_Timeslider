/* eslint-disable no-prototype-builtins */
/** @jsx jsx */
import { React, type IntlShape, jsx, getAppStore, type IMThemeVariables, lodash, type DataSource, DataSourceManager } from 'jimu-core'
import { type JimuMapView } from 'jimu-arcgis'
import defaultMessages from '../translations/default'
import { defaultMessages as jimuUIDefaultMessages } from 'jimu-ui'
import { convertElevationsInfoArray, convertDistancesArray, convertSingle, niceScale } from '../../common/unit-conversion'
import { getAllLayersFromDataSource } from '../../common/utils'
import intl from 'esri/intl'
import type GraphicsLayer from 'esri/layers/GraphicsLayer'
import lang from 'esri/core/lang'
import geometryEngine from 'esri/geometry/geometryEngine'
import geometryEngineAsync from 'esri/geometry/geometryEngineAsync'
import Polyline from 'esri/geometry/Polyline'
import Point from 'esri/geometry/Point'
import SpatialReference from 'esri/geometry/SpatialReference'
import unitUtils from 'esri/core/unitUtils'
import type Graphic from 'esri/Graphic'
import { type ProfileLayersSettings, type LayerIntersectionInfo, type GeneralSetting } from '../../config'
import { getHighLightGraphic } from '../../common/highlight-symbol-utils'
import {
  XYChart, ValueAxis, XYCursor, ColumnSeries, LineSeries, XYSeries, Bullet, Legend,
  color, useTheme, unuseTheme, Rectangle, Triangle, Circle,
  am4themes_animated, am4themes_dark, create
} from 'jimu-ui/advanced/chart-engine'
interface ChartParams {
  showGrid: boolean
  showTitleAxis: boolean
  container: HTMLElement
  isRTL: boolean
  isDarkTheme: boolean
  onCursorPositionChange?: (x: number, y: number) => void
  definition: any
  showLegend: boolean
}

interface UpdateMinMaxParams {
  pointIndex: number
  layerId: string
  seriesID: string
  newValue: number
  newValue2?: number
  displayField?: string
  assetShapeStyle?: string
  featureIndex?: number
}

interface NewSeriesTooltipInfo {
  seriesId: string
  value: number
  y2?: number
  displayField?: string
  assetStyle: string
  featureIndex?: number
  layerId: string
}

interface MinMaxOfEachProfile {
  [layerId: string]: MinMax
}

interface MinMax {
  min: number
  max: number
}

interface Props {
  intl: IntlShape
  isExportEnable: boolean
  parentWidgetId: string
  commonGeneralSettings: GeneralSetting
  activeDs: string
  currentConfig: any
  theme: IMThemeVariables
  selectedLinearUnit: string
  selectedElevationUnit: string
  profileResult: any
  unitOptions: any
  elevationGraphColor: string
  isFlip: boolean
  isUniformChartScalingEnable: boolean
  drawingLayer: GraphicsLayer
  intersectionHighlightLayer: GraphicsLayer
  mapView: JimuMapView
  showVolumetricObj: boolean
  volumetricObjLineColor: string
  volumetricObjLabel: string
  highlightChartPositionOnMap: (props: any) => void
  hideChartPosition: () => void
  chartInfo: (chart: any) => void
  toggleLegendSeriesState: (hideSeries: boolean, seriesName: string) => void
  assetIntersectionResult: LayerIntersectionInfo[]
  setExportButton: (isExport: boolean) => void
  isCustomIntervalEnabled: boolean
  customDistanceInterval: number
  chartDataUpdateTime: number
}

interface IState {
  chartDefinition: any
  showLegend: boolean
}

const unitForZ = 'meters' // since we are taking value meters per SR
const defaultIntersectingAssetSize: number = 6

export default class Chart extends React.PureComponent<Props, IState> {
  private readonly _chartContainer = React.createRef<HTMLDivElement>()
  private allDistances: number[]
  private readonly isRTL: boolean
  private chart
  private xAxis: any
  private yAxis: any
  private chartSeries: any
  private viewOutput: any
  private volumetricObjLineSeries: any
  private accessChartParams: any
  private updatedProfileLayers: ProfileLayersSettings[]
  private minMaxOfEachProfile: MinMaxOfEachProfile
  private seriesKey: string[]
  private seriesValue: number[]
  private intersectionSeriesKey
  private intersectionSeriesKeyIndex
  private groundExportingInfo
  private intersectingLayersExportingInfo

  constructor (props) {
    super(props)
    this.minMaxOfEachProfile = {}
    this.allDistances = []
    this.seriesKey = []
    this.seriesValue = []
    this.intersectionSeriesKey = {}
    this.intersectionSeriesKeyIndex = []
    this.groundExportingInfo = {}
    this.intersectingLayersExportingInfo = {}

    const appState = getAppStore().getState()
    this.isRTL = appState?.appContext?.isRTL
    this.chart = null
    this.xAxis = null
    this.yAxis = null
    this.chartSeries = null
    this.viewOutput = null
    this.volumetricObjLineSeries = null
    this.accessChartParams = null
    this.updatedProfileLayers = this.props.currentConfig?.profileSettings.layers
    this.state = {
      chartDefinition: null,
      showLegend: this.props.commonGeneralSettings?.showLegend
    }
    //if valid profileResult result then create the chart definition
    if (this.props.profileResult) {
      this.createOrUpdateChartDefinition()
    }
  }

  nls = (id: string) => {
    const messages = Object.assign({}, defaultMessages, jimuUIDefaultMessages)
    //for unit testing no need to mock intl we can directly use default en msg
    if (this.props.intl && this.props.intl.formatMessage) {
      return this.props.intl.formatMessage({ id: id, defaultMessage: messages[id] })
    } else {
      return messages[id]
    }
  }

  componentWillUnmount = () => {
    if (this.chart) {
      this.chart.dispose()
      this.chart = null
    }
  }

  //update chart once any of the properties such as
  //linear unit, elevation unit or profile result has been change
  //This indicates that component needs to updated with latest props values
  componentDidUpdate = (prevProps) => {
    if ((prevProps.commonGeneralSettings?.showGridAxis !== this.props.commonGeneralSettings?.showGridAxis &&
      this.chart?.xAxes.values.length > 0 && this.chart.yAxes.values.length > 0) ||
      prevProps.elevationGraphColor !== this.props.elevationGraphColor) {
      if (this.chart) {
        this.xAxis.renderer.grid.template.disabled = !this.props.commonGeneralSettings?.showGridAxis
        this.yAxis.renderer.grid.template.disabled = !this.props.commonGeneralSettings?.showGridAxis
        this.chartSeries.stroke = color(this.props.elevationGraphColor)
        this.chartSeries.fill = color(this.props.elevationGraphColor)
      }
      return
    }

    if (prevProps.commonGeneralSettings?.showLegend !== this.props.commonGeneralSettings?.showLegend ||
      prevProps.commonGeneralSettings?.showAxisTitles !== this.props.commonGeneralSettings?.showAxisTitles) {
      this.xAxis.title.visible = this.props.commonGeneralSettings?.showAxisTitles
      this.xAxis.title.textAlign = 'middle'
      this.yAxis.title.visible = this.props.commonGeneralSettings?.showAxisTitles
      this.yAxis.title.textAlign = 'middle'

      if (this.isRTL) {
        this.chart.padding(0, this.props.commonGeneralSettings?.showAxisTitles ? 5 : -10,
          (this.props.commonGeneralSettings?.showAxisTitles && this.props.commonGeneralSettings?.showLegend)
            ? 4
            : (this.props.commonGeneralSettings?.showAxisTitles && !this.props.commonGeneralSettings?.showLegend)
                ? -2
                : (!this.props.commonGeneralSettings?.showAxisTitles && this.props.commonGeneralSettings?.showLegend)
                    ? 0
                    : (!this.props.commonGeneralSettings?.showAxisTitles && !this.props.commonGeneralSettings?.showLegend)
                        ? -25
                        : 0,
          5)
      } else {
        this.chart.padding(0, 5,
          (this.props.commonGeneralSettings?.showAxisTitles && this.props.commonGeneralSettings?.showLegend)
            ? 4
            : (this.props.commonGeneralSettings?.showAxisTitles && !this.props.commonGeneralSettings?.showLegend)
                ? -2
                : (!this.props.commonGeneralSettings?.showAxisTitles && this.props.commonGeneralSettings?.showLegend)
                    ? 0
                    : (!this.props.commonGeneralSettings?.showAxisTitles && !this.props.commonGeneralSettings?.showLegend)
                        ? -25
                        : 0,
          this.props.commonGeneralSettings?.showAxisTitles ? 5 : -10)
      }
      //to position the axes labels properly in rtl and when chart flip occurs
      this.xAxis.invalidateLabels()
      this.yAxis.invalidateLabels()
      this.setState({
        showLegend: this.props.commonGeneralSettings?.showLegend
      }, () => {
        if (this.state.showLegend) {
          if (this.chart.legend) {
            this.chart.legend.visible = this.state.showLegend
          } else {
            this.displayChartLegend(this.accessChartParams)
          }
        } else {
          if (this.chart?.legend) {
            this.chart.legend.visible = this.state.showLegend
          }
        }
      })
      return
    }

    //on change of view line color update the graph color and rerender it
    if (prevProps.volumetricObjLineColor !== this.props.volumetricObjLineColor) {
      if (this.chart) {
        this.volumetricObjLineSeries.stroke = color(this.props.volumetricObjLineColor)
        this.volumetricObjLineSeries.fill = color(this.props.volumetricObjLineColor)
      }
      return
    }

    //on change of view object label update the graph legend name
    if (prevProps.volumetricObjLabel !== this.props.volumetricObjLabel) {
      if (this.chart) {
        this.volumetricObjLineSeries.name = this.props.volumetricObjLabel ? this.props.volumetricObjLabel : this.nls('volumetricObj')
      }
      return
    }

    const profileSettingsChanged = this.didProfileLayersSettingsChanged(prevProps.currentConfig?.profileSettings.layers, this.props.currentConfig?.profileSettings.layers)
    const intersectingSettingsChanged = this.didIntersectingLayersSettingsChanged(prevProps.currentConfig?.assetSettings?.layers, this.props.currentConfig?.assetSettings?.layers)
    if (profileSettingsChanged || intersectingSettingsChanged || prevProps.assetIntersectionResult !== this.props.assetIntersectionResult ||
      prevProps.selectedLinearUnit !== this.props.selectedLinearUnit ||
      prevProps.selectedElevationUnit !== this.props.selectedElevationUnit ||
      prevProps.chartDataUpdateTime !== this.props.chartDataUpdateTime ||
      prevProps.theme !== this.props.theme ||
      prevProps.isFlip !== this.props.isFlip ||
      prevProps.isUniformChartScalingEnable !== this.props.isUniformChartScalingEnable ||
      prevProps.currentConfig?.advanceOptions !== this.props.currentConfig?.advanceOptions ||
      prevProps.currentConfig?.profileSettings?.isProfileSettingsEnabled !== this.props.currentConfig?.profileSettings?.isProfileSettingsEnabled ||
      prevProps.currentConfig?.profileSettings?.isCustomizeOptionEnabled !== this.props.currentConfig?.profileSettings?.isCustomizeOptionEnabled ||
      prevProps.currentConfig?.assetSettings?.isAssetSettingsEnabled !== this.props.currentConfig?.assetSettings?.isAssetSettingsEnabled ||
      ((prevProps.showVolumetricObj !== this.props.showVolumetricObj) && !this.props.showVolumetricObj)) {
      if ((((prevProps.showVolumetricObj !== this.props.showVolumetricObj) && !this.props.showVolumetricObj) ||
        prevProps.chartDataUpdateTime !== this.props.chartDataUpdateTime ||
        prevProps.selectedLinearUnit !== this.props.selectedLinearUnit ||
        prevProps.selectedElevationUnit !== this.props.selectedElevationUnit) && this.chart) {
        this.chart.dispose()
        this.chart = null
      }
      //If theme is changed to/from dark theme,
      //we need to reCreate chart since when switching from dark to normal theme(or reverse) the already drawn chart is not removing dark theme labels
      if ((profileSettingsChanged || intersectingSettingsChanged || prevProps.assetIntersectionResult !== this.props.assetIntersectionResult ||
        prevProps.theme.darkTheme !== this.props.theme.darkTheme ||
        prevProps.theme.colors.palette.primary[600] !== this.props.theme.colors.palette.primary[600] ||
        prevProps.theme.typography.fontSizeRoot !== this.props.theme.typography.fontSizeRoot ||
        prevProps.currentConfig?.advanceOptions !== this.props.currentConfig?.advanceOptions ||
        prevProps.currentConfig?.profileSettings?.isProfileSettingsEnabled !== this.props.currentConfig?.profileSettings?.isProfileSettingsEnabled ||
        prevProps.currentConfig?.profileSettings?.isCustomizeOptionEnabled !== this.props.currentConfig?.profileSettings?.isCustomizeOptionEnabled ||
        prevProps.currentConfig?.assetSettings?.isAssetSettingsEnabled !== this.props.currentConfig?.assetSettings?.isAssetSettingsEnabled
      ) && this.chart) {
        this.chart.dispose()
        this.chart = null
      }
      //check in live view for intersecting layers
      if (intersectingSettingsChanged) {
        this.props.assetIntersectionResult.forEach((intersectionResult) => {
          this.props.currentConfig?.assetSettings?.layers.forEach((eachConfigLayer) => {
            if (eachConfigLayer.layerId === intersectionResult?.settings?.layerId) {
              intersectionResult.settings = eachConfigLayer
            }
          })
        })
        if (this.chart) {
          this.chart.dispose()
          this.chart = null
        }
      }

      this.updatedProfileLayers = this.props.currentConfig?.profileSettings.layers
      this.createOrUpdateChartDefinition()
    }

    if (prevProps.isExportEnable !== this.props.isExportEnable) {
      if (this.props.isExportEnable) {
        this.props.setExportButton(false)
        this.performExportOperation()
      }
    }
  }

  resetExportingInfo = () => {
    this.groundExportingInfo = {
      xCoordinate: 'X',
      yCoordinate: 'Y',
      x: this.nls('distanceLabel') + ' (' + this.props.selectedLinearUnit + ')',
      y: this.nls('groundElevation') + ' (' + this.props.selectedElevationUnit + ')'
    }
    this.intersectingLayersExportingInfo = {}
  }

  exportDataForIntersectingLayers = () => {
    const seriesData = {}
    //create data for each intersecting layers
    Object.entries(this.intersectionSeriesKey).forEach(([indexKey, seriesValues]) => {
      //get chart info to fetch x, y, distance at the intersection points
      const chartInfo = this.chart.data[indexKey]
      Object.entries(seriesValues).forEach(([layerId, seriesInfo]) => {
        if (this.intersectingLayersExportingInfo?.[layerId]) {
          seriesInfo.forEach((sInfo) => {
            //create data for each intersection
            const eachEntry = {
              xCoordinate: chartInfo.xCoordinate,
              yCoordinate: chartInfo.yCoordinate,
              x: chartInfo.x,
              intersectingLayerY: sInfo.value,
              intersectingLayerY2: undefined,
              intersectingLayerDisplayField: sInfo.displayField,
              layerName: this.intersectingLayersExportingInfo[layerId].layerName
            }
            //if two field point series then export both the elevation values in csv
            if (sInfo.hasOwnProperty('y2')) {
              eachEntry.intersectingLayerY2 = sInfo.y2
            }
            //create entry for the layer in series data
            if (!seriesData[layerId]) {
              seriesData[layerId] = []
            }
            //add data for each intersection
            seriesData[layerId].push(eachEntry)
          })
        }
      })
    })
    //loop through all the intersection layers data and generate csv for each individual series
    Object.keys(seriesData).forEach((layerId) => {
      const dataArray = seriesData[layerId]
      //Reverse the dataArray to show the csv data in ascending order of the distance
      if (this.props.isFlip) {
        dataArray.reverse()
      }
      //add the adaptor to set data only for each layer
      this.chart.exporting.adapter.add('data', () => {
        return { data: dataArray }
      })
      //get the exporting info for the intersection series
      const exportingInfo = lang.clone(this.intersectingLayersExportingInfo[layerId])
      //set the file name to be exported
      //this.chart.exporting.filePrefix = this.nls('_widgetLabel') + '-' + exportingInfo.layerName + '-' + Date().toLocaleString()
      //change the header name to ''Layer name' - we are storing actual series name to add in data
      //but in header we want 'layer name'
      exportingInfo.layerName = this.nls('layerName')
      //set the exporting info and export the csv
      this.chart.exporting.dataFields = exportingInfo
      this.chart.exporting.export('csv')
      //remove the adaptor
      this.chart.exporting.adapter.remove('data')
    })
  }

  performExportOperation = () => {
    try {
      const d = new Date()
      //Export Ground Series and Selectable layers info
      this.chart.exporting.filePrefix = this.nls('_widgetLabel') + '-' + d.toDateString() + ' ' + d.toLocaleTimeString()
      this.chart.exporting.dataFields = this.groundExportingInfo
      this.chart.exporting.adapter.add('data', (data) => {
        let dataArray = []
        if (data) {
          const chartData = data.data
          //check for custom interval and filter data to be exported
          //else export all data
          dataArray = this.applyCustomizeInterval(chartData, dataArray)
          //Reverse the dataArray to show the csv data in ascending order of the distance
          if (this.props.isFlip) {
            dataArray.reverse()
          }
          const updatedData = {
            data: dataArray
          }
          return updatedData
        }
        return data
      })
      this.chart.exporting.export('csv')
      //remove the adaptor
      this.chart.exporting.adapter.remove('data')
      //Export data for intersecting layers
      this.exportDataForIntersectingLayers()
    } catch (e) {
      console.log(e)
    }
  }

  applyCustomizeInterval = (chartData, dataArray) => {
    if (this.props.isCustomIntervalEnabled && !isNaN(this.props.customDistanceInterval)) {
      let definedInterval = 0
      chartData.forEach((info) => {
        if (info.x >= definedInterval) {
          dataArray.push(info)
          definedInterval += this.props.customDistanceInterval
        }
      })
    } else {
      dataArray = [...chartData]
    }
    //remove duplicate entries for the same distance
    return dataArray.filter((dataElement, index) => {
      return index === 0 || dataElement.x !== dataArray[index - 1].x
    })
  }

  didProfileLayersSettingsChanged = (prevSettings, newSettings) => {
    let isLayersSettingsChanged = false
    if (newSettings?.length !== prevSettings?.length) {
      return true
    }
    //eslint-disable-next-line
    newSettings?.some((newLayersSettings, index) => {
      if (newLayersSettings.style.lineType !== prevSettings[index].style.lineType ||
        newLayersSettings.style.lineColor !== prevSettings[index].style.lineColor ||
        newLayersSettings.style.lineThickness !== prevSettings[index].style.lineThickness ||
        newLayersSettings.elevationSettings.type !== prevSettings[index].elevationSettings.type ||
        newLayersSettings.elevationSettings.unit !== prevSettings[index].elevationSettings.unit ||
        newLayersSettings.elevationSettings.field1 !== prevSettings[index].elevationSettings.field1 ||
        newLayersSettings.elevationSettings.field2 !== prevSettings[index].elevationSettings.field2 ||
        newLayersSettings.distanceSettings.type !== prevSettings[index].distanceSettings.type ||
        newLayersSettings.distanceSettings.field !== prevSettings[index].distanceSettings.field ||
        newLayersSettings.distanceSettings.unit !== prevSettings[index].distanceSettings.unit) {
        isLayersSettingsChanged = true
        return true
      }
    })
    return isLayersSettingsChanged
  }

  didIntersectingLayersSettingsChanged = (prevSettings, newSettings) => {
    let isLayersSettingsChanged = false
    if (newSettings?.length === prevSettings?.length) {
      // eslint-disable-next-line
      newSettings?.some((newLayersSettings, index) => {
        if (newLayersSettings?.style?.type !== prevSettings[index]?.style?.type ||
          newLayersSettings?.displayField !== prevSettings[index]?.displayField ||
          newLayersSettings?.style?.intersectingAssetShape !== prevSettings[index]?.style?.intersectingAssetShape ||
          newLayersSettings?.style?.intersectingAssetSize !== prevSettings[index]?.style?.intersectingAssetSize ||
          newLayersSettings?.style?.intersectingAssetColor !== prevSettings[index]?.style?.intersectingAssetColor ||
          newLayersSettings?.elevationSettings?.type !== prevSettings[index]?.elevationSettings?.type ||
          newLayersSettings?.elevationSettings?.unit !== prevSettings[index]?.elevationSettings?.unit ||
          newLayersSettings?.elevationSettings?.field1 !== prevSettings[index]?.elevationSettings?.field1 ||
          newLayersSettings?.elevationSettings?.field2 !== prevSettings[index]?.elevationSettings?.field2) {
          isLayersSettingsChanged = true
          return true
        }
      })
    }
    return isLayersSettingsChanged
  }

  createOrUpdateChartDefinition = () => {
    if (this.props.profileResult?.lines?.length > 0 &&
      this.props.selectedLinearUnit && this.props.selectedElevationUnit && this.props.theme) {
      const profileOutput = this.props.profileResult.lines[0].samples
      this.viewOutput = null
      if (this.props.profileResult.lines.length > 1 && this.props.showVolumetricObj && this.props.mapView.view.type === '3d') {
        this.viewOutput = this.props.profileResult.lines[1].samples
      }
      if (profileOutput.length > 0) {
        const allElevations = []
        this.allDistances = []
        if (profileOutput.length > 0) {
          profileOutput.forEach((chartData, pointIndex) => {
            const elevationInfo = {
              xCoordinate: chartData.x,
              yCoordinate: chartData.y,
              x: convertSingle(chartData.distance, this.props.profileResult.effectiveUnits.distance, this.props.selectedLinearUnit),
              y: convertSingle(chartData.elevation, this.props.profileResult.effectiveUnits.elevation, this.props.selectedElevationUnit),
              esriCTViewY: null,
              pathIdx: 0,
              pointIdx: pointIndex
            }
            if (this.viewOutput) {
              elevationInfo.esriCTViewY = convertSingle(this.viewOutput[pointIndex].elevation, this.props.profileResult.effectiveUnits.elevation, this.props.selectedElevationUnit)
            }
            allElevations.push(elevationInfo)
            this.allDistances.push(chartData.distance)
          })

          //Reset the min,max for each profiles and series Key Value arrays, it will be again filled while creating data for profile lines
          this.minMaxOfEachProfile = {}
          this.seriesKey = []
          this.seriesValue = []
          //Creates data for each profile lines as the elevation and distance setting for each profile line
          this.createDataForProfileLines(allElevations).then(() => {
            this.createDataForIntersectingAssets(allElevations).then(() => {
              //Create data for flipped chart
              let flippedData = []
              if (this.props.isFlip) {
                const totalDistance = allElevations[allElevations.length - 1].x
                flippedData = [...allElevations]
                flippedData.forEach((chartData) => {
                  chartData.x = totalDistance - chartData.x
                })
              }
              //get labels according to selected units
              const selectedUnits = this.getSelectedUnits()

              //Create x & y axis label for ground series
              const xAxisLabel = this.props.intl.formatMessage({
                id: 'graphDistanceLabel',
                defaultMessage: defaultMessages.graphDistanceLabel
              }, { unit: selectedUnits[0] })
              const yAxisLabel = this.props.intl.formatMessage({
                id: 'graphElevationLabel',
                defaultMessage: defaultMessages.graphElevationLabel
              }, { unit: selectedUnits[1] })

              const newChartDefinition = {
                data: this.props.isFlip ? flippedData : allElevations,
                series: [{
                  x: {
                    field: 'x',
                    label: xAxisLabel
                  },
                  y: {
                    field: 'y',
                    label: yAxisLabel
                  },
                  color: this.props.elevationGraphColor
                }]
              }

              this.setState({
                chartDefinition: newChartDefinition
              }, () => {
                if (this.chart) {
                  this.chart.data = this.props.isFlip ? flippedData : allElevations
                  this.xAxis.title.text = xAxisLabel
                  this.xAxis.title.textAlign = 'middle'
                  this.yAxis.title.text = yAxisLabel
                  this.yAxis.title.textAlign = 'middle'
                  this.chart.zoomOutButton.background.fill = color(this.props.theme.colors.palette.primary[600])
                  if (this.chart.zoomOutButton.background.states.getKey('hover') && this.chart.zoomOutButton.background.states.getKey('down')) {
                    this.chart.zoomOutButton.background.states.getKey('hover').properties.fill = color(this.props.theme.colors.palette.primary[500])
                    this.chart.zoomOutButton.background.states.getKey('down').properties.fill = color(this.props.theme.colors.palette.primary[800])
                  }
                  this.xAxis.numberFormatter = this.makeFormatter(this.xAxis, selectedUnits[2])
                  this.yAxis.numberFormatter = this.makeFormatter(this.yAxis, selectedUnits[3])
                  //adjust axis range on data change
                  this.adjustAxisRanges(this.accessChartParams)
                  //to position and set the axes labels properly after changing of distance and elevation units
                  this.xAxis.invalidateLabels()
                  this.yAxis.invalidateLabels()
                  return
                }
                this.createChart({
                  definition: newChartDefinition,
                  container: this._chartContainer.current,
                  isRTL: this.isRTL,
                  isDarkTheme: this.props.theme.darkTheme,
                  showGrid: this.props.commonGeneralSettings?.showGridAxis,
                  showTitleAxis: this.props.commonGeneralSettings?.showAxisTitles,
                  showLegend: this.state.showLegend
                } as ChartParams)
              })
            })
          })
        } else {
          //clears the chartDefinition and show error
          this.setState({
            chartDefinition: null
          }, () => {
            if (this.chart) {
              this.chart.dispose()
              this.chart = null
            }
          })
        }
      }
    } else {
      //clears the chart
      this.setState({
        chartDefinition: null
      })
      if (this.chart) {
        this.chart.dispose()
        this.chart = null
      }
    }
  }

  checkForProfileSettings = () => {
    const uniqueSelectedProfileLines = []
    if (this.props.drawingLayer?.graphics?.length > 0 &&
      this.props.drawingLayer.graphics.getItemAt(0)?.attributes?.esriCTFeatureLayerId) {
      this.props.drawingLayer.graphics.forEach((a) => {
        const layerId = a.getAttribute('esriCTFeatureLayerId')
        if (!uniqueSelectedProfileLines.includes(layerId)) {
          uniqueSelectedProfileLines.push(layerId)
        }
      })
    }
    return uniqueSelectedProfileLines
  }

  getSelectedUnits = (): string[] => {
    const selectedLinearUnit = this.props.unitOptions.find(unit => unit.value === this.props.selectedLinearUnit)
    const selectedElevationUnit = this.props.unitOptions.find(unit => unit.value === this.props.selectedElevationUnit)
    const linearUnit = this.nls(selectedLinearUnit.value)
    const linearUnitAbbreviation = this.nls(selectedLinearUnit.abbreviation)
    const elevationUnit = this.nls(selectedElevationUnit.value)
    const elevationUnitAbbreviation = this.nls(selectedElevationUnit.abbreviation)
    return [linearUnit, elevationUnit, linearUnitAbbreviation, elevationUnitAbbreviation]
  }

  _updateProfileResults = (profileResults) => {
    const elevationProfileResults = {
      distances: {},
      elevations: {}
    }
    elevationProfileResults.distances = convertDistancesArray(profileResults.distances, profileResults.effectiveUnits.distance, this.props.selectedLinearUnit)
    elevationProfileResults.elevations = convertElevationsInfoArray(profileResults.elevations, profileResults.effectiveUnits.distance,
      profileResults.effectiveUnits.elevation, this.props.selectedLinearUnit, this.props.selectedElevationUnit)
    return elevationProfileResults
  }

  clearChart = () => {
    this.setState({
      chartDefinition: null
    })
  }

  getNearestElevationData = (chartObjectX: number) => {
    //added condition to avoid console errors, when chart hovered while it is updating
    if (!this.props.profileResult) {
      return null
    }
    const allDistances = this.allDistances
    let needle = convertSingle(chartObjectX, this.props.selectedLinearUnit, this.props.profileResult.effectiveUnits.distance)
    if (this.props.isFlip) {
      const totalDistance = allDistances[allDistances.length - 1]
      needle = totalDistance - needle
    }
    const closest = allDistances.reduce((a, b) => {
      return Math.abs(b - needle) < Math.abs(a - needle) ? b : a
    })
    if (closest >= 0) {
      const distanceIndex = (allDistances) ? allDistances.indexOf(closest) : -1
      if (distanceIndex >= 0) {
        const elevData = this.state.chartDefinition.data[distanceIndex]
        return elevData
      }
    }
    return null
  }

  hideChartPosition = () => {
    this.props.hideChartPosition()
  }

  /**
  * Creates a new profile chart on the HTML element.
  */
  createChart = async (params: ChartParams) => {
    const isRTL = params.isRTL
    //Add animated theme to show animations
    useTheme(am4themes_animated)
    //if current theme is dark ass dark them to chart
    if (params.isDarkTheme) {
      useTheme(am4themes_dark)
    } else {
      unuseTheme(am4themes_dark)
    }
    //Create chart instance
    const chart = create(params.container, XYChart)
    this.chart = chart
    if (isRTL) {
      chart.padding(0, params.showTitleAxis ? 5 : -10,
        (params.showTitleAxis && params.showLegend)
          ? 4
          : (params.showTitleAxis && !params.showLegend)
              ? -2
              : (!params.showTitleAxis && params.showLegend)
                  ? 0
                  : (!params.showTitleAxis && !params.showLegend)
                      ? -25
                      : 0,
        5)
    } else {
      chart.padding(0, 5,
        (params.showTitleAxis && params.showLegend)
          ? 4
          : (params.showTitleAxis && !params.showLegend)
              ? -2
              : (!params.showTitleAxis && params.showLegend)
                  ? 0
                  : (!params.showTitleAxis && !params.showLegend)
                      ? -25
                      : 0,
        params.showTitleAxis ? 5 : -10)
    }
    //Add data
    chart.data = params.definition.data

    //Use the configured graph color as a ground color for area chart
    const groundColor = params.definition.series[0]?.color ? params.definition.series[0].color : '#b54900'

    //color for zoom out button in themes
    chart.zoomOutButton.background.fill = color(this.props.theme.colors.palette.primary[600])
    if (chart.zoomOutButton.background.states.getKey('hover') && chart.zoomOutButton.background.states.getKey('down')) {
      chart.zoomOutButton.background.states.getKey('hover').properties.fill = color(this.props.theme.colors.palette.primary[500])
      chart.zoomOutButton.background.states.getKey('down').properties.fill = color(this.props.theme.colors.palette.primary[800])
    }

    //Set the zoomOut Button title so that it is translated in all supported languages by EXB
    chart.zoomOutButton.readerTitle = this.nls('zoomOut')

    //Create X and Y axis abbreviations
    const unitsAbbreviations = this.getSelectedUnits()

    //Create X and Y value axis
    const xAxis = chart.xAxes.push(new ValueAxis())
    const yAxis = chart.yAxes.push(new ValueAxis())

    this.accessChartParams = {
      params,
      chart,
      xAxis,
      yAxis,
      unitsAbbreviations,
      groundColor,
      isRTL
    }

    this.configureXAxis(this.accessChartParams)
    this.configureYAxis(this.accessChartParams)
    this.configureTooltipCursorPosition(this.accessChartParams)
    this.addGroundSeries(this.accessChartParams)
    this.adjustAxisRanges(this.accessChartParams)
    this.hideLastGridLines(this.accessChartParams)
    this.profilingWithCustomizeOptions()
    if (this.viewOutput && this.props.showVolumetricObj && this.props.mapView.view.type === '3d') {
      this.addVolumetricObjLineSeries(this.accessChartParams)
    }

    if (this.state.showLegend) {
      //Set legend
      this.displayChartLegend(this.accessChartParams)
    }

    //Update chart for rtl
    if (isRTL) {
      chart.rtl = isRTL
      chart.zoomOutButton.align = 'left'
      chart.zoomOutButton.marginLeft = 5
      this.xAxis.renderer.inversed = isRTL
      this.xAxis.renderer.labels.template.textAlign = 'middle'
      this.yAxis.renderer.opposite = isRTL
      this.yAxis.renderer.labels.template.textAlign = 'middle'
    }
  }

  //check for the advanced option in backward compatibility
  canShowProfileSettingsForBackward = (activeDsConfigInfo) => {
    let showProfiling: boolean = false
    if (activeDsConfigInfo) {
      if ((activeDsConfigInfo.hasOwnProperty('advanceOptions') ||
        activeDsConfigInfo?.profileSettings.hasOwnProperty('isProfileSettingsEnabled') ||
        activeDsConfigInfo?.profileSettings.hasOwnProperty('isCustomizeOptionEnabled'))) {
        if (activeDsConfigInfo?.advanceOptions ||
          (activeDsConfigInfo?.profileSettings?.isProfileSettingsEnabled &&
            activeDsConfigInfo?.profileSettings?.isCustomizeOptionEnabled)) {
          showProfiling = true
        }
      }
    }
    return showProfiling
  }

  profilingWithCustomizeOptions = () => {
    this.resetExportingInfo()
    //create series for selectable profile layers
    if (this.canShowProfileSettingsForBackward(this.props.currentConfig)) {
      const uniqueProfileLayers = this.checkForProfileSettings()
      if (uniqueProfileLayers.length > 0) {
        uniqueProfileLayers.forEach((layerId) => {
          this.addLineSeries(layerId, this.accessChartParams)
        })
      }
    }
    //if we got the result for intersecting asset layers
    //create the series for intersecting asset layers
    if (this.props.currentConfig) {
      if (((this.props.currentConfig.hasOwnProperty('advanceOptions') && this.props.currentConfig?.advanceOptions) ||
        this.props.currentConfig?.assetSettings?.isAssetSettingsEnabled) &&
        this.props.assetIntersectionResult?.length > 0) {
        this.props.assetIntersectionResult?.forEach(eachAssetLayerResult => {
          if (eachAssetLayerResult?.intersectionResult?.length > 0) {
            const geometryType = eachAssetLayerResult.intersectionResult[0].intersectingFeature.geometry.type
            if (geometryType === 'polyline') {
              this.addIntersectingLineSeries(eachAssetLayerResult, this.accessChartParams)
            } else {
              this.addPointSeries(eachAssetLayerResult, this.accessChartParams)
            }
          }
        })
      }
    }
  }

  hideLastGridLines = (ctx) => {
    const { yAxis } = ctx
    const updateGridVisibility = (axis) => () => {
      axis.renderer.grid.each((g) => {
        g.visible = g.dataItem.label.dom.getAttribute('display') !== 'none'
      })
    }
    this.yAxis.events.on('rangechangeended', updateGridVisibility(yAxis))
    this.yAxis.events.on('validated', updateGridVisibility(yAxis))
  }

  adjustAxisRanges = (ctx) => {
    const { xAxis, yAxis } = ctx
    if (this.props.profileResult?.statistics) {
      const { minX, maxX, minY, maxY } = this.getAdjustedBounds({
        data: this.props.profileResult,
        pixelWidth: xAxis.pixelWidth,
        pixelHeight: yAxis.pixelHeight
      })
      xAxis.min = minX
      xAxis.max = maxX
      yAxis.min = minY
      yAxis.max = maxY
    }
  }

  getAdjustedBounds = ({ data, pixelWidth, pixelHeight }) => {
    const statistics = data.statistics
    const minX = 0
    //get min max from ground statistics
    let maxX = statistics.maxDistance
    maxX = convertSingle(maxX, data.effectiveUnits.distance, this.props.selectedLinearUnit)
    let minY = statistics.minElevation
    minY = convertSingle(minY, data.effectiveUnits.elevation, this.props.selectedElevationUnit)
    let maxY = statistics.maxElevation
    maxY = convertSingle(maxY, data.effectiveUnits.elevation, this.props.selectedElevationUnit)
    //calculate min max based on all the profiles
    for (const layerId in this.minMaxOfEachProfile) {
      if (this.minMaxOfEachProfile[layerId].max > maxY) {
        maxY = this.minMaxOfEachProfile[layerId].max
      }
      if (this.minMaxOfEachProfile[layerId].min < minY) {
        minY = this.minMaxOfEachProfile[layerId].min
      }
    }
    // Make sure our ranges are not too small.
    const rangeX = Math.max(maxX - minX, 0.001)
    let rangeY = Math.max(maxY - minY, 0.001)

    if (data.dynamicElevationRange) {
      // Convert to elevation units so that all values are compatible.
      const rangeXInElevationUnits = convertSingle(rangeX, this.props.selectedLinearUnit, this.props.selectedElevationUnit)
      // Make sure the Y axis is not too small in relation to the X axis.
      rangeY = Math.max(rangeY, rangeXInElevationUnits / 300)
    }

    // Apply some padding at the top and bottom so the chart lines don't align
    // with the axes.
    minY = minY - 0.02 * rangeY
    maxY = minY + rangeY + 0.02 * rangeY

    // Adjust the Y axis such that we obtain guides and labels at 'nice' locations.
    const yMinMax = niceScale(minY, maxY, 10)
    rangeY = yMinMax[1] - yMinMax[0]

    if (this.props.isUniformChartScalingEnable) { //if uniform scaling is true
      return this.getUniformBounds({
        bounds: { minX, maxX, minY, maxY },
        pixelWidth,
        pixelHeight,
        centered: true
      })
    }

    return {
      minX,
      maxX: minX + rangeX,
      minY,
      maxY: minY + rangeY
    }
  }

  getUniformBounds = ({ bounds, pixelWidth, pixelHeight, centered }) => {
    let { minX, maxX, minY, maxY } = bounds
    const rangeX = maxX - minX
    const rangeY = maxY - minY

    // Convert to distance units so that all values are compatible.
    const rangeYInDistanceUnits = convertSingle(rangeY, this.props.selectedElevationUnit, this.props.selectedLinearUnit)
    const unitsPerPixelX = rangeX / pixelWidth
    const unitsPerPixelY = rangeYInDistanceUnits / pixelHeight
    const scale = unitsPerPixelY / unitsPerPixelX

    if (scale >= 1) {
      // If the data would be stretched along the X axis, we grow the axis so that
      // the data keeps the right shape.
      [minX, maxX] = this.scaleRange([minX, maxX], scale, centered)
    } else {
      // When things would stretch past the right edge, we need to shrink the
      // Y axis instead to make everything fit.
      [minY, maxY] = this.scaleRange([minY, maxY], 1 / scale, centered)
    }
    return { minX, maxX, minY, maxY }
  }

  scaleRange = ([min, max]: [number, number], scale: number, centered: boolean): [number, number] => {
    const newRange = (max - min) * scale

    if (centered) {
      const center = (min + max) / 2
      const newMin = center - newRange / 2
      return [newMin, newMin + newRange]
    }
    return [min, min + newRange]
  }

  getFontSize = () => {
    const theme = this.props.theme
    let labelHeight = 9
    if (theme.typography.fontSizeRoot === '125%') {
      labelHeight = 11
    } else if (theme.typography.fontSizeRoot === '87.5%') {
      labelHeight = 8
    } else if (theme.typography.fontSizeRoot === '75%') {
      labelHeight = 7
    }
    return labelHeight
  }

  configureXAxis = (ctx) => {
    const { xAxis, params, unitsAbbreviations } = ctx
    const fontSize = this.getFontSize()
    //X axis title
    this.xAxis = xAxis
    xAxis.title.text = params.definition.series[0].x.label
    xAxis.title.textAlign = 'middle'
    xAxis.title.fontWeight = 500
    xAxis.title.fontSize = fontSize + 3
    xAxis.title.visible = params.showTitleAxis
    xAxis.cursorTooltipEnabled = true
    xAxis.extraTooltipPrecision = 2 //axis tooltip displays number upto 3 decimal places
    //Format the axis numbers
    xAxis.numberFormatter = this.makeFormatter(xAxis, unitsAbbreviations[2])
    xAxis.strictMinMax = true

    const xAxisLabelTemplate = xAxis.renderer.labels.template
    xAxisLabelTemplate.fontSize = fontSize
    xAxisLabelTemplate.fontWeight = '500'
    xAxisLabelTemplate.paddingTop = 6
    //Align labels to the left
    xAxisLabelTemplate.horizontalCenter = 'left'
    xAxisLabelTemplate.paddingLeft = 0
    xAxisLabelTemplate.paddingBottom = 1
    //Axis renderer
    xAxis.renderer.line.visible = false
    xAxis.renderer.baseGrid.disabled = true
    xAxis.renderer.minGridDistance = 50
    xAxis.renderer.minLabelPosition = 0.05
    xAxis.renderer.maxLabelPosition = 0.95 // Hide the last label
    xAxis.renderer.fontWeight = 500
    xAxis.renderer.fontSize = fontSize
    //Enable/Disable grid for X axis
    xAxis.renderer.grid.template.disabled = !params.showGrid
    xAxis.renderer.grid.template.strokeOpacity = 0.1
    xAxis.renderer.grid.template.stroke = color('f4f4f4')
  }

  configureYAxis = (ctx) => {
    const { yAxis, params, unitsAbbreviations } = ctx
    const fontSize = this.getFontSize()
    //Format the axis numbers
    this.yAxis = yAxis
    //value axis title
    yAxis.title.text = params.definition.series[0].y.label
    yAxis.title.textAlign = 'middle'
    yAxis.title.fontWeight = 500
    yAxis.title.fontSize = fontSize + 3
    yAxis.title.paddingBottom = 6
    yAxis.title.visible = params.showTitleAxis
    yAxis.cursorTooltipEnabled = true
    yAxis.extraTooltipPrecision = 2 //axis tooltip displays number upto 3 decimal places
    yAxis.numberFormatter = this.makeFormatter(yAxis, unitsAbbreviations[3])
    yAxis.strictMinMax = true
    yAxis.baseValue = -500_000

    const yAxisLabelTemplate = yAxis.renderer.labels.template
    yAxisLabelTemplate.fontSize = fontSize
    yAxisLabelTemplate.fontWeight = '500'
    yAxisLabelTemplate.verticalCenter = 'bottom'
    yAxisLabelTemplate.paddingLeft = 4
    yAxisLabelTemplate.paddingBottom = 0
    yAxis.renderer.line.opacity = 0
    yAxis.renderer.line.visible = false
    yAxis.renderer.baseGrid.disabled = true
    yAxis.renderer.inside = true
    yAxis.renderer.minGridDistance = 30
    yAxis.renderer.minLabelPosition = 0
    yAxis.renderer.maxLabelPosition = 0.95 // Hide the last label
    yAxis.renderer.fontWeight = 500
    yAxis.renderer.fontSize = fontSize
    //Enable/Disable grid for value axis
    yAxis.renderer.grid.template.disabled = !params.showGrid
    yAxis.renderer.grid.template.strokeOpacity = 0.1
    yAxis.renderer.grid.template.stroke = color('f4f4f4')
  }

  /**
   * Highlights the intersecting graphic on map
   * @param Object - Array of feature index for each layerId
   */
  highlightIntersectionsOnMap = (featuresByLayerId: any) => {
    const featureIndexByLayerId = Object.keys(featuresByLayerId)
    if (this.props.assetIntersectionResult?.length > 0 && featureIndexByLayerId.length > 0) {
      const graphicsToHighlight: __esri.Graphic[] = []
      featureIndexByLayerId.forEach((layerId) => {
        const featureIndex = featuresByLayerId[layerId]
        // eslint-disable-next-line
        this.props.assetIntersectionResult.some((eachAssetLayerResult) => {
          if (eachAssetLayerResult?.intersectionResult?.length > 0 && layerId === eachAssetLayerResult.settings.layerId) {
            featureIndex.forEach((fIndex) => {
              const eachLayerRecord: any = eachAssetLayerResult.intersectionResult[fIndex]?.record
              const featureGraphic = eachLayerRecord.getFeature()
              graphicsToHighlight.push(getHighLightGraphic(featureGraphic, '#FFFF00'))
            })
            return true
          }
        })
      })
      if (graphicsToHighlight.length > 0) {
        this.props.intersectionHighlightLayer.removeAll()
        this.props.intersectionHighlightLayer.addMany(graphicsToHighlight)
      }
    }
  }

  configureTooltipCursorPosition = (ctx) => {
    const { xAxis, yAxis, chart } = ctx
    const fontSize = this.getFontSize()
    //Set styling for the series tooltip
    const tooltip = chart.tooltip
    tooltip.label.fontSize = fontSize + 3
    tooltip.label.padding(4, 4, 4, 4)
    tooltip.background.padding(0, 0, 0, 0)
    tooltip.background.cornerRadius = 0
    tooltip.background.stroke = null
    tooltip.background.fill = color(this.props.theme.colors.white)
    tooltip.label.fill = color(this.props.theme.colors.black)
    const cursor = new XYCursor()
    cursor.trackable = true
    // Zooms horizontally and vertically when clicking and dragging in the chart.
    cursor.behavior = 'zoomXY'
    cursor.events.on('cursorpositionchanged', (ev) => {
      //clear intersections from map
      this.props.intersectionHighlightLayer.removeAll()
      const xAxisPosition = xAxis.toAxisPosition(cursor.xPosition)
      const x = xAxis.positionToValue(xAxisPosition)
      //Get elevation data to current chart position
      const nearestElevationData = this.getNearestElevationData(x)
      if (nearestElevationData) {
        // Adjust the position such that it is relative to the data, rather than relative to the axis.
        // Especially when using uniform scaling, it's very easy to have the data centered in the chart
        // and the start of an axis falling far away from the start of the data.
        let normalizedPosition = cursor.xPosition
        if (this.props.profileResult.statistics != null) {
          const data = this.props.profileResult
          let { maxDistance } = data.statistics
          if (maxDistance != null) {
            // convert the max distance from effectiveUnits to current selected linear units
            maxDistance = convertSingle(maxDistance, data.effectiveUnits.distance, this.props.selectedLinearUnit)
            const pos = this.isRTL ? 1 - cursor.xPosition : cursor.xPosition
            normalizedPosition = this.positionRelativeToData(pos, xAxis.minZoomed, xAxis.maxZoomed, 0, maxDistance)
          }
        }
        //Highlight the new position on map
        if (this.props.isFlip) {
          this.props.highlightChartPositionOnMap(1 - normalizedPosition)
        } else {
          this.props.highlightChartPositionOnMap(normalizedPosition)
        }
        let maxY = null
        const yAxisHeight = yAxis.measuredHeight
        const yAxisY = yAxisHeight + chart.pixelPaddingTop

        //on cursor positioned get labels according to selected units
        const formattedY = this.yAxis.numberFormatter.format(nearestElevationData.y, 5)

        //Create tooltip html text
        let tooltipHTML = ''

        //Don't show chart tooltip if ground series is off
        if (!(this.chartSeries.isHiding || this.chartSeries.isHidden)) {
          maxY = nearestElevationData.y
          tooltipHTML += '<div style="display:inline-block; margin: 3px 0px 3px 0px; height: 2px; width:15px; background-color:' + this.chartSeries.stroke.hex + ';"></div> ' + this.chartSeries.name + ':  <b>' + formattedY + '</b> <br/>'
        }

        const formattedLineViewY = this.yAxis.numberFormatter.format(nearestElevationData.esriCTViewY, 5)

        if (this.props.profileResult.lines.length > 1 && this.props.showVolumetricObj && this.props.mapView.view.type === '3d') {
          if (!(this.volumetricObjLineSeries?.isHiding || this.volumetricObjLineSeries?.isHidden)) {
            maxY = nearestElevationData.esriCTViewY
            tooltipHTML += '<div style="display:inline-block; margin: 3px 0px 3px 0px; height: 2px; width:15px; background-color:' + this.volumetricObjLineSeries.stroke.hex + ';"></div> ' + this.volumetricObjLineSeries.name + ':  <b>' + formattedLineViewY + '</b> <br/>'
          }
        }

        //get series info at the current point
        const seriesID = this.seriesKey && this.seriesKey[nearestElevationData.pointIdx] ? this.seriesKey[nearestElevationData.pointIdx] : null
        this.chart?.series?.values.forEach((series) => {
          //show series tooltip only if it is shown on chart
          if (series.dataFields.valueY === seriesID && !(series.isHiding || series.isHidden)) {
            const formattedSeriesY = this.yAxis.numberFormatter.format(nearestElevationData[seriesID], 5)
            if (maxY === null || maxY < nearestElevationData[seriesID]) {
              maxY = nearestElevationData[seriesID]
            }
            tooltipHTML += '<div style="display:inline-block; margin: 3px 0px 3px 0px; height: 2px; width:15px; background-color:' + series.stroke.hex + ';"></div> ' + series.name + ':  <b>' + formattedSeriesY + '</b> <br/>'
            return true
          }
        })

        //show tooltip for the intersecting layers at the point
        if (this.intersectionSeriesKeyIndex[nearestElevationData.pointIdx] !== null) {
          const intersectionInfoAtPoint = this.intersectionSeriesKey?.[this.intersectionSeriesKeyIndex[nearestElevationData.pointIdx]]
          const highlightInfo = {}
          const uniqueTooltipForIntersection: string[] = []
          if (intersectionInfoAtPoint) {
            const keys = Object.keys(intersectionInfoAtPoint)
            keys.forEach((layerKey) => {
              const featuresAtPoint = intersectionInfoAtPoint[layerKey]
              featuresAtPoint.forEach(seriesInfo => {
                // eslint-disable-next-line
                this.chart?.series?.values.some((series) => {
                  //show series tooltip only if it is shown on chart
                  if (series.dataFields.valueY === seriesInfo.seriesId && !(series.isHiding || series.isHidden) && nearestElevationData[seriesInfo.seriesId] !== undefined) {
                    let formattedSeriesY = this.yAxis.numberFormatter.format(nearestElevationData[seriesInfo.seriesId], 5)
                    //In some cases for line, our logic is adding line as well as point for same feature.
                    //As a result in tooltip we see same info multiple times
                    //create uniqueId for each series tooltip data, so that we don't show same data multiple times in tooltip
                    const uniqueValue = seriesInfo.layerId + seriesInfo.featureIndex + formattedSeriesY
                    if (!uniqueTooltipForIntersection.includes(uniqueValue)) {
                      uniqueTooltipForIntersection.push(uniqueValue)
                      //create data for highlighting all the intersecting features at a point of all the layers
                      if (!highlightInfo[seriesInfo.layerId]) {
                        highlightInfo[seriesInfo.layerId] = []
                      }
                      if (!highlightInfo[seriesInfo.layerId].includes(seriesInfo.featureIndex)) {
                        highlightInfo[seriesInfo.layerId].push(seriesInfo.featureIndex)
                      }
                      if (maxY === null || maxY < nearestElevationData[seriesInfo.seriesId]) {
                        maxY = nearestElevationData[seriesInfo.seriesId]
                      }
                      //for points with two fields show values of both the fields
                      if (seriesInfo.hasOwnProperty('y2')) {
                        formattedSeriesY = this.yAxis.numberFormatter.format(seriesInfo.value, 5)
                        formattedSeriesY = formattedSeriesY + ' | ' + this.yAxis.numberFormatter.format(seriesInfo.y2, 5)
                      }
                      //if display field is configured add its value in the tooltip
                      if (seriesInfo.displayField) {
                        tooltipHTML += '<div style="display:inline-block; ' + seriesInfo.assetStyle + '"></div> ' + series.name + ' (' + seriesInfo.displayField + '):  <b>' + formattedSeriesY + '</b> <br/>'
                      } else {
                        tooltipHTML += '<div style="display:inline-block; ' + seriesInfo.assetStyle + '"></div> ' + series.name + ':  <b>' + formattedSeriesY + '</b> <br/>'
                      }
                    }
                    return true
                  }
                })
              })
            })
          }
          this.highlightIntersectionsOnMap(highlightInfo)
        }

        if (tooltipHTML !== '' && this.yAxis.min <= maxY) {
          chart.tooltip.html = tooltipHTML
          //show the tooltip at the x and yMax (max elevation between ground and other line series)
          const chartPositionPoint = {
            x: cursor.point.x + cursor.parent.pixelX + chart.pixelPaddingLeft,
            y: yAxisY - yAxis.valueToPosition(maxY) * yAxisHeight - 1
          }
          chart.tooltip.pointTo(chartPositionPoint, true)
          chart.tooltip.show()
        }
      }
    })

    chart.events.on('out', () => {
      //clear intersections from map
      this.props.intersectionHighlightLayer.removeAll()
      chart.tooltip.hide()
      this.hideChartPosition()
    })
    chart.cursor = cursor
  }

  /**
   * Given an axis position (0-1), returns a position (also in 0-1) relative to the chart data on that axis
   * @param axisPosition
   *    Axis position in the range of 0-1, where 0 is the start of the axis and 1 is the end of the axis.
   * @param maxAxis
   *    Value at the end of the axis.
   * @param minData
   *    Minimum value of the chart data.
   * @param maxData
   *    Maximum value of the chart data.
   */
  positionRelativeToData = (
    axisPosition: number,
    minAxis: number,
    maxAxis: number,
    minData: number,
    maxData: number
  ): number => {
    // Get a position relative to the start of the data.
    const value = minAxis + axisPosition * (maxAxis - minAxis) - minData
    // Normalize the position to 0-1
    return value / (maxData - minData)
  }

  addGroundSeries = (ctx) => {
    const { chart, groundColor } = ctx
    //Create Area series
    const areaSeries = chart.series.push(new LineSeries())
    this.chartSeries = areaSeries
    this.props.chartInfo(this.chart)
    areaSeries.dataFields.valueY = 'y'
    areaSeries.dataFields.valueX = 'x'
    areaSeries.name = this.nls('groundElevation')
    areaSeries.stroke = color(groundColor)
    areaSeries.fill = color(groundColor)
    areaSeries.strokeWidth = 1.5
    areaSeries.fillOpacity = 0.1
  }

  addVolumetricObjLineSeries = (ctx) => {
    const { chart } = ctx
    //Create View line Area series
    const viewLineAreaSeries = chart.series.push(new LineSeries())
    this.props.chartInfo(this.chart)
    viewLineAreaSeries.dataFields.valueY = 'esriCTViewY'
    viewLineAreaSeries.dataFields.valueX = 'x'
    viewLineAreaSeries.name = this.props.volumetricObjLabel ? this.props.volumetricObjLabel : this.nls('volumetricObj')
    viewLineAreaSeries.stroke = color(this.props.volumetricObjLineColor)
    viewLineAreaSeries.fill = color(this.props.volumetricObjLineColor)
    viewLineAreaSeries.strokeWidth = 1.5
    viewLineAreaSeries.fillOpacity = 0.1
    this.volumetricObjLineSeries = viewLineAreaSeries
    //add series info in the exporting info
    this.groundExportingInfo.esriCTViewY = viewLineAreaSeries.name + ' ' + this.nls('elevationLabel') + ' (' + this.props.selectedElevationUnit + ')'
  }

  getDistanceOfIntersectingPointOnLine = (intersectingPointGeometry: __esri.Point, lineGeometry: Polyline): number => {
    //As per ticket 252 - we will now only support distance as per map projection
    //so get the distance of each feature according to mapProjection
    if (intersectingPointGeometry && lineGeometry?.paths?.length > 0) {
      const nearestCoordinate = geometryEngine.nearestCoordinate(lineGeometry, intersectingPointGeometry).coordinate
      const segmentPolyline: Polyline[] = []
      let segmentIndex = 0
      lineGeometry.paths.forEach((linePathVertex) => {
        linePathVertex.forEach((point, index) => {
          if (index !== 0) {
            const paths = [
              [
                lang.clone(linePathVertex[index - 1]),
                lang.clone(point)
              ]
            ]
            segmentPolyline[segmentIndex++] = new Polyline({
              hasZ: lineGeometry.hasZ,
              hasM: lineGeometry.hasM,
              paths: paths,
              spatialReference: lineGeometry.spatialReference.toJSON()
            })
          }
        })
      })
      const allSegmentLengths: number[] = []
      segmentPolyline.forEach((eachSegment) => {
        allSegmentLengths.push(this.getLengthAsPerMapProjection(eachSegment, this.props.selectedLinearUnit))
      })
      let totalLength = 0
      let result = -1
      // eslint-disable-next-line
      segmentPolyline.some((eachSegmentLine, segmentIndex) => {
        if (geometryEngine.intersects(eachSegmentLine, nearestCoordinate)) {
          const segmentsFirstPoint = eachSegmentLine.getPoint(0, 0)
          //when the nearest coordinate is the first point of segment then no need to create the line and get distance,
          //as it is intersecting to the first point we just need to add 0 to totallength
          if (geometryEngine.intersects(segmentsFirstPoint, nearestCoordinate)) {
            result = totalLength + 0
          } else {
            const pt1Cor = [segmentsFirstPoint.x, segmentsFirstPoint.y]
            const pt2Cor = [nearestCoordinate.x, nearestCoordinate.y]
            const lineJSON = {
              paths: [[pt1Cor, pt2Cor]],
              spatialReference: lineGeometry.spatialReference
            }
            const polyLine1 = new Polyline(lineJSON)
            result = totalLength + this.getLengthAsPerMapProjection(polyLine1, this.props.selectedLinearUnit)
          }
          return true
        } else {
          totalLength += allSegmentLengths[segmentIndex]
        }
      })
      return result
    }
    return -1
  }

  createDataForIntersectingAssets = async (chartData): Promise<any> => {
    if (this.props.currentConfig) {
      if (((this.props.currentConfig?.hasOwnProperty('advanceOptions') && this.props.currentConfig?.advanceOptions) ||
        (this.props.currentConfig?.assetSettings?.hasOwnProperty('isAssetSettingsEnabled') && this.props.currentConfig.assetSettings?.isAssetSettingsEnabled)) &&
        this.props.assetIntersectionResult?.length > 0) {
        const promise = new Promise<any>((resolve) => {
          this.intersectionSeriesKey = {}
          this.props.assetIntersectionResult.forEach((eachAssetLayerResult) => {
            const elevationSettings = eachAssetLayerResult?.settings?.elevationSettings
            if (elevationSettings && eachAssetLayerResult.intersectionResult?.length > 0) {
              const layerGeometryType = eachAssetLayerResult?.intersectionResult[0].intersectingFeature?.geometry?.type
              if (layerGeometryType === 'point') {
                this.createElevationDataForIntersectingPointLayer(eachAssetLayerResult, chartData)
              } else if (layerGeometryType === 'polyline') {
                this.createElevationDataForIntersectingLineLayer(eachAssetLayerResult, chartData)
              }
            }
          })
          resolve(chartData)
        })
        return promise
      } else {
        await Promise.resolve()
      }
    }
  }

  createElevationDataForIntersectingPointLayer = (eachAssetLayerResult, chartData) => {
    const layerId = eachAssetLayerResult.settings.layerId
    const elevationSettings = eachAssetLayerResult?.settings?.elevationSettings
    //since all the features now have z value in map SR, get metersPerSR for mapSR and multiple the z value with it to get the z in meters
    const metersPerSRForMap = unitUtils.getMetersPerUnitForSR(new SpatialReference(this.props.mapView.view.spatialReference.toJSON()))
    eachAssetLayerResult?.intersectionResult.forEach((eachIntersectingFeatureResult, featureIndex) => {
      const distanceFromStart = this.getDistanceOfIntersectingPointOnLine(eachIntersectingFeatureResult.intersectingFeature.geometry, eachAssetLayerResult.inputGeometry)
      let elevationValue
      const intersectingFeature = eachIntersectingFeatureResult.intersectingFeature

      //get the displayField value for the feature if displayField is configured
      const displayFieldValue = eachAssetLayerResult?.settings?.displayField ? eachIntersectingFeatureResult.record.getFormattedFieldValue(eachAssetLayerResult?.settings?.displayField, this.props.intl) : undefined

      const configuredAssetShape = eachAssetLayerResult?.settings?.style?.intersectingAssetShape
      const configuredAssetColor = eachAssetLayerResult?.settings?.style?.intersectingAssetColor
      let assetShape = configuredAssetShape
      if (!assetShape) {
        assetShape = 'circle'
      }
      let assetShapeStyle = ''
      switch (assetShape) {
        case 'rectangle':
          assetShapeStyle += 'margin: 0px 3px 0px 3px; height: 7px; width: 15px; background-color: ' + configuredAssetColor + ';'
          break
        case 'circle':
          assetShapeStyle += 'margin: 0px 3px 0px 3px; height: 10px; width: 10px; background-color: ' + configuredAssetColor + '; border-radius: 50%;'
          break
        case 'square':
          assetShapeStyle += 'margin: 0px 3px 0px 3px; height: 10px; width: 10px; background-color: ' + configuredAssetColor + ';'
          break
        case 'triangle':
          assetShapeStyle += 'margin: 0px 3px 0px 3px; width: 0; height: 0; border:5px solid transparent; border-bottom: 10px solid ' + configuredAssetColor + ';'
          break
      }
      let elevationValue2
      if (elevationSettings.type === 'z') {
        elevationValue = eachIntersectingFeatureResult.intersectingFeature.geometry.z * metersPerSRForMap
        elevationValue = convertSingle(elevationValue, unitForZ, this.props.selectedElevationUnit)
      } else if (elevationSettings.type === 'one' && elevationSettings.field1 && intersectingFeature.attributes[elevationSettings.field1] !== null) {
        elevationValue = intersectingFeature.attributes[elevationSettings.field1]
        if (elevationSettings.unit && elevationSettings.unit !== this.props.selectedElevationUnit) {
          elevationValue = convertSingle(elevationValue, elevationSettings.unit, this.props.selectedElevationUnit)
        }
      } else if (elevationSettings.type === 'two' && elevationSettings.field1 && elevationSettings.field2 &&
        intersectingFeature.attributes[elevationSettings.field1] !== null && intersectingFeature.attributes[elevationSettings.field2] !== null) {
        elevationValue = intersectingFeature.attributes[elevationSettings.field1]
        if (elevationSettings.unit && elevationSettings.unit !== this.props.selectedElevationUnit) {
          elevationValue = convertSingle(elevationValue, elevationSettings.unit, this.props.selectedElevationUnit)
        }
        elevationValue2 = intersectingFeature.attributes[elevationSettings.field2]
        if (elevationSettings.unit && elevationSettings.unit !== this.props.selectedElevationUnit) {
          elevationValue2 = convertSingle(elevationValue2, elevationSettings.unit, this.props.selectedElevationUnit)
        }
      }

      const nextDataToBeUpdated = chartData.filter((eachDataValue) => {
        return eachDataValue.x >= distanceFromStart
      })
      let elementToBeUpdated
      //when point is in buffer which may intersect the last point of the line
      if (nextDataToBeUpdated.length < 1) {
        const chartDataLength = chartData.length
        //if the distance of the point is greater than the distance of the last point on the line
        if (chartData[chartDataLength - 1].x < distanceFromStart) {
          elementToBeUpdated = chartData[chartDataLength - 1]
        }
      } else {
        //update only one point as we are plotting points
        // eslint-disable-next-line
        nextDataToBeUpdated?.some(element => {
          elementToBeUpdated = element
          return true
        })
      }
      const seriesIdForY = layerId + featureIndex + 'y'
      const seriesIdForY2 = layerId + featureIndex + 'y2'
      //update the elevation data in the element
      if (elementToBeUpdated) {
        if (elevationValue === undefined) {
          //when elevation value is undefiend use selected profiles elevation if elevation setting is 'Match Profile'
          //else use the elevation value of ground profile
          if (elevationSettings.type === 'match profile' && elementToBeUpdated.layerName) {
            elementToBeUpdated[seriesIdForY] = elementToBeUpdated[elementToBeUpdated.layerName + 'y']
          } else {
            elementToBeUpdated[seriesIdForY] = elementToBeUpdated.y
          }
        } else {
          elementToBeUpdated[seriesIdForY] = elevationValue
        }
        //if the elevation is using 2 field then add the key to show two point elevation using dumbbell plot
        if (elevationSettings.type === 'two') {
          elementToBeUpdated[seriesIdForY2] = elevationValue2 === undefined ? elementToBeUpdated.y : elevationValue2
          this.updateMinMaxForIntersectionProfile({
            pointIndex: elementToBeUpdated.pointIdx,
            layerId: layerId,
            seriesID: seriesIdForY2,
            newValue: elementToBeUpdated[seriesIdForY],
            newValue2: elementToBeUpdated[seriesIdForY2],
            displayField: displayFieldValue,
            assetShapeStyle: assetShapeStyle,
            featureIndex: featureIndex
          } as UpdateMinMaxParams)
        } else {
          this.updateMinMaxForIntersectionProfile({
            pointIndex: elementToBeUpdated.pointIdx,
            layerId: layerId,
            seriesID: seriesIdForY,
            newValue: elementToBeUpdated[seriesIdForY],
            newValue2: undefined,
            displayField: displayFieldValue,
            assetShapeStyle: assetShapeStyle,
            featureIndex: featureIndex
          } as UpdateMinMaxParams)
        }
      }
    })
  }

  _getElevationValueForPointOnLineGeometry = (elevationSettings, pointGeometry, intersectingFeature) => {
    let elevationValue
    const pointDistanceFromStart = this.getDistanceOfIntersectingPointOnLine(pointGeometry, intersectingFeature.geometry)
    const currentFeatureLength = this.getLengthAsPerMapProjection(intersectingFeature.geometry, this.props.selectedLinearUnit)
    //since all the features now have z value in map SR, get metersPerSR for mapSR and multiple the z value with it to get the z in meters
    const metersPerSRForMap = unitUtils.getMetersPerUnitForSR(new SpatialReference(this.props.mapView.view.spatialReference.toJSON()))
    if (elevationSettings.type === 'z') {
      elevationValue = pointGeometry.z * metersPerSRForMap
      elevationValue = convertSingle(elevationValue, unitForZ, this.props.selectedElevationUnit)
    } else if (elevationSettings.type === 'one' && elevationSettings.field1 && intersectingFeature.attributes[elevationSettings.field1] !== null) {
      elevationValue = intersectingFeature.attributes[elevationSettings.field1]
      if (elevationSettings.unit && elevationSettings.unit !== this.props.selectedElevationUnit) {
        elevationValue = convertSingle(elevationValue, elevationSettings.unit, this.props.selectedElevationUnit)
      }
    } else if (elevationSettings.type === 'two' && elevationSettings.field1 && elevationSettings.field2 &&
      intersectingFeature.attributes[elevationSettings.field1] !== null && intersectingFeature.attributes[elevationSettings.field2] !== null) {
      let field1Value = intersectingFeature.attributes[elevationSettings.field1]
      if (elevationSettings.unit && elevationSettings.unit !== this.props.selectedElevationUnit) {
        field1Value = convertSingle(field1Value, elevationSettings.unit, this.props.selectedElevationUnit)
      }
      let field2Value = intersectingFeature.attributes[elevationSettings.field2]
      if (elevationSettings.unit && elevationSettings.unit !== this.props.selectedElevationUnit) {
        field2Value = convertSingle(field2Value, elevationSettings.unit, this.props.selectedElevationUnit)
      }
      const slope = (field2Value - field1Value) / currentFeatureLength
      elevationValue = field1Value + (slope * pointDistanceFromStart)
    }
    return elevationValue
  }

  createElevationDataForIntersectingLineLayer = (eachAssetLayerResult, chartData) => {
    const elevationSettings = eachAssetLayerResult.settings.elevationSettings
    const layerId = eachAssetLayerResult.settings.layerId
    const chartDataLength = chartData.length
    eachAssetLayerResult?.intersectionResult.forEach((eachIntersectingFeatureResult, featureIndex) => {
      const intersectingFeature = eachIntersectingFeatureResult.intersectingFeature
      //get the displayField value for the feature if displayField is configured
      const displayFieldValue = eachAssetLayerResult?.settings?.displayField ? eachIntersectingFeatureResult.record.getFormattedFieldValue(eachAssetLayerResult?.settings?.displayField, this.props.intl) : undefined
      const configuredAssetColor = eachAssetLayerResult?.settings?.style?.intersectingAssetColor
      const assetShapeStyle = 'margin: 3px 0px 3px 0px; height: 2px; width:15px; background-color:' + configuredAssetColor + ';'
      eachIntersectingFeatureResult.connectedFeatureForProfiling.forEach((connectedFeature) => {
        let elevationValueForEachPoint = []
        let nearestCoordinateDistanceArray = []
        const dataToBeUpdatedForEachSegment = []
        const elvToBeUpdatedForEachSegment = []
        connectedFeature.paths.forEach((eachPath, pathIndex) => {
          nearestCoordinateDistanceArray = []
          elevationValueForEachPoint = []
          dataToBeUpdatedForEachSegment[pathIndex] = []
          elvToBeUpdatedForEachSegment[pathIndex] = []
          const seriesID = layerId + 'y_I' + '_' + featureIndex + '_' + pathIndex
          const seriesIDPoint = layerId + 'y-point' + '_' + featureIndex + '_' + pathIndex
          eachPath.forEach((point, pointIndexOnPath) => {
            const pointGeom = new Point(point)
            const nearestCoordinate = geometryEngine.nearestCoordinate(eachAssetLayerResult.inputGeometry, pointGeom).coordinate
            let currentNearestPointDistance = this.getDistanceOfIntersectingPointOnLine(nearestCoordinate, eachAssetLayerResult.inputGeometry)
            const elevationValue = this._getElevationValueForPointOnLineGeometry(elevationSettings, pointGeom, intersectingFeature)
            elevationValueForEachPoint.push(elevationValue)
            nearestCoordinateDistanceArray.push(currentNearestPointDistance)
            if (pointIndexOnPath !== 0) {
              const oldNearestPointIndex = pointIndexOnPath - 1
              let currentTotalDistance = nearestCoordinateDistanceArray[oldNearestPointIndex]
              //to solve the case 10 - where one segment is returned in the reverse order
              let ev1 = elevationValue
              let ev2 = elevationValueForEachPoint[pointIndexOnPath - 1]
              if (currentNearestPointDistance < currentTotalDistance) {
                //swap the values currentTotalDistance & currentNearestPointDistance
                currentTotalDistance = currentTotalDistance + currentNearestPointDistance
                currentNearestPointDistance = currentTotalDistance - currentNearestPointDistance
                currentTotalDistance = currentTotalDistance - currentNearestPointDistance
                ev1 = elevationValueForEachPoint[pointIndexOnPath - 1]
                ev2 = elevationValue
              }
              const currentSegmentLength = currentNearestPointDistance - currentTotalDistance
              const oldDistance = lang.clone(currentTotalDistance)
              currentTotalDistance += currentSegmentLength

              let nextDataToBeUpdated = chartData.filter((eachDataValue) => {
                return eachDataValue.x >= oldDistance && eachDataValue.x < currentTotalDistance
              })
              //in some cases we don't get data for as x don't fall between oldDistance and currentTotalDistance
              //in this case try to find one point which is last
              if (nextDataToBeUpdated.length === 0) {
                //when line is intersecting at the first point
                if (currentTotalDistance === 0 && chartDataLength > 0) {
                  nextDataToBeUpdated = [chartData[0]]
                } else {
                  nextDataToBeUpdated = chartData.filter((eachDataValue) => {
                    return eachDataValue.x < currentTotalDistance
                  })
                  if (nextDataToBeUpdated.length > 0) {
                    nextDataToBeUpdated = [nextDataToBeUpdated[nextDataToBeUpdated.length - 1]]
                  }
                }
              }
              //if we get more than one in nextDataToBeUpdated means we will represent a line on chart
              if (nextDataToBeUpdated.length > 1) {
                //if elevation value is not defined use the ground elevation
                if (ev1 === undefined || ev2 === undefined) {
                  nextDataToBeUpdated.forEach((element) => {
                    //when elevation value is undefined use selected profiles elevation if elevation setting is 'Match Profile'
                    //else use the elevation value of ground profile
                    let newElevationValue = element.y
                    if (elevationSettings.type === 'match profile' && element.layerName) {
                      newElevationValue = element[element.layerName + 'y']
                    }
                    element[seriesID] = newElevationValue
                    this.updateMinMaxForIntersectionProfile({
                      pointIndex: element.pointIdx,
                      layerId: layerId,
                      seriesID: seriesID,
                      newValue: newElevationValue,
                      newValue2: undefined,
                      displayField: displayFieldValue,
                      assetShapeStyle: assetShapeStyle,
                      featureIndex: featureIndex
                    } as UpdateMinMaxParams)
                  })
                } else {
                  //we are always creating two elevation values for lines
                  //once we get the 2 elevation values interpolate the elevation values for in between points
                  const slope = (ev1 - ev2) / currentSegmentLength
                  nextDataToBeUpdated.forEach((element) => {
                    let pointLengthFromStart = 0
                    pointLengthFromStart = element.x - oldDistance
                    const updatedElevationValue = ev2 + (slope * pointLengthFromStart)
                    element[seriesID] = updatedElevationValue
                    this.updateMinMaxForIntersectionProfile({
                      pointIndex: element.pointIdx,
                      layerId: layerId,
                      seriesID: seriesID,
                      newValue: updatedElevationValue,
                      newValue2: undefined,
                      displayField: displayFieldValue,
                      assetShapeStyle: assetShapeStyle,
                      featureIndex: featureIndex
                    } as UpdateMinMaxParams)
                  })
                }
                const fPoint = nextDataToBeUpdated[0]
                const lPoint = nextDataToBeUpdated[nextDataToBeUpdated.length - 1]
                if (fPoint.x === lPoint.x) {
                  dataToBeUpdatedForEachSegment[pathIndex].push([fPoint])
                  elvToBeUpdatedForEachSegment[pathIndex].push([ev1])
                } else {
                  dataToBeUpdatedForEachSegment[pathIndex].push([fPoint, lPoint])
                  elvToBeUpdatedForEachSegment[pathIndex].push([ev2, ev1])
                }
              } else if (nextDataToBeUpdated.length === 1) {
                //when data to be updated length is one we will decide in the end of the segment if we should plot this as a line or point
                let dataAlreadyAdded = false
                //sometimes we get same data for multiple segments of the line, we will add it only once
                if (dataToBeUpdatedForEachSegment[pathIndex].length > 0) {
                  // eslint-disable-next-line
                  dataToBeUpdatedForEachSegment[pathIndex].some((data) => {
                    if (lodash.isDeepEqual(nextDataToBeUpdated, data)) {
                      dataAlreadyAdded = true
                      return true
                    }
                  })
                }
                if (!dataAlreadyAdded) {
                  dataToBeUpdatedForEachSegment[pathIndex].push([nextDataToBeUpdated[0]])
                  elvToBeUpdatedForEachSegment[pathIndex].push([ev2])
                }
              } else if (nextDataToBeUpdated.length === 0) {
                let elementToBeUpdated
                //if the distance of the point is greater than the distance of the last point on the line
                if (chartData[chartDataLength - 1].x < currentTotalDistance) {
                  elementToBeUpdated = chartData[chartDataLength - 1]
                  if (ev1 === undefined) {
                    //when elevation value is undefined use selected profiles elevation if elevation setting is 'Match Profile'
                    //else use the elevation value of ground profile
                    if (elevationSettings.type === 'match profile' && elementToBeUpdated.layerName) {
                      ev1 = elementToBeUpdated[elementToBeUpdated.layerName + 'y']
                    } else {
                      ev1 = elementToBeUpdated.y
                    }
                  }
                  elementToBeUpdated[seriesIDPoint] = ev1
                  this.updateMinMaxForIntersectionProfile({
                    pointIndex: elementToBeUpdated.pointIdx,
                    layerId: layerId,
                    seriesID: seriesIDPoint,
                    newValue: ev1,
                    newValue2: undefined,
                    displayField: displayFieldValue,
                    assetShapeStyle: assetShapeStyle,
                    featureIndex: featureIndex
                  } as UpdateMinMaxParams)
                }
                dataToBeUpdatedForEachSegment[pathIndex].push([])
                elvToBeUpdatedForEachSegment[pathIndex].push([])
              }
            }
          })
        })

        //based on the sum of points decide if we should add those points as line or a point
        dataToBeUpdatedForEachSegment.forEach((eachSegmentsData, pi) => {
          const seriesID = layerId + 'y_I' + '_' + featureIndex + '_' + pi
          const seriesIDPoint = layerId + 'y-point' + '_' + featureIndex + '_' + pi
          let sum = 0
          eachSegmentsData.forEach((segmentsData) => {
            sum += segmentsData.length
          })
          //if sum is greater than one represent it as a part of line (use seriesID)
          //else if sum is one represent it as individual point of a line (use seriesIDPoint)
          if (sum > 1) {
            eachSegmentsData.forEach((segment, si) => {
              if (segment.length > 0) {
                let elementToBeUpdated, ev1
                if (segment.length === 1) {
                  ev1 = elvToBeUpdatedForEachSegment[pi][si][0]
                  elementToBeUpdated = segment[0]
                  if (ev1 === undefined) {
                    //when elevation value is undefined use selected profiles elevation if elevation setting is 'Match Profile'
                    //else use the elevation value of ground profile
                    if (elevationSettings.type === 'match profile' && elementToBeUpdated.layerName) {
                      ev1 = elementToBeUpdated[elementToBeUpdated.layerName + 'y']
                    } else {
                      ev1 = elementToBeUpdated.y
                    }
                  }
                  elementToBeUpdated[seriesID] = ev1
                  this.updateMinMaxForIntersectionProfile({
                    pointIndex: elementToBeUpdated.pointIdx,
                    layerId: layerId,
                    seriesID: seriesID,
                    newValue: ev1,
                    newValue2: undefined,
                    displayField: displayFieldValue,
                    assetShapeStyle: assetShapeStyle,
                    featureIndex: featureIndex
                  } as UpdateMinMaxParams)
                }
              }
            })
          } else if (sum === 1) {
            let elementToBeUpdated, ev1
            // eslint-disable-next-line
            eachSegmentsData.some((v, si) => {
              if (v.length > 0 && v[0]) {
                elementToBeUpdated = v[0]
                ev1 = elvToBeUpdatedForEachSegment[pi][si][0]
                if (ev1 === undefined) {
                  //when elevation value is undefined use selected profiles elevation if elevation setting is 'Match Profile'
                  //else use the elevation value of ground profile
                  if (elevationSettings.type === 'match profile' && elementToBeUpdated.layerName) {
                    ev1 = elementToBeUpdated[elementToBeUpdated.layerName + 'y']
                  } else {
                    ev1 = elementToBeUpdated.y
                  }
                }
                elementToBeUpdated[seriesIDPoint] = ev1
                this.updateMinMaxForIntersectionProfile({
                  pointIndex: elementToBeUpdated.pointIdx,
                  layerId: layerId,
                  seriesID: seriesIDPoint,
                  newValue: ev1,
                  newValue2: undefined,
                  displayField: displayFieldValue,
                  assetShapeStyle: assetShapeStyle,
                  featureIndex: featureIndex
                } as UpdateMinMaxParams)
                return true
              }
            })
          }
        })
      })
      //add elevation info for all the disconnected points of the intersecting line geometry
      eachIntersectingFeatureResult.disconnectedFeatureForProfiling.forEach((disconnectedFeatureGeometry, pointIndex) => {
        const elevationValue = this._getElevationValueForPointOnLineGeometry(elevationSettings, disconnectedFeatureGeometry, intersectingFeature)
        const currentTotalDistance = this.getDistanceOfIntersectingPointOnLine(disconnectedFeatureGeometry, eachAssetLayerResult.inputGeometry)
        const nextDataToBeUpdated = chartData.filter((eachDataValue) => {
          return eachDataValue.x >= currentTotalDistance
        })
        let elementToBeUpdated
        const seriesId = layerId + 'y-point' + '_' + featureIndex + '_' + pointIndex + '_d'
        //when point is in buffer which may intersect the last point of the line
        if (nextDataToBeUpdated.length < 1) {
          const chartDataLength = chartData.length
          //if the distance of the point is greater than the distance of the last point on the line
          if (chartData[chartDataLength - 1].x < currentTotalDistance) {
            elementToBeUpdated = chartData[chartDataLength - 1]
          }
        } else { //update only one point as we are plotting points
          // eslint-disable-next-line
          nextDataToBeUpdated?.some(element => {
            if (!element.hasOwnProperty(seriesId)) {
              elementToBeUpdated = element
              return true
            }
          })
        }
        //update the elevation data in the element
        if (elementToBeUpdated) {
          if (elevationValue === undefined) {
            //when elevation value is undefined use selected profiles elevation if elevation setting is 'Match Profile'
            //else use the elevation value of ground profile
            if (elevationSettings.type === 'match profile' && elementToBeUpdated.layerName) {
              elementToBeUpdated[seriesId] = elementToBeUpdated[elementToBeUpdated.layerName + 'y']
            } else {
              elementToBeUpdated[seriesId] = elementToBeUpdated.y
            }
          } else {
            elementToBeUpdated[seriesId] = elevationValue
          }
          this.updateMinMaxForIntersectionProfile({
            pointIndex: elementToBeUpdated.pointIdx,
            layerId: layerId,
            seriesID: seriesId,
            newValue: elementToBeUpdated[seriesId],
            newValue2: undefined,
            displayField: displayFieldValue,
            assetShapeStyle: assetShapeStyle,
            featureIndex: featureIndex
          } as UpdateMinMaxParams)
        }
      })
    })
  }

  createDataForProfileLines = async (chartData): Promise<any> => {
    if (this.canShowProfileSettingsForBackward(this.props.currentConfig)) {
      const uniqueProfileLayers = this.checkForProfileSettings()
      if (uniqueProfileLayers.length > 0) {
        const promise = new Promise<any>((resolve, reject) => {
          this.getDistanceOfAllSelectedFeatures().then((featuresDistances) => {
            uniqueProfileLayers.forEach((layerId) => {
              let currentTotalDistance = 0
              this.props.drawingLayer.graphics.forEach(async (selectedFeature, index) => {
                const selectedLayerId = selectedFeature.attributes.esriCTFeatureLayerId
                const config = this.getConfiguredSettingsForLine(selectedLayerId)
                if (config?.elevationSettings && selectedLayerId === layerId) {
                  const currentFeatureLength = featuresDistances[index]
                  const oldDistance = lang.clone(currentTotalDistance)
                  currentTotalDistance += currentFeatureLength
                  const nextDataToBeUpdated = chartData.filter((eachDataValue) => {
                    return eachDataValue.x >= oldDistance && eachDataValue.x <= currentTotalDistance
                  })
                  this.addElevationForSelectedFeature(config.elevationSettings, selectedFeature, currentFeatureLength, nextDataToBeUpdated, oldDistance)
                } else {
                  currentTotalDistance += featuresDistances[index]
                }
              })
            })
            resolve(chartData)
          })
        })
        return promise
      } else {
        await Promise.resolve()
      }
    } else {
      await Promise.resolve()
    }
  }

  removeNegativeExponents = (num: number): number => {
    let returnValue
    if (num.toString().toLowerCase().split('e-').length > 1) {
      returnValue = 0
    } else {
      returnValue = num
    }
    return returnValue
  }

  getLengthAsPerMapProjection = (geometry, unit): number => {
    const geodesicRequired = this.props.mapView.view.spatialReference.isWebMercator || this.props.mapView.view.spatialReference.isGeographic
    const length = geodesicRequired ? geometryEngine.geodesicLength(geometry, unit) : geometryEngine.planarLength(geometry, unit)
    return this.removeNegativeExponents(length)
  }

  getDistanceAsPerMapProjection = (geometry, unit): Promise<number> => {
    const geodesicRequired = this.props.mapView.view.spatialReference.isWebMercator || this.props.mapView.view.spatialReference.isGeographic
    if (geodesicRequired) {
      return geometryEngineAsync.geodesicLength(geometry, unit)
    } else {
      return geometryEngineAsync.planarLength(geometry, unit)
    }
  }

  getConfiguredSettingsForLine = (selectedLayerId: string) => {
    return this.updatedProfileLayers.find((layer) => {
      return layer.layerId === selectedLayerId
    })
  }

  getDistanceAsPerConfiguredFieldAndUnits = (configuredDistanceSettings, selectedFeature: Graphic) => {
    const fieldValue = selectedFeature.attributes[configuredDistanceSettings.field]
    if (!isNaN(Number(fieldValue))) {
      return convertSingle(fieldValue, configuredDistanceSettings.unit, this.props.selectedLinearUnit)
    }
    return 0
  }

  updateMinMaxForIntersectionProfile = (intersectionParams: UpdateMinMaxParams) => {
    let min = intersectionParams.newValue
    let max = intersectionParams.newValue
    //store each key value for each point on ground related to which series
    //this is useful to flip the profile series
    if (!this.intersectionSeriesKey[intersectionParams.pointIndex]) {
      this.intersectionSeriesKey[intersectionParams.pointIndex] = {}
    }
    //add the point index for which we have intersection data in the intersectionSeriesKeyIndex, which will be used for flip
    this.intersectionSeriesKeyIndex[intersectionParams.pointIndex] = intersectionParams.pointIndex
    const newInfo: NewSeriesTooltipInfo = {
      seriesId: intersectionParams.seriesID,
      value: intersectionParams.newValue,
      assetStyle: intersectionParams.assetShapeStyle,
      featureIndex: intersectionParams.featureIndex,
      layerId: intersectionParams.layerId
    }
    if (intersectionParams.newValue2 !== undefined) {
      newInfo.y2 = intersectionParams.newValue2
      if (max < intersectionParams.newValue2) {
        max = intersectionParams.newValue2
      }
      if (min > intersectionParams.newValue2) {
        min = intersectionParams.newValue2
      }
    }

    if (intersectionParams.displayField !== undefined && intersectionParams.displayField !== null) {
      newInfo.displayField = intersectionParams.displayField
    }
    if (!this.intersectionSeriesKey[intersectionParams.pointIndex][intersectionParams.layerId]) {
      this.intersectionSeriesKey[intersectionParams.pointIndex][intersectionParams.layerId] = []
    }
    this.intersectionSeriesKey[intersectionParams.pointIndex][intersectionParams.layerId].push(newInfo)
    if (!this.minMaxOfEachProfile[intersectionParams.layerId]) {
      this.minMaxOfEachProfile[intersectionParams.layerId] = {
        min: min,
        max: max
      }
    } else if (this.minMaxOfEachProfile[intersectionParams.layerId]) {
      if (this.minMaxOfEachProfile[intersectionParams.layerId].min > min) {
        this.minMaxOfEachProfile[intersectionParams.layerId].min = min
      }
      if (this.minMaxOfEachProfile[intersectionParams.layerId].max < max) {
        this.minMaxOfEachProfile[intersectionParams.layerId].max = max
      }
    }
  }

  updateMinMaxForProfile = (pointIndex: number, layerId: string, newValue: number) => {
    //store each key value for each point on ground related to which series
    //this is useful to flip the profile series
    this.seriesKey[pointIndex] = layerId + 'y'
    this.seriesValue[pointIndex] = newValue
    //add all the pointIndex for intersection, so that we can reverse it for flip
    this.intersectionSeriesKeyIndex[pointIndex] = null

    if (!this.minMaxOfEachProfile[layerId]) {
      this.minMaxOfEachProfile[layerId] = {
        min: newValue,
        max: newValue
      }
    } else if (this.minMaxOfEachProfile[layerId]) {
      if (this.minMaxOfEachProfile[layerId].min > newValue) {
        this.minMaxOfEachProfile[layerId].min = newValue
      }
      if (this.minMaxOfEachProfile[layerId].max < newValue) {
        this.minMaxOfEachProfile[layerId].max = newValue
      }
    }
  }

  addElevationForSelectedFeature = (config, selectedFeature, currentFeatureLength, nextDataToBeUpdated, currentTotalDistance): void => {
    let field1Value, field2Value
    const layerId = selectedFeature.attributes.esriCTFeatureLayerId
    if (config.type === 'one' && config.field1 && selectedFeature.attributes[config.field1] !== null) {
      field1Value = selectedFeature.attributes[config.field1]
      if (config.unit && config.unit !== this.props.selectedElevationUnit) {
        field1Value = convertSingle(field1Value, config.unit, this.props.selectedElevationUnit)
      }
      nextDataToBeUpdated.forEach(element => {
        element[layerId + 'y'] = field1Value
        element.layerName = layerId
        this.updateMinMaxForProfile(element.pointIdx, layerId, field1Value)
      })
    } else if (config.type === 'two' && config.field1 && config.field2 &&
      selectedFeature.attributes[config.field1] !== null && selectedFeature.attributes[config.field2] !== null) {
      field1Value = selectedFeature.attributes[config.field1]
      if (config.unit && config.unit !== this.props.selectedElevationUnit) {
        field1Value = convertSingle(field1Value, config.unit, this.props.selectedElevationUnit)
      }
      field2Value = selectedFeature.attributes[config.field2]
      if (config.unit && config.unit !== this.props.selectedElevationUnit) {
        field2Value = convertSingle(field2Value, config.unit, this.props.selectedElevationUnit)
      }
      const slope = (field2Value - field1Value) / currentFeatureLength
      nextDataToBeUpdated.forEach((element) => {
        let pointLengthFromStart = 0
        pointLengthFromStart = element.x - currentTotalDistance
        const elevationValue = field1Value + (slope * pointLengthFromStart)
        element[layerId + 'y'] = elevationValue
        element.layerName = layerId
        this.updateMinMaxForProfile(element.pointIdx, layerId, elevationValue)
      })
    } else if (config.type === 'z' && selectedFeature.geometry.hasZ) {
      const currentGeometry = selectedFeature.geometry
      if (currentGeometry.paths?.length > 0) {
        const segments: Polyline[] = []
        let segmentIndex = 0
        currentGeometry.paths.forEach((linePathVertex) => {
          linePathVertex.forEach((point, index) => {
            if (index !== 0) {
              const paths = [
                [
                  lang.clone(linePathVertex[index - 1]),
                  lang.clone(point)
                ]
              ]
              segments[segmentIndex++] = new Polyline({
                hasZ: currentGeometry.hasZ,
                hasM: currentGeometry.hasM,
                paths: paths,
                spatialReference: currentGeometry.spatialReference.toJSON()
              })
            }
          })
        })
        //since all the features now have z value in map SR, get metersPerSR for mapSR and multiple the z value with it to get the z in meters
        const metersPerSRForMap = unitUtils.getMetersPerUnitForSR(new SpatialReference(this.props.mapView.view.spatialReference.toJSON()))
        let totalSegLength = nextDataToBeUpdated[0]?.x
        const elevationInfo = this.props.drawingLayer.elevationInfo // get the elevation info applied to drawing layer to update the z-value
        segments.forEach((eachSegment, segmentIndex) => {
          const segmentLength = this.getLengthAsPerMapProjection(eachSegment, this.props.selectedLinearUnit)
          const segStartZInMeters = segments[segmentIndex].paths[0][0][2] * metersPerSRForMap
          const segEndZInMeters = segments[segmentIndex].paths[0][1][2] * metersPerSRForMap
          const nextDataToBeUpdatedForSeg = nextDataToBeUpdated.filter((eachDataValue) => {
            return eachDataValue.x >= totalSegLength && eachDataValue.x <= totalSegLength + segmentLength
          })

          let segStartZ = convertSingle(segStartZInMeters, unitForZ, this.props.selectedElevationUnit)
          let segEndZ = convertSingle(segEndZInMeters, unitForZ, this.props.selectedElevationUnit)
          //In case of webScene we need to update the z based on the elevation info applied
          if (this.props.mapView.view.type === '3d' && elevationInfo && nextDataToBeUpdatedForSeg?.length > 0) {
            //add the starting point z and ending point z in case of relative to scene/ground modes
            if (elevationInfo.mode === 'relative-to-ground' || elevationInfo.mode === 'relative-to-scene') {
              segStartZ += nextDataToBeUpdatedForSeg[0].y
              segEndZ += nextDataToBeUpdatedForSeg[nextDataToBeUpdatedForSeg.length - 1].y
            }
          }

          const slope = (segEndZ - segStartZ) / segmentLength
          nextDataToBeUpdatedForSeg.forEach((element) => {
            if (!element[layerId + 'y']) {
              let pointLengthFromStart = 0
              pointLengthFromStart = element.x - totalSegLength
              let elevationValue = segStartZ + (slope * pointLengthFromStart)
              //in case of on-the-ground mode the layers should be shown same as ground z and it should ignore the z layer in the features
              if (this.props.mapView.view.type === '3d' && elevationInfo?.mode === 'on-the-ground') {
                elevationValue = element.y
              }
              element[layerId + 'y'] = elevationValue
              element.layerName = layerId
              this.updateMinMaxForProfile(element.pointIdx, layerId, elevationValue)
            }
          })
          totalSegLength += segmentLength
        })
      }
    } else if (config.type) {
      nextDataToBeUpdated.forEach(element => {
        element[layerId + 'y'] = element.y
        element.layerName = layerId
        this.updateMinMaxForProfile(element.pointIdx, layerId, element.y)
      })
    }
  }

  getDistanceOfAllSelectedFeatures = (): Promise<any[]> => {
    const getDistancePromiseArray = []
    //As per ticket 252 - we will now only support distance as per map projection
    //so get the distance of each feature according to mapProjection
    this.props.drawingLayer.graphics.forEach((selectedFeature) => {
      getDistancePromiseArray.push(this.getDistanceAsPerMapProjection(selectedFeature.geometry, this.props.selectedLinearUnit))
    })
    return Promise.all(getDistancePromiseArray)
  }

  addLineSeries = (layerId: string, ctx) => {
    let configuredProfileSetting = null
    let lineSeriesName = ''
    const layersArray = this.props.mapView.view.map.layers.toArray()
    const dataSource: DataSource[] = getAllLayersFromDataSource(this.props.activeDs)
    if (this.updatedProfileLayers.length > 0) {
      configuredProfileSetting = this.updatedProfileLayers.filter((layerSettings) => {
        return layerSettings.layerId === layerId
      })
      dataSource?.forEach((layer) => {
        layersArray.forEach((viewLayers) => {
          const layersArray: any = viewLayers
          if (layersArray.type === 'group') {
            const grpLayer = layersArray.layers.toArray()
            grpLayer.forEach((grpLayers) => {
              if (grpLayers.id === layer.jimuChildId) {
                configuredProfileSetting.forEach((currentSetting) => {
                  if ((currentSetting.layerId === layer.id)) {
                    lineSeriesName = grpLayers.title
                  }
                })
              }
            })
          } else if (layersArray.type === 'feature') {
            if (viewLayers.id === layer.jimuChildId) {
              configuredProfileSetting.forEach((currentSetting) => {
                if ((currentSetting.layerId === layer.id)) {
                  lineSeriesName = viewLayers.title
                }
              })
            }
          }
        })
      })
    }

    if (configuredProfileSetting?.length === 1) {
      const { chart } = ctx
      //Create new line series
      const lineSeries = chart.series.push(new LineSeries())
      lineSeries.dataFields.valueY = layerId + 'y'
      lineSeries.dataFields.valueX = 'x'
      lineSeries.name = lineSeriesName
      lineSeries.stroke = color(configuredProfileSetting[0].style.lineColor)
      lineSeries.strokeWidth = configuredProfileSetting[0].style.lineThickness
      lineSeries.connect = false
      if (configuredProfileSetting[0].style.lineType === 'dotted-line') {
        lineSeries.strokeDasharray = '2 , 4'
      } else if (configuredProfileSetting[0].style.lineType === 'dashed-line') {
        lineSeries.strokeDasharray = '8 , 4'
      }
      this.groundExportingInfo[layerId + 'y'] = lineSeriesName + ' ' + this.nls('elevationLabel') + ' (' + this.props.selectedElevationUnit + ')'
    }
  }

  /**
   * Get display field alias to display in the csv
   * @param ds current layer dataSource id
   * @returns display field alias if available or the fieldName
   */
  getDisplayFieldAlias = (layerDsId: string, configuredDisplayField: string): string => {
    const ds = DataSourceManager.getInstance().getDataSource(layerDsId)
    const fields = ds?.getSchema()?.fields
    const displayField = fields?.[configuredDisplayField]?.alias || configuredDisplayField
    return displayField
  }

  createPointSeriesForIntersectingLines = (ctx, configuredAssetSetting, seriesName, featureIndex, pathIndex) => {
    const { chart } = ctx
    //create xy series to show disconnected points
    //we will add the disconnected point with the key <layerId>+'y-point'
    const pointSeries = chart.series.push(new XYSeries())
    pointSeries.dataFields.valueY = configuredAssetSetting.layerId + 'y-point' + '_' + featureIndex + '_' + pathIndex
    pointSeries.dataFields.valueX = 'x'
    pointSeries.name = seriesName
    pointSeries.stroke = color(configuredAssetSetting.style.intersectingAssetColor)
    //hide point series from legend
    pointSeries.hiddenInLegend = true
    const bullet = pointSeries.bullets.push(new Bullet())
    bullet.stroke = color(configuredAssetSetting.style.intersectingAssetColor)
    bullet.fill = color(configuredAssetSetting.style.intersectingAssetColor)
    //for line we will not be showing any bullets
    //for representing the disconnected points we will use the square bullet and it will be of same size of the line
    const square = bullet.createChild(Rectangle)
    square.width = configuredAssetSetting.style.intersectingAssetSize ? configuredAssetSetting.style.intersectingAssetSize : defaultIntersectingAssetSize
    square.height = configuredAssetSetting.style.intersectingAssetSize ? configuredAssetSetting.style.intersectingAssetSize : defaultIntersectingAssetSize
    square.horizontalCenter = 'middle'
    square.verticalCenter = 'middle'
    return pointSeries
  }

  createSeriesForIntersectingLines = (ctx, configuredAssetSetting, seriesName, featureIndex, pathIndex) => {
    const { chart } = ctx
    //Create new line series
    const lineSeries = chart.series.push(new LineSeries())
    lineSeries.dataFields.valueY = configuredAssetSetting.layerId + 'y_I' + '_' + featureIndex + '_' + pathIndex
    lineSeries.dataFields.valueX = 'x'
    lineSeries.name = seriesName
    lineSeries.stroke = color(configuredAssetSetting.style.intersectingAssetColor)
    lineSeries.strokeWidth = configuredAssetSetting.style.intersectingAssetSize ? configuredAssetSetting.style.intersectingAssetSize : 4
    if (configuredAssetSetting.style.intersectingAssetShape === 'dotted-line') {
      lineSeries.strokeDasharray = '2 , 4'
    } else if (configuredAssetSetting.style.intersectingAssetShape === 'dashed-line') {
      lineSeries.strokeDasharray = '8 , 4'
    }
    //create xy series to show disconnected points
    //we will add the disconnected point with the key <layerId>+'y-point'
    const pointSeries = this.createPointSeriesForIntersectingLines(ctx, configuredAssetSetting, seriesName, featureIndex, pathIndex)
    //control the visibility of pointSeries with the line series only
    lineSeries.events.on('hidden', function () {
      pointSeries.hide()
      lineSeries.hide()
    })
    lineSeries.events.on('shown', function () {
      pointSeries.show()
      lineSeries.show()
    })
    return lineSeries
  }

  addIntersectingLineSeries = (layerIntersectionInfo: LayerIntersectionInfo, ctx) => {
    //For Line we need create 2 series
    //1. LineSeries - to show the connected lines.
    //2. PointSeries - to show the disconnected points on using bullets
    //   if we use the line series to show disconnected points then we will see the line connected between two consecutive points
    //   to avoid this we will show points using xySeries
    //In legend we will only show line series as it show the configured bullets, and control the visibility of points with the line series
    const seriesName = layerIntersectionInfo?.title
    const configuredAssetSetting = layerIntersectionInfo?.settings
    const allSeriesPerLayer = []
    if (configuredAssetSetting && seriesName) {
      layerIntersectionInfo?.intersectionResult.forEach((eachIntersectingFeatureResult, featureIndex) => {
        eachIntersectingFeatureResult.connectedFeatureForProfiling.forEach((connectedFeature: any) => {
          connectedFeature.paths.forEach((eachPath, pathIndex) => {
            const lineSeries = this.createSeriesForIntersectingLines(ctx, configuredAssetSetting, seriesName, featureIndex, pathIndex)
            if (allSeriesPerLayer.length > 0) {
              lineSeries.hiddenInLegend = true
            }
            allSeriesPerLayer.push(lineSeries)
          })
        })
        eachIntersectingFeatureResult.disconnectedFeatureForProfiling.forEach((disconnectedFeatureGeometry, pointIndex) => {
          const pointSeries = this.createSeriesForIntersectingLines(ctx, configuredAssetSetting, seriesName, featureIndex, pointIndex + '_d')
          if (allSeriesPerLayer.length > 0) {
            pointSeries.hiddenInLegend = true
          }
          allSeriesPerLayer.push(pointSeries)
        })
      })
      this.intersectingLayersExportingInfo[configuredAssetSetting.layerId] = {
        xCoordinate: 'X',
        yCoordinate: 'Y',
        x: this.nls('distanceLabel') + ' (' + this.props.selectedLinearUnit + ')',
        intersectingLayerY: this.nls('elevationLabel') + ' (' + this.props.selectedElevationUnit + ')',
        layerName: seriesName,
        intersectingLayerDisplayField: this.getDisplayFieldAlias(configuredAssetSetting.layerId, configuredAssetSetting.displayField)
      }
      allSeriesPerLayer[0].events.on('shown', function () {
        allSeriesPerLayer.forEach((eachFeatureSeries) => {
          eachFeatureSeries.show()
        })
      })
      allSeriesPerLayer[0].events.on('hidden', function () {
        allSeriesPerLayer.forEach((eachFeatureSeries) => {
          eachFeatureSeries.hide()
        })
      })
    }
  }

  addPointSeries = (layerIntersectionInfo: LayerIntersectionInfo, ctx) => {
    //For points we will create 2 series
    //1. PointSeries - to show the points.
    //   If elevation value is to be derived from two field create Column series to show DumbbellPlot
    //   else create xy series
    //2. LineSeries - showing bullets in legends
    //In legend we will only show line series as it show the configured bullets
    const pointSeriesName = layerIntersectionInfo?.title
    const configuredAssetSetting = layerIntersectionInfo?.settings
    const allPointSeriesPerFeature = []
    if (configuredAssetSetting && pointSeriesName) {
      const { chart } = ctx
      //as we could have multiple features at same x, we need to create individual series for each intersecting feature
      for (let featureIndex = 0; featureIndex < layerIntersectionInfo.intersectionResult.length; featureIndex++) {
        let pointSeries
        //If elevation value is to be derived from two field create Column series to show DumbbellPlot
        if (configuredAssetSetting.elevationSettings.type === 'two') {
          pointSeries = chart.series.push(new ColumnSeries())
          pointSeries.name = pointSeriesName
          pointSeries.dataFields.valueX = 'x'
          pointSeries.dataFields.openValueY = configuredAssetSetting.layerId + featureIndex + 'y'
          pointSeries.dataFields.valueY = configuredAssetSetting.layerId + featureIndex + 'y2'
          pointSeries.sequencedInterpolation = true
          pointSeries.fill = color(configuredAssetSetting.style.intersectingAssetColor)
          pointSeries.stroke = color(configuredAssetSetting.style.intersectingAssetColor)
          pointSeries.columns.template.width = 1
          //create bullets for dumbbell plot
          //create opening bullet
          const openBullet = this.createBulletsForDumbbellPlotSeries(ctx, pointSeries, configuredAssetSetting)
          openBullet.locationY = 1
          //create the bullet in middle with the configured marker settings
          const middleBullet = this.createBulletsForPointSeries(ctx, pointSeries, configuredAssetSetting)
          middleBullet.locationY = 1 / 2
          //create closing bullet
          this.createBulletsForDumbbellPlotSeries(ctx, pointSeries, configuredAssetSetting)
        } else {
          //Create new line series to show the points
          //in order to see the configured bullet style in legend we need to use Line series
          pointSeries = chart.series.push(new XYSeries())
          pointSeries.dataFields.valueY = configuredAssetSetting.layerId + featureIndex + 'y'
          pointSeries.dataFields.valueX = 'x'
          pointSeries.stroke = color(configuredAssetSetting.style.intersectingAssetColor)
          pointSeries.name = pointSeriesName
          //create bullets for points
          this.createBulletsForPointSeries(ctx, pointSeries, configuredAssetSetting)
        }
        //hide the point series from legend as we will be using line series in legend to show the configured marker and use that series to show/hide the point series
        pointSeries.hiddenInLegend = true
        allPointSeriesPerFeature.push(pointSeries)
      }

      //Create new line series
      const lineSeries = chart.series.push(new LineSeries())
      //add point in the y and we will not add any data in the key, this will be only for legend
      lineSeries.dataFields.valueY = configuredAssetSetting.layerId + 'y-linePoint'
      lineSeries.dataFields.valueX = 'x'
      lineSeries.name = pointSeriesName
      //as we are using lines set connect to false so that the points will not be shown as connected
      lineSeries.connect = false
      lineSeries.strokeWidth = 1
      //set the stroke opacity so that the horizontal line is not shown in the legend on the bullet marker
      lineSeries.strokeOpacity = 0
      lineSeries.stroke = color(configuredAssetSetting.style.intersectingAssetColor)
      //create bullets for line so that it is shown in legends
      this.createBulletsForPointSeries(ctx, lineSeries, configuredAssetSetting, true)
      lineSeries.events.on('hidden', function () {
        allPointSeriesPerFeature.forEach((eachFeaturesPointSeries) => {
          eachFeaturesPointSeries.hide()
        })
        lineSeries.hide()
      })
      lineSeries.events.on('shown', function () {
        allPointSeriesPerFeature.forEach((eachFeaturesPointSeries) => {
          eachFeaturesPointSeries.show()
        })
        lineSeries.show()
      })
      const configuredDisplayField = this.getDisplayFieldAlias(configuredAssetSetting.layerId, configuredAssetSetting.displayField)
      //create exporting info for the layer
      if (configuredAssetSetting.elevationSettings.type === 'two') {
        this.intersectingLayersExportingInfo[configuredAssetSetting.layerId] = {
          xCoordinate: 'X',
          yCoordinate: 'Y',
          x: this.nls('distanceLabel') + ' (' + this.props.selectedLinearUnit + ')',
          intersectingLayerY: this.nls('oneFieldLabelForExport') + ' ' + this.nls('elevationLabel') + ' (' + this.props.selectedElevationUnit + ')',
          intersectingLayerY2: this.nls('twoFieldLabelForExport') + ' ' + this.nls('elevationLabel') + ' (' + this.props.selectedElevationUnit + ')',
          layerName: pointSeriesName,
          intersectingLayerDisplayField: configuredDisplayField
        }
      } else {
        this.intersectingLayersExportingInfo[configuredAssetSetting.layerId] = {
          xCoordinate: 'X',
          yCoordinate: 'Y',
          x: this.nls('distanceLabel') + ' (' + this.props.selectedLinearUnit + ')',
          intersectingLayerY: this.nls('elevationLabel') + ' (' + this.props.selectedElevationUnit + ')',
          layerName: pointSeriesName,
          intersectingLayerDisplayField: configuredDisplayField
        }
      }
    }
  }

  createBulletsForPointSeries = (ctx, series, configuredAssetSetting, restrictLegendSize?) => {
    //Show the bullets as per configured styles
    const bullet = series.bullets.push(new Bullet())
    let intersectAssetSize = configuredAssetSetting.style.intersectingAssetSize ? configuredAssetSetting.style.intersectingAssetSize : defaultIntersectingAssetSize
    if (restrictLegendSize && intersectAssetSize > 10) {
      intersectAssetSize = 10
    }
    bullet.stroke = color(configuredAssetSetting.style.intersectingAssetColor)
    bullet.fill = color(configuredAssetSetting.style.intersectingAssetColor)
    //on bullet hover, scale the bullet
    bullet.states.create('hover').properties.scale = 1.3
    switch (configuredAssetSetting.style.intersectingAssetShape) {
      case 'rectangle':
        const rectangle = bullet.createChild(Rectangle)
        rectangle.width = intersectAssetSize
        rectangle.height = (intersectAssetSize) / 2
        rectangle.horizontalCenter = 'middle'
        rectangle.verticalCenter = 'middle'
        break
      case 'square':
        const square = bullet.createChild(Rectangle)
        square.width = intersectAssetSize
        square.height = intersectAssetSize
        square.horizontalCenter = 'middle'
        square.verticalCenter = 'middle'
        break
      case 'triangle':
        const triangle = bullet.createChild(Triangle)
        triangle.width = intersectAssetSize
        triangle.height = intersectAssetSize
        triangle.horizontalCenter = 'middle'
        triangle.verticalCenter = 'middle'
        break
      case 'circle':
      default:
        const circle = bullet.createChild(Circle)
        circle.radius = intersectAssetSize
    }
    return bullet
  }

  createBulletsForDumbbellPlotSeries = (ctx, series, configuredAssetSetting) => {
    //Show the bullets as per configured styles
    const bullet = series.bullets.push(new Bullet())
    bullet.stroke = color(configuredAssetSetting.style.intersectingAssetColor)
    bullet.fill = color(configuredAssetSetting.style.intersectingAssetColor)
    const rectangle = bullet.createChild(Rectangle)
    const width = configuredAssetSetting.style.intersectingAssetSize ? configuredAssetSetting.style.intersectingAssetSize : defaultIntersectingAssetSize
    rectangle.width = configuredAssetSetting.style.intersectingAssetShape === 'circle' ? width * 2 : width + 2
    rectangle.height = 1
    rectangle.horizontalCenter = 'middle'
    rectangle.verticalCenter = 'middle'
    return bullet
  }

  displayChartLegend = (ctx) => {
    const { chart, isRTL } = ctx
    chart.legend = new Legend()
    chart.legend.itemContainers.template.paddingTop = 0
    chart.legend.itemContainers.template.marginBottom = 0
    chart.legend.itemContainers.template.paddingBottom = 0
    chart.legend.position = 'bottom'
    chart.legend.contentAlign = isRTL ? 'right' : 'left'
    chart.legend.reverseOrder = isRTL
    chart.legend.itemContainers.template.reverseOrder = isRTL
    const markerTemplate = chart.legend.markers.template
    markerTemplate.width = 15
    markerTemplate.height = 15

    //legend on off
    chart.legend.itemContainers.template.events.on('hit', (ev) => {
      this.props.toggleLegendSeriesState(ev.target.dataItem.dataContext.isHidden, ev.target.dataItem.dataContext.name)
    })
  }

  makeFormatter = (axes, abbreviation) => {
    const formatter = axes.numberFormatter.clone()
    formatter.format = (value: number | string, _format: unknown, precision: number = 2): string => {
      if (typeof value === 'string') {
        return ''
      }
      // Set only a maximum fraction digits and not a minimum because we
      // don't need to display the full precision for the axis labels.
      const formatted = intl.formatNumber(value, { maximumFractionDigits: precision })
      return `${formatted} ${abbreviation}`
    }
    return formatter
  }

  render () {
    return (<React.Fragment>
      {this.state && this.state.chartDefinition &&
        <div tabIndex={-1} className={'w-100 h-100 p-2'}>
          <div tabIndex={0} aria-label={this.nls('chartRender')} className={'w-100 h-100'} ref={this._chartContainer}></div>
        </div>
      }
    </React.Fragment>
    )
  }
}
