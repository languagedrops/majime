"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapWords = exports.wordUpperFirst = exports.lowerFirst = exports.upperFirst = void 0;
const upperFirst = (source) => {
    if (!source) {
        return source;
    }
    const [first, ...rest] = source;
    return `${first.toUpperCase()}${rest.join('')}`;
};
exports.upperFirst = upperFirst;
const lowerFirst = (source) => {
    if (!source) {
        return source;
    }
    const [first, ...rest] = source;
    return `${first.toLowerCase()}${rest.join('')}`;
};
exports.lowerFirst = lowerFirst;
const wordUpperFirst = (source) => exports.mapWords(source, exports.upperFirst);
exports.wordUpperFirst = wordUpperFirst;
const mapWords = (source, mapper) => source
    .split(' ')
    .map(mapper)
    .join(' ');
exports.mapWords = mapWords;
