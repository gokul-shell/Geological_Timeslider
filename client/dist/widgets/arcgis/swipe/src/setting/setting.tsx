/** @jsx jsx */
import {
  jsx,
  React,
  css,
  polished,
  type IMState,
  ReactRedux,
  classNames,
  hooks,
  Immutable,
  type ImmutableArray
} from 'jimu-core'
import { getTheme2 } from 'jimu-theme'
import {
  defaultMessages as jimuUIMessages,
  Button,
  Radio,
  type LinearUnit,
  Switch,
  Label,
  Alert
} from 'jimu-ui'
import { getAppConfigAction, type AllWidgetSettingProps } from 'jimu-for-builder'
import {
  MapWidgetSelector,
  SettingRow,
  SettingSection
} from 'jimu-ui/advanced/setting-components'
import { ClickOutlined } from 'jimu-icons/outlined/application/click'
import defaultMessages from './translations/default'
import {
  type IMConfig,
  type Config,
  SwipeMode,
  SwipeStyle
} from '../config'
import SwipeTemplates from './components/swipe-templates'
import CustomizeSwipeLayers from './components/customize-swipe-layers'
import CustomizeSwipeMaps from './components/customize-swipe-maps'
import CustomizeScrollLayers from './components/customize-scroll-layers'
import { DEFAULT_SLIDER_POSITION, DEFAULT_SWIPE_STYLE } from '../constants'
import { InputUnit } from 'jimu-ui/advanced/style-setting-components'
import { ThemeColorPicker } from 'jimu-ui/basic/color-picker'
import { arraysEqual, getJimuMapViewId } from '../utils/utils'

const prefix = 'jimu-widget-'
const { useMemo, useState, useEffect } = React

const STYLE = css`
    &{
      .reset-template-and-select-map-section {
        border-bottom: none;
        padding-bottom: 0;
      }
      .placeholder-container {
        height: calc(100% - 100px);
        .placeholder-hint {
          font-size: ${polished.rem(14)};
          font-weight: 500;
          color: var(--dark-500);
          max-width: ${polished.rem(160)};
        }
        .placeholder-icon {
          color: var(--dark-200);
        }
      }
      .template-group {
        &.advance-style-group {
          padding-bottom: ${polished.rem(4)};
        }
        button {
          flex: 1;
          flex-grow: 1;
          padding: 0;
        }
        .style-margin-r {
          margin-right: ${polished.rem(6)};
        }
        .style-img {
          cursor: pointer;
          width: 100%;
          height: 70px;
          margin: 0;
          border: 1px solid transparent;
          background-color: var(--white);
          &.active {
            border: 2px solid var(--primary);
          }
          &.style-img-h {
            width: 100%;
            height: auto;
          }
        }
        .vertical-space {
          height: 10px;
        }
      }
      .resetting-template {
        cursor: pointer;
        color: var(--primary-700);
        vertical-align: middle;
        padding: 0;
      }
      .resetting-template:hover {
        cursor: pointer;
        color: var(--primary-800);
      }
      .slider-position {
        .input-group {
          width: ${polished.rem(70)};
        }
      }
    }
  `

