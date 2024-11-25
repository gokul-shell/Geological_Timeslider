import { type WidgetJson, type ImmutableObject, type IMAppConfig, getAppStore, LayoutParentType } from 'jimu-core'
import { getAppConfigAction } from 'jimu-for-builder'
import { type ListLayout, type Status, type IMConfig } from '../../config'
export interface Option {
  layout: ListLayout
  config: IMConfig
  widgetId: string
  appConfig: IMAppConfig
  status: Status
  regularLayoutId?: string
  desLayoutId?: string
  label?: string
}
export const setLayoutAuto = (option: Option) => {
  const { layout, desLayoutId, config, widgetId, status } = option
  const action = getAppConfigAction()
  desLayoutId && action.removeLayout(desLayoutId)
  action.editWidgetConfig(widgetId, config.setIn(['cardConfigs', status, 'listLayout'], layout))
  action.editWidgetProperty(widgetId, `layouts.${status}`, {})
  action.exec()
}

export const setLayoutCustom = (option: Option) => {
  const { layout, regularLayoutId, config, widgetId, appConfig, status, label } = option
  const browserSizeMode = getAppStore().getState().appStateInBuilder.browserSizeMode
  const action = getAppConfigAction()

  const newLayoutJson = action.duplicateLayout(regularLayoutId, false)
  action.editLayoutProperty(newLayoutJson.id, 'label', label)

  const preLayoutId = appConfig.widgets[widgetId].layouts[status]?.[browserSizeMode]
  preLayoutId && action.removeLayout(preLayoutId)

  action.editWidgetConfig(widgetId, config.setIn(['cardConfigs', status, 'listLayout'], layout))
  action.editWidgetProperty(widgetId, `layouts.${status}.${browserSizeMode}`, newLayoutJson.id)
  action.editLayoutProperty(newLayoutJson.id, 'parent', { type: LayoutParentType.Widget, id: widgetId })
  action.exec()
}

export const getWidgetJsonById = (appConfig: IMAppConfig, widgetId: string): ImmutableObject<WidgetJson> => {
  const widgets = appConfig?.widgets
  const widgetJson = widgets?.[widgetId]
  return widgetJson
}
