"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invertObjectKeysAndValues = exports.extractKeysAndValues = exports.mapKeysAndValues = exports.mapValues = exports.mapKeys = void 0;
const mapKeys = (input, keyTransformer) => {
    const newMap = {};
    Object.keys(input)
        .forEach((key) => {
        const newKey = keyTransformer(key);
        newMap[newKey] = input[key];
    });
    return newMap;
};
exports.mapKeys = mapKeys;
const mapValues = (input, valueTransformer, filterValues) => {
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
exports.mapValues = mapValues;
const mapKeysAndValues = (input, valueTransformer, filterValues) => {
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
exports.mapKeysAndValues = mapKeysAndValues;
const extractKeysAndValues = (input) => {
    return Object.keys(input)
        .map((key) => ({ key: key, value: input[key] }));
};
exports.extractKeysAndValues = extractKeysAndValues;
const invertObjectKeysAndValues = (input) => {
    const newMap = {};
    Object.keys(input).forEach((inputKey) => {
        const newKey = input[inputKey];
        newMap[newKey] = inputKey;
    });
    return newMap;
};
exports.invertObjectKeysAndValues = invertObjectKeysAndValues;
