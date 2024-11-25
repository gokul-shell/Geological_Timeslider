/* eslint-disable prefer-const */
import {
  AppMode, dataSourceUtils, DataSourceManager, type JSAPILayerMixin, geometryUtils,
  getAppStore, type MessagesJson, type ImmutableObject, MessageType
} from 'jimu-core'
import { type HighLightHandle, type MapbaseRestoreData, type MapbaseView } from './components/mapbase'
import type MapBase from './components/mapbase'
import { type IFeature } from '@esri/arcgis-rest-types'
import { loadArcGISJSAPIModules, type JimuMapView, LayerTypes, type JimuFeatureLayerView, type JimuSceneLayerView, type JimuLayerView } from 'jimu-arcgis'

export async function createNewFeaturelayer (mapBaseView: __esri.MapView | __esri.SceneView, newFeatureSetValue?: { [layerID: string]: __esri.FeatureSet }): Promise<any> {
  const newLayerPromises = []
  newFeatureSetValue && Object.keys(newFeatureSetValue).forEach(layerId => {
    const layer = mapBaseView.map.layers.find(layer => layer.id === layerId)
    if (layer) {
      console.warn('the feature layer is already created')
      return
    }
    newLayerPromises.push(addFeatureSetToMap(mapBaseView, newFeatureSetValue[layerId], layerId))
  })

  if (newLayerPromises.length === 0) {
    return null
  } else {
    return Promise.all(newLayerPromises)
  }
}

export async function updateFeaturelayer (mapBaseView: __esri.MapView | __esri.SceneView, changedFeatureSetValue?: { [layerID: string]: __esri.FeatureSet }): Promise<any> {
  const updatePromises = []
  changedFeatureSetValue && Object.keys(changedFeatureSetValue).forEach(layerId => {
    const layer = mapBaseView.map.layers.find(layer => layer.id === layerId)
    if (layer) {
      mapBaseView.map.remove(layer)
      updatePromises.push(addFeatureSetToMap(mapBaseView, changedFeatureSetValue[layerId], layerId))
    }
  })

  if (updatePromises.length === 0) {
    return null
  } else {
    return Promise.all(updatePromises)
  }
}

async function addFeatureSetToMap (mapBaseView: __esri.MapView | __esri.SceneView, featureSet: __esri.FeatureSet, layerId: string): Promise<any> {
  return await new Promise((resolve, reject) => {
    return loadArcGISJSAPIModules([
      'esri/layers/FeatureLayer'
    ]).then(modules => {
      if (featureSet.features.length < 1) {
        resolve(null)
      } else {
        // let FeatureSet: typeof  __esri.FeatureSet;
        let FeatureLayer: typeof __esri.FeatureLayer;
        // eslint-disable-next-line
        [FeatureLayer] = modules;

        const layerFromFeatureSet = featureSet.features[0].layer as any
        const fieldsInFeaturelayer = []
        const fieldMap = {}

        for (let i = 0; i < layerFromFeatureSet.fields.length; i++) {
          const fieldsItem = getReasonableField(layerFromFeatureSet.fields[i])
          fieldMap[layerFromFeatureSet.fields[i].name] = fieldsItem.name
          fieldsInFeaturelayer.push(fieldsItem)
        }

        const fieldsInPopupTemplate = []
        for (const key in featureSet.features[0].attributes) {
          if (fieldMap[key]) {
            const fieldsItem = {
              fieldName: fieldMap[key],
              label: key
            }
            fieldsInPopupTemplate.push(fieldsItem)
          }
        }

        const sourceFeatures = []
        featureSet.features.forEach((feature, index) => {
          const tempFeature = feature
          if (tempFeature.attributes) {
            for (const key in tempFeature.attributes) {
              tempFeature.attributes[fieldMap[key]] = tempFeature.attributes[key]
            }

            tempFeature.attributes.exbfid = index
          } else {
            tempFeature.attributes = {
              exbfid: index
            }
          }
          sourceFeatures.push(tempFeature)
        })

        const layer = new FeatureLayer({
          id: layerId,
          title: layerFromFeatureSet.title,
          source: sourceFeatures,
          fields: fieldsInFeaturelayer,
          outFields: ['*'],
          objectIdField: 'exbfid',
          renderer: layerFromFeatureSet.renderer,
          popupEnabled: true,
          popupTemplate: {
            title: 'information',
            content: [{
              type: 'fields',
              fieldInfos: fieldsInPopupTemplate
            }]
          }
        })

        mapBaseView.map.add(layer)

        layer.on('layerview-create', event => {
          resolve(null)
        })
      }
    })
  })
}

