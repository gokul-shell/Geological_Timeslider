/// <reference types="react" />
import { React, type ThemeVariables } from 'jimu-core';
export declare const html: (theme: any) => {
    fontSize: any;
    WebkitTextSizeAdjust: string;
    MsTextSizeAdjust: string;
    MozTextSizeAdjust: string;
    WebkitFontSmoothing: string;
    fontFeatureSettings: string;
    MozFontFeatureSetting: string;
    WebkitFontFeatureSetting: string;
    okitFontFeatureSetting: string;
    fontkerning: string;
    textrendering: string;
};
export declare const body: (theme: ThemeVariables) => {
    fontFamily: string;
    fontSize: import("jimu-core").ThemeSize;
    fontWeight: string;
    lineHeight: import("../../../../../jimu-core/lib/types/theme/common").LineHeight;
    color: string;
    backgroundColor: string;
};
interface Props {
    theme?: ThemeVariables;
    children?: React.ReactNode;
}
export declare const CssBaseLine: (props: Props) => React.JSX.Element;
export {};
