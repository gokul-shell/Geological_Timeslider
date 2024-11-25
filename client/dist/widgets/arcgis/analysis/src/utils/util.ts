import { React, type ImmutableObject, MessageManager, DataSourcesChangeType, DataSourcesChangeMessage, type DataSource, DataSourceManager, getAppStore, esri, SessionManager, ServiceManager, css, type hooks, ReactRedux, type IMState, type UtilitiesJson, EsriFieldType, type ImmutableArray } from 'jimu-core'
import { ToolType, type CustomToolConfig, type ToolConfig } from '../config'
import { type IItemAdd, type ICreateItemOptions, type ICreateItemResponse } from '@esri/arcgis-rest-portal'

import { toCamelToolName, type LocaleItem, convertEsriMessageType } from 'analysis-shared-utils'
import { AnalysisToolParamDataType, type AnalysisToolInfo, type GPFeatureRecordSetLayer, LayerFilterType, type AnalysisEngine, type AnalysisToolItem, UserPrivileges } from 'analysis-ui-schema'
import { useToolInfoStrings } from './strings'

const toolIconByToolName = new Map([
  // Group: SummarizeData
  ['AggregatePoints', require('jimu-icons/svg/outlined/gis/service-aggregate-points.svg')],
  ['JoinFeatures', require('jimu-icons/svg/outlined/gis/service-join-features.svg')],
  ['SummarizeCenterAndDispersion', require('jimu-icons/svg/outlined/gis/summarize-center-dispersion.svg')],
  ['SummarizeNearby', require('jimu-icons/svg/outlined/gis/service-summarize-nearby.svg')],
  ['SummarizeWithin', require('jimu-icons/svg/outlined/gis/service-summarize-within.svg')],

  // Group: FindLocations
  ['FindCentroids', require('jimu-icons/svg/outlined/gis/service-find-centroids.svg')],
  ['CreateViewshed', require('jimu-icons/svg/outlined/gis/service-create-viewshed.svg')],
  ['ChooseBestFacilities', require('jimu-icons/svg/outlined/gis/choose-best-facilities.svg')],
  ['FindExistingLocations', require('jimu-icons/svg/outlined/gis/find-by-attributes-and-locations.svg')],
  ['FindSimilarLocations', require('jimu-icons/svg/outlined/gis/find-similar-locations.svg')],
  ['CreateWatersheds', require('jimu-icons/svg/outlined/gis/service-create-watershed.svg')],
  ['TraceDownstream', require('jimu-icons/svg/outlined/gis/service-trace-downstream.svg')],

  // Group: DataEnrichment
  ['EnrichLayer', require('jimu-icons/svg/outlined/gis/service-enrich-layer.svg')],

  // Group: AnalyzePatterns
  ['CalculateDensity', require('jimu-icons/svg/outlined/gis/calculate-density.svg')],
  ['FindHotSpots', require('jimu-icons/svg/outlined/gis/service-find-hot-spots.svg')],
  ['FindOutliers', require('jimu-icons/svg/outlined/gis/service-find-outliers.svg')],
  ['FindPointClusters', require('jimu-icons/svg/outlined/gis/find-point-clusters.svg')],
  ['InterpolatePoints', require('jimu-icons/svg/outlined/gis/interpolate-points.svg')],

  // Group: UseProximity
  ['CreateBuffers', require('jimu-icons/svg/outlined/gis/create-buffers.svg')],
  ['CreateDriveTimeAreas', require('jimu-icons/svg/outlined/gis/generate-travel-areas.svg')],
  ['PlanRoutes', require('jimu-icons/svg/outlined/gis/plan-routes.svg')],
  ['FindNearest', require('jimu-icons/svg/outlined/gis/service-find-closest.svg')],
  ['ConnectOriginsToDestinations', require('jimu-icons/svg/outlined/gis/calculate-travel-cost.svg')],

  // Group: ManageData
  ['DissolveBoundaries', require('jimu-icons/svg/outlined/gis/dissolve-boundaries.svg')],
  ['ExtractData', require('jimu-icons/svg/outlined/gis/extract-data.svg')],
  ['GenerateTessellations', require('jimu-icons/svg/outlined/gis/generate-tessellations.svg')],
  ['OverlayLayers', require('jimu-icons/svg/outlined/gis/overlay-layers.svg')],
  ['MergeLayers', require('jimu-icons/svg/outlined/gis/merge-layers.svg')]
])

