import { React, type ImmutableObject, type UseDataSource, type IMState, ReactRedux, DataSourceStatus, CONSTANTS, type DataSource, type WidgetInitDragCallback } from 'jimu-core'
import { type ChartElementLimit, getSeriesType } from 'jimu-ui/advanced/chart'
import { type ChartTools, type IWebChart, type TemplateType } from '../../../config'
import Tools from '../tools'
import WithFeatureLayerChart from './with-feature-layer'
import { useChartRuntimeState } from '../../state'
import { getTemplateType } from '../../../utils/common'
import { ChartRoot, isWebChartValid, useWarningMessage } from '../components'

interface WebFeatureLayerChartPorps {
  className?: string
  widgetId: string
  webChart: ImmutableObject<IWebChart>
  tools: ImmutableObject<ChartTools>
  enableDataAction: boolean
  chartLimits?: Partial<ChartElementLimit>
  useDataSource: ImmutableObject<UseDataSource>
  defaultTemplateType: TemplateType
  onInitDragHandler: WidgetInitDragCallback
}

const useChartRendered = (dataSourceId: string, webChart: ImmutableObject<IWebChart>) => {
  const status = ReactRedux.useSelector((state: IMState) => state.dataSourcesInfo?.[dataSourceId]?.status)
  const valid = React.useMemo(() => isWebChartValid(webChart), [webChart])
  const render = (status && status !== DataSourceStatus.NotReady) && valid
  return { valid, render }
}

//Check whether the current data source is selected features view has no selection
const useEmptySelectionDataSource = (dataSource?: DataSource) => {
  const sourceVersion = ReactRedux.useSelector((state: IMState) => state.dataSourcesInfo?.[dataSource?.id]?.sourceVersion)
  const isSelectionDataSource = dataSource?.isDataView && dataSource?.dataViewId === CONSTANTS.SELECTION_DATA_VIEW_ID
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isSelectionDataSourceEmpty = React.useMemo(() => isSelectionDataSource && !dataSource.getRecords().length, [isSelectionDataSource, dataSource, sourceVersion])
  return isSelectionDataSourceEmpty
}

const WebFeatureLayerChart = (props: WebFeatureLayerChartPorps) => {
  const {
    widgetId,
    tools: propTools,
    enableDataAction = true,
    webChart,
    chartLimits,
    useDataSource,
    defaultTemplateType,
    onInitDragHandler
  } = props

  const { recordsStatus, dataSource } = useChartRuntimeState()

  const isSelectionDataSourceEmpty = useEmptySelectionDataSource(dataSource)

  const type = getSeriesType(webChart?.series as any)
  const showTools = propTools?.cursorEnable || !!propTools?.filter || enableDataAction
  const { valid, render } = useChartRendered(useDataSource?.dataSourceId, webChart)

  const showPlaceolder = !render || isSelectionDataSourceEmpty

  const templateType = getTemplateType(webChart)?.[1] || defaultTemplateType || 'column'
  const [messageType, message] = useWarningMessage(
    type,
    valid,
    useDataSource,
    recordsStatus,
    webChart?.series?.length ?? 0,
    isSelectionDataSourceEmpty
  )

  const tools = showTools
    ? (
    <Tools
      type={type}
      tools={propTools}
      widgetId={widgetId}
      enableDataAction={enableDataAction}
    />
      )
    : null
  return (
    <ChartRoot
      templateType={templateType}
      messageType={messageType}
      message={message}
      showLoading={recordsStatus === 'loading'}
      background={webChart?.background}
      className='web-feature-layer-chart'
      showPlaceholder={showPlaceolder}
      tools={tools}
    >
      <WithFeatureLayerChart
        className='web-chart'
        widgetId={widgetId}
        webChart={webChart}
        chartLimits={chartLimits}
        useDataSource={useDataSource}
        onInitDragHandler={onInitDragHandler}
      />
    </ChartRoot>
  )
}

export default WebFeatureLayerChart
