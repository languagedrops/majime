import { describe, it } from 'mocha';
import { expect } from 'chai';
import { sortIntersection, sortArrayByFunction } from '../standard';
import { removeLastElement } from '../array';
describe('Standart utils', () => {
    describe('reorderArrayByPrevious', () => {
        it('Should return source like aray if order array didn\'t provide', () => {
            const sourceArray = ['a', 'b', 'c', 'd', 'e'];
            expect(sortIntersection(sourceArray)).equal(sourceArray);
        });
        it('Should return source like array if length of array isn\'t ste same', () => {
            const sourceArray = ['a', 'b', 'c', 'd', 'e'];
            const orderArray = ['a', 'b', 'f'];
            expect(sortIntersection(sourceArray, orderArray)).equal(sourceArray);
        });
        it('should return source like array if there aren\'t common components in both arrays', () => {
            const sourceArray = ['a', 'b', 'c', 'd', 'e'];
            const orderArray = ['f', 'n', 'm', 'h', 'j'];
            expect(sortIntersection(sourceArray, orderArray)).equal(sourceArray);
        });
        it('Should return array where common components will be at the same place as they are in order array', () => {
            const sourceArray = ['a', 'b', 'c', 'd', 'e'];
            const orderArray = ['f', 'c', 'm', 'e', 'b'];
            const result = sortIntersection(sourceArray, orderArray);
            expect(result[1]).be('c');
            expect(result[3]).be('e');
            expect(result[4]).be('b');
        });
        it('Should return order like array, if all elements are the same', () => {
            const sourceArray = ['a', 'b', 'c', 'd', 'e'];
            const orderArray = ['b', 'e', 'd', 'a', 'c'];
            expect(sortIntersection(sourceArray, orderArray)).equal(orderArray);
        });
    });
    describe('removeLastElement', () => {
        it('Should correctly delete last element', () => {
            expect(removeLastElement([1, 2, 3, 4])).equal([1, 2, 3]);
            expect(removeLastElement([1])).equal([]);
            expect(removeLastElement([])).equal([]);
        });
    });
    describe('sortArrayByFunction', () => {
        it('Should sort the arrays by the length of the name while keeping the equal ones in the same order', () => {
            const sourceArray = [
                { name: 'J. K. Rowling', id: 3 },
                { name: 'Agatha Christie', id: 4 },
                { name: 'Jane Austen', id: 1 },
                { name: 'George Orwell', id: 2 },
            ];
            const orderedArray = [
                { name: 'Jane Austen', id: 1 },
                { name: 'J. K. Rowling', id: 3 },
                { name: 'George Orwell', id: 2 },
                { name: 'Agatha Christie', id: 4 },
            ];
            const compareFunction = (element) => element.name.length;
            expect(sortArrayByFunction(sourceArray, compareFunction)).equal(orderedArray);
        });
        it('Should sort the arrays by the length of the name in reverse order while keeping the equal ones in the same order', () => {
            const sourceArray = [
                { name: 'J. K. Rowling', id: 3 },
                { name: 'Agatha Christie', id: 4 },
                { name: 'Jane Austen', id: 1 },
                { name: 'George Orwell', id: 2 },
            ];
            const orderedArray = [
                { name: 'Agatha Christie', id: 4 },
                { name: 'J. K. Rowling', id: 3 },
                { name: 'George Orwell', id: 2 },
                { name: 'Jane Austen', id: 1 },
            ];
            const compareFunction = (element) => element.name.length;
            expect(sortArrayByFunction(sourceArray, compareFunction, true)).equal(orderedArray);
        });
    });
});
