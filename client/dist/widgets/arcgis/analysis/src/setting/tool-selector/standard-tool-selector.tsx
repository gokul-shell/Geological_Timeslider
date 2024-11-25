/** @jsx jsx */
import { React, jsx, hooks, css, type ImmutableArray } from 'jimu-core'
import { Button, CollapsablePanel, defaultMessages as jimuiDefaultMessage } from 'jimu-ui'
import defaultMessages from '../translations/default'
import { SidePopper } from 'jimu-ui/advanced/setting-components'
import { PlusOutlined } from 'jimu-icons/outlined/editor/plus'
import { List, TreeItemActionType, TreeStyle } from 'jimu-ui/basic/list-tree'
import { getIconByToolName, getValidToolsList } from '../../utils/util'
import { ToolType, type ToolConfig } from '../../config'
import tools from '../../utils/tools.json'
import { AnalysisEngine, type AnalysisToolItem, AnalysisToolCategories } from 'analysis-ui-schema'
import { fetchLocalizedMessages, hasGeoEnrichmentPrivilege, hasNAPrivilege, type LocaleItem } from 'analysis-shared-utils'
import StandardToolSearch from './standard-tool-search'

const style = css`
  margin-bottom: 0.75rem;
`

const popperStyle = css`
  .setting-collapse {
    line-height: 1.9375rem;
  }
  .jimu-tree {
    padding: 0.5rem 0;
    overflow-y: visible !important;
  }
  .jimu-tree-item [data-dndzone-droppable=true] {
    border: none !important;
  }
  .jimu-tree-item.jimu-tree-item_disabled-true .jimu-tree-item__body {
    opacity: 0.7;
    cursor: not-allowed;
    pointer-events: none;
  }
  .jimu-tree-item__body {
    padding: 0.5rem 0.5rem 0.5rem 0.375rem;
    cursor: pointer;
  }
  .jimu-tree-item_template {
    padding-top: 0.5rem !important;
    &:first-of-type {
      padding-top: 0 !important;
    }
  }
  .jimu-tree-item__main-line {
    cursor: pointer;
  }
`
export interface Props {
  disabled?: boolean
  toolList: ImmutableArray<ToolConfig>
  portal: __esri.Portal
  toolInfoStrings: LocaleItem
  onWarningNoMap: () => void
  onChange: (toolName: string) => void
}

