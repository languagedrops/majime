import { getRandom } from './random'


declare global {
  interface Array<T> {
    remove(elem: T): T[]
    flatten(): T
    removeLastElement(): T[]
    unique(): T[]
    toSet(): Set<T>
    reversed(): T[]
    insert(elem: T, index: number): T[]
    isUnique(): boolean
    substract(otherArray: T[]): T[]
    groupBy(keyExtractor: (item: T, index: number) => string): {[key: string]: T }
    groupByMultipleKeys(multipleKeysExtractor: (item: T, index: number) => string[]): {[key: string]: T }
    groupByAndMap<U>(keyExtractor: (item: T, index: number) => string, transform: (item: T, index: number) => U): {[key: string]: U }
    groupByMultipleValues(keyExtractor: (item: T, index: number) => string): {[key: string]: T[] }
    shuffle(): T[]
    randomElement(): T
    randomElementWithExceptions(except: T[]): T
    randomElements(count: number): T[]
    firstElement(): T
    lastElement(): T
    lastElements(numberOfElements: number): T[]
    filterNull(): Array<Exclude<T, null | undefined>>
    sortedByProperty(compareFunction: (element: T) => number | string | Date, reverse?: boolean ): T[]
    chunk(chunkSize: number): T[][]
    takeWhile(filterFunction: (element: T) => boolean, reverse?: boolean): T[]
  }
}


if (!Array.prototype.remove) {
  Array.prototype.remove = function<T>(elem: T): T[] {
    return this.filter((e) => e !== elem)
  }
}

