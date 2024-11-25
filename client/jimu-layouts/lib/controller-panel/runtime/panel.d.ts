/** @jsx jsx */
import { jsx } from 'jimu-core';
interface Props {
    controllerId: string;
    layoutId: string;
    layoutItemId: string;
    onClose: (e: any, string: any) => void;
}
export declare function Panel(props: Props): jsx.JSX.Element;
export {};
