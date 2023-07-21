"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomBoolean = exports.getRandomWithExceptions = exports.getRandom = void 0;
const getRandom = (floor, ceiling) => {
    return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
};
exports.getRandom = getRandom;
const getRandomWithExceptions = (floor, ceiling, exceptions) => {
    const potentialExceptions = exceptions.filter((exception) => floor <= exception && exception <= ceiling);
    if (ceiling - floor <= potentialExceptions.length) {
        return undefined;
    }
    const random = (0, exports.getRandom)(floor, ceiling);
    if (exceptions.includes(random)) {
        return (0, exports.getRandomWithExceptions)(floor, ceiling, exceptions);
    }
    return random;
};
exports.getRandomWithExceptions = getRandomWithExceptions;
// expects a number between 0-1
const getRandomBoolean = (weight) => {
    return (0, exports.getRandom)(1, 10000) < (weight || 0.5) * 10000;
};
exports.getRandomBoolean = getRandomBoolean;
