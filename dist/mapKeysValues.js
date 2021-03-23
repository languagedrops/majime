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
exports.mapValues = (input, valueTransformer, filterValues) => {
    const newMap = {};
    Object.keys(input)
        .forEach((key) => {
        const newValue = valueTransformer(input[key]);
        if (!!newValue || !filterValues) {
            newMap[key] = newValue;
        }
    });
    return newMap;
};
exports.mapKeysAndValues = (input, valueTransformer, filterValues) => {
    const newMap = {};
    Object.keys(input)
        .forEach((key) => {
        const newValue = valueTransformer(key, input[key]);
        if (!!newValue || !filterValues) {
            newMap[key] = newValue;
        }
    });
    return newMap;
};
exports.extractKeysAndValues = (input) => {
    return Object.keys(input)
        .map((key) => ({ key: key, value: input[key] }));
};
exports.invertObjectKeysAndValues = (input) => {
    const newMap = {};
    Object.keys(input).forEach((inputKey) => {
        const newKey = input[inputKey];
        newMap[newKey] = inputKey;
    });
    return newMap;
};
