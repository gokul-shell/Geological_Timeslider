export declare const getSpacingClasses: (key: number | string, value: any) => {};
export declare const getTypeColorClasses: (color: string, value: string) => {
    [x: string]: {
        backgroundColor: string;
        borderColor?: undefined;
        color?: undefined;
    } | {
        borderColor: string;
        backgroundColor?: undefined;
        color?: undefined;
    } | {
        color: string;
        backgroundColor?: undefined;
        borderColor?: undefined;
    };
};
export declare const getBorderColorClasses: (borderColor: string, borderWidth?: string, whiteColor?: string) => {
    '.border': {
        border: string;
    };
    '.border-top': {
        borderTop: string;
    };
    '.border-right': {
        borderRight: string;
    };
    '.border-bottom': {
        borderBottom: string;
    };
    '.border-left': {
        borderLeft: string;
    };
    '.border-0': {
        border: string;
    };
    '.border-1': {
        borderWidth: string;
    };
    '.border-2': {
        borderWidth: string;
    };
    '.border-top-0': {
        borderTop: string;
    };
    '.border-right-0': {
        borderRight: string;
    };
    '.border-bottom-0': {
        borderBottom: string;
    };
    '.border-left-0': {
        borderLeft: string;
    };
    '.border-white': {
        borderColor: string;
    };
};
export declare const getShadowClasses: <T extends object>(shadows: T) => {};
export declare const getShapeClasses: <T extends object>(shape: T) => {};
export declare const getTypographyClasses: <T extends object>(typography: T) => {};
