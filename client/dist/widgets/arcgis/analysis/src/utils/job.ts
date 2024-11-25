import { type LocaleItem, buildProcessInfoReport, getResultParams, updateItemProperties, isEmptyDataItem, formatAnalysisEngineSuffix } from 'analysis-shared-utils'
import { type ItemId, type AnalysisToolInfo } from 'analysis-ui-schema'
import { type HistoryItemWithDs, ToolType, type ToolConfig, type CustomToolConfig, type SynchronousJobExexuteResult } from '../config'
import memoize from 'lodash-es/memoize'
import { uuidv1, type ImmutableArray } from 'jimu-core'
import { getAnalysisAssetPath } from './strings'
import { type ExecuteProps } from 'analysis-core/dist/types/jobs/interfaces'
import { notifyJobStatus, notifyResultData } from './events'

export async function addProcessInfoToItems (results: __esri.ParameterValue[], processInfo?: string): Promise<void> {
  const itemUpdatePromises: Array<Promise<__esri.PortalItem>> = []
  results.forEach((result) => {
    // The result must have an item id for the process info to be added to the description
    const hasItemId = typeof result.value === 'object' && 'itemId' in result.value && !isEmptyDataItem(result.value.itemId)
    if (hasItemId && processInfo !== undefined) {
      const itemId = (result.value as ItemId).itemId
      itemUpdatePromises.push(updateItemProperties(itemId, { description: processInfo }))
    }
  })
  await Promise.all(itemUpdatePromises)
}

export async function waitForJobCompeletionAndGetResults (jobInfo: __esri.JobInfo, toolJSON: AnalysisToolInfo, statusCallback: (j: __esri.JobInfo) => void, gpMessages: LocaleItem, resultParamsName?: string[], formatResultFn?: (result: __esri.ParameterValue, resultParam: string, id: string) => Promise<__esri.ParameterValue>) {
  const options = {
    interval: 1500,
    statusCallback: (j: __esri.JobInfo) => {
      statusCallback(j)
    }
  }
  const resultParams = resultParamsName || getResultParams(toolJSON)
  try {
    await jobInfo.waitForJobCompletion(options)
    let processInfo: string | undefined
    if (resultParams.includes('processInfo')) {
      try {
        const processInfoParamValue = await jobInfo.fetchResultData('processInfo')
        processInfo = buildProcessInfoReport(processInfoParamValue.value as string[], gpMessages as { [key: string]: string })
        // We have processed it specially, delete in place
        const indexToDelete = resultParams.indexOf('processInfo')
        resultParams.splice(indexToDelete, 1)
      } catch {
        // no-op, process the rest of the results on fail
      }
    }
    const resultPromises = resultParams.map(async (resultParam, index) => {
      const result = await jobInfo.fetchResultData(resultParam)
      if (typeof formatResultFn === 'function') {
        return await formatResultFn(result, resultParam, `${index}`)
      }
      return result
    })
    const allResults = await Promise.allSettled(resultPromises)
    const results = allResults
      .map((res, index) => {
        if (res.status === 'fulfilled') {
          res.value.paramName = resultParams[index]
          return res
        }
        return res
      })
      .filter((res) => res.status === 'fulfilled')
      .map((fulfilledRes: PromiseFulfilledResult<__esri.ParameterValue>) => fulfilledRes.value)
    // Do not await so the result notifying is not waiting for the portal item to load
    addProcessInfoToItems(results, processInfo)
    return { results: results, jobInfo }
  } catch (e) {
    return { jobInfo }
  }
}

async function memoizeHelperFetchPath (path: string): Promise<any> {
  const response = await fetch(path)
  const results = await response.json()
  return results
}

export async function completeHistoryInfo (historyItem: HistoryItemWithDs, importedFromMap: boolean, toolList: ImmutableArray<ToolConfig>, gpMessages: LocaleItem) {
  let toolJSON: AnalysisToolInfo
  historyItem.isImportedFromMap = importedFromMap
  // If the history is imported from the map, this is a standard tool, get toolJson by toolName
  // if the history is not imported from the map, and the tool is a standard tool, get toolJson by toolName
  const toolInfo = toolList.asMutable().find((tool) => tool.id === historyItem.toolId)?.asMutable({ deep: true })
  // if importedFromMap is true, there will be no toolId, so toolInfo will be undefined
  if (importedFromMap || toolInfo.type === ToolType.Standard) {
    const lowercaseToolName = `${historyItem.toolName.toLowerCase()}${formatAnalysisEngineSuffix(historyItem.analysisEngine)}`
    const toolJsonPath = `${getAnalysisAssetPath()}assets/tool-json/${lowercaseToolName}.tool.json`
    try {
      toolJSON = await memoize(memoizeHelperFetchPath)(toolJsonPath) as AnalysisToolInfo
    } catch (error) {
      // if fetch toolJson failed, return historyItem directly
      return historyItem
    }
  } else {
    // If the history is not imported from the map, and the tool is a custom tool, get toolJson from toolInfo
    toolJSON = (toolInfo.config as CustomToolConfig).toolInfo
  }
  const { jobInfo, results } = await waitForJobCompeletionAndGetResults(historyItem.jobInfo, toolJSON, (jobInfo) => {}, gpMessages)

  return { jobInfo, results }
}

export async function executeJob (geoprocessor: __esri.geoprocessor, params: ExecuteProps, toolJson: AnalysisToolInfo, webToolServerUrl: string) {
  if (typeof geoprocessor?.submitJob !== 'function' || typeof geoprocessor?.execute !== 'function') {
    return
  }
  const {
    jobParamsPayload,
    jobParams,
    toolUiParameters,
    analysisEngine,
    analysisType,
    resultParams,
    containerElement,
    gpMessages
  } = params

  // for synchronous execution
  if (toolJson.executionType === 'esriExecutionTypeSynchronous') {
    // add fake jobId
    const jobId = uuidv1()
    notifyJobStatus(containerElement, {
      jobInfo: {
        jobId,
        jobStatus: 'job-submitted',
        messages: []
      } as __esri.JobInfo,
      submissionData: {
        toolName: toolJson.name,
        analysisEngine,
        analysisType,
        jobParams,
        toolUiParameters: toolUiParameters
      }
    })

    try {
      const res: SynchronousJobExexuteResult = await geoprocessor.execute(webToolServerUrl, jobParamsPayload)
      const { messages, results } = res

      notifyResultData(containerElement, {
        results: results,
        jobInfo: {
          jobId,
          jobStatus: 'job-succeeded',
          messages
        } as __esri.JobInfo
      })
    } catch (error) {
      notifyJobStatus(containerElement, {
        jobInfo: {
          jobId,
          jobStatus: 'job-failed',
          messages: Array.isArray(error?.details?.messages) ? error.details.messages.map((msg) => ({ description: msg, type: 'error' } as __esri.GPMessage)) : []
        } as __esri.JobInfo
      })
    }
    return
  }

  // for asynchronous execution
  const jobInfo = await geoprocessor.submitJob(webToolServerUrl, jobParamsPayload)
  notifyJobStatus(containerElement, {
    jobInfo,
    submissionData: {
      toolName: toolJson.name,
      analysisEngine,
      analysisType,
      jobParams,
      toolUiParameters
    }
  })

  const { results } = await waitForJobCompeletionAndGetResults(jobInfo, toolJson, (jobInfo) => {
    notifyJobStatus(containerElement, { jobInfo })
  }, gpMessages, resultParams)
  if (results) {
    notifyResultData(containerElement, { results, jobInfo })
  } else {
    notifyJobStatus(containerElement, { jobInfo })
  }
}
