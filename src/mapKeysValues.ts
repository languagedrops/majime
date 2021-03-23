
export const mapKeys = <T>(input: { [keys: string]: T}, keyTransformer: (key: string) => string): {[keys: string]: T} => {
  const newMap: {[keys: string]: T} = {}
  Object.keys(input)
    .forEach( (key) => {
      const newKey = keyTransformer(key)
      newMap[newKey] = input[key]
    })
  return newMap
}

type IfTrueThenNotNull<BoolOrNothing extends boolean | undefined, R> = BoolOrNothing extends true ? Exclude<R, null | undefined> : R

export const mapValues = <T, U, V extends boolean | undefined>(input: { [keys: string]: T}, valueTransformer: (value: T) => U, filterValues?: V): {[keys: string]: IfTrueThenNotNull<V, U> } => {
  const newMap: {[keys: string]: IfTrueThenNotNull<V, U> } = {}
  Object.keys(input)
    .forEach( (key) => {
      const newValue = valueTransformer(input[key])
      if (!!newValue || !filterValues) {
        newMap[key] = newValue as IfTrueThenNotNull<V, U>
      }
    })
  return newMap
}

export const mapKeysAndValues = <T, U, V extends boolean | undefined>(input: { [keys: string]: T}, valueTransformer: (key: string, value: T) => U, filterValues?: true): {[keys: string]: IfTrueThenNotNull<V, U> } => {
  const newMap: {[keys: string]: IfTrueThenNotNull<V, U> } = {}
  Object.keys(input)
    .forEach( (key) => {
      const newValue = valueTransformer(key, input[key])
      if (!!newValue || !filterValues) {
        newMap[key] = newValue as IfTrueThenNotNull<V, U>
      }
    })
  return newMap
}

export const extractKeysAndValues = <T, K extends keyof T>(input: T): Array<{ readonly key: K, readonly value: T[K] }> => {
  return Object.keys(input)
  .map( (key) => ({ key: key as K, value: (input as any)[key] as T[K] }))
}


export const invertObjectKeysAndValues = <T extends string, U extends string>(input: { [key: string]: T }): { [key: string]: U } => {
  const newMap: { [key: string]: U } = {}
  Object.keys(input).forEach((inputKey: string) => {
    const newKey: string = input[inputKey]
    newMap[newKey] = inputKey as U
  })
  return newMap
}
