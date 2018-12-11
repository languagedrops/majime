import { getFirstDayOfTheWeek, getStartOfTheWeek, getPreviousDay } from '../dateTime'

describe('Datetime functions', () => {
  it('getFirstDayOfTheWeek should return Monday for Tuesday', () => {
    const tuesday = new Date(2018, 11, 11, 18, 49, 50)
    expect(getFirstDayOfTheWeek(tuesday)).toEqual(new Date('2018-12-10T17:49:50.000Z'))
  })

  it('getFirstDayOfTheWeek should return Monday for Monday', () => {
    const monday = new Date(2018, 11, 10, 18, 49, 50)
    expect(getFirstDayOfTheWeek(monday)).toEqual(new Date('2018-12-10T17:49:50.000Z'))
  })

  it('getFirstDayOfTheWeek should return Monday for Sunday', () => {
    const monday = new Date(2018, 11, 16, 18, 49, 50)
    expect(getFirstDayOfTheWeek(monday)).toEqual(new Date('2018-12-10T17:49:50.000Z'))
  })

  it('getStartOfTheWeek should return Monday 00:00 for Tuesday', () => {
    const tuesday = new Date(2018, 11, 11, 18, 49, 50)
    expect(getStartOfTheWeek(tuesday)).toEqual(new Date('2018-12-10T00:00:00.000Z'))
  })

  it('getStartOfTheWeek should return Monday 00:00 for Monday', () => {
    const monday = new Date(2018, 11, 10, 18, 49, 50)
    expect(getStartOfTheWeek(monday)).toEqual(new Date('2018-12-10T00:00:00.000Z'))
  })

  it('getStartOfTheWeek should return Monday 00:00 for Sunday', () => {
    const sunday = new Date(2018, 11, 16, 18, 49, 50)
    expect(getStartOfTheWeek(sunday)).toEqual(new Date('2018-12-10T00:00:00.000Z'))
  })

  it('getPreviousDay returns the previous day 1st day of month', () => {
    const firsdDayOfTheMonth = new Date(2018, 11, 1, 18, 49, 50)
    expect(getPreviousDay(firsdDayOfTheMonth)).toEqual(new Date('2018-11-30T17:49:50.000Z'))
  })

})
