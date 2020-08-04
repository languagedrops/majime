import { upperFirst, wordUpperFirst } from '../strings'

describe('String functions', () => {
  it('upperFirst should convert first letter to upper case', () => {
    expect(upperFirst('first')).toBe('First')
    expect(upperFirst('fiRst')).toBe('FiRst')
    expect(upperFirst('First')).toBe('First')
    expect(upperFirst('')).toBe('')
  })
  it('wordUpperFirst should convert to upper case first letter of each word in string', () => {
    expect(wordUpperFirst('first letter')).toBe('First Letter')
    expect(wordUpperFirst('fiRst letter')).toBe('FiRst Letter')
    expect(wordUpperFirst('First letter')).toBe('First Letter')
    expect(wordUpperFirst('')).toBe('')
  })
})
