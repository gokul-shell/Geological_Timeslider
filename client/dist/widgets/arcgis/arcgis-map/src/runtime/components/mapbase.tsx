/** @jsx jsx */
import {
  React, DataSourceManager, ExtentChangeMessage, DataSourceComponent, portalUrlUtils, type SqlQueryParams, type DataSourceJson,
  getAppStore, MutableStoreManager, type ImmutableObject, dataSourceUtils, type FeatureLayerDataSource, type UseDataSource,
  type ImmutableArray, type JSAPILayerMixin, css, jsx
} from 'jimu-core'
import { type IMConfig, SceneQualityMode } from '../../config'
import { type MapDataSource, DataSourceTypes, loadArcGISJSAPIModules, MapViewManager, type JimuMapView, zoomToUtils, type DefaultMapInfo } from 'jimu-arcgis'
import { type InitialMapState } from 'jimu-ui/advanced/map'
import { defaultMessages, Icon } from 'jimu-ui'
import {
  createNewFeaturelayer, updateFeaturelayer, getMapBaseRestoreData, restoreMapBase, selectFeature,
  mapPanto, flashFeaturesByQuery, projectGeometries, filterFeaturesByQuery, processZoomToFeatures,
  getLayersFromDataSourceIds, getJimuMapViewId, isNeedProjectViewpoint, projectViewpoint, isNeedProjectSpatialReference,
  isTwoWidgetsMutuallyExtentChange, isSamelikeViewpoints, getViewpointInstanceFromHistory
} from '../utils'
import { MultiSourceMapContext } from './multisourcemap-context'
import { type MapWidgetProps, type ActionRelatedProps } from '../widget'
import type { ActiveToolInfo } from '../layout/layout'

const Exchange = require('../assets/icons/exchange.svg')

interface Props {
  isMapInVisibleArea: boolean
  widthBreakpoint: string
  isDefaultMap?: boolean
  baseWidgetProps: MapWidgetProps
  startLoadModules: boolean
  dataSourceId: string
  defaultMapInfo?: DefaultMapInfo
  multiSourceMapDom: HTMLDivElement
  onMutableStatePropsChanged?: (dataSourceId: string, propKey: string, value?: any) => void

  onExtentChanged?: (dataSourceId: string, message: ExtentChangeMessage) => void
  onMapLoaded?: (dataSourceId: string, mapLoadStatus: MapLoadStatus) => void
  onJimuMapViewCreated: (jimuMapView: JimuMapView) => void
  children?: React.ReactNode
  // onShowOnMapDataChanged?: (showOnMapDatasKey: string[]) => void
  onActiveToolInfoChange: (activeToolInfo: ActiveToolInfo) => void
}

const DEFAULT_HIGHLIGHT_COLOR = '#00FFFF'
const DEFAULT_HIGHLIGHT_HALO_COLOR = '#00FFFF'

export enum MapLoadStatus {
  Loading = 'LOADING',
  Loadok = 'LOADOK',
  LoadError = 'LOADERROR'
}

export interface HighLightHandle {
  layerId: string
  handle: __esri.Handle
}

export interface State {
  dataSourceId: string
  isBasicModulesLoaded: boolean // true means common modules loaded, not means all need modules loaded
  mapLoadStatus: MapLoadStatus
}

export type MapbaseView = (__esri.MapView | __esri.SceneView) & {
  mapbase: MapBase
  dataSourceInfo: MapbaseDataSourceInfo
  isInCaching: boolean
  watchInteractingHandle: __esri.WatchHandle
  extentWatchHandle: __esri.WatchHandle
  fatalErrorWatchHandle: __esri.WatchHandle
  highLightHandles: { [layerId: string]: __esri.Handle }
  mapBaseViewEventHandles: { [eventName: string]: __esri.Handle }
  stationaryTimerId: NodeJS.Timeout
  // Use extentChangeRelatedWidgetIds to avoid two map widget two-way extent sync
  extentChangeRelatedWidgetIds: string[]
  firstPublishExtentChangeTime: number
  // viewpointHistory used to store all static viewpoints, used for ExtentNavigation
  viewpointHistory: __esri.Viewpoint[]
  viewpointIndex: number
  stationaryCallback?: () => void
  lastZoomToExtentTime: number
  /**
   * message workflow: receive message (time1) -> maybe async -> update view (time2), time1 and time2 maybe different
   * receiveMessageTimeOfLastViewUpdate is time1 of last update view
   */
  receiveMessageTimeOfLastViewUpdate: number
  isMapToolsHidden: boolean
  publishExtentChangeMessage: (stationary: boolean, interacive: boolean) => void
  hideMapTools: () => void
  showMapTools: () => void
}

/**
 * Consider this case:
 * We are creating mapView1 for dataSource1, the creation process is async and we get the promise1.
 * During the creation process, the props.dataSourceId changed, then promise1 is resolved.
 * We should not execute the callback logic of promise1.then(callback) because the latest expected mapView is mapView2, not mapView1.
 * So we need a way to identify if we should execute callback in every promise.then(callback). We can use MapbaseDataSourceInfo to solve it.
 *
 * MapbaseDataSourceInfo is used to create map view or scene view. Each MapbaseDataSourceInfo has a unique id, the uniqueId is calculated by data source type, data sourceId and itemId.
 * When we need to create mapView1, we need to update this.expectedDataSourceInfo. this.expectedDataSourceInfo always bind to this.props.dataSourceId.
 * We pass this.expectedDataSourceInfo as formal parameter to map creation related functions when we create a mapView.
 * And in the map creation promise.then(callback), we check the dataSourceInfo.uniqueId is changed or not. If changed, we stop the callback logic. If not changed, go head.
 *
 * All data source cases:
 * 1. use default webmap
 * 2. user select a webmap data source
 * 3. user select a webscene data source
 */
export interface MapbaseDataSourceInfo {
  // true for data source case1, false for data source case2 and case3
  isDefaultMap: boolean

  // true for data source case1 and case2, false for data source case3
  isWebMap: boolean

  // format is <webmap or webscene>-dataSourceId-itemId
  // examples:
  // use default webmap: 'webmap-default'
  // user select a webmap data source: 'webmap-dataSource_1-2c8d9a772aa04e5985ac3030dbecb232'
  // user select a webscene data source: 'webscene-dataSource_1-2c8d9a772aa04e5985ac3030dbecb232'
  uniqueId: string

  // null for data source case1, not null for data source case2 and case3
  dataSourceId: string

  jimuMapViewId: string

  dataSourceJson: ImmutableObject<DataSourceJson>
}

/**
 * mapbase.mapCreatingInfo is not null during the async map(MapView/JimuMapView) creation period.
 * When map created, mapbase.mapCreatingInfo is set to null.
 */
export interface MapCreatingInfo {
  dataSourceInfo: MapbaseDataSourceInfo
}

export interface MapbaseRestoreData {
  mapContainer: HTMLDivElement
  state: State

  Geometry: typeof __esri.Geometry
  InitialViewProperties: typeof __esri.InitialViewProperties
  TileLayer: typeof __esri.TileLayer
  Basemap: typeof __esri.Basemap
  MapView: typeof __esri.MapView
  SceneView: typeof __esri.SceneView
  Extent: typeof __esri.geometry.Extent
  Viewpoint: typeof __esri.Viewpoint
  PortalItem: typeof __esri.PortalItem
  Portal: typeof __esri.Portal
  WebMap: typeof __esri.WebMap
  WebScene: typeof __esri.WebScene
  Color: typeof __esri.Color

  expectedDataSourceInfo: MapbaseDataSourceInfo
  mapCreatingInfo: MapCreatingInfo
  view: MapbaseView
  lastUpdateViewConfig: IMConfig
  mapDs: MapDataSource

  dsManager: DataSourceManager
  isFirstReceiveMessage: boolean
}

export default class MapBase extends React.PureComponent<Props, State> {
  mapContainer: HTMLDivElement
  widgetContainer: HTMLDivElement

  Geometry: typeof __esri.Geometry
  InitialViewProperties: typeof __esri.InitialViewProperties
  TileLayer: typeof __esri.TileLayer
  Basemap: typeof __esri.Basemap
  MapView: typeof __esri.MapView
  SceneView: typeof __esri.SceneView
  Extent: typeof __esri.geometry.Extent
  Viewpoint: typeof __esri.Viewpoint
  PortalItem: typeof __esri.PortalItem
  Portal: typeof __esri.Portal
  WebMap: typeof __esri.WebMap
  WebScene: typeof __esri.WebScene
  Color: typeof __esri.Color

  expectedDataSourceInfo: MapbaseDataSourceInfo
  mapCreatingInfo: MapCreatingInfo // mapCreatingInfo and view are mutually-exclusive
  view: MapbaseView
  lastUpdateViewConfig: IMConfig
  mapDs: MapDataSource

  dsManager = DataSourceManager.getInstance()
  isFirstReceiveMessage = true

  __unmount = false
  // true means mapbase.view is restored from MutableStore
  restored: boolean

  // last user interactive view
  static lastInteraciveView: MapbaseView

  constructor (props) {
    super(props)

    this.restored = false

    this.updateExpectedDataSourceInfo()

    const restoreData = this.getRestoreDataFromMS()

    if (restoreData && restoreData.expectedDataSourceInfo.uniqueId === this.expectedDataSourceInfo.uniqueId) {
      restoreMapBase(this, restoreData)
      this.updateRestoreDataToMS(null)
      this.bindMapBaseViewEvent(this.view)

      if (this.view) {
        this.view.isInCaching = false
        this.view.mapbase = this
        this.restored = true
        this.tryFatalErrorRecovery(this.view)

        if (this.view.isMapToolsHidden) {
          this.view.hideMapTools()
        } else {
          this.view.showMapTools()
        }
      }
    } else {
      this.state = {
        dataSourceId: null,
        isBasicModulesLoaded: false,
        mapLoadStatus: MapLoadStatus.Loading
      }
    }
  }

