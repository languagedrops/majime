import { getRandom } from './random';
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
        return removeLastElement(this);
    };
}
export const removeLastElement = (fromArray) => {
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
        return reverseArray(this);
    };
}
export const reverseArray = (array) => {
    return [...array].reverse();
};
if (!Array.prototype.insert) {
    Array.prototype.insert = function (elem, index) {
        return insert(this, index, elem);
    };
}
export const insert = (array, index, newItem) => [
    ...array.slice(0, index),
    newItem,
    ...array.slice(index),
];
if (!Array.prototype.isUnique) {
    Array.prototype.isUnique = function () {
        return isArrayUnique(this);
    };
}
export const isArrayUnique = (array) => array.length === new Set(array).size;
if (!Array.prototype.substract) {
    Array.prototype.substract = function (otherArray) {
        return substractArrays(this, otherArray);
    };
}
export const substractArrays = (a, b) => {
    return a.filter((aElement) => !b.includes(aElement));
};
if (!Array.prototype.groupBy) {
    Array.prototype.groupBy = function (keyExtractor) {
        return groupBy(this, keyExtractor);
    };
}
export const groupBy = (fromArray, keyExtractor) => {
    const groupped = {};
    fromArray.forEach((item, index) => {
        groupped[keyExtractor(item, index)] = item;
    });
    return groupped;
};
if (!Array.prototype.groupByMultipleKeys) {
    Array.prototype.groupByMultipleKeys = function (multipleKeysExtractor) {
        return groupByMultipleKeys(this, multipleKeysExtractor);
    };
}
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
if (!Array.prototype.groupByAndMap) {
    Array.prototype.groupByAndMap = function (keyExtractor, transform) {
        return groupByAndMap(this, keyExtractor, transform);
    };
}
export const groupByAndMap = (fromArray, keyExtractor, transform) => {
    const groupped = {};
    fromArray.forEach((item, index) => {
        groupped[keyExtractor(item, index)] = transform(item, index);
    });
    return groupped;
};
if (!Array.prototype.shuffle) {
    Array.prototype.shuffle = function () {
        return shuffle(this);
    };
}
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
if (!Array.prototype.randomElement) {
    Array.prototype.randomElement = function () {
        return randomElement(this);
    };
}
export const randomElement = (fromArray) => {
    return fromArray[Math.floor(Math.random() * fromArray.length)];
};
if (!Array.prototype.randomElementWithExceptions) {
    Array.prototype.randomElementWithExceptions = function (except) {
        return randomElementWithExceptions(this, except);
    };
}
export const randomElementWithExceptions = (fromArray, excludeArray) => {
    const filteredArray = substractArrays(fromArray, excludeArray);
    return randomElement(filteredArray);
};
if (!Array.prototype.randomElements) {
    Array.prototype.randomElements = function (count) {
        return randomElements(this, count);
    };
}
export const randomElements = (fromArray, count) => {
    if (count > fromArray.length) {
        throw Error('trying to get more elements than array length');
    }
    return shuffle(fromArray).slice(0, count);
};
if (!Array.prototype.firstElement) {
    Array.prototype.firstElement = function () {
        return firstElement(this);
    };
}
export const firstElement = (fromArray) => {
    return fromArray[0];
};
if (!Array.prototype.lastElement) {
    Array.prototype.lastElement = function () {
        return lastElement(this);
    };
}
export const lastElement = (array) => {
    return array[array.length - 1];
};
if (!Array.prototype.lastElements) {
    Array.prototype.lastElements = function (numberOfElements) {
        return lastElements(this, numberOfElements);
    };
}
export const lastElements = (array, numberOfElements) => {
    return array.slice(Math.max(array.length - numberOfElements, 0));
};
