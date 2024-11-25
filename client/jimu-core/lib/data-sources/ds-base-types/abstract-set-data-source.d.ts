import { AbstractDataSource } from './abstract-data-source';
import { type DataSourceConstructorOptions, type DataSource } from '../data-source-interface';
/**
 * @ignore
 */
export declare abstract class AbstractSetDataSource extends AbstractDataSource implements DataSource {
    isDataSourceSet: boolean;
    protected childDataSourcesCreated: boolean;
    protected abstract createChildDataSourcesOptionsPromises(): Promise<{
        [childDsId: string]: Promise<DataSourceConstructorOptions>;
    }>;
    protected childDataSourcesOptionsPromises: {
        [childDsId: string]: Promise<DataSourceConstructorOptions>;
    };
    protected childDataSourcesPromises: {
        [childDsId: string]: Promise<DataSource>;
    };
    ready(): Promise<void>;
    childDataSourcesReady(): Promise<DataSource[]>;
    areChildDataSourcesCreated(): boolean;
    createChildDataSourcesRecursively(): Promise<DataSource[]>;
    createDataSourceById(dataSourceId: string): Promise<DataSource>;
    protected createChildDataSourcePromise(childDsId: string): Promise<DataSource>;
    destroy(): void;
    getChildDataSourceId(jimuChildId: string): string;
    getChildDataSources(): DataSource[];
    getAllChildDataSources(): DataSource[];
    getChildDataSource(jimuChildId: string): DataSource;
    getJimuChildId(childId: string): string[];
}