function getReasonableField (field: __esri.Field): __esri.Field {
  // the function is supported to normalize the field.name
  const fieldName = field.name
  return {
    name: fieldName.replace(/\./g, '_').replace(/\(/g, '_').replace(/\)/g, '_'),
    alias: field.alias,
    type: field.type
  } as any
}

export function selectFeature (mapBaseView: __esri.MapView | __esri.SceneView, target: __esri.Graphic | __esri.Graphic[] | IFeature | IFeature[], layerId?: string): HighLightHandle {
  // In this function, we assume that features come from the same layer
  let featureLayerId = layerId
  let featureLayerView = null
  let tempFeature = null

  // if layerId doesn't exist, we get layerId by feature
  if (!featureLayerId) {
    if (target instanceof Array) {
      tempFeature = target[0] as __esri.Graphic
    } else {
      tempFeature = target as __esri.Graphic
    }

    if (tempFeature) {
      featureLayerId = tempFeature.layer && tempFeature.layer.id
    }
  }

  if (featureLayerId) {
    const layerViews = mapBaseView.allLayerViews
    for (let i = 0; i < layerViews.length; i++) {
      if (layerViews.getItemAt(i).layer.id === featureLayerId) {
        featureLayerView = layerViews.getItemAt(i)
      }
    }

    if (featureLayerView) {
      return {
        layerId: featureLayerId,
        handle: featureLayerView.highlight(target)
      }
    } else {
      return null
    }
  }
}

export async function goToTargetImmediately (view: __esri.MapView | __esri.SceneView, _target: __esri.Geometry): Promise<void> {
  const viewSR = view.spatialReference
  const geometries = await projectGeometries([_target], viewSR)

  if (geometries && geometries.length > 0) {
    const target = geometries[0]
    view.goTo(target, { animate: false })
  }
}

export async function goToViewpointImmediately (view: __esri.MapView | __esri.SceneView, _viewpoint: __esri.Viewpoint): Promise<void> {
  const viewSR = view.spatialReference
  const viewpoint = await projectViewpoint(_viewpoint, viewSR)
  // view.goTo(viewpoint, { animate: false })
  view.viewpoint = viewpoint
}

export function isNeedProjectViewpoint (viewpoint: __esri.Viewpoint, viewSR: __esri.SpatialReference): boolean {
  const sr1 = viewpoint.targetGeometry?.spatialReference

  if (sr1 && isNeedProjectSpatialReference(sr1, viewSR)) {
    return true
  }

  const sr2 = viewpoint.camera?.position?.spatialReference

  if (sr2 && isNeedProjectSpatialReference(sr2, viewSR)) {
    return true
  }

  return false
}

export function isNeedProjectSpatialReference (sr1: __esri.SpatialReference, sr2: __esri.SpatialReference): boolean {
  const isSame = sr1.wkid === sr2.wkid || sr1.equals(sr2)
  //  In JS API 4.x, the view can handle WebMercator and WGS84 spatialReference auto
  const isLike = (sr1.isWebMercator || sr1.isWGS84) && (sr2.isWebMercator || sr2.isWGS84)
  return !isSame && !isLike
}

export async function projectViewpoint (_viewpoint: __esri.Viewpoint, viewSR: __esri.SpatialReference): Promise<__esri.Viewpoint> {
  const viewpoint = _viewpoint.clone()
  const targetGeometry = viewpoint.targetGeometry
  const cameraPositon = viewpoint.camera?.position

  const toProjectGeometries: __esri.Geometry[] = []
  let isProjectTargetGeometry: boolean = false
  let isProjectCameraPosition: boolean = false

  if (targetGeometry && isNeedProjectSpatialReference(targetGeometry.spatialReference, viewSR)) {
    isProjectTargetGeometry = true
    toProjectGeometries.push(targetGeometry)
  }

  if (cameraPositon && isNeedProjectSpatialReference(cameraPositon.spatialReference, viewSR)) {
    isProjectCameraPosition = true
    toProjectGeometries.push(cameraPositon)
  }

  if (toProjectGeometries.length > 0) {
    const projectedGeometries = await projectGeometries(toProjectGeometries, viewSR)

    if (isProjectTargetGeometry) {
      viewpoint.targetGeometry = projectedGeometries[0]
    }

    if (isProjectCameraPosition) {
      viewpoint.camera.position = projectedGeometries[projectedGeometries.length - 1] as __esri.Point
    }
  }

  return viewpoint
}

