
export const isNull = (item: any): boolean => {
  return item === null || item === undefined
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



export const makeUnique = <T>(array: T[]): T[] => {
  return [...new Set(array)]
}

export const delay = <T>(millis: number, value?: T): Promise<T> => {
  return new Promise((resolve) => setTimeout( () => resolve(value) , millis) )
}

export const omit = <T, K extends keyof T>(key: K, object: T): Omit<T, K> => {
  const newObject = { ...object as any } as T
  delete newObject[key]
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

export const truncate = (str: string, length: number) => {
  if (str.length > length) {
    return str.slice(0, length - 3) + '...'
  }
  return str
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


export const getHash = (inputString: string): number => {
  return range(0, inputString.length).reduce((accum, index) => {
    return accum + inputString.charCodeAt(index)
  }, 0)
}
