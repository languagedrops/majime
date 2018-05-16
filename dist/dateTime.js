export const addSecondsToDate = (date, seconds) => {
    return new Date(date.getTime() + seconds * 1000);
};
export const addMinutesToDate = (date, minutes) => {
    return addSecondsToDate(date, minutes * 60);
};
export const addHoursToDate = (date, hours) => {
    return addMinutesToDate(date, hours * 60);
};
export const addDaysToDate = (date, days) => {
    return addHoursToDate(date, days * 24);
};
export const getDateDifference = (date1, date2) => {
    const newLocalTime = new Date(date1.getTime() - date2.getTime());
    const newUTCTimeStamp = (newLocalTime.getTime() + newLocalTime.getTimezoneOffset() * 60 * 1000);
    return new Date(newUTCTimeStamp);
};
export const getDaysDifference = (date1, date2) => {
    const diffInMillisec = getDateDifference(date1, date2).getTime();
    return diffInMillisec / (1000 * 60 * 60 * 24);
};
export const getMillisecondsBetweenDates = (first, second) => {
    return second.getTime() - first.getTime();
};
export const getMillisecondsSinceDate = (date) => {
    return getMillisecondsBetweenDates(date, new Date());
};
const addZeroPaddingToNumber = (figure) => {
    const stringFigure = figure.toString();
    return stringFigure.length < 2 ? '0' + stringFigure : stringFigure;
};
export const formatDate = (date, addSeconds = true) => {
    const hours = addZeroPaddingToNumber(date.getHours());
    const minutes = addZeroPaddingToNumber(date.getMinutes());
    const seconds = addZeroPaddingToNumber(date.getSeconds());
    return addSeconds ? hours + ':' + minutes + ':' + seconds : hours + ':' + minutes;
};
export const oneHourValue = 60 * 60 * 1000; /* ms */
export const oneMinuteValue = 60 * 1000; /* ms */
export const getTimeStamp = (year, month, day, hours = 0) => {
    return new Date(Date.UTC(year, month, day, hours)).getTime();
};
