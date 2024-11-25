/** @jsx jsx */
import {
  type DataSource,
  React, css, hooks, jsx
} from 'jimu-core'
import { type StandardToolConfig, type FailedLayer, type HistoryItemWithDs, type ToolConfig } from '../../config'
import { AnalysisJobStatus, isEmptyDataItem, getServiceName } from 'analysis-shared-utils'
import { type GPDataType, type AnalysisToolDataItem } from 'analysis-ui-schema'
import defaultMessages from '../translations/default'
import { Alert, CollapsablePanel, DataActionList, DataActionListStyle, Link } from 'jimu-ui'
import { canDisplayAsLink, resulthasItemId } from '../utils'

interface Props {
  history: HistoryItemWithDs
  toolInfo: ToolConfig
  widgetId: string
  portal: __esri.Portal
}

interface ResultInfo {
  value: GPDataType
  id: string
  ds?: DataSource
  errorInfo?: FailedLayer
}

const { useEffect, useMemo, useState } = React

const style = css`
  .result-item {
    border: 1px solid var(--light-200);
    padding: 0.3125rem 0.75rem;
    &:not(:last-child) {
      margin-bottom: 0.5rem;
    }
    &:last-child {
      margin-bottom: 1rem;
    }
    .has-indent {
      padding-left: 0.75rem;
    }
    .layer-item {
      display: flex;
      align-items: center;
      &:not(:last-child) {
        margin-bottom: 0.5rem;
      }
      .label {
        flex: 1;
      }
    }
  }
`

const HistoryResultForStandrdTool = (props: Props) => {
  const { history, widgetId, toolInfo, portal } = props

  const { dsMap, dsCreateError } = history

  const translate = hooks.useTranslation(defaultMessages)

  const results = useMemo(() => {
    return history.results
      .filter((result) => !isEmptyDataItem(result.value as AnalysisToolDataItem))
      // eslint-disable-next-line @typescript-eslint/quotes
      .map((result, index) => {
        const id = `${index}`
        const ds = dsMap?.get(id)
        const errorInfo = dsCreateError?.get(id)
        return { value: result.value as GPDataType, id, ds, errorInfo } as ResultInfo
      })
  }, [history.results, dsMap, dsCreateError])

  const [groupedLayers, setGroupedlayers] = useState<Map<string, ResultInfo[]>>(new Map())
  const [failedLayers, setFailedLayers] = useState<FailedLayer[]>([])
  useEffect(() => {
    if (results) {
      const loadedResults = new Map<string, ResultInfo[]>()
      const failedResults: FailedLayer[] = []
      // check if the result has job_deleted string as result value.
      const resultsUnavailable = results.length === 1 && results.find((item) => item.value === AnalysisJobStatus.Deleted)
      if (!resultsUnavailable) {
        results.forEach((item) => {
          if (item.ds) {
            const serviceName = getServiceName((item.value as any)?.url ?? '')
            const items = loadedResults.get(serviceName)
            loadedResults.set(serviceName, items ? [...items, item] : [item])
          } else if (item.errorInfo) {
            if (!failedResults.find((comparativeLayer) => item.errorInfo.layerName === comparativeLayer.layerName)) {
              failedResults.push(item.errorInfo)
            }
          }
        })
      }
      setGroupedlayers(loadedResults)
      setFailedLayers(failedResults)
    }
  }, [results])

  const getNormalItem = (item: ResultInfo, name?: string) => {
    const { ds, value } = item
    const dsJson = ds.getDataSourceJson()

    const disableExport = !(toolInfo.config as StandardToolConfig).output.allowExportResults
    if (dsJson.disableExport !== disableExport) {
      const newDsJson = dsJson.setIn(['disableExport'], disableExport)
      ds.setDataSourceJson(newDsJson)
    }

    const label = name || ds.getDataSourceJson().label || ds.getDataSourceJson().sourceLabel
    const displayLink = canDisplayAsLink(value as __esri.ParameterValue['value'])

    const itemId = resulthasItemId(value as __esri.ParameterValue['value']) ? (value as any).itemId : ''
    const linkUrl = displayLink ? itemId && portal?.url ? `${portal.url.replace(/\/$/, '')}/home/item.html?id=${itemId}` : (value as any).url : ''

    return <div className='layer-item' key={item.id}>
      {displayLink
        ? <Link className='label' to={linkUrl} type='link' target='_blank' style={{ padding: 0, textAlign: 'left' }}>{label}</Link>
        : <span className='label'>{label}</span>}
      <DataActionList hideGroupTitle widgetId={widgetId} dataSets={[{ dataSource: ds, records: [], name: dsJson.label || dsJson.sourceLabel }]} listStyle={DataActionListStyle.Dropdown} buttonSize='sm' buttonType='tertiary' />
    </div>
  }

  const getFailedItem = (item: FailedLayer) => {
    return <div className='layer-item'>
      <Alert className='flex-shrink-0' css={css`padding-left: 0 !important; padding-right: 0 !important;`} buttonType='tertiary' form='tooltip' size='small' type='error' text={translate(item.reasonForFailure)} />
      <span className='label'>{item.layerName}</span>
    </div>
  }
  return <CollapsablePanel label={translate('result')} aria-label={translate('result')} type="default" defaultIsOpen>
    <div css={style}>
      {Array.from(groupedLayers.keys()).map((key: string) => {
        const value = groupedLayers.get(key)
        if (value !== undefined && value.length > 0) {
          return <CollapsablePanel className='result-item' label={key} type="default" defaultIsOpen={true} key={key}>
            <div className='has-indent'>
              {value.map((item) => {
                return getNormalItem(item)
              })}
            </div>
          </CollapsablePanel>
        }
        return null
      })}
      {failedLayers.map((failedItem) => <div className='result-item' key={failedItem.layerName}>{getFailedItem(failedItem)}</div>)}
    </div>
  </CollapsablePanel>
}

export default HistoryResultForStandrdTool
