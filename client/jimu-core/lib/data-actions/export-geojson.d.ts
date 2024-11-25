import * as React from 'react';
import { ExportBase } from './export-base';
import { type DataSource, type DataRecordSet, type DataRecord } from '../data-sources/data-source-interface';
import { DataLevel } from '../base-data-action';
export default class ExportGeoJSON extends ExportBase {
    isSupported(dataSets: DataRecordSet[], dataLevel: DataLevel): Promise<boolean>;
    onExecute(dataSets: DataRecordSet[], dataLevel: DataLevel): Promise<boolean | React.ReactElement>;
    exportRecords(dataSource: DataSource, records: DataRecord[], fields?: string[]): Promise<void>;
    doExport(dataSet: DataRecordSet, dataLevel: DataLevel): Promise<boolean>;
}
