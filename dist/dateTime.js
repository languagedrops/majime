"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSecondsToDate = (date, seconds) => {
    return new Date(date.getTime() + seconds * 1000);
};
exports.addMinutesToDate = (date, minutes) => {
    return exports.addSecondsToDate(date, minutes * 60);
};
exports.addHoursToDate = (date, hours) => {
    return exports.addMinutesToDate(date, hours * 60);
};
exports.addDaysToDate = (date, days) => {
    return exports.addHoursToDate(date, days * 24);
};
exports.getDateDifference = (date1, date2) => {
    const newLocalTime = new Date(date1.getTime() - date2.getTime());
    const newUTCTimeStamp = (newLocalTime.getTime() + newLocalTime.getTimezoneOffset() * 60 * 1000);
    return new Date(newUTCTimeStamp);
};
exports.getDaysDifference = (date1, date2) => {
    const diffInMillisec = exports.getDateDifference(date1, date2).getTime();
    return diffInMillisec / (1000 * 60 * 60 * 24);
};
exports.getMillisecondsBetweenDates = (first, second) => {
    return second.getTime() - first.getTime();
};
exports.getMillisecondsSinceDate = (date) => {
    return exports.getMillisecondsBetweenDates(date, new Date());
};
const addZeroPaddingToNumber = (figure) => {
    const stringFigure = figure.toString();
    return stringFigure.length < 2 ? '0' + stringFigure : stringFigure;
};
exports.formatDate = (date, addSeconds = true) => {
    const hours = addZeroPaddingToNumber(date.getHours());
    const minutes = addZeroPaddingToNumber(date.getMinutes());
    const seconds = addZeroPaddingToNumber(date.getSeconds());
    return addSeconds ? hours + ':' + minutes + ':' + seconds : hours + ':' + minutes;
};
exports.oneHourValue = 60 * 60 * 1000; /* ms */
exports.oneMinuteValue = 60 * 1000; /* ms */
exports.getTimeStamp = (year, month, day, hours = 0) => {
    return new Date(Date.UTC(year, month, day, hours)).getTime();
};
