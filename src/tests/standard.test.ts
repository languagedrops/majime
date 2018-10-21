import { sortIntersection } from '../standard'
import '../array'

describe('Standart utils', () => {
  describe('reorderArrayByPrevious', () => {
    it('Should return source like aray if order array didn\'t provide', () => {
      const sourceArray = ['a', 'b', 'c', 'd', 'e']
      expect(sortIntersection(sourceArray)).toEqual(sourceArray)
    })

    it('Should return source like array if length of array isn\'t ste same', () => {
      const sourceArray = ['a', 'b', 'c', 'd', 'e']
      const orderArray = ['a', 'b', 'f']
      expect(sortIntersection(sourceArray, orderArray)).toEqual(sourceArray)
    })

    it('should return source like array if there aren\'t common components in both arrays', () => {
      const sourceArray = ['a', 'b', 'c', 'd', 'e']
      const orderArray = ['f', 'n', 'm', 'h', 'j']
      expect(sortIntersection(sourceArray, orderArray)).toEqual(sourceArray)
    })

    it('Should return array where common components will be at the same place as they are in order array', () => {
      const sourceArray = ['a', 'b', 'c', 'd', 'e']
      const orderArray = ['f', 'c', 'm', 'e', 'b']
      const result = sortIntersection(sourceArray, orderArray)
      expect(result[1]).toBe('c')
      expect(result[3]).toBe('e')
      expect(result[4]).toBe('b')
    })

    it('Should return order like array, if all elements are the same', () => {
      const sourceArray = ['a', 'b', 'c', 'd', 'e']
      const orderArray = ['b', 'e', 'd', 'a', 'c']
      expect(sortIntersection(sourceArray, orderArray)).toEqual(orderArray)
    })
  })

  describe('removeLastElement', () => {
    it('Should correctly delete last element', () => {
      expect([1, 2, 3, 4].removeLastElement()).toEqual([1, 2, 3])
      expect([1].removeLastElement()).toEqual([])
      expect([].removeLastElement()).toEqual([])
    })
  })


})
