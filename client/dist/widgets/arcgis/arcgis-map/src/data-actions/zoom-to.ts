import {
  type DataRecordSet,
  type FeatureDataRecord,
  type DataSource,
  type JSAPILayerMixin,
  type DataRecord,
  AbstractDataAction,
  DataSourceStatus,
  MutableStoreManager,
  DataLevel
} from 'jimu-core'
import { loadArcGISJSAPIModules } from 'jimu-arcgis'
import { cloneFeature } from '../runtime/utils'
import { type ZoomToGraphicsInternalValue } from '../message-actions/zoom-to-feature-action'

export default class ZoomTo extends AbstractDataAction {
  /**
   * ZoomTo data action supports both DataSource data level and Records data level.
   */
  async isSupported (dataSets: DataRecordSet[], dataLevel: DataLevel): Promise<boolean> {
    if (dataSets.length > 1) {
      return false
    }
    const dataSet = dataSets[0]
    const dataSource = dataSet.dataSource as DataSource & JSAPILayerMixin

    if (!dataSource || dataSource.getStatus() === DataSourceStatus.NotReady) {
      return false
    }

    // records maybe come from a table, so we need to check if the dataSource has geometry or not
    const supportSpatialInfo = dataSource?.supportSpatialInfo && dataSource?.supportSpatialInfo()

    if (!supportSpatialInfo) {
      return false
    }

    if (dataLevel === DataLevel.Records) {
      // zoom to graphics
      const records = this.getRecords(dataSet, dataLevel)
      return records.length > 0
    } else if (dataLevel === DataLevel.DataSource) {
      // zoom to layer
      return !!dataSource?.createJSAPILayerByDataSource
    }

    return false
  }

  async onExecute (dataSets: DataRecordSet[], dataLevel: DataLevel): Promise<boolean> {
    const dataSet = dataSets[0]
    return loadArcGISJSAPIModules(['esri/Graphic']).then(modules => {
      let Graphic: typeof __esri.Graphic = null;
      [Graphic] = modules

      const records = this.getRecords(dataSet, dataLevel)
      const clonedFeatures = records.map(record => cloneFeature((record as FeatureDataRecord).feature, Graphic))

      const featureSet: ZoomToGraphicsInternalValue = {
        type: 'zoom-to-graphics',
        features: clonedFeatures,
        dataSourceId: dataSet.dataSource?.id || null,
        zoomToOption: {
          padding: {
            left: 50,
            right: 50,
            top: 50,
            bottom: 50
          }
        }
      }
      MutableStoreManager.getInstance().updateStateValue(this.widgetId, 'zoomToFeatureActionValue.value', featureSet)
      return true
    })
  }

  getRecords (dataSet: DataRecordSet, dataLevel: DataLevel): DataRecord[] {
    let result: DataRecord[] = []

    if (dataLevel === DataLevel.DataSource) {
      result = []
    } else if (dataLevel === DataLevel.Records && dataSet.records?.length > 0) {
      result = dataSet.records
    }

    return result
  }
}
