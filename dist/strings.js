"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upperFirst = (source) => {
    if (!source) {
        return source;
    }
    const [first, ...rest] = source;
    return `${first.toUpperCase()}${rest.join('')}`;
};
exports.lowerFirst = (source) => {
    if (!source) {
        return source;
    }
    const [first, ...rest] = source;
    return `${first.toLowerCase()}${rest.join('')}`;
};
exports.wordUpperFirst = (source) => exports.mapWords(source, exports.upperFirst);
exports.mapWords = (source, mapper) => source
    .split(' ')
    .map(mapper)
    .join(' ');