export async function mapPanto (mapBaseView: __esri.MapView | __esri.SceneView, target: __esri.Geometry | __esri.Geometry[] |
__esri.Graphic | __esri.Graphic[] | __esri.Extent): Promise<any> {
  const panToTarget = target as any
  const tempBaseMapView = mapBaseView as any
  if (panToTarget instanceof Array) {
    if (panToTarget.length === 0) { await Promise.resolve(); return }

    if (panToTarget[0].geometry) {
      const geometryArr: __esri.Geometry[] = []
      for (let i = 0; i < panToTarget.length; i++) {
        geometryArr.push(panToTarget[i].geometry)
      }

      await getGeometriesExtent(geometryArr).then((extent) => {
        return goTo(tempBaseMapView, extent.center)
      })
    } else {
      return getGeometriesExtent(panToTarget).then((extent) => {
        return goTo(tempBaseMapView, extent.center)
      })
    }
  } else {
    if (panToTarget.geometry) {
      const getmetry = panToTarget.geometry as __esri.Geometry
      return goTo(tempBaseMapView, getCenterPoint(getmetry))
    } else {
      return goTo(tempBaseMapView, getCenterPoint(panToTarget))
    }
  }
}

async function goTo (view: __esri.MapView | __esri.SceneView, target: any): Promise<void> {
  return new Promise((resolve, reject) => {
    // delay before updating of view turns true, 400ms is a temporary solution.
    setTimeout(() => {
      //// there is a conflict for paning when the layer view is updating, such as 'pan to' and 'filter'.
      //// this is a temporary solution, it can reduce the frequency of the problem rather than solve it completely.
      //if (view.updating) {
      //  const handler = view.watch('updating', value => {
      //    if (!value) {
      //      view.goTo(target).then(() => resolve()).catch(() => reject())
      //      handler.remove()
      //    }
      //  })
      //} else {
      //  view.goTo(target).then(() => resolve()).catch(() => reject())
      //}
      view.goTo(target).then(() => { resolve() }).catch(() => { reject() })
    }, 400)
  })
}

async function getGeometriesExtent (geometries: __esri.Geometry[]): Promise<__esri.Extent> {
  return await loadArcGISJSAPIModules([
    'esri/geometry/Extent'
  ]).then(async modules => {
    // eslint-disable-next-line
    let Extent: typeof __esri.Extent;
    [Extent] = modules

    if (!geometries || !geometries.length) {
      return await Promise.resolve(null)
    }

    let fullExtent: __esri.Extent = null
    let index
    const numGeometries = geometries.length

    for (index = 0; index < numGeometries; index++) {
      const geometry = geometries[index]
      if (!geometry) {
        continue
      }

      let extent = geometry.extent

      if (!extent && geometry.type === 'point') {
        const pointGeometry = geometry as any

        if (pointGeometry.x && pointGeometry.y) {
          extent = new Extent({
            xmax: pointGeometry.x,
            xmin: pointGeometry.x,
            ymax: pointGeometry.y,
            ymin: pointGeometry.y,
            zmax: pointGeometry.z,
            zmin: pointGeometry.z,
            spatialReference: pointGeometry.spatialReference
          })
        }
      }

      if (!extent) {
        continue
      }

      if (fullExtent) {
        fullExtent = fullExtent.union(extent)
      } else {
        fullExtent = extent
      }
    }

    if (fullExtent.width < 0 && fullExtent.height < 0) {
      return await Promise.resolve(null)
    }

    return await Promise.resolve(fullExtent)
  })
}

