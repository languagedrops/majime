"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalize = exports.getHash = exports.filterDictionary = exports.asyncJsonParse = exports.SafeSetInterval = exports.generateUUID = exports.capitalizeFirstLetter = exports.truncate = exports.filterObject = exports.omit = exports.delayRejected = exports.delayWithValue = exports.delay = exports.makeUnique = exports.probablity = exports.clamp = exports.toMMSS = exports.range = exports.isNull = void 0;
const isNull = (item) => {
    return item === null || item === undefined;
};
exports.isNull = isNull;
const range = (start, limit) => {
    if (Number.isNaN(limit) || limit < 0) {
        return [];
    }
    return Array.apply(null, { length: limit })
        .map((_, index) => {
        return index + start;
    });
};
exports.range = range;
const toMMSS = (time) => {
    if (!time) {
        return '0:00';
    }
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    const minuteString = minutes < 10 ? '0' + minutes : minutes.toString();
    const secondsString = seconds < 10 ? '0' + seconds : seconds.toString();
    return minuteString + ':' + secondsString;
};
exports.toMMSS = toMMSS;
const clamp = (value, min, max) => {
    return min < max
        ? (value < min ? min : value > max ? max : value)
        : (value < max ? max : value > min ? min : value);
};
exports.clamp = clamp;
const probablity = (likelihood) => {
    return Math.random() <= likelihood;
};
exports.probablity = probablity;
const makeUnique = (array) => {
    return [...new Set(array)];
};
exports.makeUnique = makeUnique;
const delay = (millis, value) => {
    return new Promise((resolve) => setTimeout(() => resolve(value), millis));
};
exports.delay = delay;
const delayWithValue = (millis, value) => {
    return new Promise((resolve) => setTimeout(() => resolve(value), millis));
};
exports.delayWithValue = delayWithValue;
const delayRejected = (millis, value) => {
    return new Promise((_, reject) => setTimeout(() => reject(value), millis));
};
exports.delayRejected = delayRejected;
const omit = (key, object) => {
    const newObject = Object.assign({}, object);
    delete newObject[key];
    return newObject;
};
exports.omit = omit;
const filterObject = (input, filter) => {
    const newMap = {};
    Object.keys(input)
        .forEach((key) => {
        if (filter(key, input[key])) {
            newMap[key] = input[key];
        }
    });
    return newMap;
};
exports.filterObject = filterObject;
const truncate = (str, length) => {
    if (str.length > length) {
        return str.slice(0, length - 3) + '...';
    }
    return str;
};
exports.truncate = truncate;
const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
exports.capitalizeFirstLetter = capitalizeFirstLetter;
const generateUUID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
};
exports.generateUUID = generateUUID;
class SafeSetInterval {
    constructor() {
        this.timer = null;
        this.start = (handler, milliseconds) => {
            if (!this.isRunning()) {
                this.timer = setInterval(handler, milliseconds);
            }
        };
        this.stop = () => {
            clearInterval(this.timer);
            this.timer = null;
        };
        this.isRunning = () => this.timer !== null;
    }
}
exports.SafeSetInterval = SafeSetInterval;
const asyncJsonParse = (data) => {
    return (new Response(data)).json();
};
exports.asyncJsonParse = asyncJsonParse;
const filterDictionary = (dict, filterFunction) => {
    const result = {};
    Object.keys(dict).forEach((key) => {
        const currentValue = dict[key];
        if (filterFunction(currentValue)) {
            result[key] = currentValue;
        }
    });
    return result;
};
exports.filterDictionary = filterDictionary;
const getHash = (inputString) => {
    return (0, exports.range)(0, inputString.length).reduce((accum, index) => {
        return accum + inputString.charCodeAt(index);
    }, 0);
};
exports.getHash = getHash;
const normalize = (inputRange, outputRange, value) => {
    const minNew = outputRange[0];
    const maxNew = outputRange[1];
    const minOld = inputRange[0];
    const maxOld = inputRange[1];
    return ((maxNew - minNew) / (maxOld - minOld)) * (value - maxOld) + maxNew || 0;
};
exports.normalize = normalize;
