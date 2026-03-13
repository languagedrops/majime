"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomWeightedElement = void 0;
const random_1 = require("./random");
const getRandomWeightedElement = (fromArray) => {
    if (fromArray.length === 0) {
        return null;
    }
    else if (fromArray.length === 1) {
        return fromArray[0].element;
    }
    const maximum = fromArray.reduce((accum, item) => accum + item.weight, 0);
    const random = random_1.getRandom(0, maximum * 100) / 100;
    const initialAccum = {
        output: [],
        currentAccumulatedWeight: 0,
    };
    const elementsAndAccumWeight = fromArray
        .reduce((accum, item) => {
        const currentAccumulatedWeight = accum.currentAccumulatedWeight + item.weight;
        return {
            currentAccumulatedWeight,
            output: [...accum.output, { element: item.element, accumulatedWeight: currentAccumulatedWeight }],
        };
    }, initialAccum);
    const pickedItem = elementsAndAccumWeight.output.find((item) => item.accumulatedWeight >= random);
    return pickedItem && pickedItem.element || null;
};
exports.getRandomWeightedElement = getRandomWeightedElement;
