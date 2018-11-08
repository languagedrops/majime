import { sortedByProperty, batch } from '../array'

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

  describe('Batch', () => {
    it('Should split array into chunks', () => {
      const testArray = [1, 2, 3, 4, 5, 6, 7]
      const expectedArray = [[1, 2], [3, 4], [5, 6], [7]]
      expect(batch(testArray, 2)).toEqual(expectedArray)
    })
  })

})
