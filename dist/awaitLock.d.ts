export declare class AwaitLock {
    private isAcquired;
    private waitingResolvers;
    constructor();
    acquireAsync(): Promise<void>;
    release(): void;
}