  static getDerivedStateFromProps (nextProps: Props, prevState: State) {
    if (nextProps.dataSourceId !== prevState.dataSourceId) {
      return {
        dataSourceId: nextProps.dataSourceId,
        mapLoadStatus: MapLoadStatus.Loading
      }
    } else {
      return null
    }
  }

  getStyle () {
    return css`
      .esri-view .esri-view-surface:focus::after {
        display: none;
      }
    `
  }

  render () {
    let useDataSource = null

    if (this.props.baseWidgetProps.useDataSources) {
      useDataSource = this.props.baseWidgetProps.useDataSources.find((item) => item.dataSourceId === this.props.dataSourceId)
    }

    return (
      <div className='w-100 h-100 map-base' style={{ position: 'relative' }} css={this.getStyle()} ref={ref => { this.widgetContainer = ref }}>
        {(this.state.mapLoadStatus === MapLoadStatus.Loading) &&
          <div className='w-100 h-100 widget-map-background'>
            <div style={{ position: 'absolute', left: '50%', top: '50%' }} className='jimu-secondary-loading' />
          </div>}
        {(this.state.mapLoadStatus === MapLoadStatus.LoadError) &&
          <div className='w-100 h-100 widget-map-background'>
            {this.getMapSwitchForErrorMap()}
            <div className='w-100 h-100 d-flex justify-content-center align-items-center'>{this.formatMessage('mapFailure')}</div>
          </div>}
        {!this.props.isDefaultMap && <div style={{ position: 'absolute', display: 'none' }}><DataSourceComponent
          useDataSource={useDataSource}
          onDataSourceCreated={this.onDataSourceCreated} onCreateDataSourceFailed={this.onCreateDataSourceFailed}
        />
        </div>}
      </div>
    )
  }

  componentDidMount () {
    this.__unmount = false

    if (this.widgetContainer.getElementsByClassName('widget-map').length === 0) {
      if (!this.mapContainer) {
        this.mapContainer = document && document.createElement('div')
        this.mapContainer.className = 'w-100 h-100 widget-map mapview-container'
      }

      this.widgetContainer.appendChild(this.mapContainer)
    }

    if (this.props.startLoadModules) {
      this.loadCommonModules()
    }

    if (this.restored) {
      const jimuMapView = this.getJimuMapViewFoView(this.view)

      if (jimuMapView && !jimuMapView.isCached()) {
        jimuMapView.onRestore()
      }
    }
  }

  componentDidUpdate (prevProps: Props) {
    // update the this.expectedDataSourceInfo by the current props
    this.updateExpectedDataSourceInfo()

    if (!this.state.isBasicModulesLoaded) {
      return
    }

    // TODO: should we check isMapInVisibleArea before this.checkAndHandleIfDataSourceIdPropChange() ?
    // props.isMapInVisibleArea changed
    if (this.view && prevProps.isMapInVisibleArea !== this.props.isMapInVisibleArea && (this.props.baseWidgetProps.useDataSources && this.props.baseWidgetProps.useDataSources.length === 2)) {
      if (this.props.isMapInVisibleArea) {
        this.view.isInCaching = false
        this.tryFatalErrorRecovery(this.view)
      } else {
        this.view.isInCaching = true
      }
    }

    // the following code is mainly used to check and handle if dataSourceId prop change
    let needCreateNewView = false

    if (this.view) {
      // this.view created, now need to check if this.view match this.props.dataSourceId or not
      if (this.isViewExpected(this.view)) {
        // data source match this.props.dataSourceId, do nothing
        needCreateNewView = false
        // this.view is the expected view
        // We call this.tryUpdateCurrentViewByConfigProps() to consume this.props.baseWidgetProps.config change
        this.tryUpdateCurrentViewByConfigProps(false)
        // We call this.checkAndHandleMutableStateProps() to consume this.props.baseWidgetProps.mutableStateProps change
        this.checkAndHandleMutableStateProps()
        return
      } else {
        // data source changed, we need to destroy this.view
        needCreateNewView = true
      }
    } else {
      // this.view not created, we need to check if we are creating the expected view
      if (this.isCreatingExpectedView()) {
        // We are creating the expected view, do nothing
        needCreateNewView = false
        return
      } else {
        // need to create new view
        needCreateNewView = true
      }
    }

    if (needCreateNewView) {
      this.destroyCurrentMapbaseView()
      this.cacheLoadModulesAndCreateMapbaseView(this.expectedDataSourceInfo)
    }
  }

  componentWillUnmount () {
    this.__unmount = true

    if (this.view) {
      this.view.mapbase = null
    }

    const widgets = getAppStore().getState().appConfig.widgets

    if (widgets[this.props.baseWidgetProps.id] && widgets[this.props.baseWidgetProps.id].useDataSources === this.props.baseWidgetProps.useDataSources &&
      this.state.mapLoadStatus !== MapLoadStatus.Loading) {
      // JS API limits only 16 canvas with WebGL context on a html page. Caching the map widget (unmount the canvas from the html tree but don't destroy the view) is a workround.
      // We scroll the page and the map widget is not in the visible area, we need to cache it so we can restore it quickly.
      // We don't destroy the map view here, just cache it to mutable store.
      const restoreData = getMapBaseRestoreData(this)

      if (this.view) {
        this.view.isInCaching = true
      }

      this.updateRestoreDataToMS(restoreData)

      if (this.view) {
        const jimuMapView = this.getJimuMapViewFoView(this.view)

        if (jimuMapView) {
          jimuMapView.onCache()
        }
      }
    } else {
      // Destroy the map view
      this.destroyCurrentMapbaseView()
      this.mapCreatingInfo = null

      if (this.view && !this.view.destroyed) {
        this.view.container = null
        this.view = null
      }

      this.mapDs = null
    }
  }

  createDataSourceInfo (dataSourceId: string): MapbaseDataSourceInfo {
    let result: MapbaseDataSourceInfo = null

    const dataSourceJson = this.getDsJsonFromDsId(dataSourceId)

    if (dataSourceJson && dataSourceJson.id) {
      // data source case2 or data source case3
      const type = dataSourceJson.type || ''
      const itemId = dataSourceJson.itemId || ''
      const dataSourceId = dataSourceJson.id
      const jimuMapViewId = this.getJimuMapViewId(dataSourceId)

      if (type === DataSourceTypes.WebScene) {
        // user select a web scene
        result = {
          isDefaultMap: false,
          isWebMap: false,
          uniqueId: `webscene-${dataSourceId}-${itemId}`,
          dataSourceId,
          jimuMapViewId,
          dataSourceJson
        }
      } else {
        // user select a web map
        result = {
          isDefaultMap: false,
          isWebMap: true,
          uniqueId: `webmap-${dataSourceId}-${itemId}`,
          dataSourceId,
          jimuMapViewId,
          dataSourceJson
        }
      }
    } else {
      // data source case1: use default web map
      const dataSourceId = ''
      // TODO: could we use this.getJimuMapViewId('defaultmap') here ?
      const jimuMapViewId = this.getJimuMapViewId(dataSourceId)
      result = {
        isDefaultMap: true,
        isWebMap: true,
        uniqueId: 'webmap-default',
        dataSourceId,
        jimuMapViewId,
        dataSourceJson
      }
    }

    return result
  }

  getJimuMapViewId (dataSourceId: string): string {
    return getJimuMapViewId(this.props.baseWidgetProps.id, dataSourceId)
  }

  getDsJsonFromDsId (dataSourceId: string): ImmutableObject<DataSourceJson> {
    let result: ImmutableObject<DataSourceJson> = null

    if (dataSourceId) {
      result = getAppStore().getState().appConfig.dataSources[dataSourceId]
    }

    if (!result) {
      result = {} as ImmutableObject<DataSourceJson>
    }

    return result
  }

  getCurrentDataSourceJson (): ImmutableObject<DataSourceJson> {
    // when select a web map or web scene in builder, this.props.dataSourceId is not null, the result is like this
    // {
    //   id: "dataSource_5",
    //   type: "WEB_MAP",
    //   sourceLabel: "China Version 1_2",
    //   itemId: "a2c5449c4c624447bf45d48478b25838",
    //   portalUrl: "https://esridevbeijing.maps.arcgis.com",
    // }

    // when use the default web map in builder, this.props.dataSourceId is null, the result is empty object {}
    return this.getDsJsonFromDsId(this.props.dataSourceId)
  }

  updateExpectedDataSourceInfo () {
    this.expectedDataSourceInfo = this.createDataSourceInfo(this.props.dataSourceId)
  }

  isCurrentViewExpected (): boolean {
    return this.isViewExpected(this.view)
  }

  isViewExpected (view: MapbaseView): boolean {
    return view && view.dataSourceInfo.uniqueId === this.expectedDataSourceInfo.uniqueId
  }

  isCreatingExpectedView (): boolean {
    return this.mapCreatingInfo && this.isDataSourceInfoExpected(this.mapCreatingInfo.dataSourceInfo)
  }

  isDataSourceInfoExpected (dataSourceInfo: MapbaseDataSourceInfo): boolean {
    return dataSourceInfo && dataSourceInfo.uniqueId === this.expectedDataSourceInfo.uniqueId
  }