const StandardAnalysisToolSelector = (props: Props): React.ReactElement => {
  const { disabled, toolList, portal, toolInfoStrings, onWarningNoMap, onChange } = props
  const translate = hooks.useTranslation(defaultMessages, jimuiDefaultMessage)
  const [openPopper, setOpenPopper] = React.useState(false)

  const selectButtonRef = React.useRef<HTMLButtonElement>(null)

  const onAddToolButtonClick = () => {
    if (disabled) {
      onWarningNoMap()
      return
    }
    setOpenPopper(v => !v)
  }

  const disableTool = (toolName: string) => {
    return !!toolList?.find((tool) => tool.type === ToolType.Standard && tool.toolName === toolName)
  }

  const getLocalizedData = (toolList: AnalysisToolItem[], t9nStrings: LocaleItem) => {
    const localizedData: AnalysisToolItem[] = toolList.map((tool: AnalysisToolItem) => {
      return {
        ...tool,
        ...fetchLocalizedMessages<AnalysisToolItem, keyof AnalysisToolItem>(tool, t9nStrings),
        keys: tool.keys?.map((key) => {
          const formattedKey = key.replace('$', '')
          return t9nStrings[formattedKey] as string
        })
      }
    })
    return localizedData
  }

  const [toolsArray, setToolsArray] = React.useState<AnalysisToolItem[]>()
  const [toolItems, setToolItems] = React.useState<AnalysisToolItem[]>([])
  React.useEffect(() => {
    if (!toolInfoStrings) {
      return
    }
    // only get standard tools now
    let displayedTools = getValidToolsList([AnalysisEngine.Standard], hasNAPrivilege(portal?.user), tools)
    if (!hasGeoEnrichmentPrivilege(portal?.user)) {
      displayedTools = displayedTools.filter((tool) => {
        return !tool.toolName.includes('EnrichLayer')
      })
    }
    const localizedToolsInfo = getLocalizedData(displayedTools, toolInfoStrings)
    setToolsArray(localizedToolsInfo)
    setToolItems(localizedToolsInfo)
  }, [portal, toolInfoStrings])

  const toolsClassified = React.useMemo(() => {
    if (!toolsArray?.length) {
      return []
    }
    return AnalysisToolCategories.map((c) => {
      const tools = toolsArray.filter((t) => t.categoryName === c)
      return {
        categoryName: c,
        categoryTitle: tools[0]?.categoryTitle || c,
        tools
      }
    })
  }, [toolsArray])

  const [searchIsActive, setSearchIsActive] = React.useState(false)
  const onSearchUpdate = (tools: AnalysisToolItem[], searchValue: string) => {
    setSearchIsActive(searchValue?.length > 0)
    setToolItems(tools)
  }
  React.useEffect(() => {
    if (!openPopper && searchIsActive) {
      setSearchIsActive(false)
    }
  }, [openPopper])

  const renderToolList = (list: AnalysisToolItem[]) => {
    return list?.length
      ? <List
        itemsJson={list.map((tool) => {
          return {
            itemKey: tool.toolName,
            itemStateDisabled: disableTool(tool.toolName),
            itemStateIcon: { icon: getIconByToolName(tool.toolName) },
            itemStateTitle: tool.title
          }
        })}
        size='default'
        treeStyle={TreeStyle.Card}
        overrideItemBlockInfo={({ itemBlockInfo }) => {
          return {
            name: TreeItemActionType.RenderOverrideItem,
            children: [{
              name: TreeItemActionType.RenderOverrideItemBody,
              children: [{
                name: TreeItemActionType.RenderOverrideItemIcon
              }, {
                name: TreeItemActionType.RenderOverrideItemTitle
              }]
            }]
          }
        }}
        onClickItemBody={(actionData, refComponent) => {
          const { itemJsons } = refComponent.props
          const currentItemJson = itemJsons[0]
          const toolName = currentItemJson.itemKey
          if (disableTool(toolName)) {
            return
          }
          onChange(toolName)
          setOpenPopper(false)
        }}
      />
      : <div className='tool-list-placeholder d-flex justify-content-center align-items-center'>
        <div className='ml-2'>{translate('noResultsFound')}</div>
      </div>
  }

  return (
    <div className="standard-analysis-tool-selector w-100" css={style}>
      <Button
        ref={selectButtonRef}
        type='primary'
        title={translate('addStandardTool')}
        aria-label={translate('addStandardTool')}
        className='w-100'
        css={css`font-size: 0.875rem`}
        onClick={onAddToolButtonClick}>
        <PlusOutlined size={16} />
        {translate('addStandardTool')}
      </Button>
      <SidePopper css={popperStyle} isOpen={openPopper} position="right" toggle={() => { setOpenPopper(false) }} trigger={selectButtonRef?.current} backToFocusNode={selectButtonRef?.current} title={translate('selectTool')}>
        <StandardToolSearch toolsArray={toolsArray} onSearchUpdate={onSearchUpdate} />
        <div className='px-3 pb-3'>
          {searchIsActive && renderToolList(toolItems)}
          {!searchIsActive && toolsClassified.map((item, index) => {
            const { categoryName, categoryTitle, tools } = item
            if (!tools?.length) {
              return null
            }
            return (
              <CollapsablePanel className='mb-1' key={categoryName} label={categoryTitle} type="default" defaultIsOpen={false} aria-label={categoryTitle}>
                {renderToolList(tools)}
              </CollapsablePanel>
            )
          })}
        </div>
      </SidePopper>
    </div>
  )
}

export default StandardAnalysisToolSelector
