import { type IMFieldSchema, DataSourceManager, type ImmutableObject, type JimuFieldType, type DataSource } from 'jimu-core'
import { getSeriesType, type WebChartPieChartSeries } from 'jimu-ui/advanced/chart'
import { type IWebChart, type ChartType, type TemplateType, CategoryType } from '../../config'
import { getCategoryType, getSeriaLlineShowArea, getSeriaLlineSmoothed } from './serial'
import { isSerialSeries } from '../default'

const cacheObjectIdField = {}
/**
 * get objectid
 * @param dataSourceId
 */
export const getObjectIdField = (dataSourceId: string): string | undefined => {
  if (cacheObjectIdField[dataSourceId] != null) return cacheObjectIdField[dataSourceId]
  const ds = DataSourceManager.getInstance().getDataSource(dataSourceId)
  if (ds == null) {
    console.error(`Invalid data source id: ${dataSourceId}`)
    return
  }
  const objectId = ds.getIdField()
  cacheObjectIdField[dataSourceId] = objectId
  return objectId
}

const cacheFieldSchema = {}
/**
 * Get the schema of a single field
 * @param jimuFieldName
 * @param dataSourceId
 */
export const getFieldSchema = (
  jimuFieldName: string,
  dataSourceId: string
): IMFieldSchema | undefined => {
  if (cacheFieldSchema[jimuFieldName] != null) return cacheFieldSchema[jimuFieldName]
  const ds = DataSourceManager.getInstance().getDataSource(dataSourceId)
  const dsSchema = ds?.getSchema()
  const fieldSchema = dsSchema?.fields?.[jimuFieldName]
  cacheFieldSchema[jimuFieldName] = fieldSchema
  return fieldSchema
}

const cacheFieldsSchema = {}

/**
 * Get all the field schema in a data source
 * @param dataSourceId
 */
export const getFieldsSchema = (
  dataSourceId: string
): { [jimuName: string]: IMFieldSchema } | undefined => {
  if (cacheFieldsSchema[dataSourceId] != null) return cacheFieldsSchema[dataSourceId]
  const ds = DataSourceManager.getInstance().getDataSource(dataSourceId)
  const dsSchema = ds?.getSchema()
  const fieldsSchema = dsSchema?.fields
  cacheFieldsSchema[dataSourceId] = fieldsSchema
  return fieldsSchema
}

/**
 * Get the field type.
 * @param jimuFieldName
 * @param dataSourceId
 */
export const getFieldType = (
  jimuFieldName: string,
  dataSourceId: string
): JimuFieldType => {
  const fieldSchema = getFieldSchema(jimuFieldName, dataSourceId)
  return fieldSchema?.type
}

/**
 * Get the template type of the current series.
 * @param series
 * @param fallbackType
 */
export const getTemplateType = (webChart: ImmutableObject<IWebChart>): [ChartType, TemplateType] => {
  const series = webChart?.series
  const seriesType = getSeriesType(series as any) ?? 'barSeries'

  const serie = series?.[0] as ImmutableObject<WebChartPieChartSeries>
  let type: ChartType
  let subType: TemplateType
  if (!serie) return [] as any
  if (seriesType === 'barSeries') {
    const stackedType = (serie as any).stackedType
    const rotated = webChart?.rotated ?? false
    const suffix = rotated ? 'bar' : 'column'
    const prefix = stackedType === 'sideBySide' ? '' : stackedType
    type = suffix
    subType = (prefix ? `${prefix}-${suffix}` : suffix) as TemplateType
  } else if (seriesType === 'lineSeries') {
    const showArea = getSeriaLlineShowArea(series)
    const lineSmoothed = getSeriaLlineSmoothed(series)

    const suffix = showArea ? 'area' : 'line'
    let prefix = ''
    if (lineSmoothed) {
      prefix = 'smooth'
    }
    type = suffix
    subType = (prefix ? `${prefix}-${suffix}` : suffix) as TemplateType
  } else if (seriesType === 'pieSeries') {
    type = 'pie'
    const innerRadius = serie?.innerRadius ?? 0
    subType = innerRadius > 0 ? 'donut' : 'pie'
  } else if (seriesType === 'scatterSeries') {
    type = 'scatter'
    subType = 'scatter'
  } else if (seriesType === 'histogramSeries') {
    type = 'histogram'
    subType = 'histogram'
  }

  return [type, subType]
}

/**
 * Capitalize the first letter of a string.
 * @param str
 * @returns {string}
 */
export const capitalizeString = (str: string) => {
  if (typeof str === 'string') {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
  return null
}

export const whetherUseIdFieldForNonCount = (webChart: ImmutableObject<IWebChart>, dataSource: DataSource) => {
  if (!dataSource) return false
  const statysticsType = webChart?.dataSource?.query?.outStatistics?.[0]?.statisticType
  if (statysticsType === 'count') return false

  const usedFields = webChart?.series?.map((serie) => serie.id)
  if (!usedFields?.length) return false
  const idFIeld = dataSource.getIdField()
  return usedFields.includes(idFIeld)
}

export const whetherUseInlineDataSource = (webChart: ImmutableObject<IWebChart>, dataSource: DataSource) => {
  const seriesType = getSeriesType(webChart?.series as any)
  const isPieOrSerialChart = isSerialSeries(seriesType) || seriesType === 'pieSeries'
  if (!isPieOrSerialChart) return false
  const categoryType = getCategoryType(webChart?.dataSource?.query)
  if (categoryType === CategoryType.ByField) return true

  const useIdFieldForNonCount = whetherUseIdFieldForNonCount(webChart, dataSource)
  return useIdFieldForNonCount
}