  /**
   * Consume this.props.baseWidgetProps.config change
   * @param calledWhenViewCreate true means this method is called when view just created, false means this method is called when config props change
   */
  tryUpdateCurrentViewByConfigProps (calledWhenViewCreate: boolean): void {
    if (!this.view) {
      return
    }

    const config: IMConfig = this.props.baseWidgetProps.config
    const preConfig: IMConfig = this.lastUpdateViewConfig
    this.lastUpdateViewConfig = config

    // update popup options
    const currPopupEnabled = !config.disablePopUp

    if (calledWhenViewCreate) {
      // calledWhenViewCreate is true, means tryUpdateCurrentViewByConfigProps is called when view just created, we just set view.popupEnabled to !config.disablePopUp.
      this.view.popupEnabled = currPopupEnabled
    } else {
      // calledWhenViewCreate is false, means tryUpdateCurrentViewByConfigProps is called when config props change, we need to handle config.disablePopUp change.

      const prePopupEnabled = !preConfig?.disablePopUp
      const popupEnabled = !config.disablePopUp

      // Both Map widget 'disablePopUp' option and JimuMapView.enableClickOpenPopup() can control 'view.popupEnabled'.
      // We should not use `this.view.popupEnabled !== currPopupEnabled` here because we only want to check if Map widget 'disablePopUp' option changed,
      // so we should use `prePopupEnabled !== currPopupEnabled` here.
      if (prePopupEnabled !== popupEnabled) {
        // config.disablePopUp really changed
        this.view.popupEnabled = popupEnabled

        if (!popupEnabled) {
          this.view.closePopup()
        }
      }
    }

    if ((config.selectionHighlightColor !== preConfig?.selectionHighlightColor) || (config.selectionHighlightHaloColor !== preConfig?.selectionHighlightHaloColor)) {
      // highlight info changes
      const highlightColor = config.selectionHighlightColor || DEFAULT_HIGHLIGHT_COLOR
      const highlightHaloColor = config.selectionHighlightHaloColor || DEFAULT_HIGHLIGHT_HALO_COLOR
      const highlightOptions = {
        ...this.view.highlightOptions,
        color: new this.Color(highlightColor),
        haloColor: new this.Color(highlightHaloColor)
      }
      this.view.highlightOptions = highlightOptions
    }

    const enableScroll = !config.disableScroll

    // this.view.navigation is empty sometimes, so we need to check it here.
    if (this.view.navigation) {
      if (this.view.navigation.mouseWheelZoomEnabled !== enableScroll) {
        this.view.navigation.mouseWheelZoomEnabled = enableScroll
      }

      if (this.view.navigation.browserTouchPanEnabled !== enableScroll) {
        this.view.navigation.browserTouchPanEnabled = enableScroll
      }
    }

    if (this.view.ui) {
      this.view.ui.components = []
    }

    const sceneQualityMode = config.sceneQualityMode

    if (this.isSceneView(this.view)) {
      const sceneView = this.view as __esri.SceneView

      if (sceneQualityMode && sceneQualityMode !== sceneView.qualityProfile) {
        sceneView.qualityProfile = sceneQualityMode as 'low' | 'medium' | 'high'
      }
    }
  }

  /**
   * Consume this.props.baseWidgetProps.mutableStateProps change
   */
  checkAndHandleMutableStateProps () {
    if (this.view && this.props.baseWidgetProps.mutableStateProps) {
      const jimuMapViewId = this.view.dataSourceInfo.jimuMapViewId
      const jimuMapView = MapViewManager.getInstance().getJimuMapViewById(jimuMapViewId)

      if (jimuMapView) {
        jimuMapView.whenJimuMapViewLoaded().then(() => {
          setTimeout(() => {
            // We don't need to check this.view if null or destroyed here, we do it in this.handleAction()
            this.handleAction(this.props.baseWidgetProps.mutableStateProps, this.view, jimuMapView)
            this.isFirstReceiveMessage = false
          }, this.isFirstReceiveMessage ? 500 : 0)
        })
      }
    }
  }

  isMapView (view: MapbaseView): boolean {
    return view && view.declaredClass === 'esri.views.MapView'
  }

  isSceneView (view: MapbaseView): boolean {
    return view && view.declaredClass === 'esri.views.SceneView'
  }

  diffProps (prevProps: Props) {
    const addedKeys: string[] = []
    const removeKeys: string[] = []
    const updatedKeys: string[] = []

    const currKeys = Object.keys(this.props)
    const prevKeys = Object.keys(prevProps)

    const prevKeysMap: { [key: string]: boolean } = {}
    prevKeys.forEach(key => {
      prevKeysMap[key] = true
    })

    const currKeysMap: { [key: string]: boolean } = {}
    currKeys.forEach(key => {
      currKeysMap[key] = true
    })

    currKeys.forEach(currKey => {
      if (prevKeysMap[currKey]) {
        if (prevProps[currKey] !== this.props[currKey]) {
          updatedKeys.push(currKey)
        }
      } else {
        addedKeys.push(currKey)
      }
    })

    prevKeys.forEach(prevKey => {
      if (!currKeysMap[prevKey]) {
        removeKeys.push(prevKey)
      }
    })

    return {
      addedKeys,
      removeKeys,
      updatedKeys
    }
  }

  async loadCommonModules () {
    const modules = await loadArcGISJSAPIModules([
      'esri/geometry/Extent',
      'esri/Viewpoint',
      'esri/portal/Portal',
      'esri/portal/PortalItem',
      'esri/Color'
    ]);

    [
      this.Extent, this.Viewpoint, this.Portal, this.PortalItem, this.Color
    ] = modules

    if (this.__unmount) {
      return
    }

    this.setState({
      isBasicModulesLoaded: true
    })
  }

  async cacheLoadModulesAndCreateMapbaseView (dataSourceInfo: MapbaseDataSourceInfo): Promise<void> {
    if (this.__unmount || this.isCurrentViewExpected() || this.isCreatingExpectedView()) {
      return
    }

    this.setState({
      mapLoadStatus: MapLoadStatus.Loading
    })

    const mapCreatingInfo: MapCreatingInfo = {
      dataSourceInfo
    }

    this.mapCreatingInfo = mapCreatingInfo

    if (dataSourceInfo.isWebMap) {
      // load modules to create MapView
      if (!this.MapView) {
        const modules = await loadArcGISJSAPIModules([
          'esri/geometry/Geometry',
          'esri/webmap/InitialViewProperties',
          'esri/Basemap',
          'esri/layers/TileLayer',
          'esri/views/MapView',
          'esri/WebMap'
        ]);

        [
          this.Geometry, this.InitialViewProperties, this.Basemap, this.TileLayer, this.MapView, this.WebMap
        ] = modules
      }
    } else {
      // load modules for create SceneView
      if (!this.SceneView) {
        const modules = await loadArcGISJSAPIModules([
          'esri/views/SceneView',
          'esri/WebScene'
        ]);

        [
          this.SceneView, this.WebScene
        ] = modules
      }
    }

    if (this.__unmount || this.isCurrentViewExpected() || !this.isDataSourceInfoExpected(mapCreatingInfo.dataSourceInfo)) {
      return
    }

    await this.createMapbaseView(mapCreatingInfo)
  }

