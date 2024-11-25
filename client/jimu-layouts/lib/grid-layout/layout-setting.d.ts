/// <reference types="react" />
/// <reference types="seamless-immutable" />
/** @jsx jsx */
import { React, ReactRedux, type IMSizeModeLayoutJson, type IMThemeVariables } from 'jimu-core';
interface Props {
    layouts: IMSizeModeLayoutJson;
    appTheme: IMThemeVariables;
    formatMessage: (id: string) => string;
}
interface StateToProps {
    layoutSetting: any;
}
declare class _Setting extends React.PureComponent<Props & StateToProps> {
    handlePaddingChange: (value: any) => void;
    handleSettingChange: (prop: string, value: any) => void;
    getLayoutIds(): string[];
    render(): JSX.Element;
}
declare const _default: ReactRedux.ConnectedComponent<typeof _Setting, {
    ref?: React.LegacyRef<_Setting>;
    key?: React.Key;
    layouts: import("seamless-immutable").ImmutableObjectMixin<import("jimu-core").SizeModeLayoutJson> & {
        readonly [x: string]: string;
    };
    formatMessage: (id: string) => string;
    appTheme: import("seamless-immutable").ImmutableObjectMixin<import("jimu-core").ThemeVariables> & {
        readonly darkTheme?: boolean;
        readonly coloration?: import("jimu-core").ThemeColorationType;
        readonly colorationVariants?: import("seamless-immutable").ImmutableObject<import("jimu-core").ThemeColorationVariants>;
        readonly typography?: import("seamless-immutable").ImmutableObject<import("jimu-core").ThemeTypography>;
        readonly colors?: import("seamless-immutable").ImmutableObject<import("jimu-core").ThemeAllColors>;
        readonly spacer?: import("jimu-core").ThemeSize;
        readonly sizes?: import("seamless-immutable").ImmutableObject<import("jimu-core").ThemeSizes>;
        readonly gutters?: import("seamless-immutable").ImmutableObject<import("jimu-core").ThemeSizes>;
        readonly borderRadiuses?: import("seamless-immutable").ImmutableObject<import("jimu-core").ThemeBorderRadiuses>;
        readonly boxShadows?: import("seamless-immutable").ImmutableObject<import("jimu-core").ThemeBoxShadows>;
        readonly focusedStyles?: import("seamless-immutable").ImmutableObject<import("jimu-core").ThemeFocusedStyles>;
        readonly surfaces?: import("seamless-immutable").ImmutableObject<import("jimu-core").ThemeSurfaces>;
        readonly header?: import("seamless-immutable").ImmutableObject<import("jimu-core").ThemeHeader>;
        readonly footer?: import("seamless-immutable").ImmutableObject<import("jimu-core").ThemeFooter>;
        readonly body?: import("seamless-immutable").ImmutableObject<import("jimu-core").ThemeBody>;
        readonly link?: import("seamless-immutable").ImmutableObject<import("jimu-core").ThemeLink>;
        readonly border?: import("seamless-immutable").ImmutableObject<import("jimu-ui").BorderStyle>;
        readonly components?: import("seamless-immutable").ImmutableObject<import("jimu-core").ThemeComponents>;
        readonly arcgis?: import("seamless-immutable").ImmutableObject<import("jimu-core").ThemeArcGIS>;
    };
    context?: React.Context<ReactRedux.ReactReduxContextValue<any, import("redux").AnyAction>>;
    store?: import("redux").Store<any, import("redux").AnyAction>;
}>;
export default _default;
