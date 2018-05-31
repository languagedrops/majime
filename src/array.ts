declare global {
  interface Array<T> {
    remove(elem: T): T[]
    flatten(): T[]
    removeLastElement(): T[]
    unique(): T[]
    toSet(): Set<T>
    reversed(): T[]
    insert(elem: T, index: number): T[]
    isUnique(): boolean
    substract(otherArray: T[]): T[]
  }
}


if (!Array.prototype.remove) {
  Array.prototype.remove = function<T>(elem: T): T[] {
    return this.filter((e) => e !== elem)
  }
}

if (!Array.prototype.flatten) {
  Array.prototype.flatten = function<T>(): T[] {
    return [].concat(...this)
  }
}

if (!Array.prototype.removeLastElement) {
  Array.prototype.removeLastElement = function<T>(): T[] {
    if (this.length === 0) {
      return this
    }
    return this.slice(0, this.length - 1)
  }
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
    return [...this].reverse()
  }
}

export const reverseArray = <T>(array: T[]): T[] => {
  return [...array].reverse()
}

if (!Array.prototype.insert) {
  Array.prototype.insert = function<T>(elem: T, index: number): T[] {
    return [
      ...this.slice(0, index),
      elem,
      ...this.slice(index),
    ]
  }
}


export const insert = <T>(array: T[], index: number, newItem: T): T[] => [
  ...array.slice(0, index),
  newItem,
  ...array.slice(index),
]

if (!Array.prototype.isUnique) {
  Array.prototype.isUnique = function(): boolean {
    return this.length === new Set(this).size
  }
}

export const isArrayUnique = <T>(array: T[]): boolean => array.length === new Set(array).size


if (!Array.prototype.substract) {
  Array.prototype.substract = function<T>(otherArray: T[]): T[] {
    return this.filter((aElement) => !otherArray.includes(aElement))
  }
}

export const substractArrays = <T>(a: T[], b: T[]): T[] => {
  return a.filter((aElement) => !b.includes(aElement))
}
