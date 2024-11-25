import { type ImmutableObject } from 'jimu-core'
import { type basemapUtils } from 'jimu-arcgis'
export enum BasemapsType {
  Organization = 'ORGANIZATION',
  Custom = 'CUSTOM'
}

export interface config {
  customBasemaps: basemapUtils.BasemapItem[]
  basemapsType: BasemapsType
}
export interface DatasourceBasemaps {
  [propName: string]: __esri.Basemap
}
export type IMConfig = ImmutableObject<config>