export async function filterFeaturesByQuery (jimuMapView: JimuMapView, actionLayerDataSourceId: string, querySQL: string): Promise<void> {
  if (!actionLayerDataSourceId) {
    return
  }

  const dataSource = DataSourceManager.getInstance().getDataSource(actionLayerDataSourceId)

  if (!dataSource) {
    return
  }

  let jimuLayerView: JimuLayerView = null

  try {
    jimuLayerView = await jimuMapView.whenJimuLayerViewLoadedByDataSource(dataSource)
  } catch (err) {
    jimuLayerView = null
    console.error('can\'t get jimuLayerView by dataSource', dataSource, err)
  }

  if (jimuLayerView && jimuLayerView.layer && (jimuLayerView.type === LayerTypes.FeatureLayer || jimuLayerView.type === LayerTypes.SceneLayer)) {
    (jimuLayerView as JimuFeatureLayerView | JimuSceneLayerView).setDefinitionExpression(querySQL)
  }
}

function queryFeatures (layerObject, querySQL) {
  return loadArcGISJSAPIModules([
    'esri/rest/support/Query'
  ]).then(modules => {
    let Query: typeof __esri.Query;
    [Query] = modules
    const query = new Query()
    query.where = querySQL
    query.outFields = ['*']
    query.returnGeometry = true
    return layerObject.queryFeatures(query).then(featureSet => {
      return featureSet
    })
  })
}

function flashOnFeatureLayer (jimuMapView: JimuMapView, querySQL: string, tempJimuLayerView: JimuFeatureLayerView) {
  if ((tempJimuLayerView).view) {
    let featureLayerView: __esri.FeatureLayerView = (tempJimuLayerView).view
    if (featureLayerView) {
      queryFeatures(featureLayerView.layer, querySQL).then(featureSet => {
        if (featureSet && featureSet.features && featureSet.features.length > 0) {
          const symbol = getFlashSymbol(featureLayerView.layer.geometryType)
          startFlash(jimuMapView.view, featureSet.features, symbol)
        }
      })
    } else {
      return null
    }
  } else {
    loadArcGISJSAPIModules([
      'esri/layers/FeatureLayer'
    ]).then(modules => {
      let FeatureLayer: typeof __esri.FeatureLayer;
      [FeatureLayer] = modules

      let tempFeatureLayer = new FeatureLayer({
        url: dataSourceUtils.getUrlByLayer((tempJimuLayerView as JimuFeatureLayerView | JimuSceneLayerView).layer)
      })
      tempFeatureLayer.load().then(() => {
        queryFeatures(tempFeatureLayer, querySQL).then(featureSet => {
          if (featureSet && featureSet.features && featureSet.features.length > 0) {
            const symbol = getFlashSymbol(featureSet.features[0].geometry.type)
            startFlash(jimuMapView.view, featureSet.features, symbol)
          }
        })
      })
    })
  }
}

let sceneHightlightHandle = null
function flashOnSceneLayer (jimuMapView: JimuMapView, querySQL: string, tempJimuLayerView: JimuSceneLayerView) {
  if ((tempJimuLayerView).view) {
    let sceneLayerView: __esri.SceneLayerView = (tempJimuLayerView).view
    // @ts-expect-error
    queryFeatures(sceneLayerView?.layer?.associatedLayer, querySQL).then(featureSet => {
      if (featureSet && featureSet.features && featureSet.features.length > 0) {
        const objectIdField = sceneLayerView.layer.objectIdField
        const objectIds = featureSet.features.map(feature => feature.attributes[objectIdField])

        let i = 0
        const maxFlashCount = 6
        let highlightColor = [255, 255, 0, 0.8]
        const originalHighlightOptions = jimuMapView.view.highlightOptions

        const flash = function () {
          if (i < maxFlashCount) {
            i++
            if (highlightColor) {
              highlightColor = null
              // @ts-expect-error
              jimuMapView.view.highlightOptions = { color: [0, 0, 0, 0] }
              sceneHightlightHandle && sceneHightlightHandle.remove()
              sceneHightlightHandle = sceneLayerView.highlight(objectIds)
            } else {
              highlightColor = [255, 255, 0, 0.8]
              // @ts-expect-error
              jimuMapView.view.highlightOptions = { color: highlightColor }
              sceneHightlightHandle && sceneHightlightHandle.remove()
              sceneHightlightHandle = sceneLayerView.highlight(objectIds)
            }
            setTimeout(flash, 500)
          } else {
            jimuMapView.view.highlightOptions = originalHighlightOptions
            sceneHightlightHandle && sceneHightlightHandle.remove()
          }
        }
        setTimeout(flash, 500)
      }
    })
  }
}

