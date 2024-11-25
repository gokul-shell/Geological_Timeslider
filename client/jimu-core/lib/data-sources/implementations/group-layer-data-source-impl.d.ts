import { AbstractLayerFolderDataSource, type LayerFolderDataSourceConstructorOptions } from '../ds-base-types';
import { DataSourceTypes, type FeatureLayerDataSource, type GroupLayerDataSource, type MapServiceDataSource, type SceneLayerDataSource } from '../data-source-interface';
import { type ServiceDefinition } from 'jimu-core';
type GroupLayerChildDataSource = FeatureLayerDataSource | MapServiceDataSource | GroupLayerDataSource | SceneLayerDataSource;
/**
 * Data source from group layer in a map service, or group in map viewer/scene viewer, or feature collection item which contains multiple layers.
 * Group layer data source may contain multiple child data sources.
 */
export declare class GroupLayerDataSourceImpl extends AbstractLayerFolderDataSource implements GroupLayerDataSource {
    type: DataSourceTypes.GroupLayer;
    /**
     * If is from map service, will be __esri.Sublayer,
     * if is group in map viewer/scene viewer or feature collection which contains multiple layers, will be __esri.GroupLayer.
     */
    layer?: __esri.GroupLayer | __esri.Sublayer;
    protected childDataSourcesPromise: Promise<GroupLayerChildDataSource[]>;
    fetchServiceDefinition(): Promise<ServiceDefinition>;
    createChildDataSourcesOptionsPromises(): Promise<{
        [childDsId: string]: Promise<LayerFolderDataSourceConstructorOptions>;
    }>;
    private createChildDataSourcesOptionsPromisesByLayer;
    private createChildDataSourcesOptionsPromisesByItem;
    private updateServiceDefinitionByLayer;
    private fetchServiceDefnitionByItem;
    private getLayerDefinitionFromLayer;
}
export {};
