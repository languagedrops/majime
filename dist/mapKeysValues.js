"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapKeys = (input, keyTransformer) => {
    const newMap = {};
    Object.keys(input)
        .forEach((key) => {
        const newKey = keyTransformer(key);
        newMap[newKey] = input[key];
    });
    return newMap;
};
exports.mapValues = (input, valueTransformer) => {
    const newMap = {};
    Object.keys(input)
        .forEach((key) => {
        newMap[key] = valueTransformer(input[key]);
    });
    return newMap;
};