export async function flashFeaturesByQuery (jimuMapView: JimuMapView, layerDataSourceId: string, querySQL: string): Promise<void> {
  if (!layerDataSourceId) {
    return
  }

  const dataSource = DataSourceManager.getInstance().getDataSource(layerDataSourceId)

  if (!dataSource) {
    return
  }

  let jimuLayerView: JimuLayerView = null

  try {
    jimuLayerView = await jimuMapView.whenJimuLayerViewLoadedByDataSource(dataSource)
  } catch (err) {
    jimuLayerView = null
    console.error('can\'t get jimuLayerView by dataSource', dataSource, err)
  }

  if (jimuLayerView && jimuLayerView.layer) {
    if (jimuLayerView.type === LayerTypes.FeatureLayer) {
      flashOnFeatureLayer(jimuMapView, querySQL, jimuLayerView as JimuFeatureLayerView)
    } else if (jimuLayerView.type === LayerTypes.SceneLayer) {
      flashOnSceneLayer(jimuMapView, querySQL, jimuLayerView as JimuSceneLayerView)
    }
  }
}

function startFlash (mapBaseView: __esri.MapView | __esri.SceneView, features: __esri.Graphic[], symbol) {
  loadArcGISJSAPIModules([
    'esri/Graphic'
  ]).then(modules => {
    // eslint-disable-next-line
    let Graphic: typeof __esri.Graphic;
    [Graphic] = modules

    const flashFeatures = function (features: __esri.Graphic[], maxFlashCount: number) {
      const graphics = []
      let flashCount = 0
      for (let i = 0; i < features.length; i++) {
        const tempGraphic = new Graphic({
          geometry: features[i].geometry,
          symbol: symbol,
          attributes: features[i].attributes
        })
        graphics.push(tempGraphic)
      }

      const singleFlash = function () {
        mapBaseView.graphics.addMany(graphics)
        setTimeout(() => {
          mapBaseView.graphics.removeMany(graphics)
          flashCount = flashCount + 1
          if (flashCount < maxFlashCount) {
            setTimeout(() => {
              singleFlash()
            }, 500)
          }
        }, 500)
      }

      singleFlash()
    }

    flashFeatures(features, 3)
  })
}

function getFlashSymbol (geometryType: string) {
  if (['point', 'multipoint'].includes(geometryType)) {
    return {
      type: 'simple-marker',
      style: 'circle',
      color: [255, 255, 0, 0.8],
      size: '16px',
      outline: {
        color: [255, 255, 0, 0.8],
        width: 3
      }
    }
  } else if (['polyline'].includes(geometryType)) {
    return {
      type: 'simple-line',
      color: [255, 255, 0, 0.8],
      width: 3,
      style: 'solid'
    }
  } else if (['polygon', 'extent'].includes(geometryType)) {
    return {
      type: 'simple-fill', // autocasts as new SimpleFillSymbol()
      color: [255, 255, 0, 0.5],
      style: 'solid',
      outline: { // autocasts as new SimpleLineSymbol()
        color: [255, 255, 0, 0.8],
        width: 3
      }
    }
  } else if (['mesh'].includes(geometryType)) {
    return {
      type: 'mesh-3d', // autocasts as new MeshSymbol3D()
      symbolLayers: [{
        type: 'fill', // autocasts as new FillSymbol3DLayer()
        material: { color: [255, 255, 0, 0.8] }
      }]
    }
  } else {
    return null
  }
}

function getCenterPoint (geometry: __esri.Geometry): __esri.Point {
  // point | multipoint | polyline | polygon | extent | mesh
  switch (geometry.type) {
    case 'point':
      return geometry as __esri.Point
    case 'extent':
      return (geometry as __esri.Extent).center
    case 'polygon':
      return (geometry as __esri.Polygon).centroid
    case 'polyline':
      return (geometry as __esri.Polyline).extent.center
    default:
      return geometry && geometry.extent ? geometry.extent.center : undefined
    // todo
  }
}

export function cloneFeature (feature: IFeature | __esri.Graphic, Graphic: typeof __esri.Graphic): __esri.Graphic {
  let tempFeature = null
  if ((feature as any).clone) {
    tempFeature = (feature as any).clone()
  } else {
    tempFeature = Graphic.fromJSON(Object.assign({}, feature))
    tempFeature.attributes = Object.assign({}, feature.attributes)
  }
  return tempFeature
}

