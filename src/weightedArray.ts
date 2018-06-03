import { getRandom } from './random'

export interface ElementAndWeight<T> {
  element: T
  weight: number
}

interface ElementAndAccumulatedWeight<T> {
  element: T
  accumulatedWeight: number
}

export const getRandomWeightedElement = <T>(fromArray: Array<ElementAndWeight<T>>): T | null => {
  if (fromArray.length === 0) {
    return null
  } else if (fromArray.length === 1) {
    return fromArray[0].element
  }

  const maximum = fromArray.reduce( (accum, item) => accum + item.weight, 0)
  const random = getRandom(0, maximum * 100) / 100

  interface Accum<T> {
    output: Array<ElementAndAccumulatedWeight<T>>
    currentAccumulatedWeight: number
  }
  const initialAccum = {
    output: [],
    currentAccumulatedWeight: 0,
  }

  const elementsAndAccumWeight = fromArray
    .reduce( (accum: Accum<T>, item: ElementAndWeight<T>): Accum<T> => {
      const currentAccumulatedWeight = accum.currentAccumulatedWeight + item.weight
      return {
        currentAccumulatedWeight,
        output: [...accum.output, { element: item.element, accumulatedWeight: currentAccumulatedWeight }],
      }
    }, initialAccum)
  const pickedItem = elementsAndAccumWeight.output.find( (item) => item.accumulatedWeight > random )
  return pickedItem && pickedItem.element || null
}




