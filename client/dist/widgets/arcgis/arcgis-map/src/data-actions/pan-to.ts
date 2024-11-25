import {
  type DataRecordSet,
  type FeatureDataRecord,
  type JSAPILayerMixin,
  type DataSource,
  type DataRecord,
  AbstractDataAction,
  DataSourceStatus,
  MutableStoreManager,
  DataLevel
} from 'jimu-core'
import { loadArcGISJSAPIModules } from 'jimu-arcgis'
import { cloneFeature } from '../runtime/utils'
import { type PanToGeometriesInternalValue, type PanToLayerInternalValue } from '../message-actions/pan-to-action'

export default class PanTo extends AbstractDataAction {
  /**
   * PanTo data action supports both DataSource data level and Records data level.
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
      // pan to graphics
      const records = this.getRecords(dataSet, dataLevel)
      return records.length > 0
    } else if (dataLevel === DataLevel.DataSource) {
      // pan to layer
      return !!dataSource?.createJSAPILayerByDataSource
    }
  }

  async onExecute (dataSets: DataRecordSet[], dataLevel: DataLevel): Promise<boolean> {
    const dataSet = dataSets[0]
    return loadArcGISJSAPIModules(['esri/Graphic']).then(modules => {
      let Graphic: typeof __esri.Graphic = null;
      [Graphic] = modules

      let panToActionValue: PanToGeometriesInternalValue | PanToLayerInternalValue = null
      const records = this.getRecords(dataSet, dataLevel)
      const geometries = records.map(record => cloneFeature((record as FeatureDataRecord).feature, Graphic)?.geometry)

      if (geometries?.length > 0) {
        panToActionValue = {
          type: 'pan-to-geometries',
          geometries
        }
      } else {
        panToActionValue = {
          type: 'pan-to-layer',
          dataSourceId: dataSet.dataSource?.id || null
        }
      }
      MutableStoreManager.getInstance().updateStateValue(this.widgetId, 'panToActionValue.value', panToActionValue)
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
