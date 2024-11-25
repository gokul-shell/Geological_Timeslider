/// <reference types="react" />
/// <reference types="seamless-immutable" />
/** @jsx jsx */
import { React, jsx, ReactRedux, type IMLayoutItemJson, type IMSizeModeLayoutJson, type IMThemeVariables, type LayoutItemConstructorProps, Immutable, type SerializedStyles } from 'jimu-core';
import { type LayoutItemProps, type PageContextProps, type ToolbarConfig } from 'jimu-layouts/layout-runtime';
import { type FlowLayoutItemSetting } from '../../types';
import { type StateToFlowItemProps } from '../layout-utils';
interface OwnProps {
    layouts: IMSizeModeLayoutJson;
    layoutItem: IMLayoutItemJson;
    builderTheme: IMThemeVariables;
    index: number;
    isFirst: boolean;
    isLast: boolean;
    gutter: number;
    formatMessage: (id: string, values?: any) => string;
    children?: any;
    onDropAtBoundary: (draggingItem: LayoutItemConstructorProps, itemRect: ClientRect, insertIndex: number) => void;
}
interface State {
    isResizing: boolean;
    dh: number;
    showBlockTemplatePopup: boolean;
    showScreenTemplatePopup: boolean;
    referenceElem: HTMLElement;
}
declare class FlowLayoutItem extends React.PureComponent<LayoutItemProps & StateToFlowItemProps & OwnProps, State> {
    state: State;
    fakeTopLayouts: IMSizeModeLayoutJson;
    fakeBottomLayouts: IMSizeModeLayoutJson;
    minHeight: number;
    initHeight: number;
    autoHeight: boolean;
    pageContext: PageContextProps;
    contextMenus: ToolbarConfig;
    reference: HTMLDivElement;
    constructor(props: any);
    onResizeStart: (id: string, initWidth: number, initHeight: number) => void;
    onResizing: (id: string, x: number, y: number, dw: number, dh: number) => void;
    onResizeEnd: (id: string, x: number, y: number, dw: number, dh: number, shiftKey?: boolean) => void;
    calHeight(itemSetting: FlowLayoutItemSetting): string;
    toggleBlockTemplatePopup: () => void;
    toggleScreenTemplatePopup: () => void;
    removeLayoutItem: () => void;
    moveLayoutItemUp: () => void;
    moveLayoutItemDown: () => void;
    createContextMenu(): jsx.JSX.Element;
    switchSetting: () => void;
    onTemplateBlockSelected: (template: any) => void;
    onTemplateScreenGroupSelected: (template: any) => void;
    getStyle(itemSetting: FlowLayoutItemSetting): [SerializedStyles, string];
    render(): jsx.JSX.Element;
}
declare const _default: ReactRedux.ConnectedComponent<typeof FlowLayoutItem, {
    ref?: React.LegacyRef<FlowLayoutItem>;
    className?: string;
    style?: React.CSSProperties;
    children?: any;
    onClick?: (e: any, layoutInfo: import("jimu-core").LayoutInfo) => void;
    onDoubleClick?: (e: any, layoutInfo: import("jimu-core").LayoutInfo) => void;
    key?: React.Key;
    aspectRatio?: number;
    draggable?: boolean;
    layouts: Immutable.ImmutableObjectMixin<import("jimu-core").SizeModeLayoutJson> & {
        readonly [x: string]: string;
    };
    index: number;
    gutter: number;
    autoWidth?: boolean;
    layoutId: string;
    layoutItemId: string;
    formatMessage: (id: string, values?: any) => string;
    resizable?: boolean;
    autoHeight?: boolean;
    isInSection?: boolean;
    showDefaultTools?: boolean;
    selectable?: boolean;
    forbidContextMenu?: boolean;
    forbidToolbar?: boolean;
    trailOrder?: number;
    forceAspectRatio?: boolean;
    resizeObserver?: ResizeObserver;
    layoutItem: Immutable.ImmutableObjectMixin<import("jimu-core").LayoutItemJson> & {
        readonly id?: string;
        readonly bbox?: Immutable.ImmutableObject<import("jimu-core").BoundingBox>;
        readonly type?: import("jimu-core").LayoutItemType;
        readonly setting?: any;
        readonly widgetId?: string;
        readonly sectionId?: string;
        readonly screenGroupId?: string;
        readonly isPlaceholder?: boolean;
        readonly isPending?: boolean;
        readonly parent?: string;
        readonly children?: Immutable.ImmutableArray<string>;
    };
    isLast: boolean;
    builderTheme: Immutable.ImmutableObjectMixin<import("jimu-core").ThemeVariables> & {
        readonly darkTheme?: boolean;
        readonly coloration?: import("jimu-core").ThemeColorationType;
        readonly colorationVariants?: Immutable.ImmutableObject<import("jimu-core").ThemeColorationVariants>;
        readonly typography?: Immutable.ImmutableObject<import("jimu-core").ThemeTypography>;
        readonly colors?: Immutable.ImmutableObject<import("jimu-core").ThemeAllColors>;
        readonly spacer?: import("jimu-core").ThemeSize;
        readonly sizes?: Immutable.ImmutableObject<import("jimu-core").ThemeSizes>;
        readonly gutters?: Immutable.ImmutableObject<import("jimu-core").ThemeSizes>;
        readonly borderRadiuses?: Immutable.ImmutableObject<import("jimu-core").ThemeBorderRadiuses>;
        readonly boxShadows?: Immutable.ImmutableObject<import("jimu-core").ThemeBoxShadows>;
        readonly focusedStyles?: Immutable.ImmutableObject<import("jimu-core").ThemeFocusedStyles>;
        readonly surfaces?: Immutable.ImmutableObject<import("jimu-core").ThemeSurfaces>;
        readonly header?: Immutable.ImmutableObject<import("jimu-core").ThemeHeader>;
        readonly footer?: Immutable.ImmutableObject<import("jimu-core").ThemeFooter>;
        readonly body?: Immutable.ImmutableObject<import("jimu-core").ThemeBody>;
        readonly link?: Immutable.ImmutableObject<import("jimu-core").ThemeLink>;
        readonly border?: Immutable.ImmutableObject<import("../../../../jimu-ui").BorderStyle>;
        readonly components?: Immutable.ImmutableObject<import("jimu-core").ThemeComponents>;
        readonly arcgis?: Immutable.ImmutableObject<import("jimu-core").ThemeArcGIS>;
    };
    isFirst: boolean;
    onDropAtBoundary: (draggingItem: LayoutItemConstructorProps, itemRect: ClientRect, insertIndex: number) => void;
    context?: React.Context<ReactRedux.ReactReduxContextValue<any, import("redux").AnyAction>>;
    store?: import("redux").Store<any, import("redux").AnyAction>;
}>;
export default _default;