  async createMapbaseView (mapCreatingInfo: MapCreatingInfo): Promise<void> {
    const dataSourceInfo = mapCreatingInfo.dataSourceInfo

    if (this.__unmount || this.isCurrentViewExpected() || !this.isDataSourceInfoExpected(dataSourceInfo)) {
      return
    }

    // get mapViewOption or sceneViewOption
    let mapViewOption: __esri.MapViewProperties = null
    let sceneViewOption: __esri.SceneViewProperties = null

    if (dataSourceInfo.isWebMap) {
      // get map view option
      mapViewOption = await this.getMapViewOptionToCreateMapView(dataSourceInfo)
    } else {
      // get scene view option
      sceneViewOption = await this.getSceneViewOptionToCreateSceneView(dataSourceInfo)
    }

    // need to check view again to avoid new MapView() twice, because we use async function to get mapViewOption
    if (this.__unmount || this.isCurrentViewExpected() || !this.isDataSourceInfoExpected(dataSourceInfo)) {
      return
    }

    let view: MapbaseView = null

    // create map view or scene view
    if (dataSourceInfo.isWebMap) {
      view = new this.MapView(mapViewOption) as MapbaseView
    } else {
      view = new this.SceneView(sceneViewOption) as MapbaseView
    }

    const map = view.map as __esri.Map & { thumbnailUrl: string, originalBasemap: __esri.Basemap }

    // set view.map.originalBasemap
    const setOriginalBasemap = () => {
      if (map.originalBasemap) {
        return
      }

      const originalBasemap = map.basemap

      // originalBasemap maybe null, we need to check originalBasemap is null or not
      if (!originalBasemap) {
        return
      }

      if (!originalBasemap.thumbnailUrl) {
        const mapThumbnailUrl = map.thumbnailUrl

        // use map.thumbnailUrl as originalBasemap.thumbnailUrl if originalBasemap.thumbnailUrl is empty
        if (mapThumbnailUrl) {
          originalBasemap.thumbnailUrl = mapThumbnailUrl
        }
      }

      map.originalBasemap = originalBasemap
    }

    if (map.basemap) {
      setOriginalBasemap()
    } else {
      let watchBasemapHandle: __esri.Handle = null

      watchBasemapHandle = map.watch('basemap', () => {
        // only watch once
        if (watchBasemapHandle) {
          watchBasemapHandle.remove()
        }

        watchBasemapHandle = null

        if (map.basemap) {
          setOriginalBasemap()
        }
      })
    }

    view.mapbase = this
    view.highLightHandles = {}
    view.mapBaseViewEventHandles = {}
    view.extentChangeRelatedWidgetIds = []
    view.publishExtentChangeMessage = function (stationary: boolean, interacive: boolean) {
      try {
        if (view && !view.destroyed) {
          const mapbase = view.mapbase

          if (mapbase && !mapbase.__unmount && mapbase.props && mapbase.props.onExtentChanged) {
            mapbase.publishExtentChangeMessage(view, stationary, interacive)
          }
        }
      } catch (e) {
        console.error('view publish extent change message error', e)
      }
    }

    view.hideMapTools = function () {
      try {
        view.isMapToolsHidden = true

        if (view && !view.destroyed) {
          const mapbase = view.mapbase

          if (mapbase && !mapbase.__unmount && mapbase.props) {
            if (mapbase.props.onActiveToolInfoChange) {
              // set no active tool
              mapbase.props.onActiveToolInfoChange(null)
            }

            const multiSourceMapDom = mapbase.props.multiSourceMapDom

            if (multiSourceMapDom) {
              multiSourceMapDom.classList.add('hide-map-tools-layout')
            }
          }
        }
      } catch (e) {
        console.error('view hide map tools error', e)
      }
    }
    view.viewpointHistory = []
    view.viewpointIndex = -1

    view.showMapTools = function () {
      try {
        view.isMapToolsHidden = false

        if (view && !view.destroyed) {
          const mapbase = view.mapbase

          if (mapbase && !mapbase.__unmount && mapbase.props) {
            const multiSourceMapDom = mapbase.props.multiSourceMapDom

            if (multiSourceMapDom) {
              multiSourceMapDom.classList.remove('hide-map-tools-layout')
            }
          }
        }
      } catch (e) {
        console.error('view show map tools error', e)
      }
    }

    if (view.popup) {
      view.popup.spinnerEnabled = false
    }

    view.dataSourceInfo = dataSourceInfo

    if (this.view) {
      this.destroyCurrentMapbaseView()
      this.view = null
    }

    // update this.view
    this.view = view
    this.mapCreatingInfo = null

    if (this.isReadyToCreateJimuMapView()) {
      this.createJimuMapView()
    }

    // the following code are same for both map view and scene view

    view.when(() => {
      // view.when() is async, we need to check the view is expected or not
      // if the view is not expected again, we don't execute the following logic
      const isViewOk = !view.destroyed && this.view === view && this.isViewExpected(view)

      if (!isViewOk) {
        return
      }

      setTimeout(() => {
        if (!view.destroyed) {
          // make sure publish extent-change message at least once
          this.publishExtentChangeMessage(view, true)
        }
      }, 1000)

      view.watchInteractingHandle = view.watch('interacting', () => {
        if (view.interacting) {
          MapBase.lastInteraciveView = view
          // We must set view.extentChangeRelatedWidgetIds to empty array, becuase current view is the extent-change sourcer.
          this.setExtentChangeRelatedWidgetIdsForView(view, [])
        }
      })

      view.extentWatchHandle = view.watch('extent', (extent: __esri.Extent) => {
        if (!extent) {
          return
        }

        this.publishExtentChangeMessage(view, false)

        if (view.stationaryTimerId) {
          clearTimeout(view.stationaryTimerId)
          view.stationaryTimerId = null
        }

        // We don't use view.watch('stationary', cb) to check if view is static or not, because the behavior of view.stationary is strange.
        // Instead, we use a timeout to check if view is static or not.
        view.stationaryTimerId = setTimeout(() => {
          view.stationaryTimerId = null
          // view is static now

          // We need to publish extent-change message again when view is static.
          this.publishExtentChangeMessage(view, true)

          // Note, make sure we call setExtentChangeRelatedWidgetIdsForView() after publish extent-change message.
          this.setExtentChangeRelatedWidgetIdsForView(view, [])

          setTimeout(() => {
            if (view === MapBase.lastInteraciveView && !view.interacting) {
              MapBase.lastInteraciveView = null
            }
          }, 1000)
        }, 200)
      })

      if (!view.fatalErrorWatchHandle) {
        view.fatalErrorWatchHandle = view.watch('fatalError', (error) => {
          if (error) {
            // Don't use this.props.isMapInVisibleArea to check is map visible or not, because mapbase maybe unmounted and this.props.isMapInVisibleArea is still true.
            // It is more safe to
            const shouldRecovery = !view.isInCaching && view.container && view.container.clientWidth > 0 && view.container.clientHeight > 0
            const widgetId = this.props?.baseWidgetProps?.id || ''

            if (shouldRecovery) {
              console.error(`${widgetId} Fatal Error! View has lost its WebGL context. Attempting to recover it because the view is visible.`)
              this.tryFatalErrorRecovery(view)
            } else {
              console.error(`${widgetId} Fatal Error! View has lost its WebGL context. Don't recover it because the view is not visible.`)
            }
          }
        })
      }

      // after view is loaded, send extent change message
      this.setState({ mapLoadStatus: MapLoadStatus.Loadok }, () => {
        this.props.onMapLoaded(this.props.dataSourceId, MapLoadStatus.Loadok)
      })

      // If there is an extent is passed from extentMessage before, don't init extent here as this will publish
      // extentMessage and change other mapWidget's extent.
      if (!this.props.baseWidgetProps?.mutableStateProps?.zoomToFeatureActionValue?.value) {
        this.goHome(false)
      }

      if (this.isMapView(view)) {
        // snapToZoom: true means integer zoom, false means float zoom
        // We need to set the initial value to true for backward compatibility and keep the same behavior with MapViewer
        // After map inited, we will set snapToZoom to false to get the best synchronization between two map widgets

        // We use setTimeout here to make sure the above this.goHome(false) is done.
        setTimeout(() => {
          (view as __esri.MapView).constraints.snapToZoom = false
        }, 0)
      }
    })

    this.bindMapBaseViewEvent(view)

    this.tryUpdateCurrentViewByConfigProps(true)
    this.checkAndHandleMutableStateProps()
  }

  publishExtentChangeMessage (view: MapbaseView, stationary: boolean, interacive?: boolean): void {
    if (!view) {
      return
    }

    const nowTime = Date.now()

    if (!view.firstPublishExtentChangeTime) {
      view.firstPublishExtentChangeTime = nowTime
    }

    const extent = view.extent.clone()
    const viewpoint = view.viewpoint.clone()
    const extentMessage = new ExtentChangeMessage(this.props.baseWidgetProps.id, extent, viewpoint, stationary)
    extentMessage.publishTime = nowTime
    extentMessage.interacive = interacive || view.interacting
    const extentChangeRelatedWidgetIdsOfView = this.getExtentChangeRelatedWidgetIdsOfView(view)

    extentMessage.setRelatedWidgetIds(extentChangeRelatedWidgetIdsOfView)
    extentMessage.addRelatedWidgetId(this.props.baseWidgetProps.id)
    this.props.onExtentChanged(this.props.dataSourceId, extentMessage)

    if (stationary) {
      // handle viewpointHistory
      const currentViewpoint = view.viewpoint.clone()

      if (view.viewpointHistory.length > 0) {
        const indexes: number[] = [view.viewpointIndex, view.viewpointIndex - 1, view.viewpointIndex + 1]
        let isSamelikeViewpoint: boolean = false
        const lastViewpointIndex = view.viewpointHistory.length - 1

        for (let i = 0; i < indexes.length; i++) {
          const viewpointIndex = indexes[i]

          if (viewpointIndex >= 0 && viewpointIndex <= lastViewpointIndex) {
            const viewpoint = getViewpointInstanceFromHistory(view, viewpointIndex)

            if (viewpoint && isSamelikeViewpoints(view, currentViewpoint, viewpoint)) {
              isSamelikeViewpoint = true
              break
            }
          }
        }

        if (!isSamelikeViewpoint) {
          // current viewpointHistory: view.viewpointIndex point to C
          // A -> B -> [C] -> D -> E

          // temp viewpointHistory
          // A -> B -> [C]
          view.viewpointHistory.splice(view.viewpointIndex + 1)

          // new viewpointHistory
          // A -> B -> C -> [F]
          view.viewpointHistory.push(currentViewpoint)
          view.viewpointIndex += 1
        }
      } else {
        // first viewpoint
        view.viewpointHistory.push(currentViewpoint)
        view.viewpointIndex = 0
      }

      if (view.stationaryCallback) {
        view.stationaryCallback()
      }
    }
  }

  generateViewPointFromInitialMapState (initialMapState: ImmutableObject<InitialMapState>): __esri.Viewpoint {
    if (initialMapState.viewType === '2d') {
      return new this.Viewpoint(
        {
          targetGeometry: this.Extent.fromJSON(initialMapState.extent),
          rotation: initialMapState.rotation
        }
      )
    } else {
      return this.Viewpoint.fromJSON(initialMapState.viewPoint)
    }
  }

  /**
   * This method create web map or web scene by data source. This method doesn't consider default web map case.
   * @param dataSourceInfo
   * @returns
   */
  async createWebMapOrWebSceneByDataSource (dataSourceInfo: MapbaseDataSourceInfo): Promise<__esri.WebMap | __esri.WebScene> {
    let webMapOrWebScene: __esri.WebMap | __esri.WebScene = null
    const MapClass: typeof __esri.WebMap | typeof __esri.WebScene = dataSourceInfo.isWebMap ? this.WebMap : this.WebScene

    const dataSourceJson = dataSourceInfo.dataSourceJson

    if (dataSourceJson.portalUrl) {
      // create web map or web scene for portal
      const portal = new this.Portal({
        url: portalUrlUtils.getPlatformUrlByOrgUrl(dataSourceJson.portalUrl)
      })

      webMapOrWebScene = new MapClass({
        portalItem: new this.PortalItem({
          id: dataSourceJson.itemId,
          portal: portal
        })
      })
    } else {
      // create web map or web scene for arcgis online
      webMapOrWebScene = new MapClass({
        portalItem: new this.PortalItem({
          id: dataSourceJson.itemId
        })
      })
    }

    if (dataSourceUtils.getWhetherUseProxy()) {
      await webMapOrWebScene.load()
      await webMapOrWebScene.when()

      // set proxy url for layers and tables
      const allLayers = webMapOrWebScene.allLayers.toArray()
      const tables = webMapOrWebScene.tables ? webMapOrWebScene.tables.toArray() : []
      const layersAndTables = allLayers.concat(tables) as Array<__esri.Layer & { url: string, portalItem?: __esri.PortalItem }>
      layersAndTables.forEach(layer => {
        const sourceUrl = dataSourceUtils.getUrlByLayer(layer)

        if (!sourceUrl) {
          return
        }

        const proxyUrl: string = dataSourceUtils.getDataSourceProxyUrl(sourceUrl)

        if (proxyUrl) {
          layer.url = proxyUrl

          // The following code is the workaround to fix JS API 4.28 issue. Need to be replaced with request interceptor in next release.
          const portalItem = layer.portalItem

          if (portalItem && portalItem.when) {
            portalItem.when(() => {
              // After execute 'layer.url = proxyUrl', layer.url maybe still different with proxyUrl, e.g. proxyUrl is 'xxx/featureserver/0', but the final layer.url is 'xxx/featureserver'.
              // so we use layer.url here, not proxyUrl.
              portalItem.url = layer.url

              if (portalItem.sourceJSON) {
                portalItem.sourceJSON.url = layer.url
              }
            })
          }
        }
      })
    }

    return webMapOrWebScene
  }

