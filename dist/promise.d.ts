export declare const promiseSequenceForEach: <T, R>(inputArray: T[], callback: (element: T, index: number, array: T[]) => Promise<R>) => Promise<void>;
export declare const promiseSequenceMap: <T, R>(inputArray: T[], transformer: (element: T, index: number, array: T[]) => Promise<R>) => Promise<R[]>;