export async function projectGeometries (geometries: __esri.Geometry[], spatialReference: __esri.SpatialReference): Promise<__esri.Geometry[]> {
  if (!geometries || geometries.length === 0 || !geometries[0] ||
    spatialReference.wkid === geometries[0].spatialReference.wkid || (spatialReference.equals(geometries[0].spatialReference))) {
    return await Promise.resolve(geometries)
  } else if (spatialReference.isWebMercator && geometries[0].spatialReference.isWGS84) {
    // In js api 4.x, the view can handle WebMercator and WGS84 spatialReference auto
    return await Promise.resolve(geometries)
  } else if (spatialReference.isWGS84 && geometries[0].spatialReference.isWebMercator) {
    // In js api 4.x, the view can handle WebMercator and WGS84 spatialReference auto
    return await Promise.resolve(geometries)
  } else {
    return await geometryUtils.projectToSpatialReference(geometries, spatialReference)
  }
}

export async function processZoomToFeatures (mapBaseView: __esri.MapView | __esri.SceneView, layer: any, features: __esri.Graphic[]): Promise<__esri.Graphic[]> {
  if (mapBaseView && mapBaseView.type === '3d' && layer && layer.queryFeatures && features) {
    return await loadArcGISJSAPIModules([
      'esri/rest/support/Query'
    ]).then((modules) => {
      const [Query] = modules
      const query = new Query()
      query.returnGeometry = true
      query.outFields = ['*']
      query.objectIds = features.map(feature => feature.attributes[layer.objectIdField])
      return layer.queryFeatures(query).then(async (result) => {
        if (result && result.features && result.features.length === features.length) {
          return await Promise.resolve(result.features)
        } else {
          return await Promise.resolve(features)
        }
      }, async () => {
        return await Promise.resolve(features)
      })
    })
  } else {
    return await Promise.resolve(features)
  }
}

export function checkIsLive (appMode: AppMode): boolean {
  if (window.jimuConfig.isInBuilder) {
    if (appMode === AppMode.Design) {
      return false
    } else {
      return true
    }
  } else {
    return true
  }
}

export function getLayersFromDataSourceIds (dataSourceIds: string[]): Promise<any> {
  const layerPromises = []
  dataSourceIds.forEach(dataSourceId => {
    const dataSource = DataSourceManager.getInstance().getDataSource(dataSourceId) as unknown as JSAPILayerMixin
    let layerPromise
    if (dataSource?.layer) {
      layerPromise = Promise.resolve(dataSource.layer)
    } else if (dataSource?.createJSAPILayerByDataSource) {
      layerPromise = dataSource.createJSAPILayerByDataSource()
    } else {
      layerPromise = Promise.resolve(null)
    }
    layerPromises.push(layerPromise)
  })
  return Promise.all(layerPromises)
}

export function getJimuMapViewId (widgetId: string, dataSourceId: string): string {
  // If dataSourceId is null, make sure it converts to empty string.
  const dsId = dataSourceId || ''
  return `${widgetId}-${dsId}`
}

export function getMapBaseRestoreData (mapInstance: MapBase): MapbaseRestoreData {
  const {
    mapContainer,
    state,
    Geometry,
    InitialViewProperties,
    TileLayer,
    Basemap,
    MapView,
    SceneView,
    Extent,
    Viewpoint,
    PortalItem,
    Portal,
    WebMap,
    WebScene,
    Color,
    expectedDataSourceInfo,
    mapCreatingInfo,
    view,
    lastUpdateViewConfig,
    mapDs,
    dsManager,
    isFirstReceiveMessage
  } = mapInstance

  return {
    mapContainer,
    state,

    Geometry,
    InitialViewProperties,
    TileLayer,
    Basemap,
    MapView,
    SceneView,
    Extent,
    Viewpoint,
    PortalItem,
    Portal,
    WebMap,
    WebScene,
    Color,

    expectedDataSourceInfo,
    mapCreatingInfo,
    view,
    lastUpdateViewConfig,
    mapDs,

    dsManager,
    isFirstReceiveMessage
  }
}

export function restoreMapBase (mapInstance: MapBase, restoreData: MapbaseRestoreData): void {
  const keys = Object.keys(restoreData)

  for (const key of keys) {
    mapInstance[key] = restoreData[key]
  }
}

