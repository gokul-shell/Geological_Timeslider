export declare const lowercaseFirstLetter: (string: any) => any;
export declare const uppercaseFirstLetter: (string: any) => any;
export declare const isEmptyObj: (obj: any) => boolean;
interface DeepmergeOptions {
    clone?: boolean;
}
export declare const deepmerge: <T>(target: any, source: unknown, options?: DeepmergeOptions) => T;
export declare function getPath(obj: any, path: any): any;
export {};
