/** @jsx jsx */
import { React, jsx, css, type ImmutableArray, type ImmutableObject, hooks } from 'jimu-core'
import { Button, defaultMessages as jimuiDefaultMessages, Tooltip } from 'jimu-ui'
import { List, TreeItemActionType, type TreeItemType, type TreeItemsType } from 'jimu-ui/basic/list-tree'
import { ToolType, type HistoryItemWithDs, type ToolConfig, type CustomToolConfig } from '../../config'
import defaultMessages from '../translations/default'
import { getIconByToolName, useGetDisplayedToolName } from '../../utils/util'
import { TrashOutlined } from 'jimu-icons/outlined/editor/trash'
import { customToolHasUnsupportedParamaterType } from '../utils'
import { WarningOutlined } from 'jimu-icons/outlined/suggested/warning'

const { useState } = React

const listStyle = css`
  .jimu-tree-item__body {
    padding: 0.4375rem 0.5rem 0.4375rem 0;
    color: var(--dark-800);
    .hover-to-show-button {
      display: none;
    }
    &:hover {
      .hover-to-show-button {
        display: inline-block;
      }
    }
  }
  .jimu-tree-item__title {
    margin-left: 0.25rem;
    line-height: 1.125rem;
  }
  .jimu-tree-item_template .jimu-tree-item__icon {
    padding: 0 !important;
  }
  .button-container .button {
    color: var(--dark-800);
  }
  .count-button {
    padding: 0 0.375rem;
    border-radius: 0.5625rem;
  }
`

interface Props {
  editId?: string
  toolList: ImmutableArray<ToolConfig>
  historyListFromMap: HistoryItemWithDs[]
  onSort: (toolList: Array<ImmutableObject<ToolConfig>>) => void
  onDelete: (toolId: string) => void
  onOpenEdit: (toolId: string) => void
  onTriggerRefChange: (ref: HTMLDivElement) => void
}

const StandardAnalysisToolSelector = (props: Props): React.ReactElement => {
  const { editId, toolList, historyListFromMap, onSort, onDelete, onOpenEdit, onTriggerRefChange } = props
  const translate = hooks.useTranslation(defaultMessages, jimuiDefaultMessages)

  const [currentEditToolId, setCurrentEditToolId] = useState('')

  React.useEffect(() => {
    if (editId) {
      setCurrentEditToolId(editId)
    }
  }, [editId])

  const getDisplayedToolName = useGetDisplayedToolName()

  return (
    <React.Fragment>
      <List
        css={listStyle}
        className='mt-2'
        itemsJson={toolList.asMutable().map((tool) => ({
          itemStateDetailContent: tool,
          itemKey: `${tool.id}`,
          itemStateIcon: { icon: getIconByToolName(tool.toolName) },
          itemStateTitle: getDisplayedToolName(tool),
          itemStateChecked: tool.id === currentEditToolId
        }))}
        dndEnabled
        onUpdateItem={(actionData, refComponent) => {
          if (actionData.updateType !== TreeItemActionType.HandleDidDrop) {
            return
          }
          const { itemJsons } = refComponent.props
          const [, parentItemJson] = itemJsons as [TreeItemType, TreeItemsType]
          const sortedToolList = parentItemJson.map(item => {
            return item.itemStateDetailContent as ImmutableObject<ToolConfig>
          })
          if (sortedToolList.map((tool) => tool.id).join(',') !== toolList.map((item) => item.id).join(',')) {
            onSort(sortedToolList)
          }
        }}
        overrideItemBlockInfo={({ itemBlockInfo }) => {
          return {
            name: TreeItemActionType.RenderOverrideItem,
            children: [{
              name: TreeItemActionType.RenderOverrideItemDroppableContainer,
              children: [{
                name: TreeItemActionType.RenderOverrideItemDraggableContainer,
                children: [{
                  name: TreeItemActionType.RenderOverrideItemBody,
                  children: [{
                    name: TreeItemActionType.RenderOverrideItemDragHandle
                  }, {
                    name: TreeItemActionType.RenderOverrideItemIcon
                  }, {
                    name: TreeItemActionType.RenderOverrideItemTitle
                  }, {
                    name: TreeItemActionType.RenderOverrideItemMainLine
                  }]
                }]
              }]
            }]
          }
        }}
        renderOverrideItemMainLine={(actionData, refComponent) => {
          const { itemJsons } = refComponent.props
          const currentItemJson = itemJsons[0]
          const tool = currentItemJson.itemStateDetailContent as ImmutableObject<ToolConfig>
          const toolHistoryCountFromMap = historyListFromMap.filter((history) => history.toolId === tool.id).length
          const hasWarningIcon = tool.type === ToolType.Custom && customToolHasUnsupportedParamaterType((tool.config as ImmutableObject<CustomToolConfig>).toolInfo)
          return <div className='button-container'>
            {toolHistoryCountFromMap > 0 && <Tooltip placement='top' title={translate('toolHistoryCount', { count: toolHistoryCountFromMap })}>
              <Button className='border-0 count-button' size='sm' type='primary' >
                {toolHistoryCountFromMap}
              </Button>
            </Tooltip>}
            {/* TODO add link on 'details' once tooltip support link */}
            {hasWarningIcon && <Tooltip placement='bottom' showArrow title={translate('customToolHasUnsupportedParameterType')}>
              <Button className='border-0 count-button' size='sm' type='tertiary' icon >
                <WarningOutlined color='var(--warning-700)' />
              </Button>
            </Tooltip>}
            <Button
              className='p-0 border-0 ml-2 hover-to-show-button' size='sm' type='tertiary' icon aria-label={translate('deleteOption')}
              onClick={ (e) => { e.stopPropagation(); onDelete(tool.id) }}>
              <TrashOutlined />
            </Button>
          </div>
        }}
        handleClickItemBody={(actionData, refComponent) => {
          const { itemJsons } = refComponent.props
          const currentItemJson = itemJsons[0]
          const tool = currentItemJson.itemStateDetailContent as ImmutableObject<ToolConfig>

          setCurrentEditToolId(tool.id)
          onOpenEdit(tool.id)
          const bodyElemnent = refComponent.dragRef.current.children?.[0] as HTMLDivElement
          onTriggerRefChange(bodyElemnent)
        }}
      />

    </React.Fragment>
  )
}

export default StandardAnalysisToolSelector