  getInitViewPointForDefaultWebMap = (): __esri.Viewpoint => {
    const defaultExtent = this.props.defaultMapInfo && this.props.defaultMapInfo.defaultExtent
    let tempViewPoint = null
    if (this.props.baseWidgetProps.config.initialMapState && this.props.baseWidgetProps.config.initialMapState.viewPoint) {
      tempViewPoint = this.generateViewPointFromInitialMapState(this.props.baseWidgetProps.config.initialMapState)
    } else {
      tempViewPoint = new this.Viewpoint(
        {
          targetGeometry: new this.Extent({
            xmin: defaultExtent && defaultExtent.xmin,
            ymin: defaultExtent && defaultExtent.ymin,
            xmax: defaultExtent && defaultExtent.xmax,
            ymax: defaultExtent && defaultExtent.ymax,
            spatialReference: { wkid: defaultExtent.spatialReference.wkid }
          })
        }
      )
    }
    return tempViewPoint
  }

  getDefaultWebMap () {
    const defaultExtent = this.props.defaultMapInfo && this.props.defaultMapInfo.defaultExtent

    const tempViewPoint = new this.Viewpoint(
      {
        targetGeometry: new this.Extent({
          xmin: defaultExtent && defaultExtent.xmin,
          ymin: defaultExtent && defaultExtent.ymin,
          xmax: defaultExtent && defaultExtent.xmax,
          ymax: defaultExtent && defaultExtent.ymax,
          spatialReference: { wkid: defaultExtent.spatialReference.wkid }
        })
      }
    )

    const defaultWebmap = new this.WebMap({
      portalItem: {
        id: this.props.defaultMapInfo.defaultMapId,
        portal: {
          url: this.props.baseWidgetProps.portalUrl
        }
      },
      initialViewProperties: new this.InitialViewProperties({
        spatialReference: defaultExtent && defaultExtent.spatialReference,
        viewpoint: tempViewPoint
      })
    })

    return defaultWebmap
  }

  async getMapViewOptionToCreateMapView (dataSourceInfo: MapbaseDataSourceInfo): Promise<__esri.MapViewProperties> {
    let mapViewOption: __esri.MapViewProperties

    if (this.props.isDefaultMap) {
      const defaultMap = this.getDefaultWebMap()
      mapViewOption = {
        map: defaultMap,
        container: this.mapContainer,
        viewpoint: this.getInitViewPointForDefaultWebMap(),
        rotation: this.props.baseWidgetProps.config.initialMapState && this.props.baseWidgetProps.config.initialMapState.rotation
      }
    } else {
      const webMap = await this.createWebMapOrWebSceneByDataSource(dataSourceInfo)

      if (this.props.baseWidgetProps.config.initialMapState) {
        mapViewOption = {
          map: webMap,
          container: this.mapContainer,
          viewpoint: this.props.baseWidgetProps.config.initialMapState &&
            this.generateViewPointFromInitialMapState(this.props.baseWidgetProps.config.initialMapState)
        }
      } else {
        mapViewOption = {
          map: webMap,
          container: this.mapContainer
        }
      }

      const highlightColor = this.props.baseWidgetProps.config.selectionHighlightColor || DEFAULT_HIGHLIGHT_COLOR
      const highlightHaloColor = this.props.baseWidgetProps.config.selectionHighlightHaloColor || DEFAULT_HIGHLIGHT_HALO_COLOR
      mapViewOption.highlightOptions = {
        color: new this.Color(highlightColor),
        haloColor: new this.Color(highlightHaloColor)
      }
    }

    mapViewOption.popup = {
      defaultPopupTemplateEnabled: true
    }

    mapViewOption.constraints = {
      // snapToZoom: true means integer zoom, false means float zoom
      // We need to set the initial value to true for backward compatibility and keep the same behavior with MapViewer
      // After map inited, we will set snapToZoom to false to get the best synchronization between two map widgets
      snapToZoom: true
    }

    // Set timeZone to 'system' for compatibility.
    mapViewOption.timeZone = 'system'

    if (!window.jimuConfig.isInBuilder) {
      if (this.props.baseWidgetProps.queryObject[this.props.baseWidgetProps.id]) {
        const extentStr = this.props.baseWidgetProps.queryObject[this.props.baseWidgetProps.id].substr('extent='.length)
        let extent

        try {
          extent = new this.Extent(JSON.parse(extentStr))
        } catch (err) {
          console.error('Bad extent URL parameter.')
        }

        if (extent) {
          mapViewOption.extent = extent
        }
      }
    }

    return mapViewOption
  }

  async getSceneViewOptionToCreateSceneView (dataSourceInfo: MapbaseDataSourceInfo): Promise<__esri.SceneViewProperties> {
    const webScene = await this.createWebMapOrWebSceneByDataSource(dataSourceInfo)

    const mapViewOption: __esri.SceneViewProperties = {
      map: webScene,
      container: this.mapContainer,
      popup: {
        defaultPopupTemplateEnabled: true
      }
    }

    if (this.props.baseWidgetProps.config.initialMapState) {
      mapViewOption.viewpoint = this.props.baseWidgetProps.config.initialMapState &&
          this.generateViewPointFromInitialMapState(this.props.baseWidgetProps.config.initialMapState)
    }

    const highlightColor = this.props.baseWidgetProps.config.selectionHighlightColor || DEFAULT_HIGHLIGHT_COLOR
    const highlightHaloColor = this.props.baseWidgetProps.config.selectionHighlightHaloColor || DEFAULT_HIGHLIGHT_HALO_COLOR
    mapViewOption.highlightOptions = {
      color: new this.Color(highlightColor),
      haloColor: new this.Color(highlightHaloColor)
    }

    const sceneQualityMode = this.props.baseWidgetProps.config.sceneQualityMode
    if (sceneQualityMode && sceneQualityMode !== SceneQualityMode.auto) {
      mapViewOption.qualityProfile = sceneQualityMode
    } else {
      // use 'low' as default value
      mapViewOption.qualityProfile = SceneQualityMode.low
    }

    return mapViewOption
  }

  bindMapBaseViewEvent (view: MapbaseView) {
    if (view) {
      this.releaseMapbaseViewEventHandles(view)

      view.mapBaseViewEventHandles.click = view.on('click', () => {
        this.releaseHighLightHandles(view)
      })
    }
  }

  isReadyToCreateJimuMapView (): boolean {
    if (this.view) {
      if (this.props.isDefaultMap) {
        // Don't need data source if use default map.
        return true
      } else {
        return this.mapDs && this.mapDs.id === this.props.dataSourceId
      }
    }

    return false
  }

  getJimuMapViewFoView (view: MapbaseView): JimuMapView {
    const jimuMapViewId = view?.dataSourceInfo?.jimuMapViewId

    if (jimuMapViewId) {
      const jimuMapView = MapViewManager.getInstance().getJimuMapViewById(jimuMapViewId)

      return jimuMapView
    }

    return null
  }

  createJimuMapView () {
    if (!this.isReadyToCreateJimuMapView()) {
      return
    }

    const view = this.view

    // If dataSourceId is null, make sure it converts to empty string.
    const dataSourceId = this.props.dataSourceId || ''

    MapViewManager.getInstance().createJimuMapView({
      mapWidgetId: this.props.baseWidgetProps.id,
      dataSourceId,
      view,
      isEnablePopup: this.props.baseWidgetProps.config && !this.props.baseWidgetProps.config.disablePopUp,
      mapViewManager: MapViewManager.getInstance()
    })

    view.when(() => {
      const jimuMapViewId = view.dataSourceInfo.jimuMapViewId
      const jimuMapView = MapViewManager.getInstance().getJimuMapViewById(jimuMapViewId)

      if (jimuMapView) {
        if (jimuMapView.view) {
          jimuMapView.whenJimuMapViewLoaded().then(() => {
            if (!jimuMapView.view) {
              MapViewManager.getInstance().destroyJimuMapView(jimuMapViewId)
              return
            }

            if (this.isViewExpected(view)) {
              if (this.props.onJimuMapViewCreated) {
                this.props.onJimuMapViewCreated(jimuMapView)
              }
            }
          })
        } else {
          MapViewManager.getInstance().destroyJimuMapView(jimuMapViewId)
        }
      }
    })
  }

  destroyCurrentMapbaseView () {
    if (this.view) {
      this.destroyMapbaseView(this.view)
    }

    // Note, don't set this.mapDs to null here.
    // Consider this case:
    // We create a new Mapbase instance, onDataSourceCreated callback is quickly, then we get this.mapDs.
    // Then componentDidMount is invoked for some reason (e.g. this.isBasicModulesLoaded changed from false to true),
    // and we need to call this method to destroy this.view.
    // So, if we set this.mapDs to null, we will never get this.mapDs,
    // and this.isReadyToCreateJimuMapView() always return false, then we can't create jimu map view.
    this.view = null
  }

  destroyMapbaseView (view: MapbaseView) {
    if (view) {
      // release handles
      if (view.watchInteractingHandle) {
        view.watchInteractingHandle.remove()
        view.watchInteractingHandle = null
      }

      if (view.extentWatchHandle) {
        view.extentWatchHandle.remove()
        view.extentWatchHandle = null
      }

      if (view.fatalErrorWatchHandle) {
        view.fatalErrorWatchHandle.remove()
        view.fatalErrorWatchHandle = null
      }

      if (view.stationaryTimerId) {
        clearTimeout(view.stationaryTimerId)
        view.stationaryTimerId = null
      }

      this.releaseHighLightHandles(view)

      this.releaseMapbaseViewEventHandles(view)
    }

    const jimuMapViewId = view.dataSourceInfo.jimuMapViewId

    if (jimuMapViewId) {
      MapViewManager.getInstance().destroyJimuMapView(jimuMapViewId)
    }

    if (!view.destroyed) {
      view.destroy()
    }
  }

