declare global  {
    interface Array<T> {
        remove(elem: T): T[];
        flatten(): T;
        removeLastElement(): T[];
        unique(): T[];
        toSet(): Set<T>;
        reversed(): T[];
        insert(elem: T, index: number): T[];
        isUnique(): boolean;
        substract(otherArray: T[]): T[];
        groupBy(keyExtractor: (item: T, index: number) => string): {
            [key: string]: T;
        };
        groupByMultipleKeys(multipleKeysExtractor: (item: T, index: number) => string[]): {
            [key: string]: T;
        };
        groupByAndMap<U>(keyExtractor: (item: T, index: number) => string, transform: (item: T, index: number) => U): {
            [key: string]: U;
        };
        groupByMultipleValues(keyExtractor: (item: T, index: number) => string): {
            [key: string]: T[];
        };
        shuffle(): T[];
        randomElement(): T;
        randomElementWithExceptions(except: T[]): T;
        randomElements(count: number): T[];
        firstElement(): T;
        lastElement(): T;
        lastElements(numberOfElements: number): T[];
        filterNull(): Array<Exclude<T, null | undefined>>;
        sortedByProperty(compareFunction: (element: T) => number | string | Date, reverse?: boolean): T[];
    }
}
export declare const removeLastElement: <T>(fromArray: T[]) => T[];
export declare const reverseArray: <T>(array: T[]) => T[];
export declare const insert: <T>(array: T[], index: number, newItem: T) => T[];
export declare const isArrayUnique: <T>(array: T[]) => boolean;
export declare const substractArrays: <T>(a: T[], b: T[]) => T[];
export declare const groupBy: <T>(fromArray: T[], keyExtractor: (item: T, index: number) => string) => {
    [key: string]: T;
};
export declare const groupByMultipleKeys: <T>(fromArray: T[], multipleKeysExtractor: (item: T, index: number) => string[]) => {
    [key: string]: T;
};
export declare const groupByAndMap: <T, U>(fromArray: T[], keyExtractor: (item: T, index: number) => string, transform: (item: T, index: number) => U) => {
    [key: string]: U;
};
export declare const groupByMultipleValues: <T>(fromArray: T[], keyExtractor: (item: T, index: number) => string) => {
    [key: string]: T[];
};
export declare const shuffle: <T>(array: T[]) => T[];
export declare const randomElement: <T>(fromArray: T[]) => T;
export declare const randomElementWithExceptions: <T>(fromArray: T[], excludeArray: T[]) => T;
export declare const randomElements: <T>(fromArray: T[], count: number) => T[];
export declare const firstElement: <T>(fromArray: T[]) => T;
export declare const lastElement: <T>(array: T[]) => T;
export declare const lastElements: <T>(array: T[], numberOfElements: number) => T[];
export declare const filterNull: <T>(array: T[]) => Exclude<T, null | undefined>[];
export declare const sortedByProperty: <T>(sourceArray: T[], compareFunction: (element: T) => string | number | Date, reverse?: boolean | undefined) => T[];
