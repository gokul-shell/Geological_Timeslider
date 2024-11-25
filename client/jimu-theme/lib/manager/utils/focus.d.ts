interface FocusStyles {
    color: string;
    width: string | number;
    offset: string | number;
}
export declare const getFocusStyles: (focusedStyles: FocusStyles, prefix?: string) => {
    '.jimu-keyboard-nav': {
        [x: string]: {
            [x: string]: {
                outline: string;
                outlineOffset: string | number;
                '&:focus, &:focus-visible'?: undefined;
                '&:focus-within'?: undefined;
            } | {
                '&:focus, &:focus-visible': {
                    outlineOffset: string;
                };
                outline?: undefined;
                outlineOffset?: undefined;
                '&:focus-within'?: undefined;
            } | {
                '&:focus-within': {
                    boxShadow: string;
                };
                outline?: undefined;
                outlineOffset?: undefined;
                '&:focus, &:focus-visible'?: undefined;
            };
            /**:-moz-focusring,  FF, before 85, but it affects chrome */
            '&:focus, &:focus-visible, *:focus, *:focus-visible': {
                outline: string;
                outlineOffset: string | number;
            };
            '.jimu-outline-inside': {
                '&:focus, &:focus-visible': {
                    outlineOffset: string;
                };
            };
        };
    };
    '&.jimu-keyboard-nav'?: undefined;
} | {
    '&.jimu-keyboard-nav': {
        [x: string]: {
            outline: string;
            outlineOffset: string | number;
            '&:focus, &:focus-visible'?: undefined;
            '&:focus-within'?: undefined;
        } | {
            '&:focus, &:focus-visible': {
                outlineOffset: string;
            };
            outline?: undefined;
            outlineOffset?: undefined;
            '&:focus-within'?: undefined;
        } | {
            '&:focus-within': {
                boxShadow: string;
            };
            outline?: undefined;
            outlineOffset?: undefined;
            '&:focus, &:focus-visible'?: undefined;
        };
        /**:-moz-focusring,  FF, before 85, but it affects chrome */
        '&:focus, &:focus-visible, *:focus, *:focus-visible': {
            outline: string;
            outlineOffset: string | number;
        };
        '.jimu-outline-inside': {
            '&:focus, &:focus-visible': {
                outlineOffset: string;
            };
        };
    };
    '.jimu-keyboard-nav'?: undefined;
};
export {};
