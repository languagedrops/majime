import { range } from '../standard'
import { getRandomWeightedElement, ElementAndWeight } from '../weightedArray'

enum Option {
  Control = 'Control',
  OtherOption = 'OtherOption',
  OtherOption1 = 'OtherOption1',
  OtherOption2 = 'OtherOption2',
  OtherOption3 = 'OtherOption3',
  DontSelect1 = 'DontSelect1',
}

namespace Option {

  export const all: Option[] = [Option.Control, Option.OtherOption, Option.OtherOption1, Option.OtherOption2, Option.OtherOption3, Option.DontSelect1]

  export const weightFor = (option: Option): number => {
    switch (option) {
      case Option.Control: return 2
      case Option.OtherOption1: return 3
      case Option.DontSelect1: return 0
      default: return 1
    }
  }

}

describe('weightedArray', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  it('getRandomWeightedElement should pick OtherOption at least once every 200', () => {

    const weightedOptions: Array<ElementAndWeight<Option>> = Option.all.map( (element) => ({ element, weight: Option.weightFor(element) }))

    const arrayOfOptions = range(0, 5000).map( () => getRandomWeightedElement(weightedOptions))

    const controlCount = arrayOfOptions.filter( (item) => item === 'OtherOption').length
    expect(controlCount).toBeGreaterThan(100)

    const otherOptionCount = arrayOfOptions.filter( (item) => item === 'OtherOption').length
    expect(otherOptionCount).toBeGreaterThan(100)

    const otherOption1Count = arrayOfOptions.filter( (item) => item === 'OtherOption1').length
    expect(otherOption1Count).toBeGreaterThan(200)

    const otherOption2Count = arrayOfOptions.filter( (item) => item === 'OtherOption2').length
    expect(otherOption2Count).toBeGreaterThan(100)

    const otherOption3Count = arrayOfOptions.filter( (item) => item === 'OtherOption3').length
    expect(otherOption3Count).toBeGreaterThan(100)

    const dontSelect1Count = arrayOfOptions.filter( (item) => item === 'DontSelect1').length
    expect(dontSelect1Count).toEqual(0)

  })

  it('getRandomWeightedElement should pick first option if random return less than first weight', () => {
    jest.doMock('../random', () => ({
      getRandom: jest.fn(() => 199),
    }))
    const weightedOptions: Array<ElementAndWeight<Option>> = Option.all.map( (element) => ({ element, weight: Option.weightFor(element) }))

    // tslint:disable-next-line
    expect(require('../weightedArray').getRandomWeightedElement(weightedOptions)).toEqual(Option.Control)
  })

  it('getRandomWeightedElement should pick second option if random return between first and second weights', () => {
    jest.doMock('../random', () => ({
      getRandom: jest.fn(() => 201),
    }))
    const weightedOptions: Array<ElementAndWeight<Option>> = Option.all.map( (element) => ({ element, weight: Option.weightFor(element) }))

    // tslint:disable-next-line
    expect(require('../weightedArray').getRandomWeightedElement(weightedOptions)).toEqual(Option.OtherOption)
  })
})
