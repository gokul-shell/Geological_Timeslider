import { type ServiceDefinition } from 'jimu-core';
import { AbstractLayerFolderDataSource, type LayerFolderDataSourceConstructorOptions } from '../ds-base-types';
import { DataSourceTypes, type MapServiceDataSource, type FeatureLayerDataSource, type GroupLayerDataSource, type TimeInfo, type TimeExtent } from '../data-source-interface';
type MapServiceChildDataSource = FeatureLayerDataSource | GroupLayerDataSource;
/**
 * Data source from a map service, which may contain multiple child data sources.
 */
export declare class MapServiceDataSourceImpl extends AbstractLayerFolderDataSource implements MapServiceDataSource {
    type: DataSourceTypes.MapService;
    layer?: __esri.MapImageLayer | __esri.TileLayer;
    protected childDataSourcesPromise: Promise<MapServiceChildDataSource[]>;
    fetchServiceDefinition(): Promise<ServiceDefinition>;
    createChildDataSourcesOptionsPromises(): Promise<{
        [childDsId: string]: Promise<LayerFolderDataSourceConstructorOptions>;
    }>;
    supportTime(): boolean;
    getTimeInfo(): TimeInfo;
    getTimeExtent(): TimeExtent;
    changeTimeExtent(time: TimeExtent, widgetId: string): void;
    changeGDBVersion(gdbVersion: string): void;
    private createChildDataSourcesOptionsPromisesByLayer;
    private updateServiceDefinitionByLayer;
    private getLayerDefinitionFromSubLayer;
}
export {};
