/** @jsx jsx */
import { classNames, getAppStore, React, type AllWidgetProps, jsx, MutableStoreManager, ReactRedux, type IMState, hooks } from 'jimu-core'
import { type JimuMapView, JimuMapViewComponent, basemapUtils } from 'jimu-arcgis'
import { WidgetPlaceholder } from 'jimu-ui'
import { type IMConfig, BasemapsType } from '../config'
import { getStyles } from './style'
import defaultMessages from './translations/default'
import Basemap from 'esri/Basemap'
import BasemapGallery from 'esri/widgets/BasemapGallery'
import Portal from 'esri/portal/Portal'
import BasemapGalleryViewModel from 'esri/widgets/BasemapGallery/BasemapGalleryViewModel'
import BasemapGalleryItem from 'esri/widgets/BasemapGallery/support/BasemapGalleryItem'
// import reactiveUtils from '@arcgis/core/core/reactiveUtils'

const BaseMapGalleryIcon = require('../../icon.svg')
type BaseMapProps = AllWidgetProps<IMConfig>
const Widget = (props: BaseMapProps) => {
  const { useMapWidgetIds, config, id, theme, mutableStateProps } = props
  const { basemapsType, customBasemaps } = config
  const prevBasemapsType = hooks.usePrevious(basemapsType)
  const preCustomBasemaps = hooks.usePrevious(customBasemaps)
  const customBasemapsRef = hooks.useLatest(customBasemaps)
  // Holds a value of basemapsType that is not affected by asynchrony
  const basemapsTypeRef = React.useRef<string>(null)
  basemapsTypeRef.current = basemapsType
  // Since usestate cannot get the latest value immediately, it is changed to useref
  const activeView = React.useRef<__esri.MapView | __esri.SceneView>(null)
  const currentJimuMapViewId = React.useRef<string>(null)
  const bmViewModel = React.useRef<__esri.BasemapGalleryViewModel>(null)

  const [isGalleryReady, setGalleryReady] = React.useState(false)
  const basemapContainerParent = React.useRef<HTMLInputElement>(null)

  // Original basemaps for the views
  const mapViewOriginalBasemaps = React.useRef({})

  // Basemap Gallery for views (In order to not lose the original basemap and remember the currently selected basemap when switching views)
  const mapViewBasemapGalleries = React.useRef({})

  // Cache organization basemaps since it is time consuming for getting them.
  const cachedOrgBasemaps: __esri.Basemap[] = React.useMemo(() => mutableStateProps?.cachedOrgBasemaps || null, [mutableStateProps?.cachedOrgBasemaps])
  const setCachedOrgBasemaps = React.useCallback((cachedOrgBasemaps: __esri.Basemap[]) => {
    MutableStoreManager.getInstance().updateStateValue(id, 'cachedOrgBasemaps', cachedOrgBasemaps)
  }, [id])

  // Cache baseMapGallery since recreation is time-consuming and some contain actions do not require recreating it, such as dragging it into/out of Map widget.
  const cachedBaseMapGallery: any = React.useMemo(() => mutableStateProps?.cachedBaseMapGallery || null, [mutableStateProps?.cachedBaseMapGallery])
  const setCachedBasemapGallery = React.useCallback((cachedBaseMapGallery: any) => {
    MutableStoreManager.getInstance().updateStateValue(id, 'cachedBaseMapGallery', cachedBaseMapGallery)
  }, [id])

  React.useEffect(() => {
    if (cachedBaseMapGallery !== null) {
      const viewId = cachedBaseMapGallery.currentViewId
      const gallery = cachedBaseMapGallery.galleries[viewId]
      for (const key in cachedBaseMapGallery.galleries) {
        mapViewBasemapGalleries.current[key] = cachedBaseMapGallery.galleries[key]
        mapViewOriginalBasemaps.current[key] = cachedBaseMapGallery.originalBasemaps[key]
      }
      const container: HTMLElement = gallery.container as HTMLElement
      if (basemapContainerParent.current) {
        if (basemapContainerParent.current.childElementCount === 0 && container) {
          basemapContainerParent.current.appendChild(container)
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const mapDataSources = ReactRedux.useSelector((state: IMState) => {
    const s = state.appStateInBuilder ?? state
    return useMapWidgetIds ? s.appConfig.widgets[useMapWidgetIds[0]]?.useDataSources : []
  })

  React.useEffect(() => {
    // Handle the case of an inactive view source change
    if (mapViewOriginalBasemaps.current && mapDataSources) {
      for (const key in mapViewOriginalBasemaps.current) {
        const dsIdforView = key.split('-')[1]
        const isDSExsit = mapDataSources.some(item => item.dataSourceId === dsIdforView)
        if (!isDSExsit) {
          if (mapViewBasemapGalleries.current[key]) {
            mapViewBasemapGalleries.current[key].viewModel.activeBasemap = mapViewOriginalBasemaps.current[key]
            delete mapViewBasemapGalleries.current[key]
          }

          delete mapViewOriginalBasemaps.current[key]
        }
      }
    }
  }, [mapDataSources])

  const onActiveViewChange = (jimuMapView: JimuMapView) => {
    if (jimuMapView?.view) {
      const jimuMapViewId = jimuMapView.id
      activeView.current = jimuMapView.view
      currentJimuMapViewId.current = jimuMapViewId
      handlePreView(jimuMapViewId)
      bmViewModel.current = new BasemapGalleryViewModel({
        view: jimuMapView.view
      })
      // Store the original basemap for the view
      if (!mapViewOriginalBasemaps.current[jimuMapViewId] && jimuMapView.view.map.basemap) {
        const originalBasemap = jimuMapView.view.map.basemap
        mapViewOriginalBasemaps.current[jimuMapViewId] = originalBasemap
      }

      mapViewBasemapGalleries.current[jimuMapViewId]?.isFulfilled() && handleCurrentBasemapRemoved()
      createBasemapGallery(activeView.current)
    }
  }

  const handlePreView = (jimuMapViewId) => {
    const curMapWidgetId = jimuMapViewId.split('-')[0]
    //Restores the effect of basemap widget on map widget
    for (const key in mapViewBasemapGalleries.current) {
      const widgetId = key.split('-')[0]
      if (curMapWidgetId !== widgetId) {
        mapViewBasemapGalleries.current[key].viewModel.activeBasemap = mapViewOriginalBasemaps.current[key]
        delete mapViewBasemapGalleries.current[key]
      }
    }
  }

  const getOrgBasemaps = async (): Promise<any> => {
    if (cachedOrgBasemaps !== null) return cachedOrgBasemaps
    let groupBasemapItems = []
    const portalUrl = getAppStore().getState().portalUrl
    const portal = new Portal({
      url: portalUrl
    })

    const portalSelf = await loadPortal(portal)
    if (isModeChanged()) {
      return groupBasemapItems
    }
    const orgDefaultGroup = await basemapUtils.getBasemapGroup(portal, portalSelf, false)
    if (isModeChanged()) {
      return groupBasemapItems
    }
    const orgGroupId = orgDefaultGroup?.id
    groupBasemapItems = await basemapUtils.getBasemapItemsByGroupId(portal, portalUrl, orgGroupId)
    const promises = getLoadedBasemapsPromises(groupBasemapItems)
    const loadedGroupBasemaps = await Promise.all(promises)
    setCachedOrgBasemaps(loadedGroupBasemaps)
    return loadedGroupBasemaps
  }

  const loadPortal = (portal: Portal): Promise<any> => {
    return portal.load().then(async () => {
      return Promise.resolve(portal.sourceJSON)
    }, async () => {
      return Promise.reject(null)
    })
  }

  const onRemoveMap = () => {
    const preMapWidgetId = currentJimuMapViewId.current.split('-')[0]
    //Restores the effect of basemap widget on map widget
    for (const key in mapViewBasemapGalleries.current) {
      const widgetId = key.split('-')[0]
      if (preMapWidgetId === widgetId) {
        mapViewBasemapGalleries.current[key].viewModel.activeBasemap = mapViewOriginalBasemaps.current[key]
        delete mapViewBasemapGalleries.current[key]
        delete mapViewOriginalBasemaps.current[key]
      }
    }
    activeView.current = null
    currentJimuMapViewId.current = null
    if (cachedBaseMapGallery != null) {
      setCachedBasemapGallery(null)
    }
  }

  const loadBasemapFunc = async (basemapItem): Promise<any> => {
    const basemap = new Basemap({ portalItem: { id: basemapItem.id } })
    const itemData = await basemap.load()
    return Promise.resolve(itemData)
  }

  const getLoadedBasemapsPromises = (basemapItems): any[] => {
    const promises = []
    basemapItems.forEach(async item => {
      const func = loadBasemapFunc(item)
      promises.push(func)
    })
    return promises
  }

  const getGallerySource = async (): Promise<Basemap[]> => {
    let gallerySource: Basemap[] = []

    if (basemapsType === BasemapsType.Organization) {
      gallerySource = await getOrgBasemaps()
    } else {
      const promises = getLoadedBasemapsPromises(customBasemaps)
      gallerySource = await Promise.all(promises)
    }

    if (isModeChanged()) {
      return
    }

    return gallerySource
  }

  const createBasemapGallery = async (activeView: __esri.MapView | __esri.SceneView) => {
    if (!isNeededUpdateOrCreateBasemapGallery()) return
    setGalleryReady(false)
    const gallerySource = await getGallerySource()
    if (isModeChanged()) {
      setGalleryReady(true)
      return
    }
    setCachedBasemapGallery(null)
    if (!mapViewBasemapGalleries.current[currentJimuMapViewId.current]) {
      const container = document && document.createElement('div')
      container.className = 'esri-component h-100'
      mapViewBasemapGalleries.current[currentJimuMapViewId.current] = new BasemapGallery({
        view: activeView,
        source: gallerySource,
        container: container,
        // eslint-disable-next-line
        // @ts-ignore
        includeCurrentBasemap: true
      })
    }
    setCachedBasemapGallery({
      galleries: mapViewBasemapGalleries.current,
      currentViewId: currentJimuMapViewId.current,
      originalBasemaps: mapViewOriginalBasemaps.current
    })
    const galleryContainer = mapViewBasemapGalleries.current[currentJimuMapViewId.current].container
    if (basemapContainerParent.current) {
      if (basemapContainerParent.current.childElementCount === 0) {
        basemapContainerParent.current.appendChild(galleryContainer)
      } else {
        basemapContainerParent.current.replaceChildren(galleryContainer)
      }
    }

    setGalleryReady(true)
  }

  const onAddCustomBasemap = async (addPos: number) => {
    const pos = addPos !== -1 ? addPos : customBasemaps.length - 1
    const basemapItem = customBasemaps[pos]
    const gallery = mapViewBasemapGalleries.current[currentJimuMapViewId.current]
    const galleryItem = new BasemapGalleryItem({
      basemap: new Basemap({ portalItem: { id: basemapItem.id } }),
      view: gallery.viewModel.view
    })

    gallery.viewModel.source.basemaps.splice(pos, 0, new Basemap({ portalItem: { id: basemapItem.id } }))
    gallery.viewModel.items.splice(pos, 0, galleryItem)
    const loadedItem = await loadBasemapFunc(basemapItem)
    handleLoadedCustomItem(loadedItem)
  }

  const handleLoadedCustomItem = (loadedItem: any) => {
    const gallery = mapViewBasemapGalleries.current[currentJimuMapViewId.current]
    const gallerySource = (gallery.viewModel.items as any).items
    const itemIndex = customBasemapsRef.current.findIndex(item => item.id === loadedItem.portalItem.id)
    const originalBasemap = mapViewOriginalBasemaps.current[currentJimuMapViewId.current]
    if (itemIndex >= 0) {
      const isOriginalBasemap = bmViewModel.current.basemapEquals(originalBasemap, loadedItem)
      if (isOriginalBasemap) {
        if (gallerySource.length > customBasemapsRef.current.length) {
          gallerySource.shift()
        }
      }
    }
  }

  const onRemoveCustomBasemap = () => {
    let isRemoved = false
    const gallery = mapViewBasemapGalleries.current[currentJimuMapViewId.current]
    for (let i = 0; i < customBasemaps.length; i++) {
      const currentItemId = customBasemaps[i].id
      const preItemId = preCustomBasemaps[i]?.id
      if (currentItemId !== preItemId) {
        gallery.viewModel.source.basemaps.splice(i, 1)
        preCustomBasemaps.length < gallery.viewModel.items.length // the original basemap is added
          ? gallery.viewModel.items.splice(i + 1, 1)
          : gallery.viewModel.items.splice(i, 1)
        isRemoved = true
        break
      }
    }
    // If we didn't remove the item from the source in the 'for' loop above
    if (!isRemoved) {
      gallery.viewModel.source.basemaps.splice(customBasemaps.length, 1)
      preCustomBasemaps.length < gallery.viewModel.items.length // the original basemap is added
        ? gallery.viewModel.items.splice(customBasemaps.length + 1, 1)
        : gallery.viewModel.items.splice(customBasemaps.length, 1)
    }
    handleOriginalBasemapRemoved()
    handleCurrentBasemapRemoved()
  }

  const onAdjustCustomBasemap = () => {
    const gallery = mapViewBasemapGalleries.current[currentJimuMapViewId.current]
    const gallerySource = (gallery.viewModel.items as any).items
    const preCustomList = preCustomBasemaps.asMutable({ deep: true })
    let isChanged = false
    for (let i = 0; i < customBasemaps.length; i++) {
      const currentItemId = customBasemaps[i].id
      const preItemId = preCustomList[i].id
      if (currentItemId !== preItemId) {
        isChanged = true
        const findIndex = preCustomList.findIndex(item => item.id === currentItemId)
        const delPreItem = preCustomList.splice(findIndex, 1)
        preCustomList.splice(i, 0, delPreItem[0])
        const delBasemap = gallery.viewModel.source.basemaps.splice(findIndex, 1)
        gallery.viewModel.source.basemaps.splice(i, 0, delBasemap[0])
        if (customBasemaps.length < gallerySource.length) {
          const delItem = gallery.viewModel.items.splice(findIndex + 1, 1)
          gallery.viewModel.items.splice(i + 1, 0, delItem[0])
        } else {
          const delItem = gallery.viewModel.items.splice(findIndex, 1)
          gallery.viewModel.items.splice(i, 0, delItem[0])
        }
      } else {
        if (isChanged) {
          break
        }
      }
    }
  }

  const handleOriginalBasemapRemoved = () => {
    const gallery = mapViewBasemapGalleries.current[currentJimuMapViewId.current]
    const gallerySource = (gallery.viewModel.items as any).items
    const originalBasemap = mapViewOriginalBasemaps.current[currentJimuMapViewId.current]
    const isOriginalBasemapIncluded: boolean = gallerySource.some(item => bmViewModel.current.basemapEquals(originalBasemap, item.basemap))
    // if the original basemap is removed, add it.
    if (!isOriginalBasemapIncluded) {
      const galleryItem = new BasemapGalleryItem({
        basemap: mapViewOriginalBasemaps.current[currentJimuMapViewId.current],
        view: gallery.viewModel.view
      })
      gallery.viewModel.items.unshift(galleryItem)
    }
  }

  const handleCurrentBasemapRemoved = () => {
    const gallery = mapViewBasemapGalleries.current[currentJimuMapViewId.current]
    const gallerySource = (gallery.viewModel.items as any).items
    const currentBasemap = gallery.viewModel.activeBasemap
    if (!currentBasemap) return
    const isInclude: boolean = gallerySource.some(item => bmViewModel.current.basemapEquals(currentBasemap, item.basemap))
    //if the current basemap is removed, change current to original
    if (!isInclude) {
      gallery.viewModel.activeBasemap = mapViewOriginalBasemaps.current[currentJimuMapViewId.current]
    }
  }
  const updateCustomBasemaps = () => {
    if (!isNeededUpdateOrCreateBasemapGallery()) return
    updateCustomBasemapsForActiveView()
    updateCustomBasemapsforInactiveView()
    setCachedBasemapGallery({
      galleries: mapViewBasemapGalleries.current,
      currentViewId: currentJimuMapViewId.current,
      originalBasemaps: mapViewOriginalBasemaps.current
    })
  }
  const updateCustomBasemapsForActiveView = async () => {
    const preListLength = preCustomBasemaps?.length
    const isAddAction = customBasemaps.length > preListLength
    const isRemoveAction = customBasemaps.length < preListLength
    if (isAddAction) {
      const addPos = findAddedElementPosition(preCustomBasemaps, customBasemaps)
      await onAddCustomBasemap(addPos)
    } else if (isRemoveAction) {
      onRemoveCustomBasemap()
    } else {
      onAdjustCustomBasemap()
    }
  }

  const updateCustomBasemapsforInactiveView = async () => {
    const source = await getGallerySource()
    for (const key in mapViewBasemapGalleries.current) {
      if (key !== currentJimuMapViewId.current) {
        mapViewBasemapGalleries.current[key].viewModel.source = source
      }
    }
  }

  const updateGallerySource = async () => {
    if (!isNeededUpdateOrCreateBasemapGallery()) return
    setGalleryReady(false)
    const gallerySource = await getGallerySource()
    if (isModeChanged()) {
      setGalleryReady(true)
      return
    }
    // Restore the basemaps of all views to original and update the source of the respective widget
    for (const key in mapViewBasemapGalleries.current) {
      const gallery = mapViewBasemapGalleries.current[key]
      gallery.viewModel.activeBasemap = mapViewOriginalBasemaps.current[key]
      gallery.viewModel.source = gallerySource as any
    }
    setCachedBasemapGallery({
      galleries: mapViewBasemapGalleries.current,
      currentViewId: currentJimuMapViewId.current,
      originalBasemaps: mapViewOriginalBasemaps.current
    })
    setGalleryReady(true)
  }

  const isNeededUpdateOrCreateBasemapGallery = () => {
    // Previous basemapType is undefined when recreated by contain actions, such as dragging it into/out of Map widget.
    const isCausedByWidgetCreate: boolean = prevBasemapsType === undefined
    if ((isCausedByWidgetCreate && cachedBaseMapGallery != null) || !activeView.current || !bmViewModel.current) {
      setGalleryReady(true)
      return false
    }
    return true
  }

  function findAddedElementPosition (previousArray, currentArray) {
    const previousIds = new Set(previousArray.map(item => item.id))
    for (let i = 0; i < currentArray.length; i++) {
      if (!previousIds.has(currentArray[i].id)) {
        return i
      }
    }
    return -1
  }

  React.useEffect(() => {
    const isMapSet = currentJimuMapViewId.current !== null
    const ismapRemoved: boolean = isMapSet && useMapWidgetIds && useMapWidgetIds?.length <= 0
    //When remove a map, clear basemapGallery and mapview-related content
    if (ismapRemoved) {
      onRemoveMap()
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useMapWidgetIds])

  React.useEffect(() => {
    if (mapViewBasemapGalleries.current[currentJimuMapViewId.current]?.isFulfilled()) {
      updateGallerySource()
    } else {
      createBasemapGallery(activeView.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basemapsType])

  React.useEffect(() => {
    if (mapViewBasemapGalleries.current[currentJimuMapViewId.current]?.isFulfilled() && basemapsType === BasemapsType.Custom) {
      updateCustomBasemaps()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customBasemaps])

  const isModeChanged = () => {
    return basemapsType !== basemapsTypeRef.current
  }

  if (!useMapWidgetIds || useMapWidgetIds?.length <= 0) {
    return (
      <WidgetPlaceholder
        icon={BaseMapGalleryIcon} widgetId={id}
        message={props.intl.formatMessage({ id: '_widgetLabel', defaultMessage: defaultMessages._widgetLabel })}
      />
    )
  } else {
    return (
      <div
        className='jimu-widget jimu-basemap-widget surface-1 border-0'
        css={getStyles(theme)}
      >
        <JimuMapViewComponent
          useMapWidgetId={useMapWidgetIds?.[0]}
          onActiveViewChange={onActiveViewChange}
        />
        <div
         className={classNames('esri-ui-inner-container', 'esri-ui-corner-container', {
           'd-none': !isGalleryReady
         })}
         role="listbox">
          <div className="esri-ui-corner w-100 h-100" ref={basemapContainerParent}>
          </div>
        </div>
        { !isGalleryReady && <div className="jimu-secondary-loading" /> }
      </div>
    )
  }
}

export default Widget
