export const upperFirst = (source: string): string => {
  if (!source) { return source }
  const [first, ...rest] = source
  return `${first.toUpperCase()}${rest.join('')}`
}

export const lowerFirst = (source: string): string => {
  if (!source) { return source }
  const [first, ...rest] = source
  return `${first.toLowerCase()}${rest.join('')}`
}

export const wordUpperFirst = (source: string): string => mapWords(source, upperFirst)

export const mapWords = (source: string, mapper: (value: string) => string): string => source
  .split(' ')
  .map(mapper)
  .join(' ')
