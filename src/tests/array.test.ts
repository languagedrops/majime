import { sortedByProperty, chunk, sortIntersection, mergeArraysOfIds } from '../array'

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
      expect([1, 2].takeWhile((element) => element < 3, true)).toEqual([1, 2])
      expect([1].takeWhile((element) => element < 3, true)).toEqual([1])
      expect([].takeWhile((element) => element < 3, true)).toEqual([])
      expect([1, 2].takeWhile((element) => element > 3, true)).toEqual([])
    })

  })

  describe('skipWhile', () => {
    it('Should correctly return the elements while they are matching the condition', () => {
      expect([1, 2, 3, 2, 3, 4, 5, 2].skipWhile((element) => element < 3)).toEqual([3, 2, 3, 4, 5, 2])
      expect([4, 5].skipWhile((element) => element < 3)).toEqual([4, 5])
      expect([1, 2].skipWhile((element) => element < 3)).toEqual([])
      expect([4].skipWhile((element) => element < 3)).toEqual([4])
      expect([1].skipWhile((element) => element < 3)).toEqual([])
      expect([].skipWhile((element) => element < 3)).toEqual([])
      expect([4, 5, 3, 2].skipWhile((element) => element < 3)).toEqual([4, 5, 3, 2])
    })

    it('Should correctly return the elements while they are matching the condition with reverse', () => {
      expect([1, 2, 3, 2, 3, 4, 5, 2].skipWhile((element) => element < 3, true)).toEqual([1, 2, 3, 2, 3, 4, 5])
      expect([4, 5].skipWhile((element) => element < 3, true)).toEqual([4, 5])
      expect([1, 2].skipWhile((element) => element < 3, true)).toEqual([])
      expect([4].skipWhile((element) => element < 3, true)).toEqual([4])
      expect([1].skipWhile((element) => element < 3, true)).toEqual([])
      expect([].skipWhile((element) => element < 3, true)).toEqual([])
      expect([2, 3, 5, 4].skipWhile((element) => element < 3, true)).toEqual([2, 3, 5, 4])
    })

  })

  describe('mergeArraysOfIds', () => {
    it('Should merge arrays without common values', () => {
      const array1 = ['test1', 'test2', 'test3']
      const array2 = ['test4', 'test5', 'test6']
      const resultArray = ['test1', 'test2', 'test3', 'test4', 'test5', 'test6']

      expect(mergeArraysOfIds(array1, array2)).toEqual(resultArray)
    })

    it('Should return only one array for identical arrays', () => {
      const array1 = ['test1', 'test2', 'test3']
      const array2 = ['test1', 'test2', 'test3']
      const resultArray = ['test1', 'test2', 'test3']

      expect(mergeArraysOfIds(array1, array2)).toEqual(resultArray)
    })

    it('Should merge arrays with common values without duplicates 1', () => {
      const array1 = ['test1', 'test2', 'test3']
      const array2 = ['test1', 'test4', 'test3']
      const resultArray = ['test1', 'test2', 'test4', 'test3']

      expect(mergeArraysOfIds(array1, array2)).toEqual(resultArray)
    })

    it('Should merge arrays with common values without duplicates 2', () => {
      const array1 = ['test1', 'test2', 'test3']
      const array2 = ['test1', 'test3']
      const resultArray = ['test1', 'test2', 'test3']

      expect(mergeArraysOfIds(array1, array2)).toEqual(resultArray)
    })

    it('Should merge arrays with common values without duplicates 3', () => {
      const array1 = ['test1', 'test2', 'test3']
      const array2 = ['test1', 'test3', 'test5']
      const resultArray = ['test1', 'test2', 'test3', 'test5']

      expect(mergeArraysOfIds(array1, array2)).toEqual(resultArray)
    })

    it('Should merge arrays with common values without duplicates 4', () => {
      const array1 = ['test1', 'test2', 'test3']
      const array2 = ['test1', 'test4', 'test3', 'test5']
      const resultArray = ['test1', 'test2', 'test4', 'test3', 'test5']

      expect(mergeArraysOfIds(array1, array2)).toEqual(resultArray)
    })
  })

  describe('Unique', () => {
    it('Shouldn\'t change order of array', () => {
      const array1 = [1, 2, 3, 4, 5]
      const array2 = [1, 1, 2, 3, 3, 1, 4, 3, 5]
      const array3 = ['test1', 'test2', 'test3', 'test4', 'test5']
      const array4 = ['test1', 'test1', 'test2', 'test1', 'test2', 'test3', 'test4', 'test1', 'test5']

      expect(array1.unique()).toMatchSnapshot()
      expect(array2.unique()).toMatchSnapshot()
      expect(array3.unique()).toMatchSnapshot()
      expect(array4.unique()).toMatchSnapshot()
    })
  })

  describe('SortedByProperties', () => {
    it('Should keep everything the same if there is no compare function given', () => {
      const array = [
        { name: 'Carol', id: 1 },
        { name: 'Bob', id: 4 },
        { name: 'Alice', id: 3 },
        { name: 'Dave', id: 2 },
      ]

      expect(array.sortedByProperties()).toEqual(array)
    })

    it('Should sort everything by the compare function', () => {
      const sourceArray = [
        { name: 'Carol', id: 1 },
        { name: 'Bob', id: 4 },
        { name: 'Alice', id: 3 },
        { name: 'Dave', id: 2 },
      ]

      const orderedArray = [
        { name: 'Alice', id: 3 },
        { name: 'Bob', id: 4 },
        { name: 'Carol', id: 1 },
        { name: 'Dave', id: 2 },
      ]

      const compareFunction = (element: any) => element.name
      expect(sourceArray.sortedByProperties({ compareFunction })).toEqual(orderedArray)
    })

    it('Should sort everything by the compare function in reverse order', () => {
      const sourceArray = [
        { name: 'Carol', id: 1 },
        { name: 'Bob', id: 4 },
        { name: 'Alice', id: 3 },
        { name: 'Dave', id: 2 },
      ]

      const orderedArray = [
        { name: 'Dave', id: 2 },
        { name: 'Carol', id: 1 },
        { name: 'Bob', id: 4 },
        { name: 'Alice', id: 3 },
      ]

      const compareFunction = (element: any) => element.name
      expect(sourceArray.sortedByProperties({ compareFunction, reverse: true })).toEqual(orderedArray)
    })

    it('Should should keep the same in place', () => {
      const sourceArray = [
        { name: 'Carol', id: 1 },
        { name: 'Carol', id: 4 },
        { name: 'Alice', id: 3 },
        { name: 'Dave', id: 2 },
      ]

      const orderedArray = [
        { name: 'Alice', id: 3 },
        { name: 'Carol', id: 1 },
        { name: 'Carol', id: 4 },
        { name: 'Dave', id: 2 },
      ]

      const compareFunction = (element: any) => element.name
      expect(sourceArray.sortedByProperties({ compareFunction })).toEqual(orderedArray)
    })

    it('Should should keep the same in place in reverse order', () => {
      const sourceArray = [
        { name: 'Carol', id: 1 },
        { name: 'Carol', id: 4 },
        { name: 'Alice', id: 3 },
        { name: 'Dave', id: 2 },
      ]

      const orderedArray = [
        { name: 'Dave', id: 2 },
        { name: 'Carol', id: 1 },
        { name: 'Carol', id: 4 },
        { name: 'Alice', id: 3 },
      ]

      const compareFunction = (element: any) => element.name
      expect(sourceArray.sortedByProperties({ compareFunction, reverse: true })).toEqual(orderedArray)
    })

    it('Should order the same values by the second compare function', () => {
      const sourceArray = [
        { name: 'Carol', id: 1 },
        { name: 'Carol', id: 4 },
        { name: 'Alice', id: 3 },
        { name: 'Dave', id: 2 },
      ]

      const orderedArray = [
        { name: 'Alice', id: 3 },
        { name: 'Carol', id: 1 },
        { name: 'Carol', id: 4 },
        { name: 'Dave', id: 2 },
      ]

      const compareFunction1 = (element: any) => element.name
      const compareFunction2 = (element: any) => element.id
      expect(sourceArray.sortedByProperties({ compareFunction: compareFunction1 }, { compareFunction: compareFunction2 })).toEqual(orderedArray)
    })

    it('Should order the same values by the second (reversed) compare function', () => {
      const sourceArray = [
        { name: 'Carol', id: 1 },
        { name: 'Carol', id: 4 },
        { name: 'Alice', id: 3 },
        { name: 'Dave', id: 2 },
      ]

      const orderedArray = [
        { name: 'Alice', id: 3 },
        { name: 'Carol', id: 4 },
        { name: 'Carol', id: 1 },
        { name: 'Dave', id: 2 },
      ]

      const compareFunction1 = (element: any) => element.name
      const compareFunction2 = (element: any) => element.id
      expect(sourceArray.sortedByProperties({ compareFunction: compareFunction1 }, { compareFunction: compareFunction2, reverse: true })).toEqual(orderedArray)
    })

    it('Should order the same values by the second compare function with reversed first compare function', () => {
      const sourceArray = [
        { name: 'Carol', id: 1 },
        { name: 'Carol', id: 4 },
        { name: 'Alice', id: 3 },
        { name: 'Dave', id: 2 },
      ]

      const orderedArray = [
        { name: 'Dave', id: 2 },
        { name: 'Carol', id: 1 },
        { name: 'Carol', id: 4 },
        { name: 'Alice', id: 3 },
      ]

      const compareFunction1 = (element: any) => element.name
      const compareFunction2 = (element: any) => element.id
      expect(sourceArray.sortedByProperties({ compareFunction: compareFunction1, reverse: true }, { compareFunction: compareFunction2 })).toEqual(orderedArray)
    })

    it('Should order the same values by the second (reversed) compare function with reversed first compare function', () => {
      const sourceArray = [
        { name: 'Carol', id: 1 },
        { name: 'Carol', id: 4 },
        { name: 'Alice', id: 3 },
        { name: 'Dave', id: 2 },
      ]

      const orderedArray = [
        { name: 'Dave', id: 2 },
        { name: 'Carol', id: 4 },
        { name: 'Carol', id: 1 },
        { name: 'Alice', id: 3 },
      ]

      const compareFunction1 = (element: any) => element.name
      const compareFunction2 = (element: any) => element.id
      expect(sourceArray.sortedByProperties({ compareFunction: compareFunction1, reverse: true }, { compareFunction: compareFunction2, reverse: true })).toEqual(orderedArray)
    })

    it('Should ignore the second compare function if the first one has ordered everything', () => {
      const sourceArray = [
        { name: 'Carol', id: 1 },
        { name: 'Carol', id: 4 },
        { name: 'Alice', id: 3 },
        { name: 'Dave', id: 2 },
      ]

      const orderedArray = [
        { name: 'Carol', id: 1 },
        { name: 'Dave', id: 2 },
        { name: 'Alice', id: 3 },
        { name: 'Carol', id: 4 },
      ]

      const compareFunction1 = (element: any) => element.id
      const compareFunction2 = (element: any) => element.element
      expect(sourceArray.sortedByProperties({ compareFunction: compareFunction1 }, { compareFunction: compareFunction2 })).toEqual(orderedArray)
    })

    it('Should ignore the second compare function if the first one has reverse ordered everything', () => {
      const sourceArray = [
        { name: 'Carol', id: 1 },
        { name: 'Carol', id: 4 },
        { name: 'Alice', id: 3 },
        { name: 'Dave', id: 2 },
      ]

      const orderedArray = [
        { name: 'Carol', id: 4 },
        { name: 'Alice', id: 3 },
        { name: 'Dave', id: 2 },
        { name: 'Carol', id: 1 },
      ]

      const compareFunction1 = (element: any) => element.id
      const compareFunction2 = (element: any) => element.element
      expect(sourceArray.sortedByProperties({ compareFunction: compareFunction1, reverse: true }, { compareFunction: compareFunction2 })).toEqual(orderedArray)
    })
  })
})
