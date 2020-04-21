import { range } from './standard'

export {}

declare global {
  interface Date {
    oneHourValue: number
    oneMinuteValue: number
    addSeconds(seconds: number): Date
    addMinutes(minutes: number): Date
    addHours(hours: number): Date
  }
}

if (!Date.prototype.addSeconds) {
  Date.prototype.addSeconds = function(seconds: number): Date {
    return addSecondsToDate(this, seconds)
  }
}

export const addSecondsToDate = (date: Date, seconds: number) => {
  return new Date(date.getTime() + seconds * 1000)
}

if (!Date.prototype.addMinutes) {
  Date.prototype.addMinutes = function(minutes: number): Date {
    return addMinutesToDate(this, minutes)
  }
}

export const addMinutesToDate = (date: Date, minutes: number) => {
  return addSecondsToDate(date, minutes * 60)
}

if (!Date.prototype.addHours) {
  Date.prototype.addHours = function(hours: number): Date {
    return addHoursToDate(this, hours)
  }
}

export const addHoursToDate = (date: Date, hours: number) => {
  return addMinutesToDate(date, hours * 60)
}

export const addDaysToDate = (date: Date, days: number) => {
  return addHoursToDate(date, days * 24)
}

export const getDateDifference = (date1: Date, date2: Date) => {
  const newLocalTime = new Date(date1.getTime() - date2.getTime())
  const newUTCTimeStamp = (newLocalTime.getTime() + newLocalTime.getTimezoneOffset() * 60 * 1000)
  return new Date(newUTCTimeStamp)
}

export const getDaysDifference = (date1: Date, date2: Date) => {
  const diffInMillisec = getDateDifference(date1, date2).getTime()
  return diffInMillisec / (1000 * 60 * 60 * 24)
}

export const getHoursDifference = (date1: Date, date2: Date) => {
  const diffInMillisec = getDateDifference(date1, date2).getTime()
  return diffInMillisec / (1000 * 60 * 60)
}

export const getMinutesDifference = (date1: Date, date2: Date) => {
  const diffInMillisec = getDateDifference(date1, date2).getTime()
  return diffInMillisec / (1000 * 60)
}

export const getSecondsDifference = (date1: Date, date2: Date) => {
  const diffInMillisec = getDateDifference(date1, date2).getTime()
  return diffInMillisec / 1000
}

export const getMillisecondsBetweenDates = (first: Date, second: Date) => {
  return second.getTime() - first.getTime()
}

export const getMillisecondsSinceDate = (date: Date) => {
  return getMillisecondsBetweenDates(date, new Date())
}

export const getSecondsSinceDate = (date: Date) => {
  return getMillisecondsSinceDate(date) / 1000
}

export const getMinutesSinceDate = (date: Date) => {
  return getSecondsSinceDate(date) / 60
}

export const getHoursSinceDate = (date: Date) => {
  return getMinutesSinceDate(date) / 60
}

export const getDaysSinceDate = (date: Date) => {
  return getHoursSinceDate(date) / 24
}

const addZeroPaddingToNumber = (figure: number) => {
  const stringFigure = figure.toString()
  return stringFigure.length < 2 ? '0' + stringFigure : stringFigure
}

export const formatDate = (date: Date, addSeconds = true) => {
  const hours = addZeroPaddingToNumber(date.getHours())
  const minutes = addZeroPaddingToNumber(date.getMinutes())
  const seconds = addZeroPaddingToNumber(date.getSeconds())

  return addSeconds ? hours + ':' + minutes + ':' + seconds :  hours + ':' + minutes
}

export const oneHourValue = 60 * 60 * 1000 /* ms */

if (!Date.prototype.oneHourValue) {
  Date.prototype.oneHourValue = oneHourValue
}

export const oneMinuteValue = 60 * 1000 /* ms */

if (!Date.prototype.oneMinuteValue) {
  Date.prototype.oneMinuteValue = oneMinuteValue
}

export enum Month {
  January = 0,
  February = 1,
  March = 2,
  April = 3,
  May = 4,
  June = 5,
  July = 6,
  August = 7,
  September = 8,
  October = 9,
  November = 10,
  December = 11,
}

export const getUTCTimeStamp = (year: number, month: Month, day: number, hours = 0): number => {
  return new Date(Date.UTC(year, month, day, hours)).getTime()
}

export const getLocalTimeStamp = (year: number, month: Month, day: number, hours = 0): number => {
  return new Date(year, month, day, hours).getTime()
}

export const getTimezoneAgnosticDayFromDate = (date: Date): number => date.getFullYear() * 10000 + date.getMonth() * 100 + date.getDate()

export const getDayFromTimezoneAgnosticDate = (date: number): number => date % 100
export const getYearFromTimezoneAgnosticDate = (date: number): number => Math.trunc(date / 10000)
export const getMonthFromTimezoneAgnosticDate = (date: number): number => Math.trunc(date / 100) % 100
export const getLocalDateObjectFromTimezoneAgnostic = (input: number): Date => {
  const year = getYearFromTimezoneAgnosticDate(input)
  const months = getMonthFromTimezoneAgnosticDate(input)
  const day = getDayFromTimezoneAgnosticDate(input)
  return new Date(year, months, day)
}

const knownMonthEndDates = new Set([31, 129, 231, 330, 431, 530, 631, 731, 830, 931, 1030])
export const isLeapYear = (year: number): boolean => year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)
export const getFollowingTimeZoneAgnosticDay = (baseDate: number): number => {
  const dateWithoutYear = baseDate % 10000
  const year = getYearFromTimezoneAgnosticDate(baseDate)
  if (dateWithoutYear === 1131) {
    return (year + 1) * 10000 + 1
  } else if (knownMonthEndDates.has(dateWithoutYear) || (dateWithoutYear === 128 && !isLeapYear(year))) {
    const month = getMonthFromTimezoneAgnosticDate(baseDate)
    return year * 10000 + (month + 1) * 100 + 1
  } else {
    return baseDate + 1
  }
}

const knownMonthEndDatesForStartDates: { readonly [key: number]: number } = {
  101: 31,
  301: 231,
  401: 330,
  501: 431,
  601: 530,
  701: 631,
  801: 731,
  901: 830,
  1001: 931,
  1101: 1030,
}
export const getPreviousTimeZoneAgnosticDay = (baseDate: number): number => {
  const dateWithoutYear = baseDate % 10000
  const year = getYearFromTimezoneAgnosticDate(baseDate)
  if (dateWithoutYear === 1) {
    return (year - 1) * 10000 + 1131
  } else if (knownMonthEndDatesForStartDates[dateWithoutYear] != null) {
    return year * 10000 + knownMonthEndDatesForStartDates[dateWithoutYear]
  } else if (dateWithoutYear === 201) {
    const februaryEnd = isLeapYear(year) ? 129 : 128
    return year * 10000 + februaryEnd
  } else {
    return baseDate - 1
  }
}

export const isTimezoneAgnosticPreviousDay = (baseDate: number, comparisonDate: number): boolean => {
  return baseDate === getFollowingTimeZoneAgnosticDay(comparisonDate)
}

export const getLastSevenTimeZoneAgnosticDays = (baseDate: number): number[] => {
  return range(0, 6).reduce((accum) => {
    return [
      getPreviousTimeZoneAgnosticDay(accum[0]),
      ...accum,
    ]
  }, [baseDate])
}
