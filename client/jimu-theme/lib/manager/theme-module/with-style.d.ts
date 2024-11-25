/// <reference types="react" />
import { React } from 'jimu-core';
import { type FilteringStyledOptions, type StyledComponent } from '../../__emotion__';
/**
 * A higher-order component that links the registered component style.
 * @param Component
 * @param name
 * @param options
 */
export declare function withStyles<C extends React.ComponentClass<React.ComponentProps<C>> | React.FC<React.ComponentProps<C>>, ForwardedProps extends keyof React.ComponentProps<C> = keyof React.ComponentProps<C>>(Component: C, name?: string, options?: FilteringStyledOptions<React.ComponentProps<C>, ForwardedProps>): StyledComponent<React.ComponentProps<C>>;
/**
 * A higher-order component that links the registered style of theme2.
 * @param Component
 * @param name
 * @param options
 */
export declare function withTheme2Styles<C extends React.ComponentClass<React.ComponentProps<C>> | React.FC<React.ComponentProps<C>>, ForwardedProps extends keyof React.ComponentProps<C> = keyof React.ComponentProps<C>>(Component: C, name?: string, options?: FilteringStyledOptions<React.ComponentProps<C>, ForwardedProps>): StyledComponent<React.ComponentProps<C>>;
/**
 * A higher-order component that links the registered style of builder theme.
 */
export declare const withBuilderStyles: typeof withTheme2Styles;
