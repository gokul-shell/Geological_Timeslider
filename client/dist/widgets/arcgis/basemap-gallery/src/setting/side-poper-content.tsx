/** @jsx jsx */

import { loadArcGISJSAPIModules, basemapUtils } from 'jimu-arcgis'
import {
  React, jsx, classNames, getAppStore, defaultMessages as jimuCoreMessages, hooks
} from 'jimu-core'
import { type AllWidgetSettingProps } from 'jimu-for-builder'
import { defaultMessages as jimuUIMessages, Select, Option, TextInput } from 'jimu-ui'
import { SettingRow, SettingSection } from 'jimu-ui/advanced/setting-components'
import { EmptyOutlined } from 'jimu-icons/outlined/application/empty'
import { type IMConfig } from '../config'
import { getPopperStyles } from './style'
import defaultMessages from './translations/default'
import { CheckFilled } from 'jimu-icons/filled/application/check'
import { SearchOutlined } from 'jimu-icons/outlined/editor/search'

const allDefaultMessages = Object.assign({}, defaultMessages, jimuCoreMessages, jimuUIMessages)
type SettingProps = AllWidgetSettingProps<IMConfig>
const SidePopperContent = (props: SettingProps): React.ReactElement => {
  const {
    id,
    token,
    onSettingChange,
    config: propConfig,
    theme
  } = props
  const { customBasemaps } = propConfig

  const translate = hooks.useTranslation(allDefaultMessages)

  const portal = React.useRef<__esri.Portal>(null)
  const portalUrl = React.useRef<string>(null)
  const portalSelf = React.useRef(null)
  const esriRequest = React.useRef(null)
  const [selectedGroup, setSelectedGroup] = React.useState({ title: translate('esriDefault'), id: '' })
  const [isGroupSelectDisabled, setGroupSelectDisabled] = React.useState(true)
  const [groups, setGroups] = React.useState([{ title: translate('esriDefault'), id: '' }])
  const [items, setItems] = React.useState(null)
  const [searchText, setSearchText] = React.useState('')
  const [groupBasemaps, setGroupBasemaps] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    loadArcGISJSAPIModules([
      'esri/portal/Portal',
      'esri/request'
    ]).then(modules => {
      portalUrl.current = getAppStore().getState().portalUrl
      portal.current = new modules[0]({
        url: portalUrl.current
      })
      esriRequest.current = modules[1]

      portal.current.load().then(async () => {
        portalSelf.current = portal.current.sourceJSON
        initGroups()
      })
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const initGroups = async () => {
    const user = getAppStore()?.getState()?.user
    const esriDefaultGroup = await basemapUtils.getBasemapGroup(portal.current, portalSelf.current, true)
    const orgDefaultGroup = await basemapUtils.getBasemapGroup(portal.current, portalSelf.current, false)
    const esriGroup = { id: esriDefaultGroup?.id, title: translate('esriDefault') }
    const orgGroup = { id: orgDefaultGroup?.id, title: translate('organizationDefault') }
    setGroups(([esriGroup, orgGroup] as any).concat(user?.groups))
    setSelectedGroup(esriGroup)
    setGroupSelectDisabled(false)
    await refreshItemsByGroupId(esriGroup.id)
    setLoading(false)
  }

  const refreshItemsByGroupId = async (groupId) => {
    const newItems = await basemapUtils.getBasemapItemsByGroupId(portal.current, portalUrl.current, groupId)
    setGroupBasemaps(newItems)
    setItems(newItems)
  }

  const onGroupChange = async e => {
    const group = groups.find(g => g.id === e.target.value)
    setSelectedGroup(group)
    setItems(null)
    setLoading(true)
    await refreshItemsByGroupId(group.id)
    setLoading(false)
    setSearchText('')
  }

  const onSearchChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const val = evt.target.value
    setSearchText(val)
    if (val === '') {
      setItems(groupBasemaps)
    } else {
      const newItems = groupBasemaps.filter(item => {
        return item.title.toUpperCase().indexOf(val.toUpperCase()) !== -1
      })
      setItems(newItems)
    }
  }
  const onItemSelected = (item: basemapUtils.BasemapItem, isSelected: boolean) => {
    let items
    if (isSelected) {
      items = (customBasemaps || []).concat(item)
    } else {
      items = customBasemaps?.filter(i => i.id !== item.id)
    }
    const config = propConfig.set('customBasemaps', items)
    onSettingChange({ id, config })
  }

  const renderBasemapItems = () => {
    if (items.length > 0) {
      return (
        <div className='basemap-items row no-gutters' role='listbox'>
          {
            items?.map((item, index) => {
              const isSelected = customBasemaps?.filter(i => i.id === item.id).length > 0
              return <button
                role='option'
                aria-selected={ isSelected }
                key={index} data-value={item.id}
                className={classNames('basemap-item', { 'item-border-color-selected': isSelected })}
                onClick={e => { onItemSelected(item, !isSelected) }}
              >
                <img src={item.thumbnailUrl + '?token=' + token} />
                <div className='text-left text-wrap text-break basemap-title' title={item.title}>{item.title}</div>
                <div className={classNames({ 'item-active-icon': isSelected }, { 'd-none': !isSelected })}>
                  <div className='text-center item-active-icon-container'>
                    <CheckFilled size='s' />
                  </div>
                </div>
              </button>
            })
          }
        </div>
      )
    } else {
      return (
        <div className='empty-placeholder w-100'>
          <div className='empty-placeholder-icon'><EmptyOutlined size={48} /></div>
          <div className='empty-placeholder-text'> {translate('noItemFoundWarning')}</div>
        </div>
      )
    }
  }

  return (
    <div className='basemap-setting-popper h-100' css={getPopperStyles(theme)}>
      {

        <SettingSection className = "pt-0" title={translate('chooseWebmaps')}>
          <SettingRow>
            <Select size="sm" role="menu" aria-label={translate('chooseWebmaps')} value={selectedGroup?.id} disabled={isGroupSelectDisabled} onChange={onGroupChange}>
              {
                groups?.map((group, index) => {
                  return <Option key={index} value={group?.id}>{group?.title}</Option>
                })
              }
            </Select>
          </SettingRow>

          <SettingRow className='search-row'>
            <TextInput
              size='sm'
              prefix={<SearchOutlined size='m' color={theme.colors.dark} />}
              placeholder={translate('search')}
              onChange={onSearchChange}
              aria-label={translate('search')}
              className='search-input py-0 w-100'
              value={searchText}
              disabled={loading}
              allowClear
            />
          </SettingRow>

          <SettingRow>

          { loading ? (<div className="jimu-secondary-loading" />) : renderBasemapItems() }
          </SettingRow>
        </SettingSection>
      }

    </div>
  )
}
export default SidePopperContent
