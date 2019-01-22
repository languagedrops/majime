"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandom = (floor, ceiling) => {
    return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
};
exports.getRandomWithExceptions = (floor, ceiling, exceptions) => {
    const potentialExceptions = exceptions.filter((exception) => floor <= exception && exception <= ceiling);
    if (ceiling - floor <= potentialExceptions.length) {
        return undefined;
    }
    const random = exports.getRandom(floor, ceiling);
    if (exceptions.includes(random)) {
        return exports.getRandomWithExceptions(floor, ceiling, exceptions);
    }
    return random;
};
// expects a number between 0-1
exports.getRandomBoolean = (weight) => {
    return exports.getRandom(1, 10000) < (weight || 0.5) * 10000;
};
