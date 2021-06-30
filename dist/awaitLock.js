"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapInLock = exports.AwaitLock = void 0;
class AwaitLock {
    constructor() {
        this.isAcquired = false;
        this.waitingResolvers = [];
    }
    acquireAsync() {
        if (!this.isAcquired) {
            this.isAcquired = true;
            return Promise.resolve();
        }
        return new Promise((resolve) => {
            this.waitingResolvers.push(resolve);
        });
    }
    release() {
        if (!this.isAcquired) {
            console.warn('Trying to release an unacquired lock');
        }
        if (this.waitingResolvers.length > 0) {
            const resolve = this.waitingResolvers.shift();
            resolve();
        }
        else {
            this.isAcquired = false;
        }
    }
}
exports.AwaitLock = AwaitLock;
const wrapInLock = async (lock, promise) => {
    await lock.acquireAsync();
    try {
        const value = await promise();
        lock.release();
        return value;
    }
    catch (error) {
        lock.release();
        throw error;
    }
};
exports.wrapInLock = wrapInLock;
