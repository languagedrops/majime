import { getTimezoneAgnosticDayFromDate, isTimezoneAgnosticPreviousDay, getLocalDateObjectFromTimezoneAgnostic, getFollowingTimeZoneAgnosticDay, getPreviousTimeZoneAgnosticDay, getLastSevenTimeZoneAgnosticDays, getFollowingSevenTimeZoneAgnosticDays } from '../dateTime'
import { range } from '../standard'
import { getRandom, getRandomBoolean } from '../random'

const addDays = (date: Date, amount: number): Date => {
  const result = new Date(date.getTime())
  result.setDate(result.getDate() + amount)
  return result
}

const startOfDay = (date: Date): Date => {
  const result = new Date(date.getTime())
  result.setHours(0, 0, 0, 0)
  return result
}

const isPreviousDay = (dirtyDateLeft: Date, dirtyDateRight: Date) => {
  const dateLeftStartOfDay = startOfDay(dirtyDateLeft)
  const dateRightStartOfDay = startOfDay(dirtyDateRight)

  dateLeftStartOfDay.setDate(dateLeftStartOfDay.getDate() - 1)
  return dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime()
}

describe('date utils', () => {
  describe('isTimezoneAgnosticPreviousDay', () => {
    it('Should return correct results', () => {
      expect(isTimezoneAgnosticPreviousDay(
        getTimezoneAgnosticDayFromDate(new Date(2018, 0, 2)),
        getTimezoneAgnosticDayFromDate(new Date(2018, 0, 1)),
      )).toBe(true)

      expect(isTimezoneAgnosticPreviousDay(
        getTimezoneAgnosticDayFromDate(new Date(2018, 0, 1)),
        getTimezoneAgnosticDayFromDate(new Date(2017, 11, 31)),
      )).toBe(true)

      expect(isTimezoneAgnosticPreviousDay(
        getTimezoneAgnosticDayFromDate(new Date(2018, 1, 1)),
        getTimezoneAgnosticDayFromDate(new Date(2018, 0, 31)),
      )).toBe(true)

      expect(isTimezoneAgnosticPreviousDay(
        getTimezoneAgnosticDayFromDate(new Date(2018, 1, 2)),
        getTimezoneAgnosticDayFromDate(new Date(2018, 1, 1)),
      )).toBe(true)

      expect(isTimezoneAgnosticPreviousDay(
        getTimezoneAgnosticDayFromDate(new Date(2018, 5, 5)),
        getTimezoneAgnosticDayFromDate(new Date(2018, 5, 4)),
      )).toBe(true)

      expect(isTimezoneAgnosticPreviousDay(
        getTimezoneAgnosticDayFromDate(new Date(2020, 2, 1)),
        getTimezoneAgnosticDayFromDate(new Date(2020, 1, 29)),
      )).toBe(true)

      expect(isTimezoneAgnosticPreviousDay(
        getTimezoneAgnosticDayFromDate(new Date(2019, 2, 1)),
        getTimezoneAgnosticDayFromDate(new Date(2019, 1, 28)),
      )).toBe(true)

      // false
      expect(isTimezoneAgnosticPreviousDay(
        getTimezoneAgnosticDayFromDate(new Date(2018, 0, 1)),
        getTimezoneAgnosticDayFromDate(new Date(2018, 0, 1)),
      )).toBe(false)

      expect(isTimezoneAgnosticPreviousDay(
        getTimezoneAgnosticDayFromDate(new Date(2020, 5, 1)),
        getTimezoneAgnosticDayFromDate(new Date(2018, 5, 1)),
      )).toBe(false)

      expect(isTimezoneAgnosticPreviousDay(
        getTimezoneAgnosticDayFromDate(new Date(2020, 2, 1)),
        getTimezoneAgnosticDayFromDate(new Date(2020, 1, 28)),
      )).toBe(false)

      expect(isTimezoneAgnosticPreviousDay(
        getTimezoneAgnosticDayFromDate(new Date(2018, 0, 1)),
        getTimezoneAgnosticDayFromDate(new Date(2018, 0, 2)),
      )).toBe(false)

      expect(isTimezoneAgnosticPreviousDay(
        getTimezoneAgnosticDayFromDate(new Date(2018, 1, 5)),
        getTimezoneAgnosticDayFromDate(new Date(2018, 0, 30)),
      )).toBe(false)

      expect(isTimezoneAgnosticPreviousDay(
        getTimezoneAgnosticDayFromDate(new Date(2018, 5, 4)),
        getTimezoneAgnosticDayFromDate(new Date(2018, 5, 1)),
      )).toBe(false)
    })

    it('Should return same result as function with Date implementation', () => {
      range(0, 10000).forEach(() => {
        const date1 = new Date(getRandom(2010, 2030), getRandom(0, 11), getRandom(1, 31))
        const date2 = addDays(date1, (getRandomBoolean() ? 1 : -1) * getRandom(0, 100))
        const timezoneAgnosticDate1 = getTimezoneAgnosticDayFromDate(date1)
        const timezoneAgnosticDate2 = getTimezoneAgnosticDayFromDate(date2)

        expect(isTimezoneAgnosticPreviousDay(timezoneAgnosticDate1, timezoneAgnosticDate2)).toBe(isPreviousDay(
          getLocalDateObjectFromTimezoneAgnostic(timezoneAgnosticDate1),
          getLocalDateObjectFromTimezoneAgnostic(timezoneAgnosticDate2),
        ))
      })
    })
  })

  describe('getFollowingTimeZoneAgnosticDay', () => {
    it('Should return same result as function with Date implementation', () => {
      range(0, 10000).forEach(() => {
        const date1 = new Date(getRandom(2010, 2030), getRandom(0, 11), getRandom(1, 31))
        const date2 = addDays(date1, 1)
        const timezoneAgnosticDate1 = getTimezoneAgnosticDayFromDate(date1)
        const timezoneAgnosticDate2 = getTimezoneAgnosticDayFromDate(date2)

        expect(getFollowingTimeZoneAgnosticDay(timezoneAgnosticDate1)).toBe(timezoneAgnosticDate2)
      })
    })
  })

  describe('getPreviousTimeZoneAgnosticDay', () => {
    it('Should return same result as function with Date implementation', () => {
      range(0, 10000).forEach(() => {
        const date1 = new Date(getRandom(2010, 2030), getRandom(0, 11), getRandom(1, 31))
        const date2 = addDays(date1, -1)
        const timezoneAgnosticDate1 = getTimezoneAgnosticDayFromDate(date1)
        const timezoneAgnosticDate2 = getTimezoneAgnosticDayFromDate(date2)

        expect(getPreviousTimeZoneAgnosticDay(timezoneAgnosticDate1)).toBe(timezoneAgnosticDate2)
      })
    })
  })

  describe('getLastSevenTimeZoneAgnosticDays', () => {
    it('Should return the last seven days couning from the input date', () => {
      const baseDate = getTimezoneAgnosticDayFromDate(new Date(2020, 2, 2))
      expect(getLastSevenTimeZoneAgnosticDays(baseDate)).toEqual([
        20200125,
        20200126,
        20200127,
        20200128,
        20200129,
        20200201,
        20200202,
      ])
    })
  })

  describe('getFollowingSevenTimeZoneAgnosticDays', () => {
    it('Should return the following seven days couning from the input date', () => {
      const baseDate = getTimezoneAgnosticDayFromDate(new Date(2020, 1, 25))
      expect(getFollowingSevenTimeZoneAgnosticDays(baseDate)).toEqual([
        20200125,
        20200126,
        20200127,
        20200128,
        20200129,
        20200201,
        20200202,
      ])
    })
  })
})
