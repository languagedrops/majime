
export const mapKeys = <T>(input: { [keys: string]: T}, keyTransformer: (key: string) => string): {[keys: string]: T} => {
  const newMap: {[keys: string]: T} = {}
  Object.keys(input)
    .forEach( (key) => {
      const newKey = keyTransformer(key)
      newMap[newKey] = input[key]
    })
  return newMap
}

export const mapValues = <T, U>(input: { [keys: string]: T}, valueTransformer: (value: T) => U): {[keys: string]: U} => {
  const newMap: {[keys: string]: U} = {}
  Object.keys(input)
    .forEach( (key) => {
      newMap[key] = valueTransformer(input[key])
    })
  return newMap
}
