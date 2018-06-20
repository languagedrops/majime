export const upperFirst = (source: string): string => {
  const [first, ...rest] = source
  return `${first.toUpperCase()}${rest.join('')}`
}

export const wordUpperFirst = (source: string): string => mapWords(source, upperFirst)

export const mapWords = (source: string, mapper: (value: string) => string): string => source
  .split(' ')
  .map(mapper)
  .join(' ')
