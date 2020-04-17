import { getTimezoneAgnosticDayFromDate, isTimezoneAgnosticPreviousDay } from '../dateTime'

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
  })
})
