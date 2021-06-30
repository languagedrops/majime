
export const isNull = (item: any): boolean => {
  return item === null || item === undefined
}

export const range = (start: number, limit: number): number[] => {
  if (Number.isNaN(limit) || limit < 0) {
    return []
  }
  return Array.apply(null, { length: limit })
    .map((_: any, index: number) => {
      return index + start
    })
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

export const delay = <T>(millis: number, value?: T): Promise<T | undefined> => {
  return new Promise((resolve) => setTimeout( () => resolve(value) , millis) )
}

export const delayWithValue = <T>(millis: number, value: T): Promise<T> => {
  return new Promise((resolve) => setTimeout( () => resolve(value) , millis) )
}

export const delayRejected = <T>(millis: number, value?: T): Promise<T> => {
  return new Promise((_, reject) => setTimeout( () => reject(value) , millis) )
}

export const omit = <T, K extends keyof T>(key: K, object: T): Omit<T, K> => {
  const newObject = { ...object as any } as T
  delete newObject[key]
  return newObject
}

export const filterObject = <T extends { readonly [key: string]: any }, K extends keyof T>(input: T, filter: (key: string, value: T[K]) => boolean): Partial<T> => {
  let newMap: Partial<T> = {}
  Object.keys(input)
    .forEach((key) => {
      if (filter(key, input[key])) {
        newMap = { ...newMap, key: input[key] }
      }
    })
  return newMap
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

export const normalize = (inputRange: [number, number], outputRange: [number, number], value: number): number => {
  const minNew = outputRange[0]
  const maxNew = outputRange[1]

  const minOld = inputRange[0]
  const maxOld = inputRange[1]

  return ((maxNew - minNew) / (maxOld - minOld)) * (value - maxOld) + maxNew
}