const Setting = (props: AllWidgetSettingProps<IMConfig>) => {
  const { onSettingChange, id, useMapWidgetIds, config } = props
  const { styleConfig, swipeStyle, swipeMode } = config
  const { isAllowDeactivateLayers = true, sliderPosition = DEFAULT_SLIDER_POSITION, dividerColor = 'var(--light)', handleColor = 'var(--light)' } = styleConfig || {}
  const [previousSwipeStyle, setPreviousSwipeStyle] = useState(DEFAULT_SWIPE_STYLE)
  const [mapUseDataSources, setMapUseDataSources] = useState<ImmutableArray<string>>(Immutable([]))
  const translate = hooks.useTranslation(defaultMessages, jimuUIMessages)
  const appTheme = getTheme2()

  const useDataSources = ReactRedux.useSelector((state: IMState) => {
    const s = state.appStateInBuilder ?? state
    return s.appConfig.widgets[useMapWidgetIds?.[0]]?.useDataSources
  })

  const dsJsons = ReactRedux.useSelector((state: IMState) => {
    const s = state.appStateInBuilder ?? state
    return s.appConfig.dataSources
  })

  useEffect(() => {
    const newDsIds = useDataSources?.map(ds => ds.dataSourceId)
    setMapUseDataSources(newDsIds)
  }, [useDataSources])

  //When data sources in map widget is changed, change the config accordingly. Only do this change after the swipe setting page is mounted.
  hooks.useUpdateEffect(() => {
    const newSwipeMapViewList = { ...config.swipeMapViewList }
    Object.keys(newSwipeMapViewList).forEach(jimuMapViewId => {
      const mapUseJimuMapView = useDataSources?.map(ds => {
        return getJimuMapViewId(useMapWidgetIds[0], ds.dataSourceId)
      })
      if (!mapUseJimuMapView?.includes(jimuMapViewId)) {
        delete newSwipeMapViewList[jimuMapViewId]
      }
    })

    const newScrollMapViewList = { ...config.scrollMapViewList }
    Object.keys(newScrollMapViewList).forEach(jimuMapViewId => {
      const mapUseJimuMapView = useDataSources?.map(ds => {
        return getJimuMapViewId(useMapWidgetIds[0], ds.dataSourceId)
      })
      if (!mapUseJimuMapView?.includes(jimuMapViewId)) {
        delete newScrollMapViewList[jimuMapViewId]
      }
    })

    const useDsIds = useDataSources?.map(ds => ds.dataSourceId)
    let newMapUseDataSourcesOrderList = [...config.mapUseDataSourcesOrderList ?? []]
    if (useDsIds && config.mapUseDataSourcesOrderList) {
      if (!arraysEqual(useDsIds, config.mapUseDataSourcesOrderList)) {
        newMapUseDataSourcesOrderList = []
      }
    }

    const newConfig = config.set('swipeMapViewList', newSwipeMapViewList).set('scrollMapViewList', newScrollMapViewList).set('mapUseDataSourcesOrderList', newMapUseDataSourcesOrderList)
    onSettingChange({
      id: id,
      config: newConfig
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useDataSources])

  const onMapWidgetSelected = (ids: string[]) => {
    onSettingChange({
      id: id,
      config: {
        swipeStyle: swipeStyle,
        swipeMode: SwipeMode.SwipeBetweenLayers
      },
      useMapWidgetIds: ids
    })
  }

  const onPropertyChange = (name: string[], value: any) => {
    if (value === config.getIn(name)) {
      return
    }
    if (value === undefined) {
      config.without(name[0] as keyof Config)
    }
    onConfigChange(name, value)
  }

  const onConfigChange = (key: string[], value: any) => {
    const newConfig = config.setIn(key, value)
    const alterProps = {
      id: props.id,
      config: newConfig
    }
    props.onSettingChange(alterProps)
  }

  const handleResetSwipeStyleClick = evt => {
    setPreviousSwipeStyle(swipeStyle)

    onSettingChange({
      id: id,
      config: {
        swipeMode: SwipeMode.SwipeBetweenLayers
      }
    })
  }

  const hasMap = useMemo(() => useMapWidgetIds?.length > 0, [useMapWidgetIds])

  const handleSwipeMode = (swipeMode: SwipeMode) => {
    const newConfig = config.set('swipeMode', swipeMode)
    props.onSettingChange({
      id: id,
      config: newConfig
    })
  }

  const setSliderPosition = (value: LinearUnit) => {
    onSettingChange({
      id: id,
      config: config.setIn(['styleConfig', 'sliderPosition'], value)
    })
  }

  const onDividerColorChange = (color: string) => {
    onSettingChange({
      id: id,
      config: config.setIn(['styleConfig', 'dividerColor'], color)
    })
  }

  const onHandleColorChange = (color: string) => {
    props.onSettingChange({
      id: id,
      config: config.setIn(['styleConfig', 'handleColor'], color)
    })
  }

  const onAllowDeactivateLayers = () => {
    onSettingChange({
      id: id,
      config: config.setIn(['styleConfig', 'isAllowDeactivateLayers'], !isAllowDeactivateLayers)
    })
  }

  const isMapUnoccupied = (): boolean => {
    //Selecting None option in map widget selector
    if (useMapWidgetIds === undefined || useMapWidgetIds.length === 0) {
      return true
    }

    const usedMapWidgetId = useMapWidgetIds?.[0]
    const appConfig = getAppConfigAction().appConfig
    for (const widgetId of Object.keys(appConfig.widgets)) {
      const widget = appConfig.widgets[widgetId]
      if (
        widget.manifest.name === 'swipe' &&
        widget.id !== id &&
        widget.useMapWidgetIds?.[0] === usedMapWidgetId
      ) {
        return false
      }
    }
    return true
  }

  const showCustomizeSwipeLayersSetting = (swipeStyle === SwipeStyle.SimpleHorizontal || swipeStyle === SwipeStyle.SimpleVertical) && swipeMode === SwipeMode.SwipeBetweenLayers

  const showCustomizeSwipeMapsSetting = (swipeStyle === SwipeStyle.SimpleHorizontal || swipeStyle === SwipeStyle.SimpleVertical) && swipeMode === SwipeMode.SwipeBetweenMaps

  const showCustomizeScrollLayersSetting = swipeStyle === SwipeStyle.AdvancedHorizontal || swipeStyle === SwipeStyle.AdvancedVertical

  const showAllowDeactivateLayersSetting = ((swipeStyle === SwipeStyle.SimpleHorizontal || swipeStyle === SwipeStyle.SimpleVertical) && swipeMode === SwipeMode.SwipeBetweenLayers) || (swipeStyle === SwipeStyle.AdvancedHorizontal || swipeStyle === SwipeStyle.AdvancedVertical)

  const renderSwipeSetting = () => {
    return (
      <div className='h-100'>
        <SettingSection className='reset-template-and-select-map-section'>
          <SettingRow flow='wrap'>
            <div className='w-100'>
              <Button className='resetting-template' type='tertiary' onClick={handleResetSwipeStyleClick}>
                {translate('chooseOtherTemplateTip')}
              </Button>
            </div>
          </SettingRow>
          <SettingRow
            flow='wrap'
            label={translate('selectMapWidget')}
            aria-label={translate('selectMapWidget')}
            role='group'
          >
            <MapWidgetSelector onSelect={onMapWidgetSelected} useMapWidgetIds={useMapWidgetIds} />
            {!isMapUnoccupied() && (
              <Alert
                tabIndex={0}
                className={'mapWarningMsg mt-2'}
                open
                text={translate('mapOccupied')}
                type={'warning'}
                withIcon
              ></Alert>
            )}
          </SettingRow>
        </SettingSection>
        {
          hasMap
            ? <div>
                {(swipeStyle === SwipeStyle.SimpleHorizontal || swipeStyle === SwipeStyle.SimpleVertical) &&
                  <SettingSection
                    title={translate('swipeMode')}
                    role='group'
                    aria-label={translate('swipeMode')}
                  >
                    <SettingRow>
                      <div className='d-flex justify-content-between w-100 align-items-center'>
                        <div className='align-items-center d-flex'>
                          <Label
                            className='d-flex align-items-center'
                          >
                            <Radio
                              className="mr-2"
                              style={{ cursor: 'pointer' }}
                              checked={swipeMode === SwipeMode.SwipeBetweenLayers}
                              onChange={() => { handleSwipeMode(SwipeMode.SwipeBetweenLayers) }}
                            />
                            {translate('swipeBetweenLayers')}
                          </Label>
                        </div>
                      </div>
                    </SettingRow>
                    <SettingRow>
                      <div className='d-flex justify-content-between w-100 align-items-center'>
                        <div className='align-items-center d-flex'>
                          <Label
                            className='d-flex align-items-center'
                          >
                            <Radio
                              className="mr-2"
                              style={{ cursor: 'pointer' }}
                              checked={swipeMode === SwipeMode.SwipeBetweenMaps}
                              disabled={mapUseDataSources?.length !== 2}
                              onChange={() => { handleSwipeMode(SwipeMode.SwipeBetweenMaps) }}
                            />
                            {translate('swipeBetweenMaps')}
                          </Label>
                        </div>
                      </div>
                    </SettingRow>
                  </SettingSection>
                }
                {showCustomizeSwipeLayersSetting &&
                    <CustomizeSwipeLayers
                      useMapWidgetId={useMapWidgetIds[0]}
                      onConfigChange={onConfigChange}
                      mapUseDataSources={mapUseDataSources}
                      swipeMapViewList={config.swipeMapViewList?.asMutable({ deep: true })}
                      swipeStyle={swipeStyle}
                      folderUrl={props.context.folderUrl}
                    />
                }
                {showCustomizeSwipeMapsSetting &&
                   <CustomizeSwipeMaps
                    onConfigChange={onConfigChange}
                    mapUseDataSourcesOrderList={config.mapUseDataSourcesOrderList}
                    mapUseDataSources={mapUseDataSources}
                    dsJsons={dsJsons}
                    swipeStyle={swipeStyle}
                    />
                }
                {showCustomizeScrollLayersSetting &&
                   <CustomizeScrollLayers
                      useMapWidgetId={useMapWidgetIds[0]}
                      onConfigChange={onConfigChange}
                      scrollMapViewList={config.scrollMapViewList?.asMutable({ deep: true })}
                      mapUseDataSources={mapUseDataSources}
                      swipeStyle={swipeStyle}
                      folderUrl={props.context.folderUrl}
                    />
                }
                <SettingSection
                  title={translate('generalSettings')}
                  role='group'
                  aria-label={translate('generalSettings')}
                >
                {(swipeStyle === SwipeStyle.SimpleHorizontal || swipeStyle === SwipeStyle.SimpleVertical) &&
                  <SettingRow label={translate('sliderPosition')} className='slider-position'>
                    <InputUnit
                      value={sliderPosition}
                      min={0}
                      max={100}
                      onChange={setSliderPosition}
                      aria-label={translate('sliderPosition')}
                    />
                  </SettingRow>}
                  <SettingRow label={translate('dividerColor')}>
                    <ThemeColorPicker
                      title={translate('dividerColor')}
                      aria-label={translate('dividerColor')}
                      value={dividerColor}
                      onChange={onDividerColorChange}
                      specificTheme={appTheme}
                    />
                  </SettingRow>
                  {(swipeStyle === SwipeStyle.SimpleHorizontal || swipeStyle === SwipeStyle.SimpleVertical) &&
                  <SettingRow label={translate('handleColor')}>
                    <ThemeColorPicker
                      title={translate('handleColor')}
                      aria-label={translate('handleColor')}
                      value={handleColor}
                      onChange={onHandleColorChange}
                      specificTheme={appTheme}
                    />
                  </SettingRow>}
                  {showAllowDeactivateLayersSetting &&
                  <SettingRow label={translate('allowDeactivateLayers')}>
                    <Switch
                      aria-label={translate('allowDeactivateLayers')}
                      title={translate('allowDeactivateLayers')}
                      checked={isAllowDeactivateLayers}
                      onChange={onAllowDeactivateLayers}
                    />
                  </SettingRow>}
                </SettingSection>
              </div>
            : <div className='d-flex justify-content-center align-items-center placeholder-container'>
                <div className='text-center'>
                  <ClickOutlined size={48} className='d-inline-block placeholder-icon mb-2' />
                  <p className='placeholder-hint'>{translate('selectMapHint')}</p>
                </div>
              </div>
        }

      </div>
    )
  }

  return (
    <div
      className={classNames(`${prefix}swipe-setting`, `${prefix}setting`)}
      css={STYLE}
    >
      { !swipeStyle
        ? <SwipeTemplates
            onPropertyChange={onPropertyChange}
            swipeStyle={previousSwipeStyle || DEFAULT_SWIPE_STYLE}
            folderUrl={props.context.folderUrl}
          />
        : renderSwipeSetting()
      }
    </div>
  )
}

export default Setting
