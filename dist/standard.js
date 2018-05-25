import GraphemeSplitter from 'grapheme-splitter';
const splitter = new GraphemeSplitter();
export const randomElement = (fromArray) => {
    return fromArray[Math.floor(Math.random() * fromArray.length)];
};
export const randomElementWithExceptions = (fromArray, excludeArray) => {
    const filteredArray = substractArrays(fromArray, excludeArray);
    return randomElement(filteredArray);
};
export const substractArrays = (a, b) => {
    return a.filter((aElement) => !b.includes(aElement));
};
export const randomElements = (fromArray, count) => {
    if (count > fromArray.length) {
        throw Error('trying to get more elements than array length');
    }
    return shuffle(fromArray).slice(0, count);
};
export const firstElement = (fromArray) => {
    return fromArray[0];
};
export const isNull = (item) => {
    return item === null || item === undefined;
};
export const groupBy = (fromArray, keyExtractor) => {
    const groupped = {};
    fromArray.forEach((item, index) => {
        groupped[keyExtractor(item, index)] = item;
    });
    return groupped;
};
export const groupByMultipleKeys = (fromArray, multipleKeysExtractor) => {
    const groupped = {};
    fromArray.forEach((item, index) => {
        const keys = multipleKeysExtractor(item, index);
        keys.forEach((currentKey) => {
            groupped[currentKey] = item;
        });
    });
    return groupped;
};
export const groupByAndMap = (fromArray, keyExtractor, transform) => {
    const groupped = {};
    fromArray.forEach((item, index) => {
        groupped[keyExtractor(item, index)] = transform(item, index);
    });
    return groupped;
};
export const removeLastElement = (fromArray) => {
    if (fromArray.length === 0) {
        return fromArray;
    }
    return fromArray.slice(0, fromArray.length - 1);
};
export const shuffle = (array) => {
    // if it's 1 or 0 items, just return
    if (array.length <= 1) {
        return array;
    }
    const newArray = array.slice();
    // For each index in array
    for (let i = 0; i < newArray.length; i++) {
        // choose a random not-yet-placed item to place there
        // must be an item AFTER the current item, because the stuff
        // before has all already been placed
        const randomChoiceIndex = getRandom(i, newArray.length - 1);
        const temp = newArray[i];
        newArray[i] = newArray[randomChoiceIndex];
        newArray[randomChoiceIndex] = temp;
    }
    return newArray;
};
export const getRandom = (floor, ceiling) => {
    return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
};
// expects a number between 0-1
export const getRandomBoolean = (weight) => {
    return getRandom(1, 10000) < (weight || 0.5) * 10000;
};
export const range = (start, limit) => {
    return Array.apply(null, { length: limit })
        .map((_, index) => {
        return index + start;
    });
};
export const chunk = (chunkSize, array) => {
    const groups = [];
    let i = 0;
    for (i = 0; i < array.length; i += chunkSize) {
        groups.push(array.slice(i, i + chunkSize));
    }
    return groups;
};
export const lastElement = (array) => {
    return array[array.length - 1];
};
export const toMMSS = (time) => {
    if (!time) {
        return '0:00';
    }
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    const minuteString = minutes < 10 ? '0' + minutes : minutes.toString();
    const secondsString = seconds < 10 ? '0' + seconds : seconds.toString();
    return minuteString + ':' + secondsString;
};
export const clamp = (value, min, max) => {
    return min < max
        ? (value < min ? min : value > max ? max : value)
        : (value < max ? max : value > min ? min : value);
};
export const probablity = (likelihood) => {
    return Math.random() <= likelihood;
};
export const reverseArray = (array) => {
    return [...array].reverse();
};
export const makeUnique = (array) => {
    return [...new Set(array)];
};
export const delay = (millis, value) => {
    return new Promise((resolve) => setTimeout(() => resolve(value), millis));
};
export const omit = (key, object) => {
    const newObject = Object.assign({}, object);
    delete newObject[key];
    return newObject;
};
export const flattenArray = (arrays) => {
    return [].concat(...arrays);
};
/*
    Array-aware equality checker:
    Returns whether arguments a and b are == to each other;
    however if they are equal-lengthed arrays, returns whether their
    elements are pairwise === to each other recursively under this
    definition.
*/
export const arraysEqual = (lhs, rhs) => {
    if (lhs instanceof Array && rhs instanceof Array) {
        if (lhs.length !== rhs.length) {
            return false;
        }
        for (let i = 0; i < lhs.length; i++) {
            if (!arraysEqual(lhs[i], rhs[i])) {
                return false;
            }
        }
        return true;
    }
    else {
        return lhs === rhs; // if not both arrays, should be the same
    }
};
/*
    It leave elements of source array that also are contained in order array at the same indexes
*/
export const sortIntersection = (sourceArray, orderArray) => {
    if (!orderArray || sourceArray.length !== orderArray.length) {
        return sourceArray;
    }
    const result = [];
    const sourceUniqueElements = [];
    sourceArray.forEach((sourceItem) => {
        const orderIndex = orderArray.findIndex((item) => item === sourceItem);
        if (orderIndex === -1) {
            sourceUniqueElements.push(sourceItem);
        }
        else {
            result[orderIndex] = sourceItem;
        }
    });
    for (let i = 0; i < sourceArray.length; i++) {
        if (!result[i]) {
            result[i] = sourceUniqueElements.shift();
        }
    }
    return result;
};
export const sortArrayByFunction = (sourceArray, compareFunction, reverse) => {
    return sourceArray.slice().sort((a, b) => {
        const comparableA = compareFunction(a);
        const comparableB = compareFunction(b);
        if (comparableA < comparableB) {
            return reverse ? 1 : -1;
        }
        else if (comparableA > comparableB) {
            return reverse ? -1 : 1;
        }
        else {
            return 0;
        }
    });
};
export const truncate = (str, length) => {
    if (str.length > length) {
        return str.slice(0, length - 3) + '...';
    }
    return str;
};
export const reverseString = (str) => {
    return splitter.splitGraphemes(str).reverse().join('');
};
export const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
export const generateUUID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
};
export const insert = (array, index, newItem) => [
    ...array.slice(0, index),
    newItem,
    ...array.slice(index),
];
export class SafeSetInterval {
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
export const asyncJsonParse = (data) => {
    return (new Response(data)).json();
};
export const filterDictionary = (dict, filterFunction) => {
    const result = {};
    Object.keys(dict).forEach((key) => {
        const currentValue = dict[key];
        if (filterFunction(currentValue)) {
            result[key] = currentValue;
        }
    });
    return result;
};
export const isArrayUnique = (array) => array.length === new Set(array).size;
export const getHash = (inputString) => {
    return range(0, inputString.length).reduce((accum, index) => {
        return accum + inputString.charCodeAt(index);
    }, 0);
};
