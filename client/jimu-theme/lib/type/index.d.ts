declare enum NormalLineType {
    SOLID = "solid",
    DASHED = "dashed",
    DOTTED = "dotted",
    DOUBLE = "double"
}
export interface BorderStyle {
    type?: NormalLineType;
    color?: string;
    width?: string | number;
}
export {};
