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
export const substractArrays = (a, b) => {
    return a.filter((aElement) => !b.includes(aElement));
};
