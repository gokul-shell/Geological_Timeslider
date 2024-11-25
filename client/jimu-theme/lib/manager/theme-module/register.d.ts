import type { ComponentStyle, SlotStyle } from './type';
export declare const isSlottedStyle: (style: ComponentStyle) => boolean;
/**
 * Register the style function of the component, it will be used with `withStyles`.
 * @param name
 * @param style
 */
export declare const registerStyle: (name: string, style: ComponentStyle | SlotStyle) => void;
/**
 * Register the style function of the components in one entry, it will be used with `withStyles`.
 * @param entry
 */
export declare const registerStyles: (entry: string, styles: {
    [component: string]: ComponentStyle | SlotStyle;
}) => void;
/**
 * Get the basic style function of the specified component.
 * @param component
 * @param useTheme2
 */
export declare const getRegisteredStyle: (component: string, showWarning?: boolean) => ComponentStyle;
