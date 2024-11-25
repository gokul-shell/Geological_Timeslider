/// <reference types="react" />
import { React } from 'jimu-core';
import { type ChartComponentEvents, type UnprivilegedChart } from '../utils';
export interface PieChartCoreProps extends Partial<HTMLArcgisChartsPieChartElement>, ChartComponentEvents {
}
export declare const PieChartCore: React.ForwardRefExoticComponent<PieChartCoreProps & React.RefAttributes<UnprivilegedChart>>;
