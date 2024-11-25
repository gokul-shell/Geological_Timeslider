import { type ServiceDefinition } from 'jimu-core';
import { DataSourceTypes, type FeatureServiceDataSource } from '../data-source-interface';
import { AbstractLayerFolderDataSource, type LayerFolderDataSourceConstructorOptions } from '../ds-base-types';
/**
 * Data source from a feature service, which may contain multiple child data sources.
 */
export declare class FeatureServiceDataSourceImpl extends AbstractLayerFolderDataSource implements FeatureServiceDataSource {
    type: DataSourceTypes.FeatureService;
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
