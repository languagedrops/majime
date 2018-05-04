export declare const randomElement: <T>(fromArray: T[]) => T;
export declare const randomElementWithExceptions: <T>(fromArray: T[], excludeArray: T[]) => T;
export declare const substractArrays: <T>(a: T[], b: T[]) => T[];
export declare const randomElements: <T>(fromArray: T[], count: number) => T[];
export declare const firstElement: <T>(fromArray: T[]) => T;
export declare const isNull: (item: any) => boolean;
export declare const groupBy: <T>(fromArray: T[], keyExtractor: (item: T, index: number) => string) => {
    [key: string]: T;
};
export declare const groupByMultipleKeys: <T>(fromArray: T[], multipleKeysExtractor: (item: T, index: number) => string[]) => {
    [key: string]: T;
};
export declare const groupByAndMap: <T, U>(fromArray: T[], keyExtractor: (item: T, index: number) => string, transform: (item: T, index: number) => U) => {
    [key: string]: U;
};
export declare const removeLastElement: <T>(fromArray: T[]) => T[];
export declare const shuffle: <T>(array: T[]) => T[];
export declare const getRandom: (floor: number, ceiling: number) => number;
export declare const getRandomBoolean: (weight?: number | undefined) => boolean;
export declare const range: (start: number, limit: number) => number[];
export declare const chunk: <T>(chunkSize: number, array: T[]) => T[][];
export declare const lastElement: <T>(array: T[]) => T;
export declare const toMMSS: (time: number) => string;
export declare const clamp: (value: number, min: number, max: number) => number;
export declare const probablity: (likelihood: number) => boolean;
export declare const reverseArray: <T>(array: T[]) => T[];
export declare const makeUnique: <T>(array: T[]) => T[];
export declare const delay: <T>(millis: number, value?: T | undefined) => Promise<T>;
export declare const omit: (key: string, object: object) => object;
export declare const flattenArray: <T>(arrays: T[][]) => T[];
export declare const arraysEqual: <T>(lhs: T[], rhs: T[]) => boolean;
export declare const sortIntersection: <T>(sourceArray: T[], orderArray?: T[] | undefined) => T[];
export declare const sortArrayByFunction: <T>(sourceArray: T[], compareFunction: (element: T) => string | number, reverse?: boolean | undefined) => T[];
export declare const truncate: (str: string, length: number) => string;
export declare const reverseString: (str: string) => any;
export declare const capitalizeFirstLetter: (str: string) => string;
export declare const generateUUID: () => string;
export declare const insert: <T>(array: T[], index: number, newItem: T) => T[];
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
export declare const isArrayUnique: <T>(array: T[]) => boolean;
