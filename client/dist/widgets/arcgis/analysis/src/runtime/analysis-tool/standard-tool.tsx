/* eslint-disable new-cap */
/** @jsx jsx */
import {
  React, jsx
} from 'jimu-core'
import { Loading } from 'jimu-ui'
import { type AnalysisGPJobStatus } from 'analysis-shared-utils'
import { type AnalysisToolAppContainerCustomEvent } from 'analysis-tool-app'
import { type ToolProps } from './config'
import { AnalysisCoreEvents, notifyJobStatus, notifyJobSubmited } from '../../utils/events'
import { useUpdateObjectByStateEffect } from '../../utils/util'
import { useAnalysisMapLayersFromMap } from '../utils'

const { useState, useMemo, useEffect, useRef } = React

const StandradTool = (props: ToolProps) => {
  const { appContainer, jimuMapView, toolInfo, portal, jobParams, toolUiParameters, disableBack, onBack } = props

  const { toolName, id: toolId } = toolInfo
  // const { input } = config as StandardToolConfig

  const map = useMemo(() => {
    return jimuMapView?.view?.map
  }, [jimuMapView])

  const [analysisToolContainer, setAnalysisToolContainer] = useState<HTMLAnalysisToolAppContainerElement>(null)

  const [analysisToolAppLoaded, setAnalysisToolAppLoaded] = useState(false)

  const runAnalysysDisabledRef = useRef(false)
  const analysisToolContainerRef = useRef<HTMLAnalysisToolAppContainerElement>()
  const analysisToolDivRef = useRef<HTMLDivElement>()
  useEffect(() => {
    analysisToolContainerRef.current = analysisToolContainer
  }, [analysisToolContainer])

  const changeDisplayOfRemoveButton = (container: HTMLAnalysisToolAppContainerElement) => {
    // if in runtime, disableBack won't change
    if (!disableBack && !window.jimuConfig.isInBuilder) {
      return
    }
    // if disbale back, hide back button(including header back button and footer back button) and change run button to full width
    const flowItem = container.shadowRoot.querySelector('calcite-flow-item')
    if (flowItem) {
      flowItem.componentOnReady().then(() => {
        flowItem.showBackButton = !disableBack
        const buttons: NodeListOf<HTMLCalciteButtonElement> = flowItem.querySelectorAll('.tool-footer calcite-button')
        const runButton = buttons[0]
        const backButton = buttons[1]
        if (runButton) {
          runButton.width = disableBack ? 'full' : 'half'
        }
        if (backButton) {
          backButton.style.display = disableBack ? 'none' : 'inline-block'
        }
      })
    }
  }

  useEffect(() => {
    if (analysisToolContainer) {
      changeDisplayOfRemoveButton(analysisToolContainer)
    }
  }, [disableBack])

  const setAnalysisToolRef = (ref: HTMLDivElement) => {
    if (analysisToolContainer || !ref) {
      return
    }

    const container = document.createElement('analysis-tool-app-container')
    container.style.height = '100%'
    container.analysisEngine = 'standard'
    container.showHeader = true
    container.usePanel = true
    container.panelClosable = false
    container.appContainer = appContainer
    container.addEventListener('analysisToolAppPanelChange', () => {
      onBack()
    })
    container.addEventListener('analysisToolAppLoaded', () => {
      setAnalysisToolAppLoaded(true)
      changeDisplayOfRemoveButton(container)
    })
    container.addEventListener('analysisToolAppJobSubmissionAttempt', (e: AnalysisToolAppContainerCustomEvent<boolean>) => {
      runAnalysysDisabledRef.current = e.detail
    })
    ref.appendChild(container)
    setAnalysisToolContainer(container)
  }

  const mapLayers = useAnalysisMapLayersFromMap(map)

  useUpdateObjectByStateEffect(analysisToolContainer, portal, 'portal')
  useUpdateObjectByStateEffect(analysisToolContainer, toolName, 'toolName')
  useUpdateObjectByStateEffect(analysisToolContainer, jimuMapView?.view, 'mapView')
  useUpdateObjectByStateEffect(analysisToolContainer, jobParams, 'jobParams')
  useUpdateObjectByStateEffect(analysisToolContainer, toolUiParameters, 'toolUiParameters')
  useUpdateObjectByStateEffect(analysisToolContainer, mapLayers, 'mapLayers')

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
        if (!runAnalysysDisabledRef.current && !analysisToolDivRef.current) {
          appContainer.removeEventListener(AnalysisCoreEvents.JobStatus, onAnalysisCoreJobStatus)
          return
        }
        // for case 2: tool was closed and has running tasks to handle
        // for case 1: tool was opened and has running tasks to handle
        if (e?.detail?.submissionData) {
          notifyJobSubmited(appContainer, { ...e.detail, toolId })
          // if not dispatch when submit job success, the run button will allways disable
          if (analysisToolContainerRef.current && e.target === appContainer) {
            notifyJobStatus(analysisToolContainerRef.current, e.detail)
          }
        }
        // for case 2: tool was closed but has running task, and the running task was handled above
        if (runAnalysysDisabledRef.current && !analysisToolDivRef.current) {
          appContainer.removeEventListener(AnalysisCoreEvents.JobStatus, onAnalysisCoreJobStatus)
        }
      }
      appContainer.addEventListener(AnalysisCoreEvents.JobStatus, onAnalysisCoreJobStatus)
    }
  }, [appContainer, toolId])

  return (
    <React.Fragment>
      {portal?.user && toolName && <div
        ref={(ref) => {
          analysisToolDivRef.current = ref
          setAnalysisToolRef(ref)
        }}
        // stop keydown event to make Ctrl+V event effective
        onKeyDown={(e) => { e.stopPropagation() }}
        className='analysis-tool-container h-100'></div>}
      {!analysisToolAppLoaded && <Loading />}
    </React.Fragment>
  )
}

export default StandradTool
