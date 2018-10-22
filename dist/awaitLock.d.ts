export declare class AwaitLock {
    private isAcquired;
    private waitingResolvers;
    constructor();
    acquireAsync(): Promise<void>;
    release(): void;
}
export declare const wrapInLock: <T>(lock: AwaitLock, promise: () => Promise<T>) => Promise<T>;
