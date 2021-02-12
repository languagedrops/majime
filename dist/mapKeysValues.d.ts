export declare const mapKeys: <T>(input: {
    [keys: string]: T;
}, keyTransformer: (key: string) => string) => {
    [keys: string]: T;
};
export declare const mapValues: <T, U, V extends boolean | undefined>(input: {
    [keys: string]: T;
}, valueTransformer: (value: T) => V extends true ? Exclude<U, null | undefined> : U, filterValues?: V | undefined) => {
    [keys: string]: V extends true ? Exclude<U, null | undefined> : U;
};
export declare const mapKeysAndValues: <T, U, V extends boolean | undefined>(input: {
    [keys: string]: T;
}, valueTransformer: (key: string, value: T) => V extends true ? Exclude<U, null | undefined> : U, filterValues?: true | undefined) => {
    [keys: string]: V extends true ? Exclude<U, null | undefined> : U;
};
export declare const extractKeysAndValues: <T, K extends keyof T>(input: T) => {
    readonly key: K;
    readonly value: T[K];
}[];
