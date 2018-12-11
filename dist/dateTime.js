"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
if (!Date.prototype.addSeconds) {
    Date.prototype.addSeconds = function (seconds) {
        return exports.addSecondsToDate(this, seconds);
    };
}
exports.addSecondsToDate = (date, seconds) => {
    return new Date(date.getTime() + seconds * 1000);
};
if (!Date.prototype.addMinutes) {
    Date.prototype.addMinutes = function (minutes) {
        return exports.addMinutesToDate(this, minutes);
    };
}
exports.addMinutesToDate = (date, minutes) => {
    return exports.addSecondsToDate(date, minutes * 60);
};
if (!Date.prototype.addHours) {
    Date.prototype.addHours = function (hours) {
        return exports.addHoursToDate(this, hours);
    };
}
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
exports.getHoursDifference = (date1, date2) => {
    const diffInMillisec = exports.getDateDifference(date1, date2).getTime();
    return diffInMillisec / (1000 * 60 * 60);
};
exports.getMinutesDifference = (date1, date2) => {
    const diffInMillisec = exports.getDateDifference(date1, date2).getTime();
    return diffInMillisec / (1000 * 60);
};
exports.getSecondsDifference = (date1, date2) => {
    const diffInMillisec = exports.getDateDifference(date1, date2).getTime();
    return diffInMillisec / 1000;
};
exports.getMillisecondsBetweenDates = (first, second) => {
    return second.getTime() - first.getTime();
};
exports.getMillisecondsSinceDate = (date) => {
    return exports.getMillisecondsBetweenDates(date, new Date());
};
exports.getSecondsSinceDate = (date) => {
    return exports.getMillisecondsSinceDate(date) / 1000;
};
exports.getMinutesSinceDate = (date) => {
    return exports.getSecondsSinceDate(date) / 60;
};
exports.getHoursSinceDate = (date) => {
    return exports.getMinutesSinceDate(date) / 60;
};
exports.getDaysSinceDate = (date) => {
    return exports.getHoursSinceDate(date) / 24;
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
if (!Date.prototype.oneHourValue) {
    Date.prototype.oneHourValue = exports.oneHourValue;
}
exports.oneMinuteValue = 60 * 1000; /* ms */
if (!Date.prototype.oneMinuteValue) {
    Date.prototype.oneMinuteValue = exports.oneMinuteValue;
}
exports.getTimeStamp = (year, month, day, hours = 0) => {
    return new Date(Date.UTC(year, month, day, hours)).getTime();
};
exports.getFirstDayOfTheWeek = (date) => {
    const copyDate = new Date(date);
    const firstDay = copyDate.getDate() - copyDate.getDay() + (copyDate.getDay() === 0 ? -6 : 1);
    return new Date(copyDate.setDate(firstDay));
};
exports.getMidnightFromDate = (date) => {
    const copyDate = new Date(date);
    return new Date(copyDate.setUTCHours(0, 0, 0, 0));
};
exports.getStartOfTheWeek = (date) => {
    const firstDay = exports.getFirstDayOfTheWeek(date);
    return exports.getMidnightFromDate(firstDay);
};
exports.getPreviousDay = (date) => {
    const copyDate = new Date(date);
    return new Date(copyDate.setDate(copyDate.getDate() - 1));
};
