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
        if (this.length === 0) {
            return this;
        }
        return this.slice(0, this.length - 1);
    };
}
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
        return [...this].reverse();
    };
}
export const reverseArray = (array) => {
    return [...array].reverse();
};
if (!Array.prototype.insert) {
    Array.prototype.insert = function (elem, index) {
        return [
            ...this.slice(0, index),
            elem,
            ...this.slice(index),
        ];
    };
}
export const insert = (array, index, newItem) => [
    ...array.slice(0, index),
    newItem,
    ...array.slice(index),
];
if (!Array.prototype.isUnique) {
    Array.prototype.isUnique = function () {
        return this.length === new Set(this).size;
    };
}
export const isArrayUnique = (array) => array.length === new Set(array).size;
if (!Array.prototype.substract) {
    Array.prototype.substract = function (otherArray) {
        return this.filter((aElement) => !otherArray.includes(aElement));
    };
}
export const substractArrays = (a, b) => {
    return a.filter((aElement) => !b.includes(aElement));
};
