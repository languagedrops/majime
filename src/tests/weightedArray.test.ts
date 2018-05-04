import { describe, it } from 'mocha'
import { expect } from 'chai'

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

  it('getRandomWeightedElement should pick OtherOption at least once every 200', () => {

    const weightedOptions: Array<ElementAndWeight<Option>> = Option.all.map( (element) => ({ element, weight: Option.weightFor(element) }))

    const arrayOfOptions = range(0, 5000).map( () => getRandomWeightedElement(weightedOptions))

    const controlCount = arrayOfOptions.filter( (item) => item === 'OtherOption').length
    expect(controlCount).greaterThan(100)

    const otherOptionCount = arrayOfOptions.filter( (item) => item === 'OtherOption').length
    expect(otherOptionCount).greaterThan(100)

    const otherOption1Count = arrayOfOptions.filter( (item) => item === 'OtherOption1').length
    expect(otherOption1Count).greaterThan(200)

    const otherOption2Count = arrayOfOptions.filter( (item) => item === 'OtherOption2').length
    expect(otherOption2Count).greaterThan(100)

    const otherOption3Count = arrayOfOptions.filter( (item) => item === 'OtherOption3').length
    expect(otherOption3Count).greaterThan(100)

    const dontSelect1Count = arrayOfOptions.filter( (item) => item === 'DontSelect1').length
    expect(dontSelect1Count).equal(0)

  })


})