export function isTwoWidgetsMutuallyExtentChange (widgetId1: string, widgetId2: string): boolean {
  if (widgetId1 && widgetId2) {
    const messageConfigs = getAppStore().getState().appConfig.messageConfigs

    if (messageConfigs) {
      const actionNames: string[] = ['panTo', 'zoomToFeature']
      const messageType = MessageType.ExtentChange

      if (isWidgetSendActionsToAnother(widgetId1, widgetId2, messageConfigs, messageType, actionNames) &&
         isWidgetSendActionsToAnother(widgetId2, widgetId1, messageConfigs, messageType, actionNames)) {
        return true
      }
    }
  }

  return false
}

export function isWidgetSendZoomToActionToAnother (sendMessageWidgetId: string, actionWidgetId: string, messageType: MessageType): boolean {
  if (sendMessageWidgetId && actionWidgetId) {
    const messageConfigs = getAppStore().getState().appConfig.messageConfigs

    if (messageConfigs) {
      const actionNames: string[] = ['zoomToFeature']

      return isWidgetSendActionsToAnother(sendMessageWidgetId, actionWidgetId, messageConfigs, messageType, actionNames)
    }
  }

  return false
}

function isWidgetSendActionsToAnother (
  sendMessageWidgetId: string,
  actionWidgetId: string,
  messageConfigs: ImmutableObject<MessagesJson>,
  messageType: MessageType,
  actionNames: string[]
): boolean {
  if (messageConfigs) {
    const messageJsonArray = Object.values(messageConfigs)

    for (let i = 0; i < messageJsonArray.length; i++) {
      const messageJson = messageJsonArray[i]

      if (messageJson.widgetId === sendMessageWidgetId && messageJson.messageType === messageType) {
        const actions = messageJson.actions

        for (let j = 0; j < actions.length; j++) {
          const action = actions[j]

          if (action.widgetId === actionWidgetId) {
            if (actionNames.includes(action.actionName)) {
              return true
            }
          }
        }
      }
    }
  }

  return false
}

export function isSamelikeViewpoints (view: MapbaseView, vp1: __esri.Viewpoint, vp2: __esri.Viewpoint): boolean {
  if (!vp1) {
    return false
  }

  if (!vp2) {
    return false
  }

  // We need to check both targetGeometry and camera.
  if (vp1.targetGeometry && vp1.targetGeometry.declaredClass === 'esri.geometry.Point' && vp2.targetGeometry && vp2.targetGeometry.declaredClass === 'esri.geometry.Point') {
    const screenPoint1 = view.toScreen(vp1.targetGeometry as __esri.Point)
    const screenPoint2 = view.toScreen(vp2.targetGeometry as __esri.Point)
    const deltaX = screenPoint1.x - screenPoint2.x
    const deltaY = screenPoint1.y - screenPoint2.y
    const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

    if (dist >= 5) {
      return false
    }
  }

  const camera1 = vp1.camera
  const camera2 = vp2.camera

  if (camera1 && camera2) {
    // compare viewpoint for SceneView
    const heading1 = parseFloat(camera1.heading.toFixed(2))
    const heading2 = parseFloat(camera2.heading.toFixed(2))

    if (heading1 !== heading2) {
      return false
    }

    const tilt1 = parseFloat(camera1.tilt.toFixed(2))
    const tilt2 = parseFloat(camera2.tilt.toFixed(2))

    if (tilt1 !== tilt2) {
      return false
    }

    const positionDist = camera1.position.distance(camera2.position)

    if (positionDist >= 1) {
      return false
    }
  } else {
    // compare viewpoint for MapView
    const rotation1 = parseFloat(vp1.rotation.toFixed(2))
    const rotation2 = parseFloat(vp2.rotation.toFixed(2))

    if (rotation1 !== rotation2) {
      return false
    }

    const deltaScale = vp1.scale - vp2.scale

    if (Math.abs(deltaScale) >= 1) {
      return false
    }
  }

  return true
}

export function getViewpointInstanceFromHistory (view: MapbaseView, viewpointIndex: number): __esri.Viewpoint {
  if (view.viewpointHistory.length > 0) {
    const lastIndex = view.viewpointHistory.length - 1

    if (viewpointIndex >= 0 && viewpointIndex <= lastIndex) {
      const viewpoint = view.viewpointHistory[viewpointIndex]
      return viewpoint.clone()
    }
  }

  return null
}
