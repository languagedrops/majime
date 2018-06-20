export const upperFirst = (source) => {
    if (!source) {
        return source;
    }
    const [first, ...rest] = source;
    return `${first.toUpperCase()}${rest.join('')}`;
};
export const wordUpperFirst = (source) => mapWords(source, upperFirst);
export const mapWords = (source, mapper) => source
    .split(' ')
    .map(mapper)
    .join(' ');
