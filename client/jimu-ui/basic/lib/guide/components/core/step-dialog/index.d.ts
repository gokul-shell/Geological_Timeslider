/** @jsx jsx */
import { React, jsx, type IMThemeVariables } from 'jimu-core';
import { type TooltipRenderProps } from 'react-joyride';
interface ExtraProps {
    theme?: IMThemeVariables;
    disabled?: boolean;
    isStepInjected?: boolean;
}
export declare const _StepDialog: (props: TooltipRenderProps & ExtraProps) => jsx.JSX.Element;
export declare const StepDialog: React.ForwardRefExoticComponent<Pick<TooltipRenderProps & ExtraProps, "disabled" | keyof TooltipRenderProps | "isStepInjected"> & {
    theme?: IMThemeVariables;
}>;
export {};
