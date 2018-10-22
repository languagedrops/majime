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
