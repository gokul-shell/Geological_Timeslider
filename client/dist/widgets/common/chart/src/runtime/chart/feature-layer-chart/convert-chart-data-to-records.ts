import { isSerialSeries } from '../../../utils/default'
import { type ChartTypes } from 'jimu-ui/advanced/chart'
import { ObjectIdField } from '../../../constants'

/**
 * Convert the matching coded label into coded value
 */
export const matchCodedValueLabel = (data: { [key: string]: any }) => {
  const domainFieldName = data.arcgis_charts_type_domain_field_name
  if (typeof domainFieldName !== 'string') return data
  const domainFieldValue = data.arcgis_charts_type_domain_id_value
  if (data[domainFieldName] && domainFieldValue) {
    data[domainFieldName] = domainFieldValue
  }
  return data
}

const createRecordsFromChartData = (data = [], dataSource) => {
  const records = data?.map((item, i) => {
    const feature = { attributes: null }
    let data = { ...item }
    data[ObjectIdField] = i
    data = matchCodedValueLabel(data)
    feature.attributes = data
    return dataSource.buildRecord(feature)
  })

  return records
}

export const getDataItems = (type: ChartTypes, detail) => {
  let items = []
  if (isSerialSeries(type) || type === 'pieSeries' || type === 'scatterSeries') {
    items = detail?.dataItems
  } else if (type === 'histogramSeries') {
    items = detail?.bins
  }
  return items
}

export default createRecordsFromChartData
