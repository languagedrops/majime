declare global {
  interface Array<T> {
    remove(elem: T): T[]
    flatten(): T[]
    removeLastElement(): T[]
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


export const substractArrays = <T>(a: T[], b: T[]): T[] => {
  return a.filter((aElement) => !b.includes(aElement))
}
