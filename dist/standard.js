"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNull = (item) => {
    return item === null || item === undefined;
};
exports.range = (start, limit) => {
    if (Number.isNaN(limit) || limit < 0) {
        return [];
    }
    return Array.apply(null, { length: limit })
        .map((_, index) => {
        return index + start;
    });
};
exports.toMMSS = (time) => {
    if (!time) {
        return '0:00';
    }
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    const minuteString = minutes < 10 ? '0' + minutes : minutes.toString();
    const secondsString = seconds < 10 ? '0' + seconds : seconds.toString();
    return minuteString + ':' + secondsString;
};
exports.clamp = (value, min, max) => {
    return min < max
        ? (value < min ? min : value > max ? max : value)
        : (value < max ? max : value > min ? min : value);
};
exports.probablity = (likelihood) => {
    return Math.random() <= likelihood;
};
exports.makeUnique = (array) => {
    return [...new Set(array)];
};
exports.delay = (millis, value) => {
    return new Promise((resolve) => setTimeout(() => resolve(value), millis));
};
exports.delayRejected = (millis, value) => {
    return new Promise((_, reject) => setTimeout(() => reject(value), millis));
};
exports.omit = (key, object) => {
    const newObject = Object.assign({}, object);
    delete newObject[key];
    return newObject;
};
exports.filterObject = (input, filter) => {
    const newMap = {};
    Object.keys(input)
        .forEach((key) => {
        if (filter(key, input[key])) {
            newMap[key] = input[key];
        }
    });
    return newMap;
};
exports.truncate = (str, length) => {
    if (str.length > length) {
        return str.slice(0, length - 3) + '...';
    }
    return str;
};
exports.capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
exports.generateUUID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
};
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
exports.asyncJsonParse = (data) => {
    return (new Response(data)).json();
};
exports.filterDictionary = (dict, filterFunction) => {
    const result = {};
    Object.keys(dict).forEach((key) => {
        const currentValue = dict[key];
        if (filterFunction(currentValue)) {
            result[key] = currentValue;
        }
    });
    return result;
};
exports.getHash = (inputString) => {
    return exports.range(0, inputString.length).reduce((accum, index) => {
        return accum + inputString.charCodeAt(index);
    }, 0);
};
exports.normalize = (inputRange, outputRange, value) => {
    const minNew = outputRange[0];
    const maxNew = outputRange[1];
    const minOld = inputRange[0];
    const maxOld = inputRange[1];
    return ((maxNew - minNew) / (maxOld - minOld)) * (value - maxOld) + maxNew;
};
