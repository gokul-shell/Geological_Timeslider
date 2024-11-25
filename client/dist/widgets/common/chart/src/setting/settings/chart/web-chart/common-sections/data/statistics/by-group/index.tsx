import { React, type ImmutableArray, type UseDataSource, Immutable, type ImmutableObject, hooks, JimuFieldType } from 'jimu-core'
import { defaultMessages as jimuiDefaultMessage } from 'jimu-ui'
import { type ChartStatisticType, type ChartDataSource, type WebChartSeries } from '../../../../../../../../config'
import { SettingRow } from 'jimu-ui/advanced/setting-components'
import { FieldSelector, SorteSetting } from '../../../../components'
import defaultMessages from '../../../../../../../translations/default'
import { getFieldType, getObjectIdField } from '../../../../../../../../utils/common'
import { createByGroupQuery, createByGroupSeries, fetchFieldRange, getByGroupOrderFields, getAppropriateTimeUnit, getParsedOrderByField } from './utils'
import { getSeriesType, type ChartTypes, type WebChartLineChartSeries, type WebChartTimeIntervalUnits, type WebChartTimeAggregationTypes, type WebChartNullPolicyTypes } from 'jimu-ui/advanced/chart'
import { isSerialSeries } from '../../../../../../../../utils/default'
import { getDefaultValueFormat, getStatisticsType } from '../../../../../../../../utils/common/serial'
import StatisticsSelector from '../statistics-selector'
import { TimeBinning } from './time-binning'
import { type SeriesRelatedProps } from '../type'

export interface ByGroupDataProps {
  type: ChartTypes
  series: ImmutableArray<WebChartSeries>
  chartDataSource: ImmutableObject<ChartDataSource>
  useDataSources: ImmutableArray<UseDataSource>
  supportPercentile?: boolean
  onChange?: (series: ImmutableArray<WebChartSeries>, seriesRelatedProps: SeriesRelatedProps) => void
}

const defaultChartDataSource = Immutable({}) as ImmutableObject<ChartDataSource>

