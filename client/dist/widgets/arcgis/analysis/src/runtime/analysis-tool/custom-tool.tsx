/* eslint-disable new-cap */
/** @jsx jsx */
import { loadArcGISJSAPIModules } from 'jimu-arcgis'
import {
  React, jsx, type ImmutableObject, hooks, lodash
} from 'jimu-core'
import { type CustomToolConfig } from '../../config'
import { Loading, defaultMessages as jimuiDefaultMessages } from 'jimu-ui'
import { type AnalysisToolDataItem, type AnalysisToolData, AnalysisEngine, AnalysisType, type AnalysisToolParam } from 'analysis-ui-schema'
import defaultMessages from '../translations/default'
import { calculateParameterValues, CLIENT_THROWN_ERROR, getJobParams, getResultParams, getUIOnlyParams, isEmptyDataItem, type SupportedLayer, hasNAPrivilege, type AnalysisGPJobStatus, getAnalysisLayers, type LocaleItem } from 'analysis-shared-utils'
// @ts-expect-error
import { showHelp } from 'analysis-components'
import { CalciteFlowItem, CalciteAction, CalciteNotice, CalciteButton } from 'calcite-components'
import { type ToolProps } from './config'
import { useCommonStrings, useErrorMessageStrings, useGPMessageStrings } from '../../utils/strings'
import { executeJob } from '../../utils/job'
import { type AnalysisToolAppContainerCustomEvent } from 'analysis-tool-app'
import { AnalysisCoreEvents, notifyJobSubmited } from '../../utils/events'
import { getCustomToolUrlWithToken, useGetDisplayedToolName, useUpdateObjectByStateEffect } from '../../utils/util'
import { convertInputGPValueParameters, convertJobParamsToToolData, getDefaultToolUIJson, useAnalysisMapLayersFromMap } from '../utils'

enum ValidityState {
  Valid = 'VALID',
  Warning = 'WARNING',
  Error = 'ERROR'
}

const { useState, useMemo, useEffect, useRef } = React