if (!Array.prototype.flatten) {
  Array.prototype.flatten = function<T>(): T {
    return [].concat(...this) as any
  }
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

if (!Array.prototype.removeLastElement) {
  Array.prototype.removeLastElement = function<T>(): T[] {
    return removeLastElement(this)
  }
}

export const removeLastElement = <T>(fromArray: T[]): T[] => {
  if (fromArray.length === 0) {
    return fromArray
  }
  return fromArray.slice(0, fromArray.length - 1)
}

if (!Array.prototype.unique) {
  Array.prototype.unique = function<T>(): T[] {
    return [...new Set(this)]
  }
}

if (!Array.prototype.toSet) {
  Array.prototype.toSet = function<T>(): Set<T> {
    return new Set(this)
  }
}

if (!Array.prototype.reversed) {
  Array.prototype.reversed = function<T>(): T[] {
    return reverseArray(this)
  }
}

export const reverseArray = <T>(array: T[]): T[] => {
  return [...array].reverse()
}

if (!Array.prototype.insert) {
  Array.prototype.insert = function<T>(elem: T, index: number): T[] {
    return insert(this, index, elem)
  }
}


export const insert = <T>(array: T[], index: number, newItem: T): T[] => [
  ...array.slice(0, index),
  newItem,
  ...array.slice(index),
]

if (!Array.prototype.isUnique) {
  Array.prototype.isUnique = function(): boolean {
    return isArrayUnique(this)
  }
}

export const isArrayUnique = <T>(array: T[]): boolean => array.length === new Set(array).size


if (!Array.prototype.substract) {
  Array.prototype.substract = function<T>(otherArray: T[]): T[] {
    return substractArrays(this, otherArray)
  }
}

export const substractArrays = <T>(a: T[], b: T[]): T[] => {
  return a.filter((aElement) => !b.includes(aElement))
}

if (!Array.prototype.groupBy) {
  Array.prototype.groupBy = function<T>(keyExtractor: (item: T, index: number) => string): {[key: string]: T } {
    return groupBy(this, keyExtractor)
  }
}


export const groupBy = <T>(fromArray: T[], keyExtractor: (item: T, index: number) => string): {[key: string]: T } => {
  const groupped: {[key: string]: T } = {}
  fromArray.forEach( (item, index) => {
    groupped[keyExtractor(item, index)] = item
  })
  return groupped
}

if (!Array.prototype.groupByMultipleKeys) {
  Array.prototype.groupByMultipleKeys = function<T>(multipleKeysExtractor: (item: T, index: number) => string[]): {[key: string]: T } {
    return groupByMultipleKeys(this, multipleKeysExtractor)
  }
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

if (!Array.prototype.groupByAndMap) {
  Array.prototype.groupByAndMap = function<T, U>(keyExtractor: (item: T, index: number) => string, transform: (item: T, index: number) => U): {[key: string]: U } {
    return groupByAndMap(this, keyExtractor, transform)
  }
}

export const groupByAndMap = <T, U>(fromArray: T[], keyExtractor: (item: T, index: number) => string, transform: (item: T, index: number) => U): {[key: string]: U } => {
  const groupped: {[key: string]: U } = {}
  fromArray.forEach( (item, index) => {
    groupped[keyExtractor(item, index)] = transform(item, index)
  })
  return groupped
}

if (!Array.prototype.groupByMultipleValues) {
  Array.prototype.groupByMultipleValues = function<T>(keyExtractor: (item: T, index: number) => string): {[key: string]: T[] } {
    return groupByMultipleValues(this, keyExtractor)
  }
}


export const groupByMultipleValues = <T>(fromArray: T[], keyExtractor: (item: T, index: number) => string): {[key: string]: T[] } => {
  const groupped: {[key: string]: T[] } = {}
  fromArray.forEach( (item, index) => {
    const key = keyExtractor(item, index)
    groupped[key] = [...(groupped[key] || []), item]
  })
  return groupped
}

if (!Array.prototype.shuffle) {
  Array.prototype.shuffle = function<T>(): T[] {
    return shuffle(this)
  }
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

if (!Array.prototype.randomElement) {
  Array.prototype.randomElement = function<T>(): T {
    return randomElement(this)
  }
}

export const randomElement = <T>(fromArray: T[]): T => {
  return fromArray[Math.floor(Math.random() * fromArray.length)]
}


if (!Array.prototype.randomElementWithExceptions) {
  Array.prototype.randomElementWithExceptions = function<T>(except: T[]): T {
    return randomElementWithExceptions(this, except)
  }
}

export const randomElementWithExceptions = <T>(fromArray: T[], excludeArray: T[]) => {
  const filteredArray = substractArrays(fromArray, excludeArray)
  return randomElement(filteredArray)
}


if (!Array.prototype.randomElements) {
  Array.prototype.randomElements = function<T>(count: number): T[] {
    return randomElements(this, count)
  }
}

export const randomElements = <T>(fromArray: T[], count: number): T[] => {
  if (count > fromArray.length) { throw Error('trying to get more elements than array length') }
  return shuffle(fromArray).slice(0, count)
}


if (!Array.prototype.firstElement) {
  Array.prototype.firstElement = function<T>(): T {
    return firstElement(this)
  }
}

export const firstElement = <T>(fromArray: T[]): T => {
  return fromArray[0]
}


if (!Array.prototype.lastElement) {
  Array.prototype.lastElement = function<T>(): T {
    return lastElement(this)
  }
}

export const lastElement = <T>(array: T[]): T => {
  return array[array.length - 1]
}


if (!Array.prototype.lastElements) {
  Array.prototype.lastElements = function<T>(numberOfElements: number): T[] {
    return lastElements(this, numberOfElements)
  }
}

export const lastElements = <T>(array: T[], numberOfElements: number): T[] => {
  return array.slice(Math.max(array.length - numberOfElements, 0))
}

if (!Array.prototype.filterNull) {
  Array.prototype.filterNull = function<T>(): Array<Exclude<T, null | undefined>> {
    return filterNull(this)
  }
}


export const filterNull = <T>(array: T[]): Array<Exclude<T, null | undefined>> => {
  return array.filter( (elem) => elem != null) as Array<Exclude<T, null | undefined>>
}

if (!Array.prototype.sortedByProperty) {
  Array.prototype.sortedByProperty = function<T>(compareFunction: (element: T) => number | string | Date, reverse?: boolean ): T[] {
    return sortedByProperty(this, compareFunction, reverse)
  }
}

export const sortedByProperty = <T>(sourceArray: T[], compareFunction: (element: T) => number | string | Date, reverse?: boolean ) => {
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

if (!Array.prototype.chunk) {
  Array.prototype.chunk = function<T>(chunkSize: number): T[][] {
    return chunk(chunkSize, this)
  }
}

export const chunk = <T>(chunkSize: number, array: T[]): T[][] => {
  const groups: T[][] = []
  let i = 0
  for (i = 0; i < array.length; i += chunkSize) {
    groups.push(array.slice(i, i + chunkSize))
  }
  return groups
}

if (!Array.prototype.takeWhile) {
  Array.prototype.takeWhile = function<T>(filterFunction: (element: T) => boolean, reverse?: boolean): T[] {
    return takeWhile(this, filterFunction, reverse)
  }
}

export const takeWhile = <T>(inputArray: T[], filterFunction: (element: T) => boolean, reverse?: boolean): T[] => {
  const array = reverse ? inputArray.slice().reverse() : inputArray.slice()

  const findIndex = array.findIndex((element) => !filterFunction(element))
  const endIndex = findIndex === -1 ? undefined : findIndex

  return array.slice(0, endIndex)
}