export const ByGroupData = (props: ByGroupDataProps): React.ReactElement => {
  const translate = hooks.useTranslation(defaultMessages, jimuiDefaultMessage)
  const {
    type = 'barSeries',
    chartDataSource: propChartDataSource = defaultChartDataSource,
    useDataSources,
    series: propSeries,
    supportPercentile,
    onChange
  } = props

  const [loadingDate, setLoadingDate] = React.useState(false)
  const dataSourceId = useDataSources?.[0]?.dataSourceId
  const objectidField = React.useMemo(() => getObjectIdField(dataSourceId), [dataSourceId])
  const seriesType = getSeriesType(propSeries as any)
  const query = propChartDataSource.query
  const categoryField = query?.groupByFieldsForStatistics?.[0] ?? ''
  const outStatistics = query?.outStatistics
  const outFields = query?.outFields

  const categoryFieldType = getFieldType(categoryField, dataSourceId)
  const isTimeBinning = categoryFieldType === JimuFieldType.Date && seriesType === 'lineSeries'

  const timeIntervalSize = (propSeries?.[0] as unknown as WebChartLineChartSeries)?.timeIntervalSize
  const timeIntervalUnits = (propSeries?.[0] as unknown as WebChartLineChartSeries)?.timeIntervalUnits
  const timeAggregationType = (propSeries?.[0] as unknown as WebChartLineChartSeries)?.timeAggregationType
  const nullPolicy = (propSeries?.[0] as unknown as WebChartLineChartSeries)?.nullPolicy
  const trimIncompleteTimeInterval = (propSeries?.[0] as unknown as WebChartLineChartSeries)?.trimIncompleteTimeInterval

  let numericFields = outFields || outStatistics?.map((outStatistic) => outStatistic.onStatisticField)?.filter(field => !!field)
  if (!numericFields?.length && !categoryField) {
    numericFields = Immutable([objectidField])
  }
  const statisticType = getStatisticsType(query) ?? 'count'
  const pageSize = !isTimeBinning ? query?.pageSize : undefined

  const orderFields = React.useMemo(() => getByGroupOrderFields(query, translate), [query, translate])
  const orderByFields = query?.orderByFields
  const orderByField = React.useMemo(() => getParsedOrderByField(orderByFields?.[0], orderFields), [orderByFields, orderFields])

  const hideNumericFields = numericFields?.length === 1 && statisticType === 'count'
  const isNumericFieldsMultiple = isSerialSeries(type)

  const handleCategoryFieldChange = async (fields: ImmutableArray<string>): Promise<void> => {
    const categoryField = fields?.[0]
    const categoryFieldType: JimuFieldType = getFieldType(categoryField, dataSourceId)
    const isDateType = categoryFieldType === JimuFieldType.Date
    const useTimeBinning = isDateType && seriesType === 'lineSeries'
    const orderByFields = [`${categoryField} ASC`]
    if (useTimeBinning) {
      setLoadingDate(true)
      fetchFieldRange(categoryField, dataSourceId).then(([startTime, endTime]) => {
        const timeIntervalUnits = getAppropriateTimeUnit(startTime, endTime)
        const series = createByGroupSeries({ categoryField, statisticType, numericFields, propSeries, timeIntervalUnits }, dataSourceId)
        const query = createByGroupQuery({ categoryField, statisticType, numericFields }, orderByFields, pageSize)
        const valueFormat = getDefaultValueFormat(categoryFieldType)
        const chartDataSource = propChartDataSource.set('query', query)
        onChange(Immutable(series), { chartDataSource, query, valueFormat })
        setLoadingDate(false)
      }).catch((error) => {
        setLoadingDate(false)
        console.error(error)
      })
    } else {
      const series = createByGroupSeries({ categoryField, statisticType, numericFields, propSeries }, dataSourceId)
      const query = createByGroupQuery({ categoryField, statisticType, numericFields }, orderByFields, pageSize)
      const valueFormat = getDefaultValueFormat(categoryFieldType)
      const chartDataSource = propChartDataSource.set('query', query)
      onChange(Immutable(series), { chartDataSource, query, valueFormat })
    }
  }

  const handleStatisticTypeChange = (statisticType: ChartStatisticType): void => {
    let _numericFields = numericFields
    if (statisticType === 'count') {
      _numericFields = Immutable([objectidField])
    } else {
      if (numericFields?.[0] === objectidField) {
        _numericFields = Immutable([])
      }
    }
    const orderByFields = [`${categoryField} ASC`]
    const series = createByGroupSeries({ categoryField, statisticType, numericFields: _numericFields, propSeries, timeIntervalUnits }, dataSourceId)
    const query = createByGroupQuery({ categoryField, statisticType, numericFields: _numericFields }, orderByFields, pageSize)
    const chartDataSource = propChartDataSource.set('query', query)
    onChange(Immutable(series), { chartDataSource, query })
  }

  const handleNumericFieldsChange = (numericFields: ImmutableArray<string>): void => {
    const orderByFields = [`${categoryField} ASC`]
    const series = createByGroupSeries({ categoryField, statisticType, numericFields, propSeries, timeIntervalUnits }, dataSourceId)
    const query = createByGroupQuery({ categoryField, statisticType, numericFields }, orderByFields, pageSize)
    const chartDataSource = propChartDataSource.set('query', query)
    onChange(Immutable(series), { chartDataSource, query })
  }

  const handleTimeIntervalChange = (size: number, unit: WebChartTimeIntervalUnits) => {
    const series = propSeries.map((serie) => {
      return serie.set('timeIntervalSize', size).set('timeIntervalUnits', unit)
    }) as unknown as ImmutableArray<WebChartSeries>
    onChange(series, { chartDataSource: propChartDataSource })
  }

  const handleTimeAggregationTypeChange = (value: WebChartTimeAggregationTypes) => {
    const series = propSeries.map((serie) => {
      return serie.set('timeAggregationType', value)
    }) as unknown as ImmutableArray<WebChartSeries>
    onChange(series, { chartDataSource: propChartDataSource })
  }

  const handleNullPolicyChange = (value: WebChartNullPolicyTypes) => {
    const series = propSeries.map((serie) => {
      return serie.set('nullPolicy', value)
    }) as unknown as ImmutableArray<WebChartSeries>
    onChange(series, { chartDataSource: propChartDataSource })
  }

  const handleTrimIncompleteTimeIntervalChange = (value: boolean) => {
    const series = propSeries.map((serie) => {
      return serie.set('trimIncompleteTimeInterval', value)
    }) as unknown as ImmutableArray<WebChartSeries>
    onChange(series, { chartDataSource: propChartDataSource })
  }

  const handleOrderChanged = (value: string): void => {
    const query = createByGroupQuery({ categoryField, statisticType, numericFields }, [value], pageSize)
    const chartDataSource = propChartDataSource.set('query', query)
    onChange(propSeries, { chartDataSource })
  }

  return (
    <>
      <SettingRow label={translate('categoryField')} flow='wrap'>
        <FieldSelector
          className='category-field-selector'
          type='category'
          hideDateField={seriesType === 'pieSeries'}
          aria-label={translate('categoryField')}
          useDataSources={useDataSources}
          isMultiple={false}
          fields={categoryField ? Immutable([categoryField]) : undefined}
          onChange={handleCategoryFieldChange}
        />
      </SettingRow>

      <SettingRow label={translate('statistics')} flow='wrap'>
        <StatisticsSelector
          hideCount={false}
          disabled={!categoryField}
          hideNoAggregation={seriesType === 'pieSeries'}
          hidePercentileCount={!supportPercentile}
          value={statisticType}
          aria-label={translate('statistics')}
          onChange={handleStatisticTypeChange}
        />
      </SettingRow>
      {!hideNumericFields &&
        <>
          <SettingRow label={translate('numberFields')} flow='no-wrap'></SettingRow>
          <FieldSelector
            hideIdField={true}
            disabled={!categoryField}
            className='numeric-fields-selector mt-2 mb-3'
            type='numeric'
            aria-label={translate('numberFields')}
            isMultiple={isNumericFieldsMultiple}
            useDataSources={useDataSources}
            fields={numericFields}
            onChange={handleNumericFieldsChange}
          />
        </>}

        {
          isTimeBinning && (
            <>
              <SettingRow label={translate('timeBinningOptions')} flow='no-wrap'></SettingRow>
              <TimeBinning
                className='mt-2 mb-3'
                loading={loadingDate}
                timeIntervalSize={timeIntervalSize}
                timeIntervalUnits={timeIntervalUnits}
                timeAggregationType={timeAggregationType}
                nullPolicy={nullPolicy}
                trimIncompleteTimeInterval={trimIncompleteTimeInterval}
                onTimeIntervalChange={handleTimeIntervalChange}
                onTimeAggregationTypeChange={handleTimeAggregationTypeChange}
                onNullPolicyChange={handleNullPolicyChange}
                onTrimIncompleteTimeIntervalChange={handleTrimIncompleteTimeIntervalChange}
              />
            </>
          )
        }

{ !isTimeBinning && <SettingRow label={translate('sortBy')} flow='wrap'>
        <SorteSetting
          aria-label={translate('sortBy')}
          value={orderByField}
          fields={orderFields}
          disabled={!categoryField}
          onChange={handleOrderChanged}
        />
      </SettingRow>}
    </>
  )
}
