export declare const mapKeys: <T>(input: {
    [keys: string]: T;
}, keyTransformer: (key: string) => string) => {
    [keys: string]: T;
};
export declare const mapValues: <T, U>(input: {
    [keys: string]: T;
}, valueTransformer: (value: T) => U) => {
    [keys: string]: U;
};
