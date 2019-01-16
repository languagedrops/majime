export declare const mapKeys: <T>(input: {
    [keys: string]: T;
}, keyTransformer: (key: string) => string) => {
    [keys: string]: T;
};
export declare const mapValues: <T, U>(input: {
    [keys: string]: T;
}, valueTransformer: (value: T) => U, filterValues?: true | undefined) => {
    [keys: string]: U;
};
export declare const mapKeysAndValues: <T, U>(input: {
    [keys: string]: T;
}, valueTransformer: (key: string, value: T) => U, filterValues?: true | undefined) => {
    [keys: string]: U;
};
