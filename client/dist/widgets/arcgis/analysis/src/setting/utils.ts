import { AnalysisToolParamDataType, type AnalysisToolInfo } from 'analysis-ui-schema'
import { type UseUtility, uuidv1, type ImmutableObject } from 'jimu-core'
import { type ToolConfig, ToolType, type StandardToolConfig, type CustomToolConfig, type CustonToolParam } from '../config'
import { isLayerInputType } from '../utils/util'

export function getDefaultStandardToolConfig (toolName: string): ToolConfig {
  return {
    id: uuidv1(),
    type: ToolType.Standard,
    toolName,
    config: {
      input: {
        selectFromMapLayer: false,
        allowBrowserLayers: false,
        allowDrawingOnTheMap: false,
        allowLocalFileUpload: false,
        allowServiceUrl: false,
        selectFromOtherWidget: false
      },
      output: {
        addResultLayersToMapAuto: false,
        allowExportResults: false
      },
      option: {}
    } as StandardToolConfig
  }
}

export function getDefaultCustomToolConfig (utility: UseUtility, toolInfo: AnalysisToolInfo, toolUrl: string) {
  // check select from map layers by default
  toolInfo.parameters.forEach((p) => {
    if (p.direction === 'esriGPParameterDirectionInput' && isLayerInputType(p.dataType)) {
      (p as CustonToolParam).selectFromMapLayer = true
    }
  })
  return {
    id: uuidv1(),
    type: ToolType.Custom,
    toolName: toolInfo.name,
    config: {
      toolInfo,
      utility,
      toolUrl,
      output: {
        ignored: {},
        allowExport: {},
        decimalPlace: {},
        dateFormat: {},
        timeFormat: {},
        addResultLayersToMapAuto: {}
      },
      option: {
        showHelpLink: true,
        link: toolInfo.helpUrl || ''
      }
    } as CustomToolConfig
  }
}

export function customToolHasLayerInputParameter (toolInfo: AnalysisToolInfo) {
  return !!toolInfo.parameters.find((p) => p.direction === 'esriGPParameterDirectionInput' && isLayerInputType(p.dataType))
}

export function customToolHasUnsupportedParamaterType (toolInfo: ImmutableObject<AnalysisToolInfo>) {
  const supportedParameterTypes = [
    AnalysisToolParamDataType.GPString,
    AnalysisToolParamDataType.GPMultiValueString,
    AnalysisToolParamDataType.GPBoolean,
    AnalysisToolParamDataType.GPDouble,
    AnalysisToolParamDataType.GPMultiValueDouble,
    AnalysisToolParamDataType.GPLong,
    AnalysisToolParamDataType.GPDate,
    AnalysisToolParamDataType.GPLinearUnit,
    AnalysisToolParamDataType.GPFeatureRecordSetLayer,
    AnalysisToolParamDataType.GPMultiValueFeatureRecordSetLayer,
    AnalysisToolParamDataType.GPRecordSet,
    AnalysisToolParamDataType.GPMultiValueRecordSet,
    AnalysisToolParamDataType.GPField,
    AnalysisToolParamDataType.GPMultiValueField,
    AnalysisToolParamDataType.GPRasterDataLayer
  ] as AnalysisToolParamDataType[]
  return toolInfo.parameters.some((p) => p.direction === 'esriGPParameterDirectionInput' && !supportedParameterTypes.includes(p.dataType))
}
