import { type FeatureLayerQueryParams, Immutable, type ImmutableArray, type ImmutableObject } from 'jimu-core'
import { type WebChartBarChartSeries, type WebChartHistogramSeries, type WebChartLineChartSeries, type WebChartPieChartSeries, type WebChartScatterPlotSeries, WebChartStackedKinds } from 'jimu-ui/advanced/chart'
import { getDefaultBarChartSeries, getDefaultHistogramSeries, getDefaultLineChartSeries, getDefaultPieChartSeries, getDefaultScatterPlotChartSeries } from '../../../../../../../utils/default'
import { CategoryType, type WebChartSeries } from '../../../../../../../config'

export interface SelectedOption {
  name: string
  value: string
}

/**
 * Create a default series based on the series properties.
 * @param seriesProps
 * @param index
 */
export const createDefaultSerie = (seriesProps: ImmutableObject<WebChartSeries>, index = 0, preSerieColor?: string): WebChartSeries => {
  if (!seriesProps) return null
  const { type = 'lineSeries', dataLabels, dataTooltipVisible } = seriesProps

  let serie = null
  if (type === 'barSeries') {
    const { fillSymbol, stackedType = WebChartStackedKinds.Side } = seriesProps as ImmutableObject<WebChartBarChartSeries>
    serie = getDefaultBarChartSeries(index, preSerieColor)
    serie.stackedType = stackedType

    if (fillSymbol) {
      serie.fillSymbol = fillSymbol
    }
  } else if (type === 'lineSeries') {
    const {
      stackedType = WebChartStackedKinds.Side,
      lineSmoothed = false,
      showArea = false,
      markerVisible = false,
      lineSymbol,
      markerSymbol
    } = seriesProps as ImmutableObject<WebChartLineChartSeries>

    serie = getDefaultLineChartSeries(index, preSerieColor)
    serie.stackedType = stackedType
    serie.lineSmoothed = lineSmoothed
    serie.showArea = showArea
    serie.markerVisible = markerVisible

    if (lineSymbol) {
      serie.lineSymbol = lineSymbol
    }

    if (markerSymbol) {
      serie.markerSymbol = markerSymbol
    }
  } else if (type === 'pieSeries') {
    const { innerRadius = 0, startAngle = 0, endAngle = 360 } = seriesProps as ImmutableObject<WebChartPieChartSeries>
    serie = getDefaultPieChartSeries()
    serie.innerRadius = innerRadius
    serie.startAngle = startAngle
    serie.endAngle = endAngle
  } else if (type === 'scatterSeries') {
    const { markerSymbol, overlays } = seriesProps as ImmutableObject<WebChartScatterPlotSeries>
    serie = getDefaultScatterPlotChartSeries()
    if (markerSymbol) {
      serie.markerSymbol = markerSymbol
    }
    if (overlays) {
      serie.overlays = overlays
    }
  } else if (type === 'histogramSeries') {
    const { fillSymbol, binCount, overlays } = seriesProps as ImmutableObject<WebChartHistogramSeries>
    serie = getDefaultHistogramSeries()
    serie.binCount = binCount
    if (overlays) {
      serie.overlays = overlays
    }
    if (fillSymbol) {
      serie.fillSymbol = fillSymbol
    }
  }

  if (dataLabels) {
    serie.dataLabels = dataLabels
  }

  if (dataTooltipVisible != null) {
    serie.dataTooltipVisible = dataTooltipVisible
  }

  return serie
}

/**
 * Get the used series by series id or index.
 * @param propSeries
 * @param id
 * @param index
 */
export const getUsedSeriesProps = (propSeries: ImmutableArray<WebChartSeries>, id: string, index: number = 0, preSerieColor?: string): ImmutableObject<WebChartSeries> => {
  let serie = propSeries.find((propSerie) => propSerie.id === id) as unknown as ImmutableObject<WebChartSeries>
  if (!serie) {
    const template = propSeries[index] ?? propSeries[0]
    const { type, dataLabels, dataTooltipVisible } = template
    const { stackedType } = template as ImmutableObject<WebChartBarChartSeries>
    const { lineSmoothed, showArea, markerVisible, markerSymbol } = template as ImmutableObject<WebChartLineChartSeries>
    const { innerRadius, startAngle, endAngle } = template as ImmutableObject<WebChartPieChartSeries>
    const seriesProps = Immutable({
      type,
      dataLabels,
      dataTooltipVisible,
      stackedType,
      lineSmoothed,
      showArea,
      markerVisible,
      markerSymbol,
      innerRadius,
      startAngle,
      endAngle
    }) as unknown as ImmutableObject<WebChartSeries>

    const defaultSerie = createDefaultSerie(seriesProps, index, preSerieColor)
    serie = Immutable(defaultSerie)
  }
  return serie
}

/**
 * Create the default by category type.
 * @param categoryType
 */
export const createDefaultQuery = (categoryType = CategoryType.ByGroup): FeatureLayerQueryParams => {
  if (categoryType === CategoryType.ByGroup) {
    return {
      groupByFieldsForStatistics: [],
      outStatistics: []
    }
  } else if (categoryType === CategoryType.ByField) {
    return {
      outStatistics: []
    }
  }
}