export function getIconByToolName (toolName: string) {
  return toolIconByToolName.get(toolName) || require('jimu-icons/svg/outlined/application/hammer.svg')
}

export function getDisplayedToolName (toolInfoStrings: LocaleItem, toolInfo: ImmutableObject<ToolConfig> | ToolConfig, utilities: ImmutableObject<UtilitiesJson>) {
  if (!toolInfo) {
    return ''
  }
  if (toolInfo.type === ToolType.Standard) {
    return toolInfoStrings?.[toCamelToolName(toolInfo.toolName)] as string || toolInfo.toolName
  }
  const toolConfig = (toolInfo.config as CustomToolConfig)
  if (toolConfig.utility) {
    const { utilityId, task } = toolConfig.utility
    const utilityJson = utilities?.[utilityId]
    if (task) {
      const taskInfo = utilityJson && utilityJson.tasks ? utilityJson.tasks.find((t) => t.name === task) : null
      if (taskInfo && taskInfo.label) {
        return taskInfo.label
      }
    } else if (utilityJson && utilityJson.label) {
      return utilityJson.label
    }
  }
  return (toolInfo.config as CustomToolConfig).toolInfo.displayName || toolInfo.toolName
}

export const useGetDisplayedToolName = () => {
  const utilitiesState = ReactRedux.useSelector((state: IMState) => {
    if (window.jimuConfig.isBuilder) {
      return state.appStateInBuilder.appConfig.utilities
    }
    return state.appConfig.utilities
  })
  const toolInfoStrings = useToolInfoStrings()

  return (toolInfo: ImmutableObject<ToolConfig> | ToolConfig) => {
    return getDisplayedToolName(toolInfoStrings, toolInfo, utilitiesState)
  }
}

export const getCustomToolParamDisplayName = (toolJson: AnalysisToolInfo, paramName: string) => {
  return toolJson.parameters?.find((param) => param.name === paramName)?.displayName ?? paramName
}

export function destroyDataSources (dsMapArray: Array<Map<string, DataSource>>, widgetId: string, publishMessage = true): Promise<void> {
  const dataSources = dsMapArray.reduce((acc, dsMap) => {
    dsMap.forEach((ds) => {
      acc.push(ds)
    })
    return acc
  }, [])
  // publish message
  if (publishMessage && dataSources.length > 0) {
    const dataSourcesChangeMessage = new DataSourcesChangeMessage(widgetId, DataSourcesChangeType.Remove, dataSources)
    MessageManager.getInstance().publishMessage(dataSourcesChangeMessage)
  }

  return Promise.resolve().then(() => {
    dataSources.forEach(ds => {
      DataSourceManager.getInstance().destroyDataSource(ds.id)
    })
  })
}

/**
 * TODO can delete this and import from analysius-shared-utils once they support custom tools and handle with 'string', 'number', 'boolean' type
 * Copy from analysis-shared-utils. beacuse if message.description is number, JSON.parse will not thow error, but 'cost' in parsedMessage will and the error is not catched, must catch the error here.
 * Filters the messages for a historyItem to not include extraneous messages.
 * Part of the intended effect here is to reduce storage size.
 * @param {__esri.GPMessage[]} messages the messages to be filtered
 * @returns {__esri.GPMessage[]} the filtered messages
 */
export function filterHistoryItemMessages (messages: __esri.GPMessage[], toolType: ToolType): __esri.GPMessage[] {
  if (!messages?.length) {
    return []
  }
  const convertedMessages = messages.map((msg) => {
    msg.type = convertEsriMessageType(msg.type) as __esri.GPMessage['type']
    return msg
  })
  return convertedMessages.filter((message: __esri.GPMessage) => {
    let parsedMessage: { [key: string]: string }
    try {
      parsedMessage = JSON.parse(message.description)
      // JSON.parse retrun type: The Object, Array, string, number, boolean, or null value corresponding to the given JSON text.
      const parsedMessageType = typeof parsedMessage
      if (['number', 'string', 'boolean'].includes(parsedMessageType) || parsedMessage === null) {
        parsedMessage = { description: parsedMessage as any }
      }
    } catch (e) {
      parsedMessage = { description: message.description }
    }

    const isCreditMessage = 'cost' in parsedMessage
    const isTranslatableMessage = 'messageCode' in parsedMessage

    if (toolType === ToolType.Standard) {
      return (message.type === 'warning' || message.type === 'error') && (isCreditMessage || isTranslatableMessage)
    }
    // if custom tool, show all warning and error messages
    return message.type === 'warning' || message.type === 'error'
  })
}

