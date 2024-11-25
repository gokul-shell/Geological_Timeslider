/** @jsx jsx */

import {
  classNames, React, jsx, defaultMessages as jimuCoreMessages, hooks
} from 'jimu-core'
import { type AllWidgetSettingProps } from 'jimu-for-builder'
import { defaultMessages as jimuUIMessages, Button, Radio, Label } from 'jimu-ui'
import { MapWidgetSelector, SettingRow, SettingSection, SidePopper } from 'jimu-ui/advanced/setting-components'
import { type IMConfig, BasemapsType } from '../config'
import { getStyles } from './style'
import defaultMessages from './translations/default'
import { List, TreeItemActionType } from 'jimu-ui/basic/list-tree'
import { CloseOutlined } from 'jimu-icons/outlined/editor/close'
import { ClickOutlined } from 'jimu-icons/outlined/application/click'
import { Fragment } from 'react'
import SidePopperContent from './side-poper-content'
// only used as type

const allDefaultMessages = Object.assign({}, defaultMessages, jimuCoreMessages, jimuUIMessages)

type SettingProps = AllWidgetSettingProps<IMConfig>
const Setting = (props: SettingProps): React.ReactElement => {
  const {
    id,
    token,
    onSettingChange,
    config: propConfig,
    useMapWidgetIds,
    theme
  } = props

  const { basemapsType, customBasemaps } = propConfig

  const translate = hooks.useTranslation(allDefaultMessages)

  const sidePopperButtonTrigger = React.useRef<HTMLButtonElement>(null)
  const sidePopperTrigger = React.useRef<HTMLDivElement>(null)
  const [isSidePopOpen, SetSidePopOpen] = React.useState(false)

  React.useEffect(() => {
    if (basemapsType !== BasemapsType.Custom) {
      closeSidePanel()
    }
  }, [basemapsType])

  const onMapWidgetSelected = (useMapWidgetIds: string[]) => {
    onSettingChange({ id, useMapWidgetIds, config: propConfig })
  }
  const closeSidePanel = () => {
    SetSidePopOpen(false)
  }
  const openSidePanel = () => {
    if (!isSidePopOpen) {
      SetSidePopOpen(true)
    }
  }
  const onPropertyChange = (name, value) => {
    if (value === propConfig[name]) return
    const newConfig = propConfig.set(name, value)
    const newProps = { id, config: newConfig }
    onSettingChange(newProps)
  }

  const optionChangeByDrag = (items) => {
    const config = propConfig.set('customBasemaps', items)
    onSettingChange({ id, config })
  }
  const removeBasemapItem = (index: number) => {
    const _fis = customBasemaps.asMutable({ deep: true })
    _fis.splice(index, 1)
    const config = propConfig.set('customBasemaps', _fis)
    onSettingChange({ id, config })
  }

  const CreateBasemapItemElement = (item, index) => {
    return (
      <div
        key={item.id}
        data-value={item.id}
        className='basemap-list-item'
      >
        <img className="basemap_thumb" src={item.thumbnailUrl + '?token=' + token} />
        <span
          className="text-left text-wrap text-break basemap-title"
          title={item.title}
        >
          {item.title}
        </span>
        <Button
          size="sm"
          type="tertiary"
          icon
          className='del-btn p-0'
          title={translate('delete')}
          aria-label={translate('delete')}
          onClick={(evt) => {
            evt.stopPropagation()
            removeBasemapItem(index)
          }}
          onKeyDown={(evt) => {
            if (evt.key === 'Enter' || evt.key === ' ') {
              evt.stopPropagation()
              removeBasemapItem(index)
            }
          }}
        >
          <CloseOutlined />
        </Button>
      </div>
    )
  }
  const createBasemapItems = () => {
    return (
      <List
        size='default'
        className='setting-ui-unit-list px-3'
        itemsJson={customBasemaps.asMutable().map((i, x) => ({ itemStateDetailContent: i, itemKey: `${x}` }))}
        dndEnabled
        onDidDrop={(actionData, refComponent) => {
          const { itemJsons: [, listItemJsons] } = refComponent.props
          optionChangeByDrag((listItemJsons as any).map(i => i.itemStateDetailContent))
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
          const listItemJsons = itemJsons[1] as any
          return CreateBasemapItemElement(currentItemJson.itemStateDetailContent, listItemJsons.indexOf(currentItemJson))
        }}
      />

    )
  }
  const notSelectMap = !useMapWidgetIds || useMapWidgetIds?.length <= 0
  return (
    <div
      className="jimu-widget-setting jimu-widget-basemap-setting h-100"
      css={getStyles(theme)}
    >
      <SettingSection
        className={classNames({ 'border-bottom-0': notSelectMap })}
        title={translate('selectMapWidget')}
      >
        <SettingRow>
          <MapWidgetSelector
            onSelect={onMapWidgetSelected}
            useMapWidgetIds={useMapWidgetIds}
          />
        </SettingRow>

      </SettingSection>

      { notSelectMap && (
          <div className="empty-placeholder w-100">
            <div className="empty-placeholder-inner">
              <div className="empty-placeholder-icon">
                <ClickOutlined size={48} />
              </div>
              <div
                className="empty-placeholder-text"
              >
                {translate('selectMapHint')}
              </div>
            </div>
          </div>
      )}

      {useMapWidgetIds?.length > 0 && (
        <Fragment>
          <SettingSection
            className={classNames({ 'border-0': basemapsType === BasemapsType.Organization || customBasemaps?.length <= 0 })}
            title={translate('baseMapSettings')}
            role='group'
            aria-label={translate('baseMapSettings')}
          >
            <SettingRow flow="wrap">
              <div role='radiogroup' className="mb-3">
                <Label className="d-flex align-items-center">
                  <Radio
                    style={{ cursor: 'pointer' }}
                    name="basemapsType"
                    className="mr-2"
                    checked={basemapsType === BasemapsType.Organization}
                    onChange={() => {
                      onPropertyChange(
                        'basemapsType',
                        BasemapsType.Organization
                      )
                    }
                    }
                  />
                  {translate('groupBasemaps')}
                </Label>
                <Label className="d-flex align-items-center">
                  <Radio
                    name="basemapsType"
                    className="mr-2"
                    checked={basemapsType === BasemapsType.Custom}
                    onChange={() => { onPropertyChange('basemapsType', BasemapsType.Custom) }
                    }
                  />
                  {translate('customBasemaps')}
                </Label>
              </div>
            </SettingRow>

            {basemapsType === BasemapsType.Custom && (
                <Button
                  ref={sidePopperButtonTrigger}
                  className="w-100 text-dark link-setting-ok-btn"
                  type="primary"
                  aria-description={translate('importTips')}
                  onClick={openSidePanel}
                >
                  {translate('importBasemaps')}
                </Button>

            )}
          </SettingSection>
          <div className="custom-list-container">
            {basemapsType === BasemapsType.Custom && (
              <div ref={sidePopperTrigger} className="h-100 position-relative py-3">
                {customBasemaps?.length <= 0 && (
                  <div className="empty-placeholder w-100">
                    <div className="empty-placeholder-inner">
                      <div className="empty-placeholder-icon">
                        <ClickOutlined size={48} />
                      </div>
                      <div
                        className="empty-placeholder-text"
                      >
                        {translate('importTips')}
                      </div>
                    </div>
                  </div>
                )}

                {customBasemaps?.length > 0 && createBasemapItems()}
              </div>
            )}
          </div>
        </Fragment>
      )}

      <SidePopper
        position="right"
        title={translate('sideTitle')}
        aria-label={translate('sideTitle')}
        isOpen={isSidePopOpen}
        toggle={closeSidePanel}
        trigger={[sidePopperButtonTrigger?.current, sidePopperTrigger?.current]}
      >
        <SidePopperContent {...props} />
      </SidePopper>
    </div>
  )
}
export default Setting
