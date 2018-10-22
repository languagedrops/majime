"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