const CustomTool = (props: ToolProps) => {
  const { theme, appContainer, jimuMapView, portal, jobParams, toolInfo, disableBack, onBack } = props

  const { toolName, id: toolId, config: toolConfig } = toolInfo

  const { toolInfo: toolJson, toolUrl, option } = toolConfig as ImmutableObject<CustomToolConfig>

  const getDisplayedToolName = useGetDisplayedToolName()

  const displayedToolName = useMemo(() => getDisplayedToolName(toolInfo), [getDisplayedToolName, toolInfo])

  const mutableToolJson = useMemo(() => toolJson.asMutable({ deep: true }), [toolJson])

  const translate = hooks.useTranslation(defaultMessages, jimuiDefaultMessages)

  const [geoprocessor, setGeoprocessor] = useState<__esri.geoprocessor>()
  useEffect(() => {
    loadArcGISJSAPIModules(['esri/rest/geoprocessor']).then((modules) => {
      const gp = modules[0] as __esri.geoprocessor
      setGeoprocessor(gp)
    })
  }, [])

  const map = useMemo(() => {
    return jimuMapView?.view?.map
  }, [jimuMapView])

  const [analysisToolContainer, setAnalysisToolContainer] = useState<HTMLAnalysisToolElement>(null)

  const [analysisToolAppLoaded, setAnalysisToolAppLoaded] = useState(false)
  const [analysisToolData, setAnalysisToolData] = useState<CustomEvent<AnalysisToolData>>()

  // const [selectedLayers, setSelectedLayers] = useState<SupportedLayer[]>([])
  const [allLayers, setAllLayers] = useState<SupportedLayer[]>([])

  const [defaultJobParams, setDefaultJobParams] = useState<AnalysisToolData>()

  // const [containerParamsUpdated, setContainerParamsUpdated] = useState(false)

  const realJobParams = useMemo(() => jobParams || defaultJobParams, [defaultJobParams, jobParams])

  const analysisToolContainerRef = useRef<HTMLDivElement>(null)
  const setAnalysisToolRef = (ref: HTMLDivElement, recreate: boolean = false) => {
    analysisToolContainerRef.current = ref
    if ((analysisToolContainer && !recreate) || !ref) {
      return
    }

    const container = document.createElement('analysis-tool')
    // container.analysisEngine = 'standard'
    container.isHelpFileExternalAsset = true
    container.usePanel = false
    container.closable = false
    ref.appendChild(container)
    setAnalysisToolContainer(container)
  }

  const changeContainerParamsUpdated = () => {
    // setContainerParamsUpdated(true)
  }

  const mapLayers = useAnalysisMapLayersFromMap(map)
  const [analysisLayers, setAnalysisLayers] = useState<SupportedLayer[]>()
  const commonStrings = useCommonStrings()

  // parameters with selected layers added for "parmeterInfos" property of GPValueTable parameters
  const [convertedParameters, setConvertedParameters] = useState<AnalysisToolParam[]>([])

  // convert GPValueTable parmeters for tool JSON
  // properties add to GPValueTable layer input "parmeterInfos": mapView, mapLayers, user, selecetdLayers. Only with these properties, the analysis-layer-input can work normally
  // other "parmeterInfos" will keep intact
  const convertedToolJson = useMemo(() => {
    const parameters = convertedParameters?.length ? convertedParameters : mutableToolJson.parameters
    return {
      ...mutableToolJson,
      parameters: convertInputGPValueParameters(parameters, jimuMapView?.view as __esri.MapView, allLayers, portal?.user)
    }
  }, [allLayers, convertedParameters, jimuMapView?.view, mutableToolJson, portal?.user])

  const toolUIJson = useMemo(() => getDefaultToolUIJson(convertedToolJson, translate), [convertedToolJson, translate])

  useUpdateObjectByStateEffect(analysisToolContainer, portal, 'portal')
  useUpdateObjectByStateEffect(analysisToolContainer, portal?.user, 'user')
  useUpdateObjectByStateEffect(analysisToolContainer, jimuMapView?.view, 'mapView')
  useUpdateObjectByStateEffect(analysisToolContainer, toolJson?.helpUrl, 'toolHelpFilePath')
  useUpdateObjectByStateEffect(analysisToolContainer, convertedToolJson, 'toolJson', changeContainerParamsUpdated)
  useUpdateObjectByStateEffect(analysisToolContainer, toolUIJson, 'toolUIJson')

  useEffect(() => {
    if (!mapLayers) {
      return
    }
    if (mapLayers.length) {
      getAnalysisLayers(mapLayers, commonStrings as { [key: string]: LocaleItem }).then((layers) => {
        setAnalysisLayers(layers)
      }).catch(() => {
        setAnalysisLayers([])
      })
    } else {
      setAnalysisLayers([])
    }
  }, [mapLayers])

  useEffect(() => {
    if (!analysisToolContainer || !analysisLayers) {
      return
    }
    let allLayers = analysisLayers
    let selectedLayers = [] as SupportedLayer[]

    if (realJobParams) {
      convertJobParamsToToolData({
        jobParams: realJobParams,
        uiOnlyParams: {},
        toolJSON: mutableToolJson,
        availableMapLayers: analysisLayers,
        toolName
      }).then((jobParamsAndLayers) => {
        const toolDataFromHistory = jobParamsAndLayers.convertedJobParams
        const { valueTableSelectedLayersConvertedParameters, valueTableSelectedLayers, layers } = jobParamsAndLayers
        setConvertedParameters(valueTableSelectedLayersConvertedParameters)
        selectedLayers = [...layers, ...valueTableSelectedLayers]

        const toolData = {
          ...(toolDataFromHistory as AnalysisToolData),
          ...{
            userSettings: {
              unitSystem: portal.user?.units,
              hasNAPrivilege: hasNAPrivilege(portal.user)
            }
          }
        }

        allLayers = [...(analysisLayers ?? []), ...selectedLayers]
        // setSelectedLayers(selectedLayers)
        setAllLayers(allLayers)
        analysisToolContainer.mapLayers = allLayers // must use this, otherwise the mapLayers in AnalysisParameter will be empty and can't find matched layer if there is a layer in jobParams
        analysisToolContainer.toolData = toolData
        // the order of every parameter mapLayers's update and container mapLayers update is not sure
        // so must update every parameter's mapLayers by change containerParamsUpdated, otherwise id update every parameter mapLayers before update container mapLayers, the selected layers will not be initialed, will throw error
        changeContainerParamsUpdated()
      })
    }
  }, [realJobParams, analysisLayers, analysisToolContainer])

  const [paramHelpPopover, setParamHelpPopover] = useState<HTMLAnalysisHelpPopoverElement>()

  useEffect(() => {
    if (analysisToolContainer) {
      analysisToolContainer.addEventListener('analysisToolLoaded', () => {
        setAnalysisToolAppLoaded(true)
      })
      analysisToolContainer.addEventListener('analysisToolDataChange', (e: CustomEvent<AnalysisToolData>) => {
        setAnalysisToolData(e)
      })
      analysisToolContainer.addEventListener('analysisToolHelpPopoverChange', (e: CustomEvent<any>) => {
        setParamHelpPopover((e.target as HTMLAnalysisToolElement).toolHelpPopover)
      })
    }
  }, [analysisToolContainer])

  const getColoredDesc = (desc: string) => {
    return `<span style="color: ${theme?.colors?.palette?.dark?.[500]}">${desc}</span>`
  }

  useEffect(() => {
    if (!paramHelpPopover) {
      return
    }
    const paramName = paramHelpPopover.helpId
    const paramInfo = toolJson.parameters?.find((p) => p.name === paramName)
    if (paramInfo) {
      paramHelpPopover.helpSrcdoc = getColoredDesc(paramInfo.description)
    }
  }, [paramHelpPopover])

  // if change tool type, recreate analysisToolContainer, since the analysis-tool component will only get default value in componentWillLoad function
  useEffect(() => {
    if (!analysisToolContainer) {
      return
    }
    const containerParent = analysisToolContainer.parentElement as HTMLDivElement
    containerParent.removeChild(analysisToolContainer)
    setAnalysisToolRef(containerParent, true)
  }, [toolId])

  const errorStrings = useErrorMessageStrings()
  const gpMessages = useGPMessageStrings()

  const headerElementRef = useRef<HTMLDivElement>()
  const toolHelpPopover = useRef<HTMLAnalysisHelpPopoverElement>()

  // 1.jobParams convert fail will change the status to warning
  // 2. distroy will change the status to valid
  // 3. run execute error will change the status to error
  // 4. close notice will change the status to valid
  const [validationStatus, setValidationStatus] = useState<ValidityState>()
  const [errorMessage, setErrorMessage] = useState<string | string[]>()

  const panelElementRef = useRef<HTMLCalciteFlowItemElement>()

  const parameters = useRef<{ currentJobParams: AnalysisToolData, toolUiParameters?: AnalysisToolData }>()

  // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
  const onToolDataChange = (e?: CustomEvent<AnalysisToolData> | Record<'detail', AnalysisToolData>) => {
    const toolData = e?.detail ?? {}
    const jobParams = getJobParams(convertedToolJson, toolData)
    const calculatedJobParams = calculateParameterValues(jobParams as AnalysisToolData)
    const currentJobParams = { ...calculatedJobParams }
    const recalculatedToolUiParams = getUIOnlyParams(toolData, Object.keys(currentJobParams))
    let toolUiParameters
    if (!isEmptyDataItem(recalculatedToolUiParams)) {
      toolUiParameters = recalculatedToolUiParams
    }
    parameters.current = {
      currentJobParams,
      toolUiParameters
    }

    if (!defaultJobParams) {
      setDefaultJobParams(currentJobParams)
    }
  }

  const [runAnalysisDisabled, setRunAnalysisDisabled] = useState(false)
  const runAnalysysDisabledRef = useRef(runAnalysisDisabled)
  useEffect(() => {
    runAnalysysDisabledRef.current = runAnalysisDisabled
  }, [runAnalysisDisabled])

  useEffect(() => {
    if (appContainer) {
      /**
       * There are three cases to handle here:
       * 1. Click run button and not close the tool panel, in this case, can't remove the analysisCoreJobStatus event listener on appContainer
       * 2. Click run button and close the tool panel immediately,in this case need to listen the analysisCoreJobStatus event with submissionData,
       * so that we can notify the analysisCoreJobSubmited event with toolId, then we can remove the analysisCoreJobStatus event listener.
       * 3. Only enter the tool panel, but not run task and close the tool panel directly, in this case, we can just remove the analysisCoreJobStatus event lisrener directly.
       */
      const onAnalysisCoreJobStatus = (e: AnalysisToolAppContainerCustomEvent<AnalysisGPJobStatus>) => {
        // for case 3: tool was closed and no running tasks to handle
        if (!runAnalysysDisabledRef.current && !analysisToolContainerRef.current) {
          appContainer.removeEventListener(AnalysisCoreEvents.JobStatus, onAnalysisCoreJobStatus)
          return
        }
        // for case 2: tool was closed and has running tasks to handle
        // for case 1: tool was opened and has running tasks to handle
        if (e?.detail?.submissionData) {
          notifyJobSubmited(appContainer, { ...e.detail, toolId })
          // if not dispatch when submit job success, the run button will allways disable
          setRunAnalysisDisabled(false)
        }
        // for case 2: tool was closed but has running task, and the running task was handled above
        if (runAnalysysDisabledRef.current && !analysisToolContainerRef.current) {
          appContainer.removeEventListener(AnalysisCoreEvents.JobStatus, onAnalysisCoreJobStatus)
        }
      }
      appContainer.addEventListener(AnalysisCoreEvents.JobStatus, onAnalysisCoreJobStatus)
    }
  }, [appContainer, toolId])

  const prepJobParamsForSubmission = (jobParams: AnalysisToolData) => {
    const serializedJobParams: AnalysisToolData = { ...jobParams }
    for (const param in serializedJobParams) {
      const parameterObject = serializedJobParams[param] as { [key: string]: AnalysisToolDataItem }
      if (isEmptyDataItem(parameterObject)) {
        delete serializedJobParams[param]
      }
    }
    return serializedJobParams
  }

  useEffect(() => {
    if (analysisToolData) {
      onToolDataChange(analysisToolData)
    }
  }, [analysisToolData])

  const runTask = async () => {
    const { valid, errorKeys } = await analysisToolContainer.validateTool()
    const allErrorKeys = Array.from(new Set([...errorKeys]))
    const status = valid ? ValidityState.Valid : ValidityState.Error
    setValidationStatus(status)
    if (status === ValidityState.Error) {
      setErrorMessage(allErrorKeys.length === 1 ? errorStrings[allErrorKeys[0]] as string : allErrorKeys.map((key) => errorStrings[key] as string))
      if (panelElementRef.current) {
        panelElementRef.current.scrollContentTo({ top: 0, behavior: 'auto' })
      }
      return
    }
    // Get most up to date data
    onToolDataChange({ detail: analysisToolContainer?.toolData })
    const { currentJobParams } = parameters.current
    if (currentJobParams !== undefined) {
      setRunAnalysisDisabled(true)

      const resultParams = getResultParams(convertedToolJson)

      const jobParamsPayload = prepJobParamsForSubmission(currentJobParams)

      try {
        // jobParams and jobParamsPayload when sending to execution
        // is sent as new cloned copy to avoid mutations on
        // these values while a current job is in execution.
        await executeJob(geoprocessor, {
          jobParams: lodash.cloneDeep(currentJobParams),
          jobParamsPayload: lodash.cloneDeep(jobParamsPayload),
          resultParams,
          gpMessages: resultParams.includes('processInfo') ? gpMessages as { [key: string]: string } : undefined,
          portal,
          toolName,
          analysisEngine: AnalysisEngine.Standard,
          analysisType: AnalysisType.Tool,
          containerElement: appContainer,
          toolUiParameters: parameters.current.toolUiParameters
        }, convertedToolJson, getCustomToolUrlWithToken(toolUrl))
      } catch (e) {
        // const errorKey = e.name

        // Re-enable the run analysis button if there was an error
        setRunAnalysisDisabled(false)
        // this.analysisToolAppJobSubmissionAttempt.emit(false);

        setValidationStatus(ValidityState.Error)
        // checking if error was thrown from the client JS code (this project) to distinguish from
        // servor errors or other third party errors using e.details.type which is set from our client code thrown errors.
        // FIXME: ideally (e instanceof ArcgisWebAnalysisError) would suffice than looking at e.details.type
        // but that check is false here. It may be related to error was thrown in analysis-core
        // and when stencil code catches it, may be the instance information is getting lost in transit.
        const errorMessage = e.details?.type === CLIENT_THROWN_ERROR ? e.message : errorStrings.jobCurrentParameters
        setErrorMessage(errorMessage)

        // try to add a learn more link to the error message if it is a known error
        // if (typeof errorMessage === 'string' && errorKey in helpMap.OtherHelpLinks.errorMessages) {
        //   const docLink = formatLocalizedUrl(
        //     helpMap.OtherHelpLinks.errorMessages[
        //       errorKey as keyof typeof helpMap.OtherHelpLinks.errorMessages
        //     ],
        //     getHelpBaseUrl(this.portal),
        //     this.locale
        //   );

        //   this.errorMessage = formatMessage(this.errorMessage, { docLink });
        // }

        // if (Array.isArray(e.messages)) {
        //   const hasExecuteError = e.messages.some(
        //     (message: any) =>
        //       message.type === "error" && message.description.startsWith("Failed to execute")
        //   );
        //   this.errorMessage = hasExecuteError === true ? this.strings.failedToExecuteEstimate : "";
        // }
        if (panelElementRef.current) {
          panelElementRef.current.scrollContentTo({ top: 0, behavior: 'auto' })
        }
      }
    }
  }

  // TODO can enable this function once component fix the anonymous user issue in brwose layers popper of analysis-layer-input component
  // useEffect(() => {
  //   if (!analysisToolAppLoaded || !containerParamsUpdated) {
  //     return
  //   }
  //   setContainerParamsUpdated(false)
  //   setTimeout(() => {
  //     const layerInputElements = analysisToolContainer.shadowRoot.querySelectorAll('analysis-layer-input')
  //     if (layerInputElements.length) {
  //       layerInputElements.forEach((el) => {
  //         const parameter = toolJson.parameters.find((p) => p.displayName === el.label)
  //         if (parameter) {
  //           el.mapLayers = (parameter as CustonToolParam).selectFromMapLayer ? [...(analysisLayers || []), ...selectedLayers] : selectedLayers
  //         }
  //       })
  //     }
  //   })
  // }, [containerParamsUpdated])

  useEffect(() => {
    if (!option.showHelpLink && toolHelpPopover.current) {
      toolHelpPopover.current.remove()
    }
  }, [option.showHelpLink])

  const [backButtonFocused, setBackButtonFocused] = useState(false)

  return (
    <div className='h-100 d-flex'>
      <CalciteFlowItem
        // FIXME: Hyphen case to ignore type error as this is an internal only prop
        show-back-button={!disableBack}
        // dir={this.dir}
        closable={false}
        onCalciteFlowItemBack={onBack}
        ref={(ref) => {
          panelElementRef.current = ref
          if (!disableBack && !backButtonFocused) {
            ref?.setFocus()
            setBackButtonFocused(true)
          }
        }}
      >
        <div
          slot="header-content"
          ref={headerElementRef}
        >
          {displayedToolName}
        </div>
        {option.showHelpLink && <CalciteAction
          label=""
          text=""
          icon="information"
          slot="header-actions-end"
          onClick={() => {
            if (option.link !== undefined && showHelp) {
              toolHelpPopover.current = showHelp(toolHelpPopover.current, {
                helpUrl: option.link,
                helpId: toolId,
                heading: displayedToolName,
                referenceElement: headerElementRef.current,
                isHelpFileExternalAsset: true,
                learnMoreBaseUrl: portal?.sourceJSON.helpBase,
                offsetDistance: 55,
                offsetSkidding: 10,
                learnMoreUrl: option.link
              })
              if (toolHelpPopover.current) {
                toolHelpPopover.current.helpSrcdoc = getColoredDesc(toolJson.description)
                toolHelpPopover.current.learnMoreBaseUrl = undefined
              }
            }
          }}
        ></CalciteAction>}
        {validationStatus === ValidityState.Error || validationStatus === ValidityState.Warning
          ? (<CalciteNotice
              open
              kind={validationStatus === ValidityState.Error ? 'danger' : 'warning'}
              closable
              scale="m"
              width="auto"
              onCalciteNoticeClose={() => { setValidationStatus(ValidityState.Valid) }}
            >
              {Array.isArray(errorMessage) && errorMessage.length > 0
                ? <ul slot="message">
                    {errorMessage.map((error) => <li>{error}</li>)}
                  </ul>
                : <div slot="message" dangerouslySetInnerHTML={{ __html: errorMessage as string }}></div>}
            </CalciteNotice>)
          : null}
        <div
          // stop keydown event to make Ctrl+V event effective
          onKeyDown={(e) => { e.stopPropagation() }}
          ref={setAnalysisToolRef} className='custom-tool-container'></div>
        <CalciteButton
          slot='footer'
          loading={runAnalysisDisabled ? true : undefined}
          onClick={runTask}
          appearance='solid'
          kind='brand'
          width={disableBack ? 'full' : 'half'}
          alignment='center'
          scale='m'
        >
          {translate('run')}
        </CalciteButton>
        {!disableBack && <CalciteButton
          slot='footer'
          disabled={runAnalysisDisabled ? true : undefined}
          onClick={onBack}
          appearance='outline'
          kind='brand'
          width='half'
          alignment='center'
          scale='m'
        >
          {translate('back')}
        </CalciteButton>}
      </CalciteFlowItem>
      {!analysisToolAppLoaded && <Loading />}
    </div>
  )
}

export default CustomTool