  releaseHighLightHandles (view: MapbaseView) {
    if (view.highLightHandles) {
      const keys = Object.keys(view.highLightHandles)

      for (const key of keys) {
        view.highLightHandles[key].remove()
      }
    }

    view.highLightHandles = {}
  }

  releaseMapbaseViewEventHandles (view: MapbaseView) {
    if (view.mapBaseViewEventHandles) {
      const keys = Object.keys(view.mapBaseViewEventHandles)

      for (const key of keys) {
        view.mapBaseViewEventHandles[key].remove()
      }
    }

    view.mapBaseViewEventHandles = {}
  }

  /**
   * onDataSourceCreated and onCreateDataSourceFailed will not invoked when this.props.isWebMap is true
   * @param dataSource
   */
  onDataSourceCreated = (dataSource: MapDataSource): void => {
    if (dataSource.id === this.props.dataSourceId) {
      this.mapDs = dataSource

      if (this.isReadyToCreateJimuMapView()) {
        this.createJimuMapView()
      }
    }
  }

  onCreateDataSourceFailed = (err): void => {
    console.warn('onCreateDataSourceFailed', err)
    this.mapDs = null

    this.setState({
      mapLoadStatus: MapLoadStatus.LoadError
    }, () => {
      this.props.onMapLoaded(this.props.dataSourceId, MapLoadStatus.LoadError)
    })
  }

  getRestoreDataFromMS (): MapbaseRestoreData {
    const basicKey = this.getRestoreDataKey()
    const restoreData = MutableStoreManager.getInstance().getStateValue([this.props.baseWidgetProps.id, 'restoreData', basicKey]) as MapbaseRestoreData
    return restoreData
  }

  updateRestoreDataToMS (restoreData: MapbaseRestoreData) {
    const basicKey = this.getRestoreDataKey()
    MutableStoreManager.getInstance().updateStateValue(this.props.baseWidgetProps.id, `restoreData.${basicKey}`, restoreData)
  }

  getRestoreDataKey () {
    return `${this.props.baseWidgetProps.id}-restoreData-${this.props.dataSourceId}`
  }

  // This method is used to sync viewpoint between two mapbase of same map widget.
  setViewPoint = (viewPoint: __esri.Viewpoint): void => {
    if (this.view && viewPoint) {
      this.view.viewpoint = viewPoint.clone()
    }
  }

  // This method is used to sync viewpoint between two mapbase of same map widget.
  getViewPoint = (): __esri.Viewpoint => {
    return this.view && this.view.viewpoint ? this.view.viewpoint.clone() : null
  }

  getMapLoadStatus = (): MapLoadStatus => {
    return this.state.mapLoadStatus
  }

  getViewType = (): string => {
    return this.getDsJsonFromDsId(this.props.dataSourceId).type
  }

  async goHome (useAmination?: boolean): Promise<void> {
    if (!this.getDsJsonFromDsId(this.props.dataSourceId)) {
      return
    }

    const widgets = getAppStore().getState().appConfig.widgets

    if (this.view && widgets[this.props.baseWidgetProps.id]) {
      const initViewPoint = this.getMapBaseInitViewPoint()

      if (initViewPoint) {
        // TODO: maybe need to set view.constraints.snapToZoom to true before call view.goTo() and reset it to false after view.goTo() is done.
        return this.view.goTo(initViewPoint, {
          animate: useAmination
        })
      }
    }
  }

  getMapBaseInitViewPoint (): __esri.Viewpoint {
    if (this.props.isDefaultMap) {
      return this.getInitViewPointForDefaultWebMap()
    } else {
      if (this.props.baseWidgetProps.config.initialMapState) {
        return this.generateViewPointFromInitialMapState(this.props.baseWidgetProps.config.initialMapState)
      } else {
        if (this.view) {
          const map = this.view.map as __esri.WebMap | __esri.WebScene
          return map?.initialViewProperties?.viewpoint?.clone()
        }
      }
    }
  }

  formatMessage (id: string) {
    return this.props.baseWidgetProps.intl.formatMessage({ id: id, defaultMessage: defaultMessages[id] })
  }

  handleDisableWheel () {
    this.widgetContainer.style.pointerEvents = 'none'
    setTimeout(() => {
      this.widgetContainer.style.pointerEvents = 'auto'
    }, 50)
  }

  getMapSwitchForErrorMap () {
    return (
      <MultiSourceMapContext.Consumer>
        {({ isShowMapSwitchBtn, dataSourceIds, activeDataSourceId, switchMap }) => (
          <div
            className='mapswitch-container' style={{
              display: isShowMapSwitchBtn ? 'block' : 'none',
              marginBottom: this.props.widthBreakpoint === 'xsmall' ? 10 : 0
            }}
          >
            <div onClick={(e) => { e.preventDefault(); switchMap() }} className='w-100 h-100 esri-widget--button'>
              <Icon icon={Exchange} width={16} height={16} className='mapswitch-icon' />
            </div>
          </div>
        )}
      </MultiSourceMapContext.Consumer>
    )
  }

  queryExtentFromSingleLayerQueryParams = (dataSourceId: string) => {
    const dataSource = this.dsManager.getDataSource(dataSourceId) as FeatureLayerDataSource
    const queryParams: SqlQueryParams = dataSource.getCurrentQueryParams()
    let layerObjectPromise

    if (dataSource?.layer) {
      layerObjectPromise = Promise.resolve(dataSource.layer)
    } else {
      layerObjectPromise = dataSource.createJSAPILayerByDataSource().then((layerObject) => Promise.resolve(layerObject))
    }

    return loadArcGISJSAPIModules([
      'esri/rest/support/Query',
      'esri/Graphic',
      'esri/geometry/Point'
    ]).then(modules => {
      const [Query, Graphic, Point] = modules
      const query = new Query()
      query.where = queryParams?.where

      return layerObjectPromise.then(layerObject => {
        return layerObject.queryExtent(query).then(result => {
          const extentCenter = result?.extent?.center
          const extent = result?.extent
          let singlePointGraphic
          if (result?.count === 1 && (layerObject.geometryType === 'point') && extentCenter) {
            const point = new Point({
              x: extentCenter.x,
              y: extentCenter.y,
              spatialReference: extent.spatialReference
            })

            singlePointGraphic = new Graphic({ geometry: point })
          }
          return {
            extent: extent,
            singlePointGraphic: singlePointGraphic,
            count: result?.count,
            layer: layerObject
          }
        })
      })
    })
  }

  queryExtentFromQueryParams = (mapBaseView: __esri.MapView | __esri.SceneView, dataSourceIds: string[], useDataSources: ImmutableArray<UseDataSource>) => {
    //const dataSource = this.dsManager.getDataSource(dataSourceId) as FeatureLayerDataSource
    //const queryParams: SqlQueryParams = dataSource.getCurrentQueryParams()
    const useDefaultExtentOfCurrentView = !useDataSources.some(useDataSource => {
      const dataSource = this.dsManager.getDataSource(useDataSource.dataSourceId) as FeatureLayerDataSource
      const queryParams: SqlQueryParams = dataSource.getRuntimeQueryParams()
      // use default extent if all merged SQLs on data source is remvoved.
      const hasQueryWhere = queryParams?.where && queryParams.where !== '1=1'

      if (hasQueryWhere) {
        return true
      } else {
        return false
      }
    })

    if (useDefaultExtentOfCurrentView) {
      const initViewPoint = this.getMapBaseInitViewPoint()
      return Promise.resolve({
        viewpoint: initViewPoint,
        useDefaultExtentOfCurrentView: true,
        singlePointGraphic: null,
        count: 2,
        layer: null
      })
    }

    const extentResultPromises = []
    dataSourceIds.forEach(dataSourceId => {
      extentResultPromises.push(this.queryExtentFromSingleLayerQueryParams(dataSourceId))
    })

    return Promise.all(extentResultPromises).then(results => {
      let fullExtent = null
      let count = 0
      if (results?.length === 1) {
        return results[0]
      } else {
        results.forEach(result => {
          if (result.extent) {
            fullExtent = fullExtent ? fullExtent.union(result.extent) : result.extent
          }
          count = count + result.count
        })
        return {
          extent: fullExtent,
          singlePointGraphic: null,
          count: count,
          layer: null
        }
      }
    })
  }

  /**
   * handle message/action.
   */
  handleAction (mutableStateProps: ActionRelatedProps, mapBaseView: MapbaseView, jimuMapView: JimuMapView) {
    if (!mapBaseView || mapBaseView.destroyed) {
      return
    }

    // consume mutableStateProps.zoomToFeatureActionValue
    this.handleActionForZoomToFeatureActionValue(mutableStateProps, mapBaseView)

    // consume mutableStateProps.panToActionValue
    this.handleActionForPanToActionValue(mutableStateProps, mapBaseView)

    // consume mutableStateProps.newFeatureSetActionValue
    this.handleActionForNewFeatureSetActionValue(mutableStateProps, mapBaseView)

    // consume mutableStateProps.changedFeatureSetActionValue
    this.handleActionForChangedFeatureSetActionValue(mutableStateProps, mapBaseView)

    // consume mutableStateProps.selectFeatureActionValue
    this.handleActionForSelectFeatureActionValue(mutableStateProps, mapBaseView)

    // consume flashActionValue and filterActionValue
    this.handleActionForFlashActionValueAndFilterActionValue(mutableStateProps, mapBaseView)

    // handle show data on map action
    this.handleActionForShowOnMapDatas(mutableStateProps, jimuMapView)

    // handle add data to map action
    this.handleActionForAddToMapDatas(mutableStateProps, jimuMapView)
  }

  getExtentChangeRelatedWidgetIdsOfView (view: MapbaseView): string[] {
    let result: string[] = []

    if (view) {
      const relatedWidgetIds = view.extentChangeRelatedWidgetIds || []
      // We need to clone the relatedWidgetIds.
      result = relatedWidgetIds.slice()
    }

    return result
  }

