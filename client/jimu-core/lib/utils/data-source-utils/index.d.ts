import { type IFeatureLayer, type IField, type IFieldInfo, type ILayerDefinition, type IPopupInfo } from '@esri/arcgis-rest-types';
import { type FieldSchema, type IMFieldSchema, type IMUseDataSource, type UseDataSource } from '../../types/app-config';
import { type ServiceDefinition } from '../../types/service-definition';
import { type EsriFieldType, type EsriDateFormats } from '../../types/common';
import { type CodedValue, type AttachmentInfo, type AttachmentQueryOptions, type DataSource, QueryScope, type FeatureLayerDataSource, type SceneLayerDataSource, type MapServiceDataSource, type ItemMixin, type TimeExtent, type ArcGISSubLayer } from '../../data-sources/data-source-interface';
import { type IntlShape } from 'react-intl';
import { getWhetherUseProxy } from '../proxy-utils';
export declare function queryAllAttachments(attachmentQuery: AttachmentQueryOptions): Promise<AttachmentInfo[]>;
export declare function filterAttachments(attachmentInfos: AttachmentInfo[], attachmentQuery: AttachmentQueryOptions): Promise<AttachmentInfo[]>;
export interface DisplayValueObj {
    value: any;
    displayValue: string;
    isCodedValueOrSubtype: boolean;
}
export declare function convertFieldToJimuField(field: IField, fieldInfo: IFieldInfo): FieldSchema;
export declare function isNumericalField(fieldType: EsriFieldType): boolean;
export declare function getFieldInfoByFieldName(fieldInfos: IField[], fieldName: string): IField;
export declare function getDisplayValueForCodedValueOrSubtype(layerDefinition: ServiceDefinition, fieldName: string, record: any): DisplayValueObj;
export declare function getDisplayValueForCodedValueOrSubtypeBatch(layerDefinition: ServiceDefinition, fieldName: string, recordList: any[]): DisplayValueObj[];
export declare function getCodedValueListForCodedValueOrSubtypeField(layerDefinition: ServiceDefinition, fieldName: string, record?: any): CodedValue[];
export declare function isAGOLHostedService(url: string): boolean;
export declare function fixLayerId(layerId: string): string;
/**
 * Sublayer's id is type of number. Layer's id is type of string.
 * The function is used to generate jimuChildId by js api layer.
 */
export declare function getFixedLayerIdByLayer(layer: {
    id?: string | number;
    title?: string;
    name?: string;
}): string;
/**
 * The function is used to generate jimuChildId by layer definition.
 */
export declare function getFixedLayerIdByLayerDefinition(layerDefinition: ServiceDefinition): string;
/**
 * The function is used to generate jimuChildId by layer definition.
 */
export declare function _getFixedLayerIdByLayerDefinition(layerDefinition: ServiceDefinition): string;
export declare function isJSAPILayerTypeSupported(layer: __esri.Layer): boolean;
export declare function getSortedArrayByLabel<T extends {
    getLabel: () => string;
}>(arr: T[]): T[];
export declare function getChildDataSourceId(parentDsId: string, jimuChildId: string): string;
/**
 * @ignore
 */
export declare function getQueryParamsAndOptions(field: IMFieldSchema, dataSourceId: string, sql?: string, queryScope?: QueryScope, widgetId?: string): {
    queryParams: any;
    queryOptions: {
        scope: QueryScope;
        widgetId: string;
    };
};
/**
 * @ignore
 */
export declare function queryFeatureCountByField(field: IMFieldSchema, selectedDs: DataSource, sql?: string, queryScope?: QueryScope, widgetId?: string): Promise<number>;
/**
 * @ignore
 */
export declare function queryValueLabelsByFieldAndPageSize(field: IMFieldSchema, selectedDs: DataSource, pageSize: number, intl: IntlShape, sql?: string, queryScope?: QueryScope, widgetId?: string): Promise<{
    list: CodedValue[];
    reducedCount: number;
}>;
export declare function getUrlByLayer(layer: __esri.Sublayer | __esri.Layer): string;
/**
 * If use a global data source, the real data source id is `useDataSource.dataSourceId`.
 * If use a local data source, the real data source id is different from `useDataSource.dataSourceId`.
 */
