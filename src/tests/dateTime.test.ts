import { getTimezoneAgnosticDayFromDate, isTimezoneAgnosticPreviousDay, getLocalDateObjectFromTimezoneAgnostic, getFollowingTimeZoneAgnosticDay, getPreviousTimeZoneAgnosticDay, getLastNTimeZoneAgnosticDays, getFollowingNTimeZoneAgnosticDays, getTimeZoneAgnosticDatesBetweenDates, getTimeZoneAgnosticDaysDifference, getCurrentDayOrDaysTillPreviousMonday, getCurrentDayOrDaysTillNextSunday, getLastDayOfMonth } from '../dateTime'
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
    it('Should return 0 days', () => {
      const baseDate = getTimezoneAgnosticDayFromDate(new Date(2020, 2, 2))
      expect(getLastNTimeZoneAgnosticDays(baseDate, 0)).toEqual([])
    })

    it('Should return the same day as the input date', () => {
      const baseDate = getTimezoneAgnosticDayFromDate(new Date(2020, 2, 2))
      expect(getLastNTimeZoneAgnosticDays(baseDate, 1)).toEqual([
        20200202,
      ])
    })

    it('Should return the last 2 days couning from the input date', () => {
      const baseDate = getTimezoneAgnosticDayFromDate(new Date(2020, 2, 2))
      expect(getLastNTimeZoneAgnosticDays(baseDate, 2)).toEqual([
        20200201,
        20200202,
      ])
    })

    it('Should return the last seven days couning from the input date', () => {
      const baseDate = getTimezoneAgnosticDayFromDate(new Date(2020, 2, 2))
      expect(getLastNTimeZoneAgnosticDays(baseDate, 7)).toEqual([
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
    it('Should return 0 days', () => {
      const baseDate = getTimezoneAgnosticDayFromDate(new Date(2020, 1, 25))
      expect(getFollowingNTimeZoneAgnosticDays(baseDate, 0)).toEqual([])
    })

    it('Should return the input date', () => {
      const baseDate = getTimezoneAgnosticDayFromDate(new Date(2020, 1, 25))
      expect(getFollowingNTimeZoneAgnosticDays(baseDate, 1)).toEqual([
        20200125,
      ])
    })

    it('Should return the following 2 days couning from the input date', () => {
      const baseDate = getTimezoneAgnosticDayFromDate(new Date(2020, 1, 25))
      expect(getFollowingNTimeZoneAgnosticDays(baseDate, 2)).toEqual([
        20200125,
        20200126,
      ])
    })

    it('Should return the following seven days couning from the input date', () => {
      const baseDate = getTimezoneAgnosticDayFromDate(new Date(2020, 1, 25))
      expect(getFollowingNTimeZoneAgnosticDays(baseDate, 7)).toEqual([
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
    it('Should return the days between two days', () => {
      const smallerDate = getTimezoneAgnosticDayFromDate(new Date(2020, 1, 25))
      const higherDate = getTimezoneAgnosticDayFromDate(new Date(2020, 2, 3))
      expect(getTimeZoneAgnosticDatesBetweenDates(smallerDate, higherDate)).toEqual([
        20200125,
        20200126,
        20200127,
        20200128,
        20200129,
        20200201,
        20200202,
      ])
    })

    it('Should return the first date if the dates are following eachother', () => {
      const smallerDate = getTimezoneAgnosticDayFromDate(new Date(2020, 1, 25))
      const higherDate = getTimezoneAgnosticDayFromDate(new Date(2020, 1, 26))
      expect(getTimeZoneAgnosticDatesBetweenDates(smallerDate, higherDate)).toEqual([
        20200125,
      ])
    })

    it('Should return empty array if the dates are the same', () => {
      const date = getTimezoneAgnosticDayFromDate(new Date(2020, 1, 25))

      expect(getTimeZoneAgnosticDatesBetweenDates(date, date)).toEqual([])
    })

    it('Should return empty array if higher date is a lower number', () => {
      const smallerDate = getTimezoneAgnosticDayFromDate(new Date(2020, 2, 3))
      const higherDate = getTimezoneAgnosticDayFromDate(new Date(2020, 1, 25))

      expect(getTimeZoneAgnosticDatesBetweenDates(smallerDate, higherDate)).toEqual([])
    })
  })

  describe('getTimeZoneAgnosticDaysDifference', () => {
    it('Should return the number of dates between two dates', () => {
      const smallerDate = getTimezoneAgnosticDayFromDate(new Date(2020, 1, 25))
      const higherDate = getTimezoneAgnosticDayFromDate(new Date(2020, 2, 3))

      expect(getTimeZoneAgnosticDaysDifference(smallerDate, higherDate)).toBe(7)
    })

    it('Should return 1 if the dates are following each other', () => {
      const smallerDate = getTimezoneAgnosticDayFromDate(new Date(2020, 1, 25))
      const higherDate = getTimezoneAgnosticDayFromDate(new Date(2020, 1, 26))

      expect(getTimeZoneAgnosticDaysDifference(smallerDate, higherDate)).toBe(1)
    })

    it('Should return 0 if the dates are the same', () => {
      const date = getTimezoneAgnosticDayFromDate(new Date(2020, 1, 25))

      expect(getTimeZoneAgnosticDaysDifference(date, date)).toBe(0)
    })

    it('Should return -1 if the dates are following each other', () => {
      const smallerDate = getTimezoneAgnosticDayFromDate(new Date(2020, 1, 25))
      const higherDate = getTimezoneAgnosticDayFromDate(new Date(2020, 1, 26))

      expect(getTimeZoneAgnosticDaysDifference(higherDate, smallerDate)).toBe(-1)
    })

    it('Should return negative number if the second date is smaller', () => {
      const smallerDate = getTimezoneAgnosticDayFromDate(new Date(2020, 1, 25))
      const higherDate = getTimezoneAgnosticDayFromDate(new Date(2020, 2, 3))

      expect(getTimeZoneAgnosticDaysDifference(higherDate, smallerDate)).toBe(-7)
    })
  })

  describe('getCurrentDayOrDaysTillPreviousMonday', () => {
    it('Should return Monday on Monday', () => {
      const monday = getTimezoneAgnosticDayFromDate(new Date(2020, 7, 3))
      const result = getCurrentDayOrDaysTillPreviousMonday(monday)

      expect(result).toEqual([20200703])
    })

    it('Should return Monday and Tuesday on Tuesday', () => {
      const tuesday = getTimezoneAgnosticDayFromDate(new Date(2020, 7, 4))
      const result = getCurrentDayOrDaysTillPreviousMonday(tuesday)

      expect(result).toEqual([20200703, 20200704])
    })

    it('Should return Monday, Tuesday, and Wednesday on Wednesday', () => {
      const wednesday = getTimezoneAgnosticDayFromDate(new Date(2020, 7, 5))
      const result = getCurrentDayOrDaysTillPreviousMonday(wednesday)

      expect(result).toEqual([20200703, 20200704, 20200705])
    })

    it('Should return Monday, Tuesday, Wednesday, and Thursday on Thursday', () => {
      const thursday = getTimezoneAgnosticDayFromDate(new Date(2020, 7, 6))
      const result = getCurrentDayOrDaysTillPreviousMonday(thursday)

      expect(result).toEqual([20200703, 20200704, 20200705, 20200706])
    })

    it('Should return Monday, Tuesday, Wednesday, Thursday, Friday on Friday', () => {
      const friday = getTimezoneAgnosticDayFromDate(new Date(2020, 7, 7))
      const result = getCurrentDayOrDaysTillPreviousMonday(friday)

      expect(result).toEqual([20200703, 20200704, 20200705, 20200706, 20200707])
    })

    it('Should return Monday, Tuesday, Wednesday, Thursday, Friday, Saturday on Saturday', () => {
      const saturday = getTimezoneAgnosticDayFromDate(new Date(2020, 7, 8))
      const result = getCurrentDayOrDaysTillPreviousMonday(saturday)

      expect(result).toEqual([20200703, 20200704, 20200705, 20200706, 20200707, 20200708])
    })

    it('Should return Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday on Sunday', () => {
      const sunday = getTimezoneAgnosticDayFromDate(new Date(2020, 7, 9))
      const result = getCurrentDayOrDaysTillPreviousMonday(sunday)

      expect(result).toEqual([20200703, 20200704, 20200705, 20200706, 20200707, 20200708, 20200709])
    })
  })

  describe('getCurrentDayOrDaysTillNextSunday', () => {
    it('Should return Sunday on Sunday', () => {
      const sunday = getTimezoneAgnosticDayFromDate(new Date(2020, 7, 9))
      const result = getCurrentDayOrDaysTillNextSunday(sunday)

      expect(result).toEqual([20200709])
    })
    it('Should return Saturday, Sunday on Saturday', () => {
      const saturday = getTimezoneAgnosticDayFromDate(new Date(2020, 7, 8))
      const result = getCurrentDayOrDaysTillNextSunday(saturday)

      expect(result).toEqual([20200708, 20200709])
    })
    it('Should return Friday, Saturday, Sunday on Friday', () => {
      const friday = getTimezoneAgnosticDayFromDate(new Date(2020, 7, 7))
      const result = getCurrentDayOrDaysTillNextSunday(friday)

      expect(result).toEqual([20200707, 20200708, 20200709])
    })
    it('Should return Thursday, Friday, Saturday, Sunday on Thursday', () => {
      const thursday = getTimezoneAgnosticDayFromDate(new Date(2020, 7, 6))
      const result = getCurrentDayOrDaysTillNextSunday(thursday)

      expect(result).toEqual([20200706, 20200707, 20200708, 20200709])
    })
    it('Should return Wednesday, Thursday, Friday, Saturday, Sunday on Wednesday', () => {
      const wednesday = getTimezoneAgnosticDayFromDate(new Date(2020, 7, 5))
      const result = getCurrentDayOrDaysTillNextSunday(wednesday)

      expect(result).toEqual([20200705, 20200706, 20200707, 20200708, 20200709])
    })
    it('Should return Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday on Tuesday', () => {
      const tuesday = getTimezoneAgnosticDayFromDate(new Date(2020, 7, 4))
      const result = getCurrentDayOrDaysTillNextSunday(tuesday)

      expect(result).toEqual([20200704, 20200705, 20200706, 20200707, 20200708, 20200709])
    })
    it('Should return Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday on Monday', () => {
      const monday = getTimezoneAgnosticDayFromDate(new Date(2020, 7, 3))
      const result = getCurrentDayOrDaysTillNextSunday(monday)

      expect(result).toEqual([20200703, 20200704, 20200705, 20200706, 20200707, 20200708, 20200709])
    })
  })

  describe('getLastDayOfMonth', () => {
    it('Should return 31st of January', () => {
      const baseDate = getTimezoneAgnosticDayFromDate(new Date(2020, 0, 3))
      const result = getLastDayOfMonth(baseDate)

      expect(result).toBe(20200031)
    })

    it('Should return 29th of February', () => {
      const baseDate = getTimezoneAgnosticDayFromDate(new Date(2020, 1, 3))
      const result = getLastDayOfMonth(baseDate)

      expect(result).toBe(20200129)
    })

    it('Should return 28th of February', () => {
      const baseDate = getTimezoneAgnosticDayFromDate(new Date(2021, 1, 3))
      const result = getLastDayOfMonth(baseDate)

      expect(result).toBe(20210128)
    })

    it('Should return 31st of March', () => {
      const baseDate = getTimezoneAgnosticDayFromDate(new Date(2021, 2, 3))
      const result = getLastDayOfMonth(baseDate)

      expect(result).toBe(20210231)
    })

    it('Should return 30th of April', () => {
      const baseDate = getTimezoneAgnosticDayFromDate(new Date(2021, 3, 3))
      const result = getLastDayOfMonth(baseDate)

      expect(result).toBe(20210330)
    })

    it('Should return 31st of May', () => {
      const baseDate = getTimezoneAgnosticDayFromDate(new Date(2021, 4, 3))
      const result = getLastDayOfMonth(baseDate)

      expect(result).toBe(20210431)
    })

    it('Should return 30th of June', () => {
      const baseDate = getTimezoneAgnosticDayFromDate(new Date(2021, 5, 3))
      const result = getLastDayOfMonth(baseDate)

      expect(result).toBe(20210530)
    })

    it('Should return 31st of July', () => {
      const baseDate = getTimezoneAgnosticDayFromDate(new Date(2021, 6, 3))
      const result = getLastDayOfMonth(baseDate)

      expect(result).toBe(20210631)
    })

    it('Should return 31st of August', () => {
      const baseDate = getTimezoneAgnosticDayFromDate(new Date(2021, 7, 3))
      const result = getLastDayOfMonth(baseDate)

      expect(result).toBe(20210731)
    })

    it('Should return 30th of September', () => {
      const baseDate = getTimezoneAgnosticDayFromDate(new Date(2021, 8, 3))
      const result = getLastDayOfMonth(baseDate)

      expect(result).toBe(20210830)
    })

    it('Should return 31st of October', () => {
      const baseDate = getTimezoneAgnosticDayFromDate(new Date(2021, 9, 3))
      const result = getLastDayOfMonth(baseDate)

      expect(result).toBe(20210931)
    })

    it('Should return 30th of November', () => {
      const baseDate = getTimezoneAgnosticDayFromDate(new Date(2021, 10, 3))
      const result = getLastDayOfMonth(baseDate)

      expect(result).toBe(20211030)
    })

    it('Should return 31st of December', () => {
      const baseDate = getTimezoneAgnosticDayFromDate(new Date(2021, 11, 3))
      const result = getLastDayOfMonth(baseDate)

      expect(result).toBe(20211131)
    })
  })
})
