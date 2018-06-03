export const getRandom = (floor, ceiling) => {
    return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
};
// expects a number between 0-1
export const getRandomBoolean = (weight) => {
    return getRandom(1, 10000) < (weight || 0.5) * 10000;
};