  setExtentChangeRelatedWidgetIdsForView (view: MapbaseView, _relatedWidgetIds: string[]): void {
    if (view) {
      const relatedWidgetIds = _relatedWidgetIds || []
      // We need to clone the relatedWidgetIds.
      view.extentChangeRelatedWidgetIds = relatedWidgetIds.slice()
    }
  }

  tryFatalErrorRecovery (view: MapbaseView) {
    if (view) {
      view.tryFatalErrorRecovery()
    }
  }

  handleActionForZoomToFeatureActionValue (mutableStateProps: ActionRelatedProps, mapBaseView: MapbaseView): void {
    if (!mutableStateProps.zoomToFeatureActionValue) {
      return
    }

    const receiveMessageTime = Date.now()

    const zoomToFeatureActionValue = mutableStateProps.zoomToFeatureActionValue

    const relatedWidgetIds: string[] = mutableStateProps.zoomToFeatureActionValue.relatedWidgets || []

    if (relatedWidgetIds && relatedWidgetIds.includes(this.props.baseWidgetProps.id)) {
      // avoid endless loop
      this.props.onMutableStatePropsChanged(this.props.dataSourceId, 'zoomToFeatureActionValue', null)
    } else {
      const zoomToFeatureInternalValue = zoomToFeatureActionValue.value

      if (zoomToFeatureInternalValue.type === 'zoom-to-extent') {
        // ZoomToExtentInternalValue

        const nowTime = Date.now()

        mapBaseView.lastZoomToExtentTime = nowTime

        // map widget1 extent chagnes and map widget2 needs to sync the extent by message action.
        // Finally, it calls view.goTo(extent)

        // Consider this case:
        // On app load:
        // 1. Both map widget1 and map widget2 set zoom-to action for each other.
        // 2. The initial extent of map widget1 is extent1 and the initial extent of map widget2 is extent2.
        // 3. map widget1 first publish extent-change message after the view is ready.
        // 4. Then map widget2 publish extent-change message.
        // 5. Then map widget2 receive message from map widget1 and call handleAction.
        // 6. Then map widget1 receive message from map widget2 and call handleAction.
        // At last, the extent of map widget1 is extent2 and the extent of map widget2 is extent1. This is not the expected result.
        // To avoid the above case, we need to stop the step6 because map widget1 first publish message.
        let isAboveCase = false

        if (mapBaseView.firstPublishExtentChangeTime) {
          if ((nowTime - mapBaseView.firstPublishExtentChangeTime) <= 2000) {
            if (mapBaseView.firstPublishExtentChangeTime <= zoomToFeatureInternalValue.publishTime) {
              if (!zoomToFeatureInternalValue.interacive) {
                // #14391, if extentMessage.interacive is true, means the extent comes from a interactiving map and needs to sync viewpoint with the interactiving map
                if (isTwoWidgetsMutuallyExtentChange(this.props.baseWidgetProps.id, zoomToFeatureInternalValue.publishWidgetId)) {
                  isAboveCase = true
                }
              }
            }
          }
        }

        // If mapBaseView is the last interactive view, it means mapBaseView is the extent-change source, we should ignore the zoom-to-extent message.
        if (!isAboveCase && mapBaseView !== MapBase.lastInteraciveView) {
          const viewpoint = zoomToFeatureInternalValue.viewpoint
          const extent = zoomToFeatureInternalValue.extent
          const stationary = zoomToFeatureInternalValue.stationary

          this.setExtentChangeRelatedWidgetIdsForView(mapBaseView, relatedWidgetIds)

          const viewSR = mapBaseView.spatialReference

          // viewpoint has high priority than exent, because it contains more information
          if (viewpoint) {
            // update view by viewpoint
            if (isNeedProjectViewpoint(viewpoint, viewSR)) {
              if (stationary) {
                // only project the viewpoint when map is static
                projectViewpoint(viewpoint, viewSR).then((projectedViewpoint) => {
                  // Consider this case(#16423):
                  // 1. handleActionForZoomToFeatureActionValue receive message at time1, the message viewpoint is viewpoint1
                  // 2. the viewpoint needs to be project, then send http request to project the viewpoint1, this async step maybe take long time
                  // 3. then JimuMapView needs to update viewpoint to viewpoint2 by url data_id (sync step) in JimuMapView.moveFeatureToCenter() at time2
                  // 4. then the async step2 is done at time3, and udpate viewpoint by the projected viewpoint1, finally the viewpoint is the projected viewpoint1
                  // The step4 is wrong, because viewpoint2 of step3 is the new one, and the projected viewpoint1 is stale.
                  // To avoid this case, we should check projectedViewpoint is fresh or stale.

                  const isProjectedViewpointStale = mapBaseView.receiveMessageTimeOfLastViewUpdate && mapBaseView.receiveMessageTimeOfLastViewUpdate > receiveMessageTime

                  if (!isProjectedViewpointStale) {
                    mapBaseView.viewpoint = projectedViewpoint
                  }
                })
              }
            } else {
              mapBaseView.viewpoint = viewpoint
            }
          } else {
            // TODO: need to remove the following extent logic
            // update view by extent
            if (isNeedProjectSpatialReference(extent.spatialReference, viewSR)) {
              if (stationary) {
                // only project the extent when map is static
                projectGeometries([extent], viewSR).then((projectedGeometries) => {
                  const projectedExtent = projectedGeometries[0]
                  mapBaseView.goTo(projectedExtent)
                })
              }
            } else {
              mapBaseView.goTo(extent, { animate: false })
            }
          }
        }
      } else if (zoomToFeatureInternalValue.type === 'zoom-to-query-params') {
        // ZoomToQueryParamsInternalValue

        this.queryExtentFromQueryParams(mapBaseView, zoomToFeatureInternalValue.dataSourceIds, zoomToFeatureInternalValue.useDataSources).then((result) => {
          let target
          if (result.count === 0) {
            return
          } else if (result.count === 1 && result?.singlePointGraphic) {
            target = {
              graphics: [result?.singlePointGraphic],
              layer: result?.layer
            }
          } else {
            target = result?.extent
          }

          this.setExtentChangeRelatedWidgetIdsForView(mapBaseView, relatedWidgetIds)

          // Because of 'zoomToUtils' does not support 'viewpoint', temporary code for using default viewpoint of sceneView.
          if (result.useDefaultExtentOfCurrentView) {
            mapBaseView.goTo(result.viewpoint)
          } else {
            zoomToUtils.zoomTo(mapBaseView, target, zoomToFeatureInternalValue.zoomToOption)
          }
        })
      } else if (zoomToFeatureInternalValue.type === 'zoom-to-array-graphics') {
        // ZoomToArrayGraphicsInternalValue

        this.setExtentChangeRelatedWidgetIdsForView(mapBaseView, relatedWidgetIds)

        zoomToUtils.zoomTo(mapBaseView, zoomToFeatureInternalValue.arrayFeatures, zoomToFeatureInternalValue.zoomToOption)
      } else if (zoomToFeatureInternalValue.type === 'zoom-to-layers') {
        // ZoomToLayersInternalValue

        const dataSourceIds = zoomToFeatureInternalValue.dataSourceIds
        getLayersFromDataSourceIds(dataSourceIds).then(layers => {
          this.setExtentChangeRelatedWidgetIdsForView(mapBaseView, relatedWidgetIds)
          zoomToUtils.zoomTo(mapBaseView, layers, zoomToFeatureInternalValue.zoomToOption)
        })
      } else {
        // zoom-to-graphics
        const dataSource = this.dsManager.getDataSource(zoomToFeatureInternalValue.dataSourceId) as unknown as JSAPILayerMixin & FeatureLayerDataSource
        let layerPromise

        if (dataSource?.layer) {
          layerPromise = Promise.resolve(dataSource.layer)
        } else if (dataSource?.createJSAPILayerByDataSource) {
          layerPromise = dataSource.createJSAPILayerByDataSource()
        } else {
          layerPromise = Promise.resolve(null)
        }

        layerPromise.then(layer => {
          const originalGraphics = zoomToFeatureInternalValue.features || []

          processZoomToFeatures(mapBaseView, layer, originalGraphics).then(handledGraphics => {
            let zoomToTarget = null

            if (layer) {
              zoomToTarget = {
                layer,
                graphics: handledGraphics
              }
            } else {
              zoomToTarget = handledGraphics
            }

            if (!zoomToFeatureInternalValue.zoomToOption) {
              zoomToFeatureInternalValue.zoomToOption = {}
            }

            this.setExtentChangeRelatedWidgetIdsForView(mapBaseView, relatedWidgetIds)
            zoomToFeatureInternalValue.zoomToOption.queryParams = (dataSource?.getCurrentQueryParams && dataSource.getCurrentQueryParams()) || ''
            zoomToUtils.zoomTo(mapBaseView, zoomToTarget, zoomToFeatureInternalValue.zoomToOption)
          })
        })
      }

      this.props.onMutableStatePropsChanged(this.props.dataSourceId, 'zoomToFeatureActionValue', null)
    }
  }

