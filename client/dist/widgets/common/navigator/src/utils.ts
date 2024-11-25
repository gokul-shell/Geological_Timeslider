import { getAppStore, hooks, type IMState, LayoutType } from 'jimu-core'
import { getAppConfigAction } from 'jimu-for-builder'
import { LayoutItemSizeModes } from 'jimu-layouts/lib/types'
import { defaultMessages as jimuDefaultMessage, utils } from 'jimu-ui'
import React from 'react'
import { type IMViewNavigationDisplay, type ViewNavigationDisplay } from './runtime/components/view-navigation'

export const setWidgetSize = (display: Partial<ViewNavigationDisplay> | IMViewNavigationDisplay) => {
  let runtimeState: IMState
  const state = getAppStore().getState()
  if (window.jimuConfig.isBuilder) {
    runtimeState = state?.appStateInBuilder
  } else {
    runtimeState = state
  }

  const layoutInfo = runtimeState?.appRuntimeInfo?.selection

  const layout = runtimeState.appConfig.layouts?.[layoutInfo?.layoutId]

  if (!layout) {
    return
  }

  if (layout?.type === LayoutType.FixedLayout) {
    /**
     * change auto size and default size after quick style or direction changed
     * For tab style: auto width and auto height
     * For symbol, slide and arrow style: auto height
     * For all styles: if change to custom, default size of horizontal will be: width: 380, height: 60, default size of vertical will be width: 60, height: 380
     */

    const isTabStyle = display?.type === 'nav' && display?.standard?.showText
    const isVertical = display?.vertical

    getAppConfigAction().editLayoutItemSize(layoutInfo, isVertical ? 60 : 380, isVertical ? 380 : 60).exec()

    getAppConfigAction().editLayoutItemProperty(
      layoutInfo,
      'setting.autoProps',
      {
        width: isTabStyle || isVertical ? LayoutItemSizeModes.Auto : LayoutItemSizeModes.Custom,
        height: isTabStyle || !isVertical ? LayoutItemSizeModes.Auto : LayoutItemSizeModes.Custom
      }
    ).exec()
  }
}

const leftArrowIcon = require('jimu-ui/lib/icons/arrow-left-12.svg')
const rightArrowIcon = require('jimu-ui/lib/icons/arrow-right-12.svg')

export const useCustomIcons = () => {
  const translate = hooks.useTranslation(jimuDefaultMessage)
  return React.useMemo(() => [
    utils.toIconResult(leftArrowIcon, translate('arrowLeft12'), 12),
    utils.toIconResult(rightArrowIcon, translate('arrowRight12'), 12)
  ], [translate])
}
