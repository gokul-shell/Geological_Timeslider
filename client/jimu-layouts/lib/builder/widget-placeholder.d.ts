/// <reference types="react" />
/** @jsx jsx */
import { React, jsx, type IMSizeModeLayoutJson, type LayoutItemConstructorProps, type IMThemeVariables, type IntlShape, ReactRedux } from 'jimu-core';
import { type PageContextProps, type LayoutItemProps, type LayoutContextProps } from 'jimu-layouts/layout-runtime';
interface IntlProps {
    intl: IntlShape;
}
interface DialogProps {
    currentDialogId: string;
}
interface State {
    showModal: boolean;
    isBusy: boolean;
}
export declare class _WidgetPlaceholder extends React.PureComponent<LayoutItemProps & IntlProps & DialogProps, State> {
    ref: HTMLElement;
    btnRef: HTMLElement;
    pageContext: PageContextProps;
    layoutContext: LayoutContextProps;
    fakeLayouts: IMSizeModeLayoutJson;
    constructor(props: any);
    componentDidUpdate(prevProps: Readonly<LayoutItemProps & IntlProps & DialogProps>): void;
    getStyle(builderTheme: IMThemeVariables): import("jimu-core").SerializedStyles;
    toggleModal: (e: any) => void;
    closeModal: () => void;
    toggleDragoverEffect: (isDragover: boolean, draggingItem: LayoutItemConstructorProps) => void;
    onDrop: (draggingItem: LayoutItemConstructorProps) => void;
    setContent: (item: LayoutItemConstructorProps) => void;
    getPopupStyle(): import("jimu-core").SerializedStyles;
    getModalStyle(): import("jimu-core").SerializedStyles;
    isItemAccepted: (item: LayoutItemConstructorProps) => boolean;
    render(): jsx.JSX.Element;
}
export declare const WidgetPlaceholder: React.FC<import("react-intl").WithIntlProps<{
    ref?: React.LegacyRef<_WidgetPlaceholder>;
    className?: string;
    style?: React.CSSProperties;
    children?: any;
    onClick?: (e: any, layoutInfo: import("jimu-core").LayoutInfo) => void;
    onDoubleClick?: (e: any, layoutInfo: import("jimu-core").LayoutInfo) => void;
    key?: React.Key;
    aspectRatio?: number;
    draggable?: boolean;
    intl: IntlShape;
    autoWidth?: boolean;
    layoutId: string;
    layoutItemId: string;
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
    context?: React.Context<ReactRedux.ReactReduxContextValue<any, import("redux").AnyAction>>;
    store?: import("redux").Store<any, import("redux").AnyAction>;
}>> & {
    WrappedComponent: React.ComponentType<{
        ref?: React.LegacyRef<_WidgetPlaceholder>;
        className?: string;
        style?: React.CSSProperties;
        children?: any;
        onClick?: (e: any, layoutInfo: import("jimu-core").LayoutInfo) => void;
        onDoubleClick?: (e: any, layoutInfo: import("jimu-core").LayoutInfo) => void;
        key?: React.Key;
        aspectRatio?: number;
        draggable?: boolean;
        intl: IntlShape;
        autoWidth?: boolean;
        layoutId: string;
        layoutItemId: string;
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
        context?: React.Context<ReactRedux.ReactReduxContextValue<any, import("redux").AnyAction>>;
        store?: import("redux").Store<any, import("redux").AnyAction>;
    }>;
};
export {};
