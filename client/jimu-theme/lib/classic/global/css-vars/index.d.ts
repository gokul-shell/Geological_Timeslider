/// <reference types="react" />
import { React, type ThemeVariables } from 'jimu-core';
interface Props {
    theme: ThemeVariables;
    children?: React.ReactNode;
}
export declare const CssVarsProvider: (props: Props) => React.JSX.Element;
export {};
