import { React, ReactRedux, hooks, Immutable, type IMState, utils, getAppStore, polished } from 'jimu-core'
import { SizeEditor } from 'jimu-ui/advanced/style-setting-components'
import { PositionSetting } from './position-setting'
import { LayoutItemSizeModes } from 'jimu-layouts/layout-runtime'
import { SettingRow } from 'jimu-ui/advanced/setting-components'
import { type LinearUnit, NumericInput, defaultMessages as jimuMessages } from 'jimu-ui'
import defaultMessages from '../translations/default'
import { styled } from 'jimu-theme'
import { DEFAULT_FIXED_LAYOUT_STYLE } from '../../common/consts'
import { getAppConfigAction } from 'jimu-for-builder'
import { FixedAnimationSetting } from './animation-setting'

interface FixedLayoutSettingProps {
  id: string
}

const Root = styled.div`
  width: 100%;
  .position-size {
    display: flex;
    justify-content: space-between;
    .sizes-editor {
      width: 121px;
      .app-root-emotion-cache-ltr-50z74a >.jimu-widget-setting--row-label {
        margin-right: 8px;
      }
      .size-editor {
        width: 100px !important;
      }
    }
  }
  .jimu-widget-setting--row-label {
    margin-right: auto;
  }
  .offset-numeric-input {
    width: 70px !important;
  }
`

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--light-500);
  margin: 16px 0;
`
const convertStringToLinearUnit = (value: string | LinearUnit) => {
  if (typeof value === 'string') {
    const ret = polished.getValueAndUnit(value)
    return {
      distance: ret[0],
      unit: ret[1]
    }
  } else {
    return value
  }
}

const getWindowSize = (vertical: boolean) => {
  const appState = getAppStore().getState().appStateInBuilder
  const { width, height } = utils.findViewportSize(appState.appConfig, appState.browserSizeMode)
  return vertical ? height : width
}

const pxToPercent = (px: number, vertical: boolean) => {
  const size = getWindowSize(vertical)
  return parseFloat(((px / size) * 100).toFixed(3))
}

const percentToPx = (percent: number, vertical: boolean) => {
  const size = getWindowSize(vertical)
  return Math.floor((percent * size) / 100)
}

const convertUnit = (preValue: LinearUnit, value: LinearUnit, vertical: boolean) => {
  let val = value.distance
  const parsedPreValue = convertStringToLinearUnit(preValue)
  if (parsedPreValue.unit === 'px' && value.unit === '%') {
    val = pxToPercent(value.distance, vertical)
  } else if (parsedPreValue.unit === '%' && value.unit === 'px') {
    val = percentToPx(value.distance, vertical)
  }
  return { distance: val, unit: value.unit }
}

export const FixedLayoutStyleSetting = (props: FixedLayoutSettingProps) => {
  const { id } = props

  const panelJson = ReactRedux.useSelector((state: IMState) => {
    return state.appStateInBuilder.appConfig.controllerPanels?.[id]
  })

  const originValue = panelJson ?? Immutable(DEFAULT_FIXED_LAYOUT_STYLE)

  const translate = hooks.useTranslation(jimuMessages, defaultMessages)

  const handleChange = (key: string, val: any) => {
    const appConfigAction = getAppConfigAction()
    appConfigAction.editControllerPanel(id, originValue.set(key, val)).exec()
  }

  const handleSizeChange = (key: string, val: LinearUnit) => {
    const vertical = key === 'height'
    const value = convertUnit(originValue[key], val, vertical)
    const size = `${value?.distance ?? 0}${value?.unit ?? 'px'}`
    const appConfigAction = getAppConfigAction()
    appConfigAction.editControllerPanel(id, originValue.set(key, size)).exec()
  }

  return (
    <Root className='fixed-layout-style-setting'>
      <div className='position-size'>
        <PositionSetting aria-label={translate('positionAndSize')} value={originValue.position} onChange={(position) => { handleChange('position', position) }} />
        <div className='sizes-editor'>
          <SettingRow className='mt-0' label='W' aria-label={translate('width')}>
            <SizeEditor
              label='W'
              mode={LayoutItemSizeModes.Custom}
              disableModeSelect
              value={originValue.width}
              onChange={(width) => { handleSizeChange('width', width) }}
            />
          </SettingRow>
          <SettingRow className='mt-3' label='H' aria-label={translate('height')}>
            <SizeEditor
              label='H'
              mode={LayoutItemSizeModes.Custom}
              disableModeSelect
              value={originValue.height}
              onChange={(height) => { handleSizeChange('height', height) }}
            />
          </SettingRow>
        </div>
      </div>
      <SettingRow className='mt-3' flow='no-wrap' label={translate('offsetX')} truncateLabel>
        <NumericInput aria-label={translate('offsetX')} className='offset-numeric-input' size='sm' value={originValue.offsetX} onAcceptValue={(offsetX) => { handleChange('offsetX', offsetX) }} />
      </SettingRow>
      <SettingRow className='mt-3' flow='no-wrap' label={translate('offsetY')} truncateLabel>
        <NumericInput aria-label={translate('offsetY')} className='offset-numeric-input' size='sm' value={originValue.offsetY} onAcceptValue={(offsetY) => { handleChange('offsetY', offsetY) }} />
      </SettingRow>
      <Divider></Divider>
      <FixedAnimationSetting controllerId={id} />
    </Root>
  )
}
