export const addSecondsToDate = (date: Date, seconds: number) => {
  return new Date(date.getTime() + seconds * 1000)
}

export const addMinutesToDate = (date: Date, minutes: number) => {
  return addSecondsToDate(date, minutes * 60)
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
export const oneMinuteValue = 60 * 1000 /* ms */


export const getTimeStamp = (year: number, month: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11, day: number, hours = 0): number => {
  return new Date(Date.UTC(year, month, day, hours)).getTime()
}
