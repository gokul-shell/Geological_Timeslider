/** @jsx jsx */
import { React, jsx, css } from 'jimu-core'
import { List } from 'jimu-ui/basic/list-tree'
import { type LayerInfo } from '../../config'

export interface LayerListProps {
  layerList: LayerInfo[]
  onChange?: (jimuLayerViewId: string) => void
  isAllowDeactivateLayers: boolean
  highlightIndex?: number
}

export const LayerList = (props: LayerListProps) => {
  const { layerList, onChange, isAllowDeactivateLayers, highlightIndex } = props

  const [itemsJson, setItemsJson] = React.useState(() => {
    return layerList?.map((layerObj: LayerInfo) => {
      return {
        itemKey: layerObj.layerId,
        itemStateTitle: layerObj.title,
        itemStateChecked: isAllowDeactivateLayers ? layerObj.selected : false,
        itemStateDisabled: !layerObj.visible,
        isCheckboxDisabled: !layerObj.visible
      }
    })
  })

  React.useEffect(() => {
    const newList = layerList?.map((layerObj: LayerInfo) => {
      return {
        itemKey: layerObj.layerId,
        itemStateTitle: layerObj.title,
        itemStateChecked: isAllowDeactivateLayers ? layerObj.selected : false,
        itemStateDisabled: !layerObj.visible,
        isCheckboxDisabled: !layerObj.visible
      }
    })
    setItemsJson(newList)
  }, [layerList, isAllowDeactivateLayers])

  const handleUpdateListItem = (actionData, refComponent) => {
    if (!isAllowDeactivateLayers) {
      return
    }
    const [currentItemJson, nextItemsJson] = actionData.itemJsons
    setItemsJson([...nextItemsJson])
    onChange(currentItemJson.itemKey)
  }

  return (
    <div className='layer-list' css={getStyle(highlightIndex)}>
      <List
        size='default'
        className='w-100'
        itemsJson={itemsJson}
        isMultiSelection={isAllowDeactivateLayers}
        dndEnabled={false}
        disableDoubleClickTitle={true}
        onUpdateItem={handleUpdateListItem}
      />
    </div>
  )
}

function getStyle (highlightIndex: number) {
  return css`
    .jimu-tree-item_template-card .jimu-tree-item__body:hover {
      background-color: transparent !important;
    }
    .jimu-tree-main {
      .jimu-tree-item:nth-of-type(${highlightIndex}) {
        .jimu-tree-item__body {
          border-left: .125rem solid var(--primary) !important;
        }
      }
    }
  `
}
