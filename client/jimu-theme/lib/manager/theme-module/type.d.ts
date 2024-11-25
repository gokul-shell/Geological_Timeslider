import { type IMThemeManifest, type IMThemeVariables } from 'jimu-core';
import { type FunctionInterpolation } from '../../__emotion__';
export type SlotKeys = 'root' | (string & {
    [key: string]: any;
});
export type SlotStyle<Props = {
    [x: string]: any;
}> = FunctionInterpolation<Props & {
    theme: IMThemeVariables;
}>;
export type ComponentRootStyle = SlotStyle;
export type ComponentStyle<Props = {
    [x: string]: any;
}> = {
    [slot in SlotKeys]: SlotStyle<Props>;
};
/**
   * A set of functions to return the serialized style of emotion.
   */
export interface StyleFunctions {
    [name: string]: ComponentRootStyle;
}
/**
 * The theme in ExB is defined as a theme module.
 */
export interface ThemeModule {
    uri: string;
    manifest: IMThemeManifest;
    styles?: StyleFunctions;
    variables?: IMThemeVariables;
    /**
     * The final theme variable, which is generated dynamically at run time
     * based on overridden theme variables and custom theme variables.
     */
    theme?: IMThemeVariables;
}
