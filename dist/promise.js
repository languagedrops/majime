"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const standard_1 = require("./standard");
exports.promiseSequenceForEach = async (inputArray, callback) => {
    for (let i = 0; i < inputArray.length; i++) {
        await callback(inputArray[i], i, inputArray);
    }
};
exports.promiseSequenceMap = async (inputArray, transformer) => {
    const newArray = [];
    for (let i = 0; i < inputArray.length; i++) {
        newArray[i] = await transformer(inputArray[i], i, inputArray);
    }
    return newArray;
};
exports.promiseWithTimeout = async (promise, returnValueOnTimeout, timeoutInMs = 1000, rejectPromise = false) => {
    const timeout = rejectPromise
        ? standard_1.delayRejected(timeoutInMs, returnValueOnTimeout)
        : standard_1.delay(timeoutInMs, returnValueOnTimeout);
    return Promise.race([
        promise,
        timeout,
    ]);
};
