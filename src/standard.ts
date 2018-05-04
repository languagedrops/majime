import GraphemeSplitter from 'grapheme-splitter'

const splitter = new GraphemeSplitter()


export const randomElement = <T>(fromArray: T[]): T => {
  return fromArray[Math.floor(Math.random() * fromArray.length)]
}

export const randomElementWithExceptions = <T>(fromArray: T[], excludeArray: T[]) => {
  const filteredArray = substractArrays(fromArray, excludeArray)
  return randomElement(filteredArray)
}

export const substractArrays = <T>(a: T[], b: T[]): T[] => {
  return a.filter((aElement) => !b.includes(aElement))
}

export const randomElements = <T>(fromArray: T[], count: number): T[] => {
  if (count > fromArray.length) { throw Error('trying to get more elements than array length') }
  return shuffle(fromArray).slice(0, count)
}

export const firstElement = <T>(fromArray: T[]): T => {
  return fromArray[0]
}

export const isNull = (item: any): boolean => {
  return item === null || item === undefined
}

export const groupBy = <T>(fromArray: T[], keyExtractor: (item: T, index: number) => string): {[key: string]: T } => {
  const groupped: {[key: string]: T } = {}
  fromArray.forEach( (item, index) => {
    groupped[keyExtractor(item, index)] = item
  })
  return groupped
}

export const groupByMultipleKeys = <T>(fromArray: T[], multipleKeysExtractor: (item: T, index: number) => string[]): {[key: string]: T } => {
  const groupped: {[key: string]: T } = {}
  fromArray.forEach( (item, index) => {
    const keys = multipleKeysExtractor(item, index)
    keys.forEach((currentKey) => {
      groupped[currentKey] = item
    })
  })
  return groupped
}

export const groupByAndMap = <T, U>(fromArray: T[], keyExtractor: (item: T, index: number) => string, transform: (item: T, index: number) => U): {[key: string]: U } => {
  const groupped: {[key: string]: U } = {}
  fromArray.forEach( (item, index) => {
    groupped[keyExtractor(item, index)] = transform(item, index)
  })
  return groupped
}



export const removeLastElement = <T>(fromArray: T[]): T[] => {
  if (fromArray.length === 0) {
    return fromArray
  }
  return fromArray.slice(0, fromArray.length - 1)
}

export const shuffle = <T>(array: T[]): T[] => {
  // if it's 1 or 0 items, just return
  if (array.length <= 1) {
    return array
  }

  const newArray = array.slice()

  // For each index in array
  for (let i = 0; i < newArray.length; i++) {

    // choose a random not-yet-placed item to place there
    // must be an item AFTER the current item, because the stuff
    // before has all already been placed
    const randomChoiceIndex = getRandom(i, newArray.length - 1)

    const temp = newArray[i]
    newArray[i] = newArray[randomChoiceIndex]
    newArray[randomChoiceIndex] = temp
  }

  return newArray
}

export const getRandom = (floor: number, ceiling: number): number => {
  return Math.floor(Math.random() * (ceiling - floor + 1)) + floor
}


// expects a number between 0-1
export const getRandomBoolean = (weight?: number): boolean => {
  return getRandom(1, 10000) < (weight || 0.5) * 10000
}

export const range = (start: number, limit: number): number[] => {
  return Array.apply(null, { length: limit })
    .map((_: any, index: number) => {
      return index + start
    })
}

export const chunk = <T>(chunkSize: number, array: T[]): T[][] => {
  const groups: T[][] = []
  let i = 0
  for (i = 0; i < array.length; i += chunkSize) {
    groups.push(array.slice(i, i + chunkSize))
  }
  return groups
}

export const lastElement = <T>(array: T[]): T => {
  return array[array.length - 1]
}

export const toMMSS = (time: number) => {
  if (!time) {
    return '0:00'
  }
  const minutes = Math.floor(time / 60)
  const seconds = time - minutes * 60

  const minuteString = minutes < 10 ? '0' + minutes : minutes.toString()
  const secondsString = seconds < 10 ? '0' + seconds : seconds.toString()

  return minuteString + ':' + secondsString
}

