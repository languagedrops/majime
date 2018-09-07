"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandom = (floor, ceiling) => {
    return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
};
// expects a number between 0-1
exports.getRandomBoolean = (weight) => {
    return exports.getRandom(1, 10000) < (weight || 0.5) * 10000;
};
