import * as React from 'react';
import { ExportBase } from './export-base';
import { type DataRecordSet, type DataRecord } from '../data-sources/data-source-interface';
import { DataLevel } from '../base-data-action';
export default class ExportJson extends ExportBase {
    constructor(props: any);
    onExecute(dataSets: DataRecordSet[], dataLevel: DataLevel): Promise<boolean | React.ReactElement>;
    exportRecords(records: DataRecord[], fields?: string[]): Promise<void>;
    doExport(dataSet: DataRecordSet, dataLevel: DataLevel): Promise<boolean>;
}
