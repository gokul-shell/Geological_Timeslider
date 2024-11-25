import { type extensionSpec, type IMAppConfig } from 'jimu-core'
import { type IMConfig } from '../config'

export default class AppConfigOperation implements extensionSpec.AppConfigOperationsExtension {
  id = 'query-app-config-operation'

  afterWidgetCopied (
    sourceWidgetId: string,
    sourceAppConfig: IMAppConfig,
    destWidgetId: string,
    destAppConfig: IMAppConfig,
    widgetMap?: { [key: string]: string }
  ): IMAppConfig {
    if (!widgetMap) { // no need to change widget linkage if it is not performed during a page copying
      return destAppConfig
    }

    const widgetJson = sourceAppConfig.widgets[sourceWidgetId]
    const config: IMConfig = widgetJson?.config
    const currentSectionId = widgetMap?.[config?.data?.section]
    const sourceWidgetSectionView = sourceAppConfig?.sections?.[config?.data?.section]?.views
    const currentWidgetSectionView = destAppConfig?.sections?.[currentSectionId]?.views

    const displayViews = []
    sourceWidgetSectionView?.forEach((view, index) => {
      if (config?.data?.views?.includes(view)) {
        displayViews.push(currentWidgetSectionView[index])
      }
    })
    const newAppConfig = destAppConfig.setIn(['widgets', destWidgetId, 'config', 'data', 'section'], currentSectionId)
      .setIn(['widgets', destWidgetId, 'config', 'data', 'views'], displayViews)

    return newAppConfig
  }

  /**
   * Do some cleanup operations before current widget is removed.
   * @returns The updated appConfig
   */
  widgetWillRemove (appConfig: IMAppConfig): IMAppConfig {
    return appConfig
  }
}
