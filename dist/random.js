"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const standard_1 = require("./standard");
exports.getRandom = (floor, ceiling) => {
    return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
};
exports.getRandomWithExceptions = (floor, ceiling, exceptions) => {
    const potentialResults = standard_1.range(floor, ceiling);
    const filteredResults = potentialResults.filter((result) => !exceptions.includes(result));
    return filteredResults.randomElement();
};
// expects a number between 0-1
exports.getRandomBoolean = (weight) => {
    return exports.getRandom(1, 10000) < (weight || 0.5) * 10000;
};
