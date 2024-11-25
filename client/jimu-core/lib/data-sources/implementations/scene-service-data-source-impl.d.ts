import { type ServiceDefinition } from 'jimu-core';
import { AbstractLayerFolderDataSource, type LayerFolderDataSourceConstructorOptions } from '../ds-base-types/abstract-layer-folder-data-source';
import { DataSourceTypes, type SceneServiceDataSource } from '../data-source-interface';
/**
 * Data source from a scene service, which may contain multiple child data sources.
 */
export declare class SceneServiceDataSourceImpl extends AbstractLayerFolderDataSource implements SceneServiceDataSource {
    type: DataSourceTypes.SceneService;
    fetchServiceDefinition(): Promise<ServiceDefinition>;
    createChildDataSourcesOptionsPromises(): Promise<{
        [childDsId: string]: Promise<LayerFolderDataSourceConstructorOptions>;
    }>;
    /**
     * If use Layer.fromArcGISServerUrl/Layer.fromPortalItem to create JS API layer for feature service, will return a feature layer if the feature service only contains one layer/table.
     * It causes the feature service data source returns a feature layer as its JS API layer, which is not expected.
     * So we overide the method to make sure feature service data source always returns a group layer.
    */
    createJSAPILayerByDataSource(): Promise<__esri.GroupLayer>;
}
