declare global  {
    interface Array<T> {
        remove(elem: T): T[];
        flatten(): T[];
        removeLastElement(): T[];
        unique(): T[];
    }
}
export declare const substractArrays: <T>(a: T[], b: T[]) => T[];
