export declare const isNull: (item: any) => boolean;
export declare const range: (start: number, limit: number) => number[];
export declare const toMMSS: (time: number) => string;
export declare const clamp: (value: number, min: number, max: number) => number;
export declare const probablity: (likelihood: number) => boolean;
export declare const makeUnique: <T>(array: T[]) => T[];
export declare const delay: <T>(millis: number, value?: T | undefined) => Promise<T | undefined>;
export declare const delayWithValue: <T>(millis: number, value: T) => Promise<T>;
export declare const delayRejected: <T>(millis: number, value?: T | undefined) => Promise<T>;
export declare const omit: <T, K extends keyof T>(key: K, object: T) => Omit<T, K>;
export declare const filterObject: <T extends {
    readonly [key: string]: any;
}, K extends keyof T>(input: T, filter: (key: string, value: T[K]) => boolean) => Partial<T>;
export declare const truncate: (str: string, length: number) => string;
export declare const capitalizeFirstLetter: (str: string) => string;
export declare const generateUUID: () => string;
export declare class SafeSetInterval {
    private timer;
    start: (handler: () => void, milliseconds: number) => void;
    stop: () => void;
    private isRunning;
}
export declare const asyncJsonParse: (data: string) => Promise<any>;
export declare const filterDictionary: <T>(dict: {
    [key: string]: T;
}, filterFunction: (element: T) => boolean) => {
    [key: string]: T;
};
export declare const getHash: (inputString: string) => number;
export declare const normalize: (inputRange: [number, number], outputRange: [number, number], value: number) => number;
