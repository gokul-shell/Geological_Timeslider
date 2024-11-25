/// <reference types="react" />
import { React } from 'jimu-core';
import { type ChartComponentEvents, type UnprivilegedChart } from '../utils';
export interface BarChartCoreProps extends Partial<HTMLArcgisChartsBarChartElement>, ChartComponentEvents {
}
export declare const BarChartCore: React.ForwardRefExoticComponent<BarChartCoreProps & React.RefAttributes<UnprivilegedChart>>;
