/** @jsx jsx */
import { React, type AllWidgetProps, jsx, type IMState, ReactRedux, Immutable, type ImmutableArray, getAppStore, appActions, hooks, BrowserSizeMode, moduleLoader } from 'jimu-core'
import { type IMConfig, ViewType } from '../config'
import { Palceholder } from './components/placeholder'
import { ViewNavigation, type ViewNavigationDisplay } from './components/view-navigation'
import { versionManager } from '../version-manager'
import {
  useWidgetStyle, useSectionViewsChange, useNavigationLinks, useHandleSectionsChange, useContainerSectionChange,
  useHandleViewsChange, useSwitchView, useUpdateProgress, useAppModeChange, useNavTemplates,
  useWidgetSelectedChange, useQuickStyleOpen, useNavigationViews
} from './utils'
import { setWidgetSize } from '../utils'
const { useRef, useEffect, useState, useMemo } = React
const { useSelector, useDispatch } = ReactRedux

type NavigatorProps = AllWidgetProps<IMConfig>

const getNavButtonGroupInfo = (currentViewId: string, progress: number, useProgress: boolean, views: ImmutableArray<string>) => {
  let disablePrevious, disableNext
  const totalPage = views?.length ?? 0
  let current = !views?.includes(currentViewId) ? 0 : views?.indexOf(currentViewId)
  current = current + 1
  if (!useProgress) {
    disablePrevious = current <= 1
    disableNext = current === totalPage
  } else {
    let index = 0
    const length = views?.length ?? 0
    if (length > 1) {
      index = progress * (length - 1)
      const offset = index % 1
      index = Math.floor(index)

      disablePrevious = index === 0 && offset === 0
      disableNext = index === totalPage - 1 && offset === 0
    }
  }
  return { current, totalPage, disableNext, disablePrevious }
}

const Widget = (props: NavigatorProps) => {
  const {
    id,
    config,
    builderSupportModules,
    onInitDragHandler,
    onInitResizeHandler
  } = props

  const dispatch = useDispatch()
  const getAppConfigAction = builderSupportModules?.jimuForBuilderLib?.getAppConfigAction
  const nodeRef = useRef<HTMLDivElement>(null)
  const { current: isInBuilder } = useRef(getAppStore().getState()?.appContext?.isInBuilder)
  const showQuickStyle = useSelector((state: IMState) => state?.widgetsState?.[id]?.showQuickStyle)
  const hasEverMount = useSelector((state: IMState) => state?.widgetsState?.[id]?.hasEverMount)
  const templates = useNavTemplates(isInBuilder)

  const display = config?.display
  const data = config?.data
  const propStandard = display?.standard
  const type = data?.type
  const section = data?.section
  const step = propStandard?.step ?? 1

  const [isMount, setIsMount] = useState(false)
  const defaultView = useSelector((state: IMState) => state?.appConfig?.sections?.[section]?.views?.[0])
  const sectionNavInfo = useSelector((state: IMState) => state?.appRuntimeInfo?.sectionNavInfos?.[section])
  const views = useNavigationViews(section, data?.views, type)
  const links = useNavigationLinks(views, display)

  const progress = sectionNavInfo?.progress
  const useProgress = sectionNavInfo?.useProgress
  const currentViewId = sectionNavInfo?.currentViewId ?? defaultView

  const style = useWidgetStyle(display?.vertical)

  const standard = React.useMemo(() => {
    const navButtonGroupInfo = getNavButtonGroupInfo(currentViewId, progress, useProgress, views)
    return {
      ...propStandard,
      ...navButtonGroupInfo
    } as any
  }, [currentViewId, progress, propStandard, useProgress, views])

  const closeQuickStyle = React.useCallback(() => {
    dispatch(appActions.widgetStatePropChange(id, 'showQuickStyle', false))
  }, [dispatch, id])

  //When view navigation display changed (by quick style), save them to config
  const handleTemplateChange = (_display: Partial<ViewNavigationDisplay>) => {
    if (!getAppConfigAction) return
    const display = Immutable(_display).set('vertical', false).set('advanced', false).set('variant', null)
    getAppConfigAction().editWidgetProperty(id, 'config', config.setIn(['data', 'type'], ViewType.Auto).set('display', display)).exec()

    setWidgetSize(_display)
  }

  //Monitor and trigger quick-style close when related state changed
  useAppModeChange(id)
  useWidgetSelectedChange(id)

  //Automatically display quick style panel for the newly added navigator
  useQuickStyleOpen(id, hasEverMount)

  //Listen the changes of sections
  const handleSectionsChange = useHandleSectionsChange(id, getAppConfigAction)
  useContainerSectionChange(id, handleSectionsChange)
  //Listen the changes of views
  const handleViewChange = useHandleViewsChange(id, getAppConfigAction)
  useSectionViewsChange(section, handleViewChange)

  //The method used to switch views
  const switchView = useSwitchView(section)
  //The method used to update the progress of `SectionNavInfo`
  const updateProgress = useUpdateProgress(section)

  const handleChange = hooks.useEventCallback((type, value) => {
    if (type === 'navButtonGroup') {
      switchView(value, step)
    } else if (type === 'slider') {
      updateProgress(value)
    }
  })

  useEffect(() => {
    if (!isMount) {
      setIsMount(true)
    }
    // eslint-disable-next-line
  }, [])

  const NavQuickStyle = builderSupportModules?.widgetModules.NavQuickStyle

  const browserSizeMode = useSelector((state: IMState) => state?.browserSizeMode)

  const isSmall = useMemo(() => browserSizeMode === BrowserSizeMode.Small, [browserSizeMode])

  const [openQuickStylePopper, setOpenQuickStylePopper] = useState(false)

  const uri = useSelector((state: IMState) => state?.appConfig?.widgets?.[id]?.uri)

  useEffect(() => {
    if (isSmall) {
      const appBuilderSync = moduleLoader.getModuleSync('jimu-for-builder').appBuilderSync
      appBuilderSync.publishSidePanelToApp({
        type: 'navigatorQuickStyle',
        widgetId: id,
        uri,
        templates,
        display: config?.display,
        onChange: handleTemplateChange,
        active: showQuickStyle
      })
    }
    if (!showQuickStyle) {
      if (openQuickStylePopper) {
        setOpenQuickStylePopper(false)
      }
      return
    }
    if (!isSmall) {
      setOpenQuickStylePopper(true)
    }
  }, [showQuickStyle])

  return <div className="widget-view-navigation jimu-widget" css={style} ref={nodeRef}>
    <Palceholder widgetId={id} show={!links.length}></Palceholder>
    <ViewNavigation
      data={links}
      activeView={currentViewId}
      progress={progress}
      onChange={handleChange}
      {...display}
      standard={standard}
    />
    {isMount && NavQuickStyle && <NavQuickStyle
      templates={templates}
      display={config?.display}
      onChange={handleTemplateChange}
      onClose={closeQuickStyle}
      open={openQuickStylePopper}
      reference={nodeRef.current}
      usePopper
      onInitDragHandler={onInitDragHandler}
      onInitResizeHandler={onInitResizeHandler} />}
  </div>
}

Widget.versionManager = versionManager

export default Widget
