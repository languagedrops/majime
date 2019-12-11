"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.flattenArray = (arrays) => {
    return [].concat(...arrays);
};
/*
    Array-aware equality checker:
    Returns whether arguments a and b are == to each other;
    however if they are equal-lengthed arrays, returns whether their
    elements are pairwise === to each other recursively under this
    definition.
*/
exports.arraysEqual = (lhs, rhs) => {
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
/*
    It leave elements of source array that also are contained in order array at the same indexes
*/
exports.sortIntersection = (sourceArray, orderArray) => {
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
if (!Array.prototype.removeLastElement) {
    Array.prototype.removeLastElement = function () {
        return exports.removeLastElement(this);
    };
}
exports.removeLastElement = (fromArray) => {
    if (fromArray.length === 0) {
        return fromArray;
    }
    return fromArray.slice(0, fromArray.length - 1);
};
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
exports.uniqueByProperty = (fromArray, compareFunction) => {
    const result = [];
    fromArray.forEach((element) => {
        if (!result.some((uniqueElement) => compareFunction(uniqueElement, element))) {
            result.push(element);
        }
    });
    return result;
};
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
exports.reverseArray = (array) => {
    return [...array].reverse();
};
if (!Array.prototype.insert) {
    Array.prototype.insert = function (elem, index) {
        return exports.insert(this, index, elem);
    };
}
exports.insert = (array, index, newItem) => [
    ...array.slice(0, index),
    newItem,
    ...array.slice(index),
];
if (!Array.prototype.isUnique) {
    Array.prototype.isUnique = function () {
        return exports.isArrayUnique(this);
    };
}
exports.isArrayUnique = (array) => array.length === new Set(array).size;
if (!Array.prototype.substract) {
    Array.prototype.substract = function (otherArray) {
        return exports.substractArrays(this, otherArray);
    };
}
exports.substractArrays = (a, b) => {
    return a.filter((aElement) => !b.includes(aElement));
};
if (!Array.prototype.groupBy) {
    Array.prototype.groupBy = function (keyExtractor) {
        return exports.groupBy(this, keyExtractor);
    };
}
exports.groupBy = (fromArray, keyExtractor) => {
    const groupped = {};
    fromArray.forEach((item, index) => {
        groupped[keyExtractor(item, index)] = item;
    });
    return groupped;
};
if (!Array.prototype.groupByMultipleKeys) {
    Array.prototype.groupByMultipleKeys = function (multipleKeysExtractor) {
        return exports.groupByMultipleKeys(this, multipleKeysExtractor);
    };
}
exports.groupByMultipleKeys = (fromArray, multipleKeysExtractor) => {
    const groupped = {};
    fromArray.forEach((item, index) => {
        const keys = multipleKeysExtractor(item, index);
        keys.forEach((currentKey) => {
            groupped[currentKey] = item;
        });
    });
    return groupped;
};
if (!Array.prototype.groupByAndMap) {
    Array.prototype.groupByAndMap = function (keyExtractor, transform) {
        return exports.groupByAndMap(this, keyExtractor, transform);
    };
}
exports.groupByAndMap = (fromArray, keyExtractor, transform) => {
    const groupped = {};
    fromArray.forEach((item, index) => {
        groupped[keyExtractor(item, index)] = transform(item, index);
    });
    return groupped;
};
if (!Array.prototype.groupByMultipleValues) {
    Array.prototype.groupByMultipleValues = function (keyExtractor) {
        return exports.groupByMultipleValues(this, keyExtractor);
    };
}
exports.groupByMultipleValues = (fromArray, keyExtractor) => {
    const groupped = {};
    fromArray.forEach((item, index) => {
        const key = keyExtractor(item, index);
        groupped[key] = [...(groupped[key] || []), item];
    });
    return groupped;
};
if (!Array.prototype.shuffle) {
    Array.prototype.shuffle = function () {
        return exports.shuffle(this);
    };
}
exports.shuffle = (array) => {
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
if (!Array.prototype.randomElement) {
    Array.prototype.randomElement = function () {
        return exports.randomElement(this);
    };
}
exports.randomElement = (fromArray) => {
    return fromArray[Math.floor(Math.random() * fromArray.length)];
};
if (!Array.prototype.randomElementWithExceptions) {
    Array.prototype.randomElementWithExceptions = function (except) {
        return exports.randomElementWithExceptions(this, except);
    };
}
exports.randomElementWithExceptions = (fromArray, excludeArray) => {
    const filteredArray = exports.substractArrays(fromArray, excludeArray);
    return exports.randomElement(filteredArray);
};
if (!Array.prototype.randomElements) {
    Array.prototype.randomElements = function (count) {
        return exports.randomElements(this, count);
    };
}
exports.randomElements = (fromArray, count) => {
    if (count > fromArray.length) {
        throw Error('trying to get more elements than array length');
    }
    return exports.shuffle(fromArray).slice(0, count);
};
if (!Array.prototype.firstElement) {
    Array.prototype.firstElement = function () {
        return exports.firstElement(this);
    };
}
exports.firstElement = (fromArray) => {
    return fromArray[0];
};
if (!Array.prototype.lastElement) {
    Array.prototype.lastElement = function () {
        return exports.lastElement(this);
    };
}
exports.lastElement = (array) => {
    return array[array.length - 1];
};
if (!Array.prototype.lastElements) {
    Array.prototype.lastElements = function (numberOfElements) {
        return exports.lastElements(this, numberOfElements);
    };
}
exports.lastElements = (array, numberOfElements) => {
    return array.slice(Math.max(array.length - numberOfElements, 0));
};
if (!Array.prototype.filterNull) {
    Array.prototype.filterNull = function () {
        return exports.filterNull(this);
    };
}
exports.filterNull = (array) => {
    return array.filter((elem) => elem != null);
};
if (!Array.prototype.sortedByProperty) {
    Array.prototype.sortedByProperty = function (compareFunction, reverse) {
        return exports.sortedByProperty(this, compareFunction, reverse);
    };
}
exports.sortedByProperty = (sourceArray, compareFunction, reverse) => {
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
if (!Array.prototype.sorted) {
    Array.prototype.sorted = function (compareFunction) {
        return exports.sorted(this, compareFunction);
    };
}
exports.sorted = (sourceArray, compareFunction) => {
    return sourceArray.slice().sort(compareFunction);
};
if (!Array.prototype.chunk) {
    Array.prototype.chunk = function (chunkSize) {
        return exports.chunk(chunkSize, this);
    };
}
exports.chunk = (chunkSize, array) => {
    const groups = [];
    let i = 0;
    for (i = 0; i < array.length; i += chunkSize) {
        groups.push(array.slice(i, i + chunkSize));
    }
    return groups;
};
if (!Array.prototype.takeWhile) {
    Array.prototype.takeWhile = function (filterFunction, reverse) {
        return exports.takeWhile(this, filterFunction, reverse);
    };
}
exports.takeWhile = (inputArray, filterFunction, reverse) => {
    const array = reverse ? inputArray.slice().reverse() : inputArray.slice();
    const findIndex = array.findIndex((element, index) => !filterFunction(element, index));
    const endIndex = findIndex === -1 ? undefined : findIndex;
    return array.slice(0, endIndex);
};
exports.mergeArrays = (firstArray, secondArray) => {
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
if (!Array.prototype.mergeWith) {
    Array.prototype.mergeWith = function (seccondArray) {
        return exports.mergeArrays(this, seccondArray);
    };
}