export function getEnumerableObjectFromAccessor (accessor: __esri.Accessor): { [key: string]: any } {
  let obj = {}
  if (typeof (accessor as any)?.keys === 'function' && (accessor as any)?.keys()?.length) {
    const keys = (accessor as any)?.keys()
    keys.forEach((key) => {
      obj[key] = accessor?.[key]
    })
  } else {
    obj = accessor
  }
  return obj
}

async function addItem (item: IItemAdd, option: Partial<ICreateItemOptions> = {}): Promise<ICreateItemResponse> {
  const sessionManager = SessionManager.getInstance()

  const portalUrl = getAppStore().getState().portalUrl

  return esri.restPortal.createItem({ ...option, item, authentication: sessionManager.getSessionByUrl(portalUrl) })
}

export async function createFeatureSetItem (featureSetJson: { [key: string]: any }, name: string, itemName: string): Promise<GPFeatureRecordSetLayer> {
  const portal = getAppStore().getState().portalSelf.asMutable()
  if (!portal.user) {
    try {
      await SessionManager.getInstance().signIn()
    } catch (error) {
      return null
    }
  }
  const layerDefinition = {
    name,
    type: 'Feature Layer',
    geometryType: featureSetJson.geometryType,
    fields: featureSetJson.fields,
    objectIdField: featureSetJson.fields?.find((f) => f.type === 'esriFieldTypeOID')?.name
  }

  const featureCollection = {
    layers: [{
      layerDefinition: layerDefinition,
      featureSet: featureSetJson
    }]
  }

  const item: IItemAdd = {
    title: itemName,
    type: 'Feature Collection',
    spatialReference: featureSetJson.spatialReference,
    typeKeywords: ['Feature Collection', 'Singlelayer'],
    text: JSON.stringify(featureCollection)
  }

  try {
    const result = await addItem(item, null)
    return {
      itemId: result.id
    }
  } catch (e) {
    console.error(e)
  }
  return null
}

export function wait (time: number = 0) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

export const useAnalysisComponentDefined = (tagName: string) => {
  const [defined, setDefined] = React.useState(false)
  React.useEffect(() => {
    customElements.whenDefined(tagName).then(function () {
      setDefined(true)
    })
  }, [])
  return defined
}

export function depthTraversalProcessingValue<T> (value: __esri.ParameterValue['value'], rootId: string, callback: (...args: any) => T) {
  if (Array.isArray(value)) {
    return value.map((v, index) => {
      const id = `${rootId}-${index}`
      return depthTraversalProcessingValue(v, id, callback)
    })
  }
  return callback(rootId, value)
}

export function setValueToResultById (id: string, result: __esri.ParameterValue, newValue: any) {
  const keys = id.split('-').map((n) => Number(n)).slice(1)
  // if no keys, change the value directly
  if (!keys.length) {
    result.value = newValue as __esri.ParameterValue['value']
    return
  }
  const finalKey = keys.pop()
  let target = result.value
  keys.forEach((k) => {
    target = target[k]
  })
  target[finalKey] = newValue
}

export function useUpdateObjectByStateEffect<T, K> (obj: T, state: K, key: string, callback?: () => void) {
  React.useEffect(() => {
    if (!obj) {
      return
    }
    obj[key] = state ?? undefined
    if (callback) {
      callback()
    }
  }, [state, obj])
}

export function isLayerInputType (dataType: string) {
  return ([
    AnalysisToolParamDataType.GPFeatureRecordSetLayer,
    AnalysisToolParamDataType.GPMultiValueFeatureRecordSetLayer,
    AnalysisToolParamDataType.GPRecordSet,
    AnalysisToolParamDataType.GPMultiValueRecordSet,
    AnalysisToolParamDataType.GPRasterDataLayer
  ] as string[]).includes(dataType)
}

export function isNumberInput (dataType: string) {
  return ([
    AnalysisToolParamDataType.GPDouble,
    AnalysisToolParamDataType.GPMultiValueDouble,
    AnalysisToolParamDataType.GPLong
  ] as string[]).includes(dataType)
}

