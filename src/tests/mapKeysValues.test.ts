import { mapKeys, mapValues, mapKeysAndValues } from '../mapKeysValues'

describe('Map keys/values', () => {
  describe('mapKeys', () => {
    it('Should return object with same values but other keys', () => {
      const testObject = {
        test1: 123,
        test2: [123, 124],
        test3: { key1: 'test', key2: 123 },
        test4: 'test value',
      }

      const expectedObject = {
        key1: 123,
        key2: [123, 124],
        key3: { key1: 'test', key2: 123 },
        key4: 'test value',
      }

      expect(mapKeys(testObject, (key: string) => key.replace('test', 'key'))).toEqual(expectedObject)
    })

    it('Should filter object if new key is undefined', () => {
      const testObject = {
        test1: 123,
        test2: [123, 124],
        test3: { key1: 'test', key2: 123 },
        test4: 'test value',
      }

      const expectedObject = {
        key1: 123,
        key3: { key1: 'test', key2: 123 },
        key4: 'test value',
      }

      const keyMapper = (key: string) => key === 'test2' ? undefined : key.replace('test', 'key')

      expect(mapKeys(testObject, keyMapper)).toEqual(expectedObject)
    })
  })

  describe('mapValues', () => {
    it('Should return object with same keys but other values', () => {
      const testObject = {
        key1: { id: 1, name: 'test' },
        key2: { id: 2, name: 'test2' },
        key3: { id: 3, name: 'test3' },
        key4: { id: 4, owners: [2, 3] },
      }

      const mapper = (value: any) => value.name || `id_${value.id}`

      const expectedObject = {
        key1: 'test',
        key2: 'test2',
        key3: 'test3',
        key4: 'id_4',
      }

      expect(mapValues(testObject, mapper)).toEqual(expectedObject)
    })

    it('Shouldn\'t filter object if new value is undefined and filterValues is false', () => {
      const testObject = {
        key1: { id: 1, name: 'test' },
        key2: { id: 2, name: 'test2' },
        key3: { id: 3, name: 'test3' },
        key4: { id: 4, owners: [2, 3] },
      }

      const mapper = (value: any) => value.id === 2 ? undefined : value.name || `id_${value.id}`

      const expectedObject = {
        key1: 'test',
        key2: undefined,
        key3: 'test3',
        key4: 'id_4',
      }

      expect(mapValues(testObject, mapper)).toEqual(expectedObject)
    })

    it('Should filter object if new value is undefined and filterValues is true', () => {
      const testObject = {
        key1: { id: 1, name: 'test' },
        key2: { id: 2, name: 'test2' },
        key3: { id: 3, name: 'test3' },
        key4: { id: 4, owners: [2, 3] },
      }

      const mapper = (value: any) => value.id === 2 ? undefined : value.name || `id_${value.id}`

      const expectedObject = {
        key1: 'test',
        key3: 'test3',
        key4: 'id_4',
      }

      expect(mapValues(testObject, mapper, true)).toEqual(expectedObject)
    })
  })

  describe('mapKeysAndValues', () => {
    it('Should pass key and value into transformer and should return object with the same keys ', () => {
      const testObject = {
        key1: { id: 1, name: 'test' },
        key2: { id: 2, name: 'test2' },
        key3: { id: 3, name: 'test3' },
        key4: { id: 4, owners: [2, 3] },
      }

      const mapper = (key: string, value: any) => `${key}_${value.name || `id_${value.id}`}`

      const expectedObject = {
        key1: 'key1_test',
        key2: 'key2_test2',
        key3: 'key3_test3',
        key4: 'key4_id_4',
      }

      expect(mapKeysAndValues(testObject, mapper)).toEqual(expectedObject)
    })

    it('Shouldn\'t filter value if new value is undefined and filter parameter is false ', () => {
      const testObject = {
        key1: { id: 1, name: 'test' },
        key2: { id: 2, name: 'test2' },
        key3: { id: 3, name: 'test3' },
        key4: { id: 4, owners: [2, 3] },
      }

      const mapper = (key: string, value: any) => key === 'key2' ? undefined : `${key}_${value.name || `id_${value.id}`}`

      const expectedObject = {
        key1: 'key1_test',
        key2: undefined,
        key3: 'key3_test3',
        key4: 'key4_id_4',
      }

      expect(mapKeysAndValues(testObject, mapper)).toEqual(expectedObject)
    })

    it('Should filter value if new value is undefined and filter parameter is true ', () => {
      const testObject = {
        key1: { id: 1, name: 'test' },
        key2: { id: 2, name: 'test2' },
        key3: { id: 3, name: 'test3' },
        key4: { id: 4, owners: [2, 3] },
      }

      const mapper = (key: string, value: any) => key === 'key2' ? undefined : `${key}_${value.name || `id_${value.id}`}`

      const expectedObject = {
        key1: 'key1_test',
        key3: 'key3_test3',
        key4: 'key4_id_4',
      }

      expect(mapKeysAndValues(testObject, mapper, true)).toEqual(expectedObject)
    })
  })
})
