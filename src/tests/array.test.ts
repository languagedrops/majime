import { sortedByProperty, chunk, sortIntersection } from '../array'

describe('Array function', () => {

  describe('removeLastElement', () => {
    it('Should correctly delete last element', () => {
      expect([1, 2, 3, 4].removeLastElement()).toEqual([1, 2, 3])
      expect([1].removeLastElement()).toEqual([])
      expect([].removeLastElement()).toEqual([])
    })
  })

  describe('sortArrayByFunction', () => {
    it('Should sort the arrays by the length of the name while keeping the equal ones in the same order', () => {
      const sourceArray = [
        { name: 'J. K. Rowling', id: 3 },
        { name: 'Agatha Christie', id: 4 },
        { name: 'Jane Austen', id: 1 },
        { name: 'George Orwell', id: 2 },
      ]
      const orderedArray = [
        { name: 'Jane Austen', id: 1 },
        { name: 'J. K. Rowling', id: 3 },
        { name: 'George Orwell', id: 2 },
        { name: 'Agatha Christie', id: 4 },
      ]
      const compareFunction = (element: any) => element.name.length
      expect(sortedByProperty(sourceArray, compareFunction)).toEqual(orderedArray)
    })

    it('Should sort the arrays by the length of the name in reverse order while keeping the equal ones in the same order', () => {
      const sourceArray = [
        { name: 'J. K. Rowling', id: 3 },
        { name: 'Agatha Christie', id: 4 },
        { name: 'Jane Austen', id: 1 },
        { name: 'George Orwell', id: 2 },
      ]
      const orderedArray = [
        { name: 'Agatha Christie', id: 4 },
        { name: 'J. K. Rowling', id: 3 },
        { name: 'George Orwell', id: 2 },
        { name: 'Jane Austen', id: 1 },
      ]
      const compareFunction = (element: any) => element.name.length
      expect(sortedByProperty(sourceArray, compareFunction, true)).toEqual(orderedArray)
    })
  })

  describe('Chunk', () => {
    it('Should split array into chunks', () => {
      const testArray = [1, 2, 3, 4, 5, 6, 7]
      const expectedArray = [[1, 2], [3, 4], [5, 6], [7]]
      expect(chunk(2, testArray)).toEqual(expectedArray)
    })
  })

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

  describe('takeWhile', () => {
    it('Should correctly return the elements while they are matching the condition', () => {
      expect([1, 2, 3, 2, 3, 4, 5, 2].takeWhile((element) => element < 3)).toEqual([1, 2])
      expect([1, 2].takeWhile((element) => element < 3)).toEqual([1, 2])
      expect([1].takeWhile((element) => element < 3)).toEqual([1])
      expect([].takeWhile((element) => element < 3)).toEqual([])
      expect([1, 2].takeWhile((element) => element > 3)).toEqual([])
    })

    it('Should correctly return the elements while they are matching the condition with reverse', () => {
      expect([1, 2, 3, 2, 3, 4, 5, 2].takeWhile((element) => element < 3, true)).toEqual([2])
      expect([1, 2].takeWhile((element) => element < 3, true)).toEqual([2, 1])
      expect([1].takeWhile((element) => element < 3, true)).toEqual([1])
      expect([].takeWhile((element) => element < 3, true)).toEqual([])
      expect([1, 2].takeWhile((element) => element > 3, true)).toEqual([])
    })

  })
})