export declare function getRealDataSourceId(useDataSource: IMUseDataSource | UseDataSource, localId?: string): string;
export declare function getUseDataSourceByDataSource(dataSource: DataSource): UseDataSource;
export declare function getOriginDataLabel(serviceDefinition: ServiceDefinition, layer: __esri.Layer | __esri.Sublayer, ds: DataSource & ItemMixin): Promise<string>;
export declare function getJimuLayerIdByJSAPILayer(layer: __esri.Layer | ArcGISSubLayer): string;
export declare function getDataSourceIdByJSAPILayer(mapDataSourceId: string, layer: __esri.Layer | ArcGISSubLayer): string;
/**
 * If data source object is not created, only have data source id, can use this method to get whether data source is derived from another data source.
 * E.g. data view is derived from main data soruce.
 */
export declare function isDerivedFrom(baseDsId: string, derivedDsId: string): boolean;
export declare function isSelectionView(dsId: string): boolean;
export declare function supportSymbol(dataSource: FeatureLayerDataSource | SceneLayerDataSource): boolean;
export declare function supportAttachment(dataSource: FeatureLayerDataSource | SceneLayerDataSource): boolean;
export declare function supportTime(dataSource: FeatureLayerDataSource | MapServiceDataSource): boolean;
/**
 * A null value specified for start time or end time will represent infinity for start or end time.
 * Return -1, indicates t1 and t2 have no intersection.
 */
export declare function mergeTimeExtent(t1: TimeExtent, t2: TimeExtent): TimeExtent;
export declare function findMapServiceDataSource(subLayerDataSource: DataSource): MapServiceDataSource;
export declare function getJSAPILayer(dataSource: FeatureLayerDataSource | SceneLayerDataSource): __esri.FeatureLayer | __esri.SceneLayer;
export declare function getRestAPILayer(dataSource: FeatureLayerDataSource): IFeatureLayer;
export declare function getLayerDefinition(dataSource: FeatureLayerDataSource | SceneLayerDataSource): ILayerDefinition;
export declare function getPopupInfo(dataSource: FeatureLayerDataSource | SceneLayerDataSource): IPopupInfo;
/**
 * Return a new popup info, which fields are intersection of data source fields and provided popup info fields.
 */
export declare function getPopupInfoIntersection(popupInfo: IPopupInfo, dataSource: FeatureLayerDataSource | SceneLayerDataSource): IPopupInfo;
/**
 * Return a new layer definition, which fields are intersection of data source fields and provided layer definition fields.
 */
export declare function getLayerDefinitionIntersection(layerDef: ILayerDefinition, dataSource: FeatureLayerDataSource | SceneLayerDataSource): ILayerDefinition;
/**
 * Return the related main data source which contains information about original AGOL/portal item or original remote database.
 * - For output data source, if it only has one origin data source and its schema isn't changed (comparing with the origin scehma), will continue checking using the origin data source.
 * - For data view and local data source, will return main data source.
 */
export declare function getRelatedMainDataSourceWithOriginInfo(dataSource: FeatureLayerDataSource | SceneLayerDataSource): FeatureLayerDataSource | SceneLayerDataSource;
/**
 * Create a JS API layer from a data source, the layer will use the same filter with the data source if `useDataSourceQueryParams` is true.
 * Always create a new JS API layer even if the data source has one.
 */
export declare function createJSAPILayerByDataSource(ds: FeatureLayerDataSource | SceneLayerDataSource, useDataSourceQueryParams?: boolean): Promise<__esri.FeatureLayer | __esri.SceneLayer>;
/**
 * Create a Rest API layer from a data source.
 * Always create a new Rest API layer even if the data source has one.
 */
export declare function createRestAPILayerByDataSource(ds: FeatureLayerDataSource): IFeatureLayer;
export declare function createJSAPIFeatureLayerByDataSourceFromFeatureCollectionItem(ds: FeatureLayerDataSource): Promise<__esri.FeatureLayer>;
export declare function formatDateField(value: any, esriDateFormat: EsriDateFormats, intl: IntlShape): string;
export declare function areDatesInUnknownTimezone(dataSource: DataSource): boolean;
export * from './rest-api-and-js-api-types-utils';
export * from './ds-type-and-json-utils';
export * from './sql-utils';
export * from './sql-expression-factory';
export * from './get-suggestion-utils';
export { getWhetherUseProxy };
