import * as React from 'react';
import { type AllWidgetProps, type WidgetProps } from './types/props';
import { type IMState } from './types/state';
import { type BaseVersionManager } from './version-manager';
declare class BaseWidget<P extends AllWidgetProps<unknown> = AllWidgetProps<unknown>, S = unknown> extends React.PureComponent<P, S> {
    /**
     * By default, the props in "WidgetInjectedProps" will be injected into widget props. To map more props, please use this function.
     */
    static mapExtraStateProps: (state: IMState, ownProps: Partial<AllWidgetProps<any>>) => any;
    static versionManager: BaseVersionManager;
}
export interface WidgetStaticMethods {
    mapExtraStateProps?: (state: IMState, ownProps: Partial<AllWidgetProps<any>>) => any;
    versionManager?: BaseVersionManager;
}
export type RawWidgetType = (React.ComponentClass<AllWidgetProps<any>> | React.FunctionComponent<AllWidgetProps<any>>) & WidgetStaticMethods;
export type WrappedWidgetType = (React.ComponentClass<WidgetProps> | React.FunctionComponent<WidgetProps>) & WidgetStaticMethods;
export default BaseWidget;
