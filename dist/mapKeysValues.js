export const mapKeys = (input, keyTransformer) => {
    const newMap = {};
    Object.keys(input)
        .forEach((key) => {
        const newKey = keyTransformer(key);
        newMap[newKey] = input[key];
    });
    return newMap;
};
export const mapValues = (input, valueTransformer) => {
    const newMap = {};
    Object.keys(input)
        .forEach((key) => {
        newMap[key] = valueTransformer(input[key]);
    });
    return newMap;
};
