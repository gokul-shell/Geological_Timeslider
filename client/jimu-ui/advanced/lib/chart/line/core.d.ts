/// <reference types="react" />
import { React } from 'jimu-core';
import { type ChartComponentEvents, type UnprivilegedChart } from '../utils';
export interface LineChartCoreProps extends Partial<HTMLArcgisChartsLineChartElement>, ChartComponentEvents {
}
export declare const LineChartCore: React.ForwardRefExoticComponent<LineChartCoreProps & React.RefAttributes<UnprivilegedChart>>;
