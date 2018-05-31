declare global  {
    interface Array<T> {
        remove(elem: T): T[];
        flatten(): T[];
        removeLastElement(): T[];
        unique(): T[];
        toSet(): Set<T>;
        reversed(): T[];
        insert(elem: T, index: number): T[];
        isUnique(): boolean;
        substract(otherArray: T[]): T[];
    }
}
export declare const reverseArray: <T>(array: T[]) => T[];
export declare const insert: <T>(array: T[], index: number, newItem: T) => T[];
export declare const isArrayUnique: <T>(array: T[]) => boolean;
export declare const substractArrays: <T>(a: T[], b: T[]) => T[];
