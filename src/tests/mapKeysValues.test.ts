import { mapKeys, mapValues } from '../mapKeysValues'

describe('Map keys/values', () => {
  it('mapKeys should return object with same values but other keys', () => {
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

  it('mapValues should return object with same keys but other values', () => {
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
})
