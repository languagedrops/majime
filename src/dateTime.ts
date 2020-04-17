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

const knownMonthEndDates = new Set([31, 231, 330, 431, 530, 631, 731, 830, 931, 1030, 1131])
export const isTimezoneAgnosticPreviousDay = (baseDate: number, comparisionDate: number): boolean => {
  if (baseDate === comparisionDate) { return false }
  const baseDateYearMonth = Math.trunc(baseDate / 100)
  const comparisionDateYearMonth = Math.trunc(comparisionDate / 100)


  if (baseDateYearMonth === comparisionDateYearMonth) {
    return getDayFromTimezoneAgnosticDate(baseDate) - getDayFromTimezoneAgnosticDate(comparisionDate) === 1
  }

  const baseDateDay = getDayFromTimezoneAgnosticDate(baseDate)
  const baseDateMonth = getMonthFromTimezoneAgnosticDate(baseDate)
  const baseDateYear = getYearFromTimezoneAgnosticDate(baseDate)
  const comparisionDateMonth = getMonthFromTimezoneAgnosticDate(comparisionDate)
  const comparisionDateYear = getYearFromTimezoneAgnosticDate(comparisionDate)
  if (baseDateYear === comparisionDateYear && baseDateMonth - comparisionDateMonth === 1 && baseDateDay === 1 && knownMonthEndDates.has(comparisionDate % 1000)) {
    // end of ordinal month
    return true
  } else if (baseDateYear - comparisionDateYear === 1 && baseDateMonth === 0 && comparisionDateMonth === 11 && baseDateDay === 1 && getDayFromTimezoneAgnosticDate(comparisionDate) === 31) {
    // end of year
    return true
  } else if (baseDateYear === comparisionDateYear && baseDateMonth === 2 && comparisionDateMonth === 1 && baseDateDay === 1) {
    // end of february
    const baseDateObject = getLocalDateObjectFromTimezoneAgnostic(baseDate)
    const comparisionDateObject = getLocalDateObjectFromTimezoneAgnostic(comparisionDate)
    comparisionDateObject.setDate(getDayFromTimezoneAgnosticDate(comparisionDate) + 1)

    return baseDateObject.getTime() === comparisionDateObject.getTime()
  }

  return false
}