export const clamp = (value: number, min: number, max: number): number => {
  return min < max
    ? (value < min ? min : value > max ? max : value)
    : (value < max ? max : value > min ? min : value)
}

export const probablity = (likelihood: number) => {
  return Math.random() <= likelihood
}

export const reverseArray = <T>(array: T[]): T[] => {
  return [...array].reverse()
}

export const makeUnique = <T>(array: T[]): T[] => {
  return [...new Set(array)]
}

export const delay = <T>(millis: number, value?: T): Promise<T> => {
  return new Promise((resolve) => setTimeout( () => resolve(value) , millis) )
}

export const omit = (key: string, object: object): object => {
  const newObject = { ...object }
  delete (newObject as any)[key]
  return newObject
}

export const flattenArray = <T>(arrays: T[][]): T[] => {
  return ([] as T[]).concat(...arrays)
}

/*
    Array-aware equality checker:
    Returns whether arguments a and b are == to each other;
    however if they are equal-lengthed arrays, returns whether their
    elements are pairwise === to each other recursively under this
    definition.
*/

export const arraysEqual = <T>(lhs: T[], rhs: T[]): boolean => {

    if (lhs instanceof Array && rhs instanceof Array) {
      if (lhs.length !== rhs.length) { return false }
      for (let i = 0; i < lhs.length; i++) {
        if (!arraysEqual((lhs as any)[i], (rhs as any)[i])) {
          return false
        }
      }
      return true
  } else {
    return lhs === rhs  // if not both arrays, should be the same
  }
}

/*
    It leave elements of source array that also are contained in order array at the same indexes
*/

export const sortIntersection = <T>(sourceArray: T[], orderArray?: T[]): T[] => {
  if (!orderArray || sourceArray.length !== orderArray.length) {
    return sourceArray
  }

  const result: T[] = []
  const sourceUniqueElements: T[] = []

  sourceArray.forEach((sourceItem) => {
    const orderIndex = orderArray.findIndex((item) => item === sourceItem)
    if (orderIndex === -1) {
      sourceUniqueElements.push(sourceItem)
    } else {
      result[orderIndex] = sourceItem
    }
  })

  for (let i = 0; i < sourceArray.length; i++) {
    if (!result[i]) {
      result[i] = sourceUniqueElements.shift() as T
    }
  }

  return result
}

export const sortArrayByFunction = <T>(sourceArray: T[], compareFunction: (element: T) => number | string, reverse?: boolean ) => {
  return sourceArray.slice().sort((a, b) => {
    const comparableA = compareFunction(a)
    const comparableB = compareFunction(b)
    if (comparableA < comparableB) {
      return reverse ? 1 : -1
    } else if (comparableA > comparableB) {
      return reverse ? -1 : 1
    } else {
      return 0
    }
  })
}

export const truncate = (str: string, length: number) => {
  if (str.length > length) {
    return str.slice(0, length - 3) + '...'
  }
  return str
}

export const reverseString = (str: string) => {
  return splitter.splitGraphemes(str).reverse().join('')
}

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const generateUUID = (): string => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4()
}

export const insert = <T>(array: T[], index: number, newItem: T): T[] => [
  ...array.slice(0, index),
  newItem,
  ...array.slice(index),
]

export class SafeSetInterval {
  private timer: any = null

  public start = (handler: () => void, milliseconds: number) => {
    if (!this.isRunning()) {
      this.timer = setInterval(handler, milliseconds)
    }
  }

  public stop = () => {
    clearInterval(this.timer)
    this.timer = null
  }

  private isRunning = () => this.timer !== null
}

export const asyncJsonParse = (data: string) => {
  return (new Response(data)).json()
}

export const filterDictionary = <T>(dict: {[key: string]: T}, filterFunction: (element: T) => boolean) => {
  const result: {[key: string]: T} = {}

  Object.keys(dict).forEach((key) => {
    const currentValue = dict[key]
    if (filterFunction(currentValue)) {
      result[key] = currentValue
    }
  })

  return result
}

export const isArrayUnique = <T>(array: T[]): boolean => array.length === new Set(array).size
