/** @jsx jsx */
import {
  React, jsx, css, type ImmutableObject, Immutable, hooks, type IMThemeVariables, type ImmutableArray, type UseUtility, ReactRedux, type IMState
} from 'jimu-core'
import { type AllWidgetSettingProps } from 'jimu-for-builder'
import { Alert, Button, Checkbox, CollapsablePanel, defaultMessages as jimuiDefaultMessages, Label, Tooltip } from 'jimu-ui'
import { SettingSection, MapWidgetSelector, SidePopper, SettingRow } from 'jimu-ui/advanced/setting-components'
import { type ToolConfig, type IMConfig, ToolType, type CustomToolConfig, type CustomToolAdded } from '../config'
import defaultMessages from './translations/default'
import StandardAnalysisToolSelector from './tool-selector/standard-tool-selector'
import ToolList from './components/tool-list'
import { customToolHasLayerInputParameter, getDefaultCustomToolConfig, getDefaultStandardToolConfig } from './utils'
import CustomAnalysisToolSelector from './tool-selector/custom-tool-selector'
// @ts-expect-error
import { setAssetPath as setAnalysisComponentsAssetPath } from 'analysis-components'
import 'calcite-components' // Needed to pull calcite in for ArcGis* components
import { ClickOutlined } from 'jimu-icons/outlined/application/click'
import { deleteToolsHasNoMatchedUtility, useGetDisplayedToolName, wait } from '../utils/util'
import StandardToolConfigPopperContent from './tool-setting/standard-tool-config'
import CustomToolConfigPopperContent from './tool-setting/custom-tool-config'
import { loadAnalysisHistoryResourceItemsFromMap, useParsedHistoryResourceFromMap } from '../utils/history'
import { type JimuMapView, JimuMapViewComponent, loadArcGISJSAPIModules } from 'jimu-arcgis'
import { getAnalysisAssetPath, useToolInfoStrings } from '../utils/strings'
import 'analysis-components/dist/analysis-components/analysis-components.css'
import { InfoOutlined } from 'jimu-icons/outlined/suggested/info'
import { ImportOutlined } from 'jimu-icons/outlined/editor/import'
import { WarningOutlined } from 'jimu-icons/outlined/suggested/warning'

type SettingProps = AllWidgetSettingProps<IMConfig>

const { useEffect, useState, useMemo, useRef } = React

const useStyle = (theme: IMThemeVariables, hasTools: boolean) => {
  return useMemo(() => {
    return css`
      padding-bottom: ${hasTools ? '3.125rem' : '0'};
      flex-direction: column;
      .first-section {
        .jimu-widget-setting--section-header +* {
          margin-top: 0.75rem;
        }
        .label-for-checkbox {
          line-height: 1.625rem;
          margin-bottom: 0;
          margin-top: 0.5rem;
        }
      }
      .no-border {
        border: none;
      }
      .tool-list-placeholder {
        flex-direction: column;
        padding-top: 11rem;
        font-size: 0.875rem;
        text-align: center;
        color: var(--dark-200);
        span {
          padding: 0 1rem;
        }
      }
      .no-map-alert {
        margin-top: 0.75rem;
      }

      .bottom-checkbox {
        position: absolute;
        bottom: 0;
        background: ${theme?.body?.bg};
        left: 0;
        right: 0;
        margin-bottom: 0;
        padding: 1rem;
      }
      .no-map-history-tip {
        margin-top: 0.75rem;
        line-height: 1rem;
        font-size: 0.75rem;
        color: ${theme?.colors?.danger}
      }
      .import-history-tooltip {
        width: 14.125rem;
      }
      .select-map-text {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `
  }, [hasTools, theme])
}

const toolConfigPopperStyle = css`
  .popper-box > div {
    overflow: auto;
  }
  .collapse {
    label {
      color: var(--dark-800) !important;
    }
    .feature-input-setting-row label::first-of-type {
      color: var(--dark-500) !important;
    }
  }
  .jimu-widget-setting--row:not(.form-inline) .jimu-widget-setting--row-label {
    margin-bottom: 0.25rem;
  }
  .label-for-checkbox {
    display: flex;
    align-items: center;
    padding: 0.375rem 0;
    margin-bottom: 0.25rem;
    .jimu-checkbox {
      margin-right: 0.5rem;
    }
  }
`

