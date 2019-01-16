
export const mapKeys = <T>(input: { [keys: string]: T}, keyTransformer: (key: string) => string): {[keys: string]: T} => {
  const newMap: {[keys: string]: T} = {}
  Object.keys(input)
    .forEach( (key) => {
      const newKey = keyTransformer(key)
      if (!!newKey) {
        newMap[newKey] = input[key]
      }
    })
  return newMap
}

export const mapValues = <T, U>(input: { [keys: string]: T}, valueTransformer: (value: T) => U, filterValues?: true): {[keys: string]: U} => {
  const newMap: {[keys: string]: U} = {}
  Object.keys(input)
    .forEach( (key) => {
      const newValue = valueTransformer(input[key])
      if (!!newValue || !filterValues) {
        newMap[key] = newValue
      }
    })
  return newMap
}

export const mapKeysAndValues = <T, U>(input: { [keys: string]: T}, valueTransformer: (key: string, value: T) => U, filterValues?: true): {[keys: string]: U} => {
  const newMap: {[keys: string]: U} = {}
  Object.keys(input)
    .forEach( (key) => {
      const newValue = valueTransformer(key, input[key])
      if (!!newValue || !filterValues) {
        newMap[key] = newValue
      }
    })
  return newMap
}
