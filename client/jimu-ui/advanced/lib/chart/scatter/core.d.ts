/// <reference types="react" />
import { React } from 'jimu-core';
import { type ChartComponentEvents, type UnprivilegedChart } from '../utils';
export interface ScatterPlotCoreProps extends Partial<HTMLArcgisChartsScatterPlotElement>, ChartComponentEvents {
}
export declare const ScatterPlotCore: React.ForwardRefExoticComponent<ScatterPlotCoreProps & React.RefAttributes<UnprivilegedChart>>;
