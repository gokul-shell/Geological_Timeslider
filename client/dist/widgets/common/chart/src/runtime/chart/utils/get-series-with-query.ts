import { type FeatureLayerQueryParams, Immutable, type ImmutableArray, type ImmutableObject } from 'jimu-core'
import { isSerialSeries } from '../../../utils/default'
import { CategoryType, type WebChartSeries } from '../../../config'
import { getSeriesType } from 'jimu-ui/advanced/chart'
import { getCategoryType } from '../../../utils/common/serial'

const getSingleQueryForByGroup = (serie: ImmutableObject<WebChartSeries>, queries: ImmutableObject<FeatureLayerQueryParams>): ImmutableObject<WebChartSeries> => {
  const y = (serie as any).y
  const outStatistics = queries.outStatistics.filter((s) => s.outStatisticFieldName === y)
  const { groupByFieldsForStatistics, orderByFields, pageSize } = queries
  const query = Immutable({ groupByFieldsForStatistics, outStatistics, orderByFields, num: pageSize }) as any
  return serie.set('query', query)
}

const getSingleQueryForNoAggregation = (serie: ImmutableObject<WebChartSeries>, queries: ImmutableObject<FeatureLayerQueryParams>): ImmutableObject<WebChartSeries> => {
  const { groupByFieldsForStatistics, orderByFields, pageSize } = queries
  const query = Immutable({ groupByFieldsForStatistics, orderByFields, num: pageSize }) as any
  return serie.set('query', query)
}

const getSeriesWithQuery = (series: ImmutableArray<WebChartSeries>, query: ImmutableObject<FeatureLayerQueryParams>) => {
  let callback = null
  const type = getSeriesType(series as any)
  if (isSerialSeries(type) || type === 'pieSeries') {
    const outFields = query?.outFields
    if (outFields?.length) { //no aggregation
      callback = getSingleQueryForNoAggregation
    } else {
      const categoryType = getCategoryType(query)
      if (categoryType === CategoryType.ByGroup) {
        callback = getSingleQueryForByGroup
      }
    }
  }
  if (callback) {
    return series?.map((serie) => callback(serie, query))
  }
  return series
}

export default getSeriesWithQuery