const Setting = (props: SettingProps) => {
  const {
    id,
    theme,
    config,
    onSettingChange,
    useMapWidgetIds,
    portalSelf,
    portalUrl,
    useUtilities
  } = props

  useEffect(() => {
    setAnalysisComponentsAssetPath(getAnalysisAssetPath())
  }, [])

  const { toolList, displayToolHistoryFromMap } = config

  const translate = hooks.useTranslation(defaultMessages, jimuiDefaultMessages)

  const onMapWidgetSelected = (useMapWidgetIds: string[]) => {
    onSettingChange({ id, useMapWidgetIds })
  }

  const onImportHistoryFromMapChange = (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    onSettingChange({
      id,
      config: checked ? config.set('displayToolHistoryFromMap', checked) : config.without('displayToolHistoryFromMap')
    })
  }

  const onAddNewStandardTool = (toolName) => {
    const toolConfig = getDefaultStandardToolConfig(toolName)
    onSettingChange({ id, config: config.set('toolList', [...toolList, toolConfig]) })
  }

  const onToolListSort = (newToolList: Array<ImmutableObject<ToolConfig>>) => {
    onSettingChange({ id, config: config.set('toolList', newToolList) })
  }

  const onConfigChange = (index: number, setInArray: string[], value) => {
    const tool = toolList[index].setIn(setInArray, value)
    const newToolList = [...toolList.asMutable()]
    newToolList[index] = tool
    onSettingChange({ id, config: config.set('toolList', newToolList) })
  }

  const onDeleteTool = (toolId: string) => {
    const newToolList = toolList.filter((t) => t.id !== toolId)
    const toolInfo = toolList.find((tool) => tool.id === toolId)
    const currentUseUtilities = useUtilities ? useUtilities.asMutable({ deep: true }) : []
    if (toolInfo.type === ToolType.Custom) {
      const toolConfig = (toolInfo.config as CustomToolConfig)
      if (toolConfig.utility) {
        const { utilityId, task } = toolConfig.utility
        const noOtherToolUseSameUtility = !newToolList.find((tool) => {
          if (tool.type === ToolType.Standard) {
            return false
          }
          const tConfig = (tool.config as CustomToolConfig)
          const toolUtilityId = tConfig.utility?.utilityId
          const toolTask = tConfig.utility?.task
          return toolUtilityId === utilityId && toolTask === task
        })
        const utilityIndexInUseUtilities = currentUseUtilities.findIndex((u) => u.utilityId === utilityId && u.task === task)
        if (noOtherToolUseSameUtility && utilityIndexInUseUtilities > -1) {
          currentUseUtilities.splice(utilityIndexInUseUtilities, 1)
        }
      }
    }
    onSettingChange({ id, config: config.set('toolList', newToolList), useUtilities: currentUseUtilities })
    if (toolId === currentEditToolId) {
      setCurrentEditToolId('')
    }
  }

  const [openNoMapWarning, setOpenNoMapWarning] = useState(false)

  useEffect(() => {
    if (useMapWidgetIds?.[0] && openNoMapWarning) {
      setOpenNoMapWarning(false)
    }
    if (!useMapWidgetIds?.[0] && !openNoMapWarning) {
      // check if has standard tool or custom tool with layer input parameter
      const hasNeedMapTool = toolList.some((t) => t.type === ToolType.Standard || (t.type === ToolType.Custom && customToolHasLayerInputParameter((t.config as CustomToolConfig).toolInfo)))
      if (hasNeedMapTool) {
        setOpenNoMapWarning(true)
      }
    }
  }, [useMapWidgetIds])

  /**
   * custom tool start
   */
  const onAddNewCustomTool = (data: CustomToolAdded) => {
    const { utility, toolInfo, toolUrl } = data
    const toolConfig = getDefaultCustomToolConfig(utility, toolInfo, toolUrl)
    if (customToolHasLayerInputParameter(toolInfo) && !useMapWidgetIds?.[0]) {
      setOpenNoMapWarning(true)
    }
    const currentUseUtilities = useUtilities ? useUtilities.asMutable({ deep: true }) : []
    if (!currentUseUtilities.find(utility.task ? (u) => u.utilityId === utility.utilityId && u.task === utility.task : (u) => u.utilityId === utility.utilityId)) {
      currentUseUtilities.push(utility)
    }
    onSettingChange({ id, config: config.set('toolList', [...toolList, toolConfig]), useUtilities: currentUseUtilities })
  }
  /**
   * custom tool end
   */

  const [currentEditToolId, setCurrentEditToolId] = useState('')

  const currentEditToolInfo = useMemo(() => {
    if (!currentEditToolId) {
      return null
    }
    return Immutable(toolList.find((t) => t.id === currentEditToolId))
  }, [currentEditToolId, toolList])

  const currentEditButtonRef = useRef<HTMLDivElement>()

  const prevToolListLength = hooks.usePrevious(toolList.length)
  useEffect(() => {
    if (toolList.length - prevToolListLength === 1) {
      setCurrentEditToolId(toolList[toolList.length - 1].id)
    }
  }, [toolList.length])

  const onToolConfigChange = (setInArray: string[], value) => {
    const index = toolList.findIndex((t) => t.id === currentEditToolId)
    onConfigChange(index, setInArray, value)
  }

  const [currentJimuMapView, setCurrentJimuMapView] = useState<JimuMapView>(null)

  useEffect(() => {
    if (!useMapWidgetIds?.[0]) {
      setCurrentJimuMapView(null)
    }
  }, [useMapWidgetIds])

  const [portal, setPortal] = useState<__esri.Portal>()
  useEffect(() => {
    loadArcGISJSAPIModules([
      'esri/portal/Portal'
    ]).then(modules => {
      const [Portal] = modules as [typeof __esri.Portal]

      const portal = new Portal({
        url: portalUrl,
        sourceJSON: portalSelf
      })
      portal.load().then(() => {
        setPortal(portal)
      })
    })
  }, [])

  const toolInfoStrings = useToolInfoStrings()

  const [noMapHistory, setNoMapHistory] = useState(false)
  const handleNoMapHistory = async () => {
    onSettingChange({
      id,
      config: config.without('historyResourceItemsFromMap')
    })

    setNoMapHistory(true)
    await wait(3000)
    setNoMapHistory(false)
  }

  const importHistoryFromMap = async () => {
    if (!currentJimuMapView) {
      handleNoMapHistory()
      return
    }
    const historyResourceItems = await loadAnalysisHistoryResourceItemsFromMap(currentJimuMapView, portal)
    if (!historyResourceItems?.length) {
      handleNoMapHistory()
      return
    }

    // if historyResourceItems has new tool, add it to toolList
    const newToolList = []
    historyResourceItems.forEach((item) => {
      const matchedTool = [...toolList, ...newToolList].find((tool) => tool.toolName === item.toolName)
      if (!matchedTool) {
        const newTool = getDefaultStandardToolConfig(item.toolName)
        newToolList.push(newTool)
      }
    })

    onSettingChange({
      id,
      config: config
        .set('toolList', [...toolList, ...newToolList])
        .set('historyResourceItemsFromMap', historyResourceItems)
        .set('displayToolHistoryFromMap', true)
    })
  }

  useEffect(() => {
    const currentUseUtilities: ImmutableArray<UseUtility> = useUtilities || Immutable([])
    onSettingChange({
      id,
      config: config.set('toolList', toolList.map((tool) => {
        if (tool.type === ToolType.Standard) {
          return tool
        }
        const utility = (tool.config as ImmutableObject<CustomToolConfig>).utility
        if (utility && !currentUseUtilities.find((u) => u.utilityId === utility.utilityId)) {
          return tool.set('config', (tool.config as ImmutableObject<CustomToolConfig>).without('utility'))
        }
        return tool
      }))
    })
  }, [useUtilities])

  const utilitiesState = ReactRedux.useSelector((state: IMState) => {
    return state.appStateInBuilder.appConfig.utilities
  })
  useEffect(() => {
    const newToolList = deleteToolsHasNoMatchedUtility(toolList, utilitiesState)
    if (newToolList.length < toolList.length) {
      onSettingChange({ id, config: config.set('toolList', newToolList) })
    }
  }, [utilitiesState])

  // for number show in tool list and preset tool from history in standard tool setting panel
  const prasedHistoryResourceFromMap = useParsedHistoryResourceFromMap(config)

  const style = useStyle(theme, toolList.length > 0)

  const getDisplayedToolName = useGetDisplayedToolName()

  return (
    <div className='widget-setting-analysis jimu-widget-setting' css={style}>
      <SettingSection className='first-section' role='group' aria-label={translate('selectMapWidget')}
        title={<div className='d-flex align-items-center'>
          <span className='select-map-text' title={translate('selectMapWidget')}>{translate('selectMapWidget')}</span>
          <Tooltip placement="top" title={translate('selectMapWidgetTooltip')} css={css`width: 15.125rem`}>
            <Button icon type='tertiary' className='jimu-outline-inside'>
              <InfoOutlined />
            </Button>
          </Tooltip>
        </div>}
      >
        <SettingRow>
          <MapWidgetSelector onSelect={onMapWidgetSelected} useMapWidgetIds={useMapWidgetIds} />
          <Tooltip placement="top" title={translate('importMapHistoryTooltip')} css={css`width: 14.125rem`}>
            <Button icon size='sm' type='default' onClick={importHistoryFromMap} className='ml-1' aria-label={translate('importMapHistoryTooltip')}>
              <ImportOutlined />
            </Button>
          </Tooltip>
        </SettingRow>

        {noMapHistory && <div className='text-break d-flex align-items-center no-map-history-tip'>
          <WarningOutlined color={theme.colors.danger} />
          <div className='ml-1'>{translate('noMapHistoryError')}</div>
        </div>}

        <Alert className='w-100 no-map-alert' form="basic" buttonType='tertiary' size='small' closable text={translate('selectMapWarning')} type="warning" withIcon open={openNoMapWarning} onClose={() => { setOpenNoMapWarning(false) }} />
      </SettingSection>
      <SettingSection className={`${toolList.length === 0 ? 'no-border' : ''}`} title={translate('addTools')} role='group' aria-label={translate('addTools')}>
        <StandardAnalysisToolSelector disabled={!useMapWidgetIds?.[0]} toolList={toolList} portal={portal} toolInfoStrings={toolInfoStrings} onWarningNoMap={() => { setOpenNoMapWarning(true) }} onChange={onAddNewStandardTool} />
        <CustomAnalysisToolSelector onChange={onAddNewCustomTool} />
      </SettingSection>
      {toolList.length
        ? <SettingSection className='border-0'>
            <CollapsablePanel label={translate('tools')} type="default" defaultIsOpen aria-label={translate('tools')}>
              {toolInfoStrings && <ToolList
                editId={currentEditToolId} toolList={toolList} historyListFromMap={prasedHistoryResourceFromMap}
                onSort={onToolListSort} onDelete={onDeleteTool} onOpenEdit={setCurrentEditToolId}
                onTriggerRefChange={(ref) => { currentEditButtonRef.current = ref }} />}
            </CollapsablePanel>
          </SettingSection>
        : <div className='tool-list-placeholder d-flex align-items-center'>
            <ClickOutlined size={48} className='mb-4' />
            <span>{translate('toolListPlaceholder')}</span>
          </div>}

      {!!toolList.length && <Label className='d-flex align-items-center label-for-checkbox bottom-checkbox'>
        <Checkbox className='mr-2' checked={displayToolHistoryFromMap} onChange={onImportHistoryFromMapChange} />
        {translate('displayToolHistoryFromMap')}
      </Label>}

      <SidePopper
        css={toolConfigPopperStyle}
        isOpen={!!currentEditToolInfo} position="right"
        toggle={() => { setCurrentEditToolId('') }} trigger={currentEditButtonRef?.current}
        backToFocusNode={currentEditButtonRef?.current}
        title={currentEditToolInfo ? getDisplayedToolName(currentEditToolInfo) : ''}>
        {
          currentEditToolInfo?.type === ToolType.Standard
            ? <StandardToolConfigPopperContent toolConfig={currentEditToolInfo} historyListFromMap={prasedHistoryResourceFromMap} onConfigChange={onToolConfigChange} />
            : <CustomToolConfigPopperContent toolConfig={currentEditToolInfo} onConfigChange={onToolConfigChange} />
        }
      </SidePopper>

      <JimuMapViewComponent
        useMapWidgetId={useMapWidgetIds?.[0]}
        onActiveViewChange={setCurrentJimuMapView}
      />
    </div>
  )
}

export default Setting