  handleActionForPanToActionValue (mutableStateProps: ActionRelatedProps, mapBaseView: MapbaseView): void {
    if (!mutableStateProps.panToActionValue) {
      return
    }

    const relatedWidgetIds: string[] = mutableStateProps.panToActionValue.relatedWidgets || []
    const panToType = mutableStateProps.panToActionValue.value?.type

    if (relatedWidgetIds && relatedWidgetIds.includes(this.props.baseWidgetProps.id)) {
      // avoid endless loop
      this.props.onMutableStatePropsChanged(this.props.dataSourceId, 'panToActionValue', null)
    } else if (panToType === 'pan-to-query-params') {
      const panToValue = mutableStateProps.panToActionValue.value
      this.queryExtentFromQueryParams(mapBaseView, panToValue.dataSourceIds, panToValue.useDataSources).then((result) => {
        // Because of 'panToGeometry' method does not support 'viewpoint', temporary code for using default viewpoint of sceneView.
        if (result.useDefaultExtentOfCurrentView) {
          const targetGeometry = result?.viewpoint?.camera?.position || result?.viewpoint?.targetGeometry
          this.panToGeometry([targetGeometry], mapBaseView, relatedWidgetIds)
        } else {
          this.panToGeometry([result?.extent], mapBaseView, relatedWidgetIds)
        }
      })
    } else if (panToType === 'pan-to-layer') {
      const panToValue = mutableStateProps.panToActionValue.value
      const dataSource = this.dsManager.getDataSource(panToValue.dataSourceId) as unknown as JSAPILayerMixin & FeatureLayerDataSource
      let layerPromise

      if (dataSource?.layer) {
        layerPromise = Promise.resolve(dataSource.layer)
      } else if (dataSource?.createJSAPILayerByDataSource) {
        layerPromise = dataSource.createJSAPILayerByDataSource()
      } else {
        layerPromise = Promise.resolve(null)
      }

      layerPromise.then(layer => {
        let queryParams = null

        if (dataSource) {
          if (dataSource.getCurrentQueryParams) {
            queryParams = dataSource.getCurrentQueryParams()
          }
        }

        zoomToUtils.layerExtent(mapBaseView, layer, queryParams).then(layerExtent => {
          if (layerExtent) {
            this.panToGeometry([layerExtent], mapBaseView, [])
          }
        })
      })
    } else if (panToType === 'pan-to-layers') {
      const panToValue = mutableStateProps.panToActionValue.value
      const dataSourceIds = panToValue.dataSourceIds
      getLayersFromDataSourceIds(dataSourceIds).then(layers => {
        const extentPromises = []
        layers.forEach(layer => {
          if (layer) {
            extentPromises.push(zoomToUtils.layerExtent(mapBaseView, layer))
          }
        })

        let fullExtent = null
        return Promise.all(extentPromises).then(extents => {
          extents.forEach(extent => {
            if (extent) {
              fullExtent = fullExtent ? fullExtent.union(extent) : extent
            }
          })
          if (fullExtent) {
            this.panToGeometry([fullExtent], mapBaseView, [])
          }
        })
      })
    } else if (panToType === 'pan-to-geometries') {
      const panToValue = mutableStateProps.panToActionValue.value
      this.panToGeometry(panToValue.geometries, mapBaseView, relatedWidgetIds)
    } else if (panToType === 'pan-to-extent') {
      // map widget1 extent changes and map widget2 needs to sync the extent by message action.
      // Finally, it calls view.goTo(extent.center).

      // Consider this case:
      // 1. Both map widget1 and map widget2 set pan-to action for each other.
      // 2. The initial extent of map widget1 is extent1 and the initial extent of map widget2 is extent2.
      // 3. map widget1 first publish extent-change message after the view is ready.
      // 4. Then map widget2 publish extent-change message.
      // 5. Then map widget2 receive message from map widget1 and call handleAction.
      // 6. Then map widget1 receive message from map widget2 and call handleAction.
      // At last, the extent of map widget1 is extent2 and the extent of map widget2 is extent1. This is not the expected result.
      // To avoid the above case, we need to stop the step6 because map widget1 first publish message.
      let isAboveCase = false
      const nowTime = Date.now()

      if (mapBaseView.firstPublishExtentChangeTime) {
        if ((nowTime - mapBaseView.firstPublishExtentChangeTime) <= 2000) {
          if (mapBaseView.firstPublishExtentChangeTime <= mutableStateProps.panToActionValue.value.publishTime) {
            if (isTwoWidgetsMutuallyExtentChange(this.props.baseWidgetProps.id, mutableStateProps.panToActionValue.value.publishWidgetId)) {
              isAboveCase = true
            }
          }
        }
      }

      // Consider this case:
      // 1. We have 4 map widgets. Here are the actions.
      // 2. Widget1 -> zoom to -> Widget2 -> zoom to -> Widget4
      // 3. Widget1 -> zoom to -> Widget3 -> pan to -> Widget4
      // 4. We move the map of widget1, finally widget4 will receive zoomTo and panTo actions serially, like zoomTo, panTo, zoomTo, panTo, ...
      // 5. Step4 will result in widget4's map view jumping.
      // 6. To avoid this case, we need to stop executing panTo action if zoomTo action is executed recently.
      let isPanZoomConflictCase = false

      if (mapBaseView.lastZoomToExtentTime) {
        // By test, the biggest delta time is about 200ms in most cases, but it is safe to use a bigger one.
        if ((nowTime - mapBaseView.lastZoomToExtentTime) <= 500) {
          isPanZoomConflictCase = true
        }
      }

      // If mapBaseView is the last interactive view, it means mapBaseView is the extent-change source, we should ignore the pan-to-extent message.
      if (!isAboveCase && !isPanZoomConflictCase && mapBaseView !== MapBase.lastInteraciveView) {
        this.setExtentChangeRelatedWidgetIdsForView(mapBaseView, relatedWidgetIds)
        const panToValue = mutableStateProps.panToActionValue.value
        const extent = panToValue.geometries[0]
        const extentCenter = extent.center
        const stationary = panToValue.stationary
        const viewSR = mapBaseView.spatialReference

        if (isNeedProjectSpatialReference(extentCenter.spatialReference, viewSR)) {
          if (stationary) {
            // only project the extent when map is static
            projectGeometries([extentCenter], viewSR).then((projectedGeometries) => {
              const projectedCenter = projectedGeometries[0]
              mapBaseView.goTo(projectedCenter)
            })
          }
        } else {
          // mapBaseView.goTo(extentCenter, { animate: false })
          mapBaseView.center = extentCenter
        }
      }
    }

    this.props.onMutableStatePropsChanged(this.props.dataSourceId, 'panToActionValue', null)
  }

  panToGeometry (originalGeometries: __esri.Geometry[], mapBaseView: MapbaseView, relatedWidgetIds: string[]): void {
    projectGeometries(originalGeometries, mapBaseView.spatialReference).then((projectedGeometries) => {
      this.setExtentChangeRelatedWidgetIdsForView(mapBaseView, relatedWidgetIds)
      mapPanto(mapBaseView, projectedGeometries)
    })
  }

  handleActionForNewFeatureSetActionValue (mutableStateProps: ActionRelatedProps, mapBaseView: MapbaseView): void {
    if (mutableStateProps.newFeatureSetActionValue && !mutableStateProps.newFeatureSetActionValue.promise) {
      const createNewFeaturelayerPromise = createNewFeaturelayer(mapBaseView, mutableStateProps.newFeatureSetActionValue.value)
      if (createNewFeaturelayerPromise) {
        this.props.onMutableStatePropsChanged(this.props.dataSourceId, 'newFeatureSetActionValue.promise', createNewFeaturelayerPromise)

        createNewFeaturelayerPromise.then(() => {
          this.props.onMutableStatePropsChanged(this.props.dataSourceId, 'newFeatureSetActionValue', null)
        })
      } else {
        this.props.onMutableStatePropsChanged(this.props.dataSourceId, 'newFeatureSetActionValue', null)
      }
    }
  }

  handleActionForChangedFeatureSetActionValue (mutableStateProps: ActionRelatedProps, mapBaseView: MapbaseView): void {
    if (mutableStateProps.changedFeatureSetActionValue) {
      updateFeaturelayer(mapBaseView, mutableStateProps.changedFeatureSetActionValue)
      this.props.onMutableStatePropsChanged(this.props.dataSourceId, 'changedFeatureSetActionValue', null)
    }
  }

  handleActionForSelectFeatureActionValue (mutableStateProps: ActionRelatedProps, mapBaseView: MapbaseView): void {
    if (mutableStateProps.selectFeatureActionValue) {
      mapBaseView.closePopup()

      this.releaseHighLightHandles(mapBaseView)

      const selectFeatureHandle = selectFeature(mapBaseView, mutableStateProps.selectFeatureActionValue)
      if (selectFeatureHandle) {
        mapBaseView.highLightHandles[selectFeatureHandle.layerId] = selectFeatureHandle.handle
      }

      setTimeout(() => {
        this.props.onMutableStatePropsChanged(this.props.dataSourceId, 'selectFeatureActionValue', null)
      }, 500)
    }
  }

  handleActionForFlashActionValueAndFilterActionValue (mutableStateProps: ActionRelatedProps, mapBaseView: MapbaseView): void {
    const mutableStatePropsKeys = Object.keys(mutableStateProps)
    // WHY: why use array.some() here ? the callback always return false
    mutableStatePropsKeys.some(actionKey => {
      const jimuMapViewId = mapBaseView.dataSourceInfo.jimuMapViewId
      const tempJimuMapView = MapViewManager.getInstance().getJimuMapViewById(jimuMapViewId)

      // handle flash action
      if (actionKey.indexOf('flashActionValue-') === 0 && mutableStateProps[actionKey]) {
        mutableStateProps[actionKey].querySQL && flashFeaturesByQuery(tempJimuMapView, mutableStateProps[actionKey].layerDataSourceId, mutableStateProps[actionKey].querySQL)
        this.props.onMutableStatePropsChanged(this.props.dataSourceId, actionKey, null)
      }

      // handle filter action
      if (actionKey.indexOf('filterActionValue-') === 0 && mutableStateProps[actionKey]) {
        mutableStateProps[actionKey].querySQL?.length >= 0 && filterFeaturesByQuery(tempJimuMapView, mutableStateProps[actionKey].layerDataSourceId, mutableStateProps[actionKey].querySQL)
        this.props.onMutableStatePropsChanged(this.props.dataSourceId, actionKey, null)
      }

      return false
    })
  }

  handleActionForShowOnMapDatas (mutableStateProps: ActionRelatedProps, jimuMapView: JimuMapView): void {
    if (mutableStateProps.showOnMapDatas) {
      jimuMapView.drawDataOnMap(mutableStateProps.showOnMapDatas)
    }
  }

  handleActionForAddToMapDatas (mutableStateProps: ActionRelatedProps, jimuMapView: JimuMapView): void {
    if (mutableStateProps.addToMapDatas) {
      jimuMapView.addOrRemoveDataOnMap(mutableStateProps.addToMapDatas)
    }
  }
}
