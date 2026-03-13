"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeArraysOfIds = exports.skipWhile = exports.takeWhile = exports.chunk = exports.sorted = exports.sortedByProperties = exports.sortedByProperty = exports.filterNull = exports.lastElements = exports.lastElement = exports.firstElement = exports.randomElements = exports.randomElementWithExceptions = exports.randomElement = exports.shuffle = exports.groupByMultipleValues = exports.groupByAndMap = exports.groupByMultipleKeys = exports.groupBy = exports.substractArrays = exports.isArrayUnique = exports.insert = exports.reverseArray = exports.uniqueByProperty = exports.removeLastElement = exports.sortIntersection = exports.arraysEqual = exports.flattenArray = void 0;
const random_1 = require("./random");
if (!Array.prototype.remove) {
    Array.prototype.remove = function (elem) {
        return this.filter((e) => e !== elem);
    };
}
if (!Array.prototype.flatten) {
    Array.prototype.flatten = function () {
        return [].concat(...this);
    };
}
const flattenArray = (arrays) => {
    return [].concat(...arrays);
};
exports.flattenArray = flattenArray;
/*
    Array-aware equality checker:
    Returns whether arguments a and b are == to each other;
    however if they are equal-lengthed arrays, returns whether their
    elements are pairwise === to each other recursively under this
    definition.
*/
const arraysEqual = (lhs, rhs) => {
    if (lhs instanceof Array && rhs instanceof Array) {
        if (lhs.length !== rhs.length) {
            return false;
        }
        for (let i = 0; i < lhs.length; i++) {
            if (!exports.arraysEqual(lhs[i], rhs[i])) {
                return false;
            }
        }
        return true;
    }
    else {
        return lhs === rhs; // if not both arrays, should be the same
    }
};
exports.arraysEqual = arraysEqual;
/*
    It leave elements of source array that also are contained in order array at the same indexes
*/
const sortIntersection = (sourceArray, orderArray) => {
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
exports.sortIntersection = sortIntersection;
if (!Array.prototype.removeLastElement) {
    Array.prototype.removeLastElement = function () {
        return exports.removeLastElement(this);
    };
}
const removeLastElement = (fromArray) => {
    if (fromArray.length === 0) {
        return fromArray;
    }
    return fromArray.slice(0, fromArray.length - 1);
};
exports.removeLastElement = removeLastElement;
if (!Array.prototype.unique) {
    Array.prototype.unique = function () {
        return [...new Set(this)];
    };
}
if (!Array.prototype.uniqueByProperty) {
    Array.prototype.uniqueByProperty = function (compareFunction) {
        return exports.uniqueByProperty(this, compareFunction);
    };
}
const uniqueByProperty = (fromArray, compareFunction) => {
    const result = [];
    fromArray.forEach((element) => {
        if (!result.some((uniqueElement) => compareFunction(uniqueElement, element))) {
            result.push(element);
        }
    });
    return result;
};
exports.uniqueByProperty = uniqueByProperty;
if (!Array.prototype.toSet) {
    Array.prototype.toSet = function () {
        return new Set(this);
    };
}
if (!Array.prototype.reversed) {
    Array.prototype.reversed = function () {
        return exports.reverseArray(this);
    };
}
const reverseArray = (array) => {
    return [...array].reverse();
};
exports.reverseArray = reverseArray;
if (!Array.prototype.insert) {
    Array.prototype.insert = function (elem, index) {
        return exports.insert(this, index, elem);
    };
}
const insert = (array, index, newItem) => [
    ...array.slice(0, index),
    newItem,
    ...array.slice(index),
];
exports.insert = insert;
if (!Array.prototype.isUnique) {
    Array.prototype.isUnique = function () {
        return exports.isArrayUnique(this);
    };
}
const isArrayUnique = (array) => array.length === new Set(array).size;
exports.isArrayUnique = isArrayUnique;
if (!Array.prototype.substract) {
    Array.prototype.substract = function (otherArray) {
        return exports.substractArrays(this, otherArray);
    };
}
const substractArrays = (a, b) => {
    return a.filter((aElement) => !b.includes(aElement));
};
exports.substractArrays = substractArrays;
if (!Array.prototype.groupBy) {
    Array.prototype.groupBy = function (keyExtractor) {
        return exports.groupBy(this, keyExtractor);
    };
}
const groupBy = (fromArray, keyExtractor) => {
    const groupped = {};
    fromArray.forEach((item, index) => {
        groupped[keyExtractor(item, index)] = item;
    });
    return groupped;
};
exports.groupBy = groupBy;
if (!Array.prototype.groupByMultipleKeys) {
    Array.prototype.groupByMultipleKeys = function (multipleKeysExtractor) {
        return exports.groupByMultipleKeys(this, multipleKeysExtractor);
    };
}
const groupByMultipleKeys = (fromArray, multipleKeysExtractor) => {
    const groupped = {};
    fromArray.forEach((item, index) => {
        const keys = multipleKeysExtractor(item, index);
        keys.forEach((currentKey) => {
            groupped[currentKey] = item;
        });
    });
    return groupped;
};
exports.groupByMultipleKeys = groupByMultipleKeys;
if (!Array.prototype.groupByAndMap) {
    Array.prototype.groupByAndMap = function (keyExtractor, transform) {
        return exports.groupByAndMap(this, keyExtractor, transform);
    };
}
const groupByAndMap = (fromArray, keyExtractor, transform) => {
    const groupped = {};
    fromArray.forEach((item, index) => {
        groupped[keyExtractor(item, index)] = transform(item, index);
    });
    return groupped;
};
exports.groupByAndMap = groupByAndMap;
if (!Array.prototype.groupByMultipleValues) {
    Array.prototype.groupByMultipleValues = function (keyExtractor) {
        return exports.groupByMultipleValues(this, keyExtractor);
    };
}
const groupByMultipleValues = (fromArray, keyExtractor) => {
    const groupped = {};
    fromArray.forEach((item, index) => {
        const key = keyExtractor(item, index);
        groupped[key] = [...(groupped[key] || []), item];
    });
    return groupped;
};
exports.groupByMultipleValues = groupByMultipleValues;
if (!Array.prototype.shuffle) {
    Array.prototype.shuffle = function () {
        return exports.shuffle(this);
    };
}
const shuffle = (array) => {
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
        const randomChoiceIndex = random_1.getRandom(i, newArray.length - 1);
        const temp = newArray[i];
        newArray[i] = newArray[randomChoiceIndex];
        newArray[randomChoiceIndex] = temp;
    }
    return newArray;
};
exports.shuffle = shuffle;
if (!Array.prototype.randomElement) {
    Array.prototype.randomElement = function () {
        return exports.randomElement(this);
    };
}
const randomElement = (fromArray) => {
    return fromArray[Math.floor(Math.random() * fromArray.length)];
};
exports.randomElement = randomElement;
if (!Array.prototype.randomElementWithExceptions) {
    Array.prototype.randomElementWithExceptions = function (except) {
        return exports.randomElementWithExceptions(this, except);
    };
}
const randomElementWithExceptions = (fromArray, excludeArray) => {
    const filteredArray = exports.substractArrays(fromArray, excludeArray);
    return exports.randomElement(filteredArray);
};
exports.randomElementWithExceptions = randomElementWithExceptions;
if (!Array.prototype.randomElements) {
    Array.prototype.randomElements = function (count, safeExecution) {
        return exports.randomElements(this, count, safeExecution);
    };
}
const randomElements = (fromArray, count, safeExecution) => {
    if (count > fromArray.length && !safeExecution) {
        throw Error('trying to get more elements than array length');
    }
    return exports.shuffle(fromArray).slice(0, count);
};
exports.randomElements = randomElements;
if (!Array.prototype.firstElement) {
    Array.prototype.firstElement = function () {
        return exports.firstElement(this);
    };
}
const firstElement = (fromArray) => {
    return fromArray[0];
};
exports.firstElement = firstElement;
if (!Array.prototype.lastElement) {
    Array.prototype.lastElement = function () {
        return exports.lastElement(this);
    };
}
const lastElement = (array) => {
    return array[array.length - 1];
};
exports.lastElement = lastElement;
if (!Array.prototype.lastElements) {
    Array.prototype.lastElements = function (numberOfElements) {
        return exports.lastElements(this, numberOfElements);
    };
}
const lastElements = (array, numberOfElements) => {
    return array.slice(Math.max(array.length - numberOfElements, 0));
};
exports.lastElements = lastElements;
if (!Array.prototype.filterNull) {
    Array.prototype.filterNull = function () {
        return exports.filterNull(this);
    };
}
const filterNull = (array) => {
    return array.filter((elem) => elem != null);
};
exports.filterNull = filterNull;
if (!Array.prototype.sortedByProperty) {
    Array.prototype.sortedByProperty = function (compareFunction, reverse) {
        return exports.sortedByProperty(this, compareFunction, reverse);
    };
}
const sortedByProperty = (sourceArray, compareFunction, reverse) => {
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
exports.sortedByProperty = sortedByProperty;
if (!Array.prototype.sortedByProperties) {
    Array.prototype.sortedByProperties = function (...args) {
        return exports.sortedByProperties(this, ...args);
    };
}
const compareTwoElemntsWithDepth = (depth, compareFunctionList, elementA, elementB) => {
    if (depth === compareFunctionList.length) {
        return 0;
    }
    const { compareFunction, reverse } = compareFunctionList[depth];
    const comparableA = compareFunction(elementA);
    const comparableB = compareFunction(elementB);
    if (comparableA < comparableB) {
        return reverse ? 1 : -1;
    }
    else if (comparableA > comparableB) {
        return reverse ? -1 : 1;
    }
    else {
        return compareTwoElemntsWithDepth(depth + 1, compareFunctionList, elementA, elementB);
    }
};
const sortedByProperties = (sourceArray, ...args) => {
    return sourceArray.slice().sort((a, b) => {
        return compareTwoElemntsWithDepth(0, args, a, b);
    });
};
exports.sortedByProperties = sortedByProperties;
if (!Array.prototype.sorted) {
    Array.prototype.sorted = function (compareFunction) {
        return exports.sorted(this, compareFunction);
    };
}
const sorted = (sourceArray, compareFunction) => {
    return sourceArray.slice().sort(compareFunction);
};
exports.sorted = sorted;
if (!Array.prototype.chunk) {
    Array.prototype.chunk = function (chunkSize) {
        return exports.chunk(chunkSize, this);
    };
}
const chunk = (chunkSize, array) => {
    const groups = [];
    let i = 0;
    for (i = 0; i < array.length; i += chunkSize) {
        groups.push(array.slice(i, i + chunkSize));
    }
    return groups;
};
exports.chunk = chunk;
if (!Array.prototype.takeWhile) {
    Array.prototype.takeWhile = function (filterFunction, reverse) {
        return exports.takeWhile(this, filterFunction, reverse);
    };
}
const takeWhile = (inputArray, filterFunction, reverse) => {
    const array = reverse ? inputArray.slice().reverse() : inputArray.slice();
    const findIndex = array.findIndex((element, index) => !filterFunction(element, index));
    const endIndex = findIndex === -1 ? undefined : findIndex;
    const result = array.slice(0, endIndex);
    return reverse ? result.reverse() : result;
};
exports.takeWhile = takeWhile;
if (!Array.prototype.skipWhile) {
    Array.prototype.skipWhile = function (filterFunction, reverse) {
        return exports.skipWhile(this, filterFunction, reverse);
    };
}
const skipWhile = (inputArray, filterFunction, reverse) => {
    const array = reverse ? inputArray.slice().reverse() : inputArray.slice();
    const findIndex = array.findIndex((element, index) => !filterFunction(element, index));
    if (findIndex === -1) {
        return [];
    }
    const result = array.slice(findIndex);
    return reverse ? result.reverse() : result;
};
exports.skipWhile = skipWhile;
const mergeArraysOfIds = (firstArray, secondArray) => {
    // it uses imperative code because in this case it's more appropriate. We have tests that cover functionality
    const result = [];
    let firstArrayIndex = 0;
    let secondArrayIndex = 0;
    while (firstArrayIndex < firstArray.length || secondArrayIndex < secondArray.length) {
        if (firstArray[firstArrayIndex] === secondArray[secondArrayIndex]) {
            result.push(firstArray[firstArrayIndex]);
            firstArrayIndex++;
            secondArrayIndex++;
        }
        else if (firstArray[firstArrayIndex] != null && !secondArray.slice(secondArrayIndex).includes(firstArray[firstArrayIndex])) {
            result.push(firstArray[firstArrayIndex]);
            firstArrayIndex++;
        }
        else if (secondArray[secondArrayIndex] != null) {
            result.push(secondArray[secondArrayIndex]);
            secondArrayIndex++;
        }
    }
    return result.unique();
};
exports.mergeArraysOfIds = mergeArraysOfIds;
