/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
import { type AlertType } from './type';
/**
 * The AlertPanel component props.
 */
export interface AlertPanelProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    /**
     * The type of `AlertButton`, which will represent different meanings, such as 'warning' and 'error'.
     * @default warning
     */
    type?: AlertType;
    /**
     * Text content to display.
     */
    text?: string;
    /**
     * Can the panel be closed.
     * @default false
     */
    closable?: boolean;
    /**
     * Whether to display the icon for the type.
     * @default false
     */
    withIcon?: boolean;
    /**
     * Whether the panel is visible.
     * @default true
     */
    open?: boolean;
    /**
     * Whether to automatically focus on the close button when open.
     * @ignore
     * @default false
     */
    autoFocus?: boolean;
    /**
     * If `cloable` is true, this event will be triggered when the close button is clicked.
     * @event
     */
    onClose?: () => void;
}
/**
 * A component used to display warning messages.
 */
export declare const AlertPanel: React.ForwardRefExoticComponent<AlertPanelProps & React.RefAttributes<HTMLDivElement>>;
/**
 * The UncontrolledAlertPanel props.
 */
export interface UncontrolledAlertPanelProps extends Omit<AlertPanelProps, 'open' | 'onClose'> {
}
/**
 * An uncontrolled component used to display warning messages.
 */
export declare const UncontrolledAlertPanel: React.ForwardRefExoticComponent<AlertPanelProps & React.RefAttributes<HTMLDivElement>>;