export function getLayerFilterTypeByParameterFilter (list: string[], dataType: AnalysisToolParamDataType) {
  if (!list?.length) {
    if (dataType === AnalysisToolParamDataType.GPRasterDataLayer) {
      return [LayerFilterType.Imagery_All]
    }
    return [LayerFilterType.Feature_All, LayerFilterType.Feature_Table]
  }
  const map = new Map([
    ['esriGeometryPoint', LayerFilterType.Feature_Point],
    ['esriGeometryMultipoint', LayerFilterType.Feature_MultiPoint],
    ['esriGeometryPolyline', LayerFilterType.Feature_Line],
    ['esriGeometryPolygon', LayerFilterType.Feature_Polygon]
  ])
  const typeSet = new Set<LayerFilterType>()
  list?.forEach((type: string) => {
    if (dataType === AnalysisToolParamDataType.GPRasterDataLayer) {
      typeSet.add(LayerFilterType.Imagery_All)
    }
    const layerFilterType = map.get(type)
    if (layerFilterType) {
      typeSet.add(layerFilterType)
    } else {
      typeSet.add(LayerFilterType.Feature_All)
      typeSet.add(LayerFilterType.Feature_Table)
    }
  })
  return Array.from(typeSet)
}

export function getCustomToolUrlWithToken (url) {
  const isHosted = !!ServiceManager.getInstance().getServerInfoByServiceUrl(url)?.owningSystemUrl
  if (isHosted) {
    const token = SessionManager.getInstance().getSessionByUrl(url)?.token
    return token ? `${url}?token=${token}` : url
  }
  return url
}

export function getLimitLineContentStyle (line: number = 2) {
  return css`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    word-break: break-word;
    -webkit-line-clamp: ${line};
  `
}

export function getValidToolsList (activeAnalysisEngines: AnalysisEngine[], userHasNaPrivilege: boolean, toolsArray: AnalysisToolItem[]): AnalysisToolItem[] {
  const toolsWithAnalysisEngine = toolsArray.filter((tool: AnalysisToolItem) => {
    const engineMatches = activeAnalysisEngines.includes(tool.analysisEngine)
    const privilegeMatches = tool.privilegeRequirements !== undefined && tool.privilegeRequirements.includes(UserPrivileges.Network) ? userHasNaPrivilege : true

    return engineMatches && privilegeMatches
  })

  return toolsWithAnalysisEngine
}

export function getUnitChioceListAndLabels (translate: ReturnType<typeof hooks.useTranslation>) {
  return {
    unitChoiceList: ['esriMeters', 'esriKilometers', 'esriFeet', 'esriMiles', 'esriNauticalMiles', 'esriYards'],
    choiceListLabels: {
      esriMeters: translate('unitsLabelMeters'),
      esriKilometers: translate('unitsLabelKilometers'),
      esriFeet: translate('unitsLabelFeet'),
      esriMiles: translate('unitsLabelMiles'),
      esriNauticalMiles: translate('unitsLabelNauticalMiles'),
      esriYards: translate('unitsLabelYards')
    }
  }
}

export function resultValueIsFeatureSet (value: __esri.ParameterValue['value'] | GPFeatureRecordSetLayer): value is __esri.FeatureSet {
  return value != null && typeof value === 'object' && 'features' in value && Array.isArray(value.features)
}

export function getAnalysisFieldTypeByEsriType (esriFieldType: EsriFieldType): string {
  // eg: esriFieldTypeInteger -> integer esriFieldTypeSmallInteger -> small-integer
  if (!esriFieldType.startsWith('esriFieldType')) {
    return esriFieldType
  }
  if (esriFieldType === EsriFieldType.SmallInteger) {
    return 'small-integer'
  }
  if (esriFieldType === EsriFieldType.GlobalID) {
    return 'global-id'
  }
  return esriFieldType.slice(13).toLowerCase()
}

export function deleteToolsHasNoMatchedUtility (toolList: ImmutableArray<ToolConfig>, utilitiesState: ImmutableObject<UtilitiesJson>) {
  return toolList.filter((tool) => {
    if (tool.type === ToolType.Standard) {
      return true
    }
    const utility = (tool.config as ImmutableObject<CustomToolConfig>).utility
    const { utilityId } = utility || {}
    if (utilityId && !utilitiesState?.[utilityId]) {
      return false
    }
    return true
  })
}
