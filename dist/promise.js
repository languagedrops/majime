"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promiseWithTimeout = exports.promiseSequenceMap = exports.promiseSequenceForEach = void 0;
const standard_1 = require("./standard");
const promiseSequenceForEach = async (inputArray, callback) => {
    for (let i = 0; i < inputArray.length; i++) {
        await callback(inputArray[i], i, inputArray);
    }
};
exports.promiseSequenceForEach = promiseSequenceForEach;
const promiseSequenceMap = async (inputArray, transformer) => {
    const newArray = [];
    for (let i = 0; i < inputArray.length; i++) {
        newArray[i] = await transformer(inputArray[i], i, inputArray);
    }
    return newArray;
};
exports.promiseSequenceMap = promiseSequenceMap;
const promiseWithTimeout = async (promise, returnValueOnTimeout, timeoutInMs = 1000, rejectPromise = false) => {
    const timeout = rejectPromise
        ? (0, standard_1.delayRejected)(timeoutInMs, returnValueOnTimeout)
        : (0, standard_1.delayWithValue)(timeoutInMs, returnValueOnTimeout);
    return Promise.race([
        promise,
        timeout,
    ]);
};
exports.promiseWithTimeout = promiseWithTimeout;
