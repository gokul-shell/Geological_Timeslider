import { AbstractSetDataSource, type DataSourceConstructorOptions, type LayerFolderDataSourceConstructorOptions, DataSourceTypes as JimuCoreDataSourceTypes, type FeatureLayerDataSourceConstructorOptions, type SceneLayerDataSourceConstructorOptions, type ArcGISSubLayer } from 'jimu-core/data-source';
import { type IMDataSourceSchema, type DataSource } from 'jimu-core';
import { DataSourceTypes, type MapDataSource, type MapChildDataSource } from '../arcgis-data-source-interface';
export interface MapDataSourceConstructorOptions extends DataSourceConstructorOptions {
    map?: __esri.Map;
}
type MapChildDataSourceConstructorOptions = LayerFolderDataSourceConstructorOptions | FeatureLayerDataSourceConstructorOptions | SceneLayerDataSourceConstructorOptions;
export declare class MapDataSourceImpl extends AbstractSetDataSource implements MapDataSource {
    type: DataSourceTypes.Map | DataSourceTypes.WebMap | DataSourceTypes.WebScene;
    map: __esri.Map;
    protected childDataSourcesPromise: Promise<MapChildDataSource[]>;
    Map: typeof __esri.Map;
    FeatureLayer: typeof __esri.FeatureLayer;
    constructor(options: MapDataSourceConstructorOptions);
    ready(): Promise<void>;
    childDataSourcesReady(): Promise<MapChildDataSource[]>;
    createDataSourceByLayer(layer: __esri.Layer | ArcGISSubLayer): Promise<DataSource>;
    fetchSchema(): Promise<IMDataSourceSchema>;
    getDataSourceByLayer(layer: __esri.Layer | ArcGISSubLayer): DataSource;
    /**
     * Return all descendant data sources with specific data source type.
     */
    getDataSourcesByType(type: JimuCoreDataSourceTypes | DataSourceTypes): DataSource[];
    /**
     * TODO: consider data source mapping.
     * If consider data source mapping, one JS API layer may match multiple layer data sources.
     */
    getDataSourceIdByLayer(layer: __esri.Layer | ArcGISSubLayer): string;
    protected createChildDataSourcesOptionsPromises(): Promise<{
        [childDsId: string]: Promise<MapChildDataSourceConstructorOptions>;
    }>;
    private getChildDataSourceConstructorsOptions;
    private getChildDataSourceConstructorOptionsFromSingleLayerOrTable;
    private setProxyForLayerOrTable;
    private traverseToGetDataSourcesByType;
    protected createMap(): void;
    /**
     * This is a temp fix. Let's remove this code when this issue is fixed: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/48066
     */
    protected createFilterUrlChildDataSource(): Promise<void>;
}
export {};
