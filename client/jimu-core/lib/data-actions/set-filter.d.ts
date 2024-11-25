import * as React from 'react';
import { AbstractDataAction, DataLevel } from '../base-data-action';
import { type DataRecordSet } from '../data-sources/data-source-interface';
export default class SetFilter extends AbstractDataAction {
    _version: number;
    _modules: any;
    constructor(props: any);
    loadModeuls(): Promise<void>;
    updateIcon(dataSourceId: string): Promise<void>;
    isSupported(dataSets: DataRecordSet[], dataLevel: DataLevel, widgetId: string): Promise<boolean>;
    onExecute(dataSets: DataRecordSet[], dataLevel: DataLevel, widgetId: string): Promise<boolean | React.ReactElement>;
}
