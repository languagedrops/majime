"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentDayOrDaysTillNextSunday = exports.getCurrentDayOrDaysTillPreviousMonday = exports.getTimeZoneAgnosticDaysDifference = exports.getTimeZoneAgnosticDatesBetweenDates = exports.getFollowingNTimeZoneAgnosticDays = exports.getLastNTimeZoneAgnosticDays = exports.isTimezoneAgnosticPreviousDay = exports.getPreviousTimeZoneAgnosticDay = exports.getLastDayOfMonth = exports.getFollowingTimeZoneAgnosticDay = exports.isLeapYear = exports.getLocalDateObjectFromTimezoneAgnostic = exports.getFirstDayOfMonth = exports.getDateWithoutDayFromTimezoneAgnosticDate = exports.getDateWithoutYearFromTimezoneAgnosticDate = exports.getMonthFromTimezoneAgnosticDate = exports.getYearFromTimezoneAgnosticDate = exports.getDayFromTimezoneAgnosticDate = exports.getTimezoneAgnosticDayFromDate = exports.getLocalTimeStamp = exports.getUTCTimeStamp = exports.Month = exports.oneMinuteValue = exports.oneHourValue = exports.formatDate = exports.getDaysSinceDate = exports.getHoursSinceDate = exports.getMinutesSinceDate = exports.getSecondsSinceDate = exports.getMillisecondsSinceDate = exports.getMillisecondsBetweenDates = exports.getSecondsDifference = exports.getMinutesDifference = exports.getHoursDifference = exports.getDaysDifference = exports.getDateDifference = exports.addDaysToDate = exports.addHoursToDate = exports.addMinutesToDate = exports.addSecondsToDate = void 0;
const standard_1 = require("./standard");
if (!Date.prototype.addSeconds) {
    Date.prototype.addSeconds = function (seconds) {
        return exports.addSecondsToDate(this, seconds);
    };
}
const addSecondsToDate = (date, seconds) => {
    return new Date(date.getTime() + seconds * 1000);
};
exports.addSecondsToDate = addSecondsToDate;
if (!Date.prototype.addMinutes) {
    Date.prototype.addMinutes = function (minutes) {
        return exports.addMinutesToDate(this, minutes);
    };
}
const addMinutesToDate = (date, minutes) => {
    return exports.addSecondsToDate(date, minutes * 60);
};
exports.addMinutesToDate = addMinutesToDate;
if (!Date.prototype.addHours) {
    Date.prototype.addHours = function (hours) {
        return exports.addHoursToDate(this, hours);
    };
}
const addHoursToDate = (date, hours) => {
    return exports.addMinutesToDate(date, hours * 60);
};
exports.addHoursToDate = addHoursToDate;
const addDaysToDate = (date, days) => {
    return exports.addHoursToDate(date, days * 24);
};
exports.addDaysToDate = addDaysToDate;
const getDateDifference = (date1, date2) => {
    const newLocalTime = new Date(date1.getTime() - date2.getTime());
    const newUTCTimeStamp = (newLocalTime.getTime() + newLocalTime.getTimezoneOffset() * 60 * 1000);
    return new Date(newUTCTimeStamp);
};
exports.getDateDifference = getDateDifference;
const getDaysDifference = (date1, date2) => {
    const diffInMillisec = exports.getDateDifference(date1, date2).getTime();
    return diffInMillisec / (1000 * 60 * 60 * 24);
};
exports.getDaysDifference = getDaysDifference;
const getHoursDifference = (date1, date2) => {
    const diffInMillisec = exports.getDateDifference(date1, date2).getTime();
    return diffInMillisec / (1000 * 60 * 60);
};
exports.getHoursDifference = getHoursDifference;
const getMinutesDifference = (date1, date2) => {
    const diffInMillisec = exports.getDateDifference(date1, date2).getTime();
    return diffInMillisec / (1000 * 60);
};
exports.getMinutesDifference = getMinutesDifference;
const getSecondsDifference = (date1, date2) => {
    const diffInMillisec = exports.getDateDifference(date1, date2).getTime();
    return diffInMillisec / 1000;
};
exports.getSecondsDifference = getSecondsDifference;
const getMillisecondsBetweenDates = (first, second) => {
    return second.getTime() - first.getTime();
};
exports.getMillisecondsBetweenDates = getMillisecondsBetweenDates;
const getMillisecondsSinceDate = (date) => {
    return exports.getMillisecondsBetweenDates(date, new Date());
};
exports.getMillisecondsSinceDate = getMillisecondsSinceDate;
const getSecondsSinceDate = (date) => {
    return exports.getMillisecondsSinceDate(date) / 1000;
};
exports.getSecondsSinceDate = getSecondsSinceDate;
const getMinutesSinceDate = (date) => {
    return exports.getSecondsSinceDate(date) / 60;
};
exports.getMinutesSinceDate = getMinutesSinceDate;
const getHoursSinceDate = (date) => {
    return exports.getMinutesSinceDate(date) / 60;
};
exports.getHoursSinceDate = getHoursSinceDate;
const getDaysSinceDate = (date) => {
    return exports.getHoursSinceDate(date) / 24;
};
exports.getDaysSinceDate = getDaysSinceDate;
const addZeroPaddingToNumber = (figure) => {
    const stringFigure = figure.toString();
    return stringFigure.length < 2 ? '0' + stringFigure : stringFigure;
};
const formatDate = (date, addSeconds = true) => {
    const hours = addZeroPaddingToNumber(date.getHours());
    const minutes = addZeroPaddingToNumber(date.getMinutes());
    const seconds = addZeroPaddingToNumber(date.getSeconds());
    return addSeconds ? hours + ':' + minutes + ':' + seconds : hours + ':' + minutes;
};
exports.formatDate = formatDate;
exports.oneHourValue = 60 * 60 * 1000; /* ms */
if (!Date.prototype.oneHourValue) {
    Date.prototype.oneHourValue = exports.oneHourValue;
}
exports.oneMinuteValue = 60 * 1000; /* ms */
if (!Date.prototype.oneMinuteValue) {
    Date.prototype.oneMinuteValue = exports.oneMinuteValue;
}
var Month;
(function (Month) {
    Month[Month["January"] = 0] = "January";
    Month[Month["February"] = 1] = "February";
    Month[Month["March"] = 2] = "March";
    Month[Month["April"] = 3] = "April";
    Month[Month["May"] = 4] = "May";
    Month[Month["June"] = 5] = "June";
    Month[Month["July"] = 6] = "July";
    Month[Month["August"] = 7] = "August";
    Month[Month["September"] = 8] = "September";
    Month[Month["October"] = 9] = "October";
    Month[Month["November"] = 10] = "November";
    Month[Month["December"] = 11] = "December";
})(Month = exports.Month || (exports.Month = {}));
const getUTCTimeStamp = (year, month, day, hours = 0) => {
    return new Date(Date.UTC(year, month, day, hours)).getTime();
};
exports.getUTCTimeStamp = getUTCTimeStamp;
const getLocalTimeStamp = (year, month, day, hours = 0) => {
    return new Date(year, month, day, hours).getTime();
};
exports.getLocalTimeStamp = getLocalTimeStamp;
const getTimezoneAgnosticDayFromDate = (date) => date.getFullYear() * 10000 + date.getMonth() * 100 + date.getDate();
exports.getTimezoneAgnosticDayFromDate = getTimezoneAgnosticDayFromDate;
const getDayFromTimezoneAgnosticDate = (date) => date % 100;
exports.getDayFromTimezoneAgnosticDate = getDayFromTimezoneAgnosticDate;
const getYearFromTimezoneAgnosticDate = (date) => Math.trunc(date / 10000);
exports.getYearFromTimezoneAgnosticDate = getYearFromTimezoneAgnosticDate;
const getMonthFromTimezoneAgnosticDate = (date) => Math.trunc(date / 100) % 100;
exports.getMonthFromTimezoneAgnosticDate = getMonthFromTimezoneAgnosticDate;
const getDateWithoutYearFromTimezoneAgnosticDate = (date) => date % 10000;
exports.getDateWithoutYearFromTimezoneAgnosticDate = getDateWithoutYearFromTimezoneAgnosticDate;
const getDateWithoutDayFromTimezoneAgnosticDate = (date) => Math.trunc(date / 100);
exports.getDateWithoutDayFromTimezoneAgnosticDate = getDateWithoutDayFromTimezoneAgnosticDate;
const getFirstDayOfMonth = (date) => exports.getDateWithoutDayFromTimezoneAgnosticDate(date) * 100 + 1;
exports.getFirstDayOfMonth = getFirstDayOfMonth;
const getLocalDateObjectFromTimezoneAgnostic = (input) => {
    const year = exports.getYearFromTimezoneAgnosticDate(input);
    const months = exports.getMonthFromTimezoneAgnosticDate(input);
    const day = exports.getDayFromTimezoneAgnosticDate(input);
    return new Date(year, months, day);
};
exports.getLocalDateObjectFromTimezoneAgnostic = getLocalDateObjectFromTimezoneAgnostic;
const knownMonthEndDates = new Set([31, 129, 231, 330, 431, 530, 631, 731, 830, 931, 1030]);
const isLeapYear = (year) => year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
exports.isLeapYear = isLeapYear;
const getFollowingTimeZoneAgnosticDay = (baseDate) => {
    const dateWithoutYear = exports.getDateWithoutYearFromTimezoneAgnosticDate(baseDate);
    const year = exports.getYearFromTimezoneAgnosticDate(baseDate);
    if (dateWithoutYear === 1131) {
        return (year + 1) * 10000 + 1;
    }
    else if (knownMonthEndDates.has(dateWithoutYear) || (dateWithoutYear === 128 && !exports.isLeapYear(year))) {
        const month = exports.getMonthFromTimezoneAgnosticDate(baseDate);
        return year * 10000 + (month + 1) * 100 + 1;
    }
    else {
        return baseDate + 1;
    }
};
exports.getFollowingTimeZoneAgnosticDay = getFollowingTimeZoneAgnosticDay;
const monthEndDatesForMonths = {
    0: 31,
    1: 28,
    2: 31,
    3: 30,
    4: 31,
    5: 30,
    6: 31,
    7: 31,
    8: 30,
    9: 31,
    10: 30,
    11: 31,
};
const getLastDayOfMonth = (baseDate) => {
    const year = exports.getYearFromTimezoneAgnosticDate(baseDate);
    const month = exports.getMonthFromTimezoneAgnosticDate(baseDate);
    if (month === 1 && exports.isLeapYear(year)) {
        return year * 10000 + month * 100 + 29;
    }
    else {
        return year * 10000 + month * 100 + monthEndDatesForMonths[month];
    }
};
exports.getLastDayOfMonth = getLastDayOfMonth;
const knownMonthEndDatesForStartDates = {
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
};
const getPreviousTimeZoneAgnosticDay = (baseDate) => {
    const dateWithoutYear = exports.getDateWithoutYearFromTimezoneAgnosticDate(baseDate);
    const year = exports.getYearFromTimezoneAgnosticDate(baseDate);
    if (dateWithoutYear === 1) {
        return (year - 1) * 10000 + 1131;
    }
    else if (knownMonthEndDatesForStartDates[dateWithoutYear] != null) {
        return year * 10000 + knownMonthEndDatesForStartDates[dateWithoutYear];
    }
    else if (dateWithoutYear === 201) {
        const februaryEnd = exports.isLeapYear(year) ? 129 : 128;
        return year * 10000 + februaryEnd;
    }
    else {
        return baseDate - 1;
    }
};
exports.getPreviousTimeZoneAgnosticDay = getPreviousTimeZoneAgnosticDay;
const isTimezoneAgnosticPreviousDay = (baseDate, comparisonDate) => {
    return baseDate === exports.getFollowingTimeZoneAgnosticDay(comparisonDate);
};
exports.isTimezoneAgnosticPreviousDay = isTimezoneAgnosticPreviousDay;
const getLastNTimeZoneAgnosticDays = (baseDate, numberOfDays) => {
    if (numberOfDays < 1) {
        return [];
    }
    return standard_1.range(0, numberOfDays - 1).reduce((accum) => {
        return [
            exports.getPreviousTimeZoneAgnosticDay(accum[0]),
            ...accum,
        ];
    }, [baseDate]);
};
exports.getLastNTimeZoneAgnosticDays = getLastNTimeZoneAgnosticDays;
const getFollowingNTimeZoneAgnosticDays = (baseDate, numberOfDays) => {
    if (numberOfDays < 1) {
        return [];
    }
    return standard_1.range(0, numberOfDays - 1).reduce((accum) => {
        return [
            ...accum,
            exports.getFollowingTimeZoneAgnosticDay(accum[accum.length - 1]),
        ];
    }, [baseDate]);
};
exports.getFollowingNTimeZoneAgnosticDays = getFollowingNTimeZoneAgnosticDays;
const getTimeZoneAgnosticDatesBetweenDates = (smallerDate, higherDate) => {
    if (smallerDate >= higherDate) {
        return [];
    }
    const result = [smallerDate];
    const maximumDate = exports.getPreviousTimeZoneAgnosticDay(higherDate);
    while (result[result.length - 1] < maximumDate) {
        result.push(exports.getFollowingTimeZoneAgnosticDay(result[result.length - 1]));
    }
    return result;
};
exports.getTimeZoneAgnosticDatesBetweenDates = getTimeZoneAgnosticDatesBetweenDates;
const getTimeZoneAgnosticDaysDifference = (smallerDate, higherDate) => {
    if (smallerDate === higherDate) {
        return 0;
    }
    if (smallerDate > higherDate) {
        return exports.getTimeZoneAgnosticDatesBetweenDates(higherDate, smallerDate).length * -1;
    }
    else {
        return exports.getTimeZoneAgnosticDatesBetweenDates(smallerDate, higherDate).length;
    }
};
exports.getTimeZoneAgnosticDaysDifference = getTimeZoneAgnosticDaysDifference;
const getCurrentDayOrDaysTillPreviousMonday = (baseDate) => {
    const dateObject = exports.getLocalDateObjectFromTimezoneAgnostic(baseDate);
    const dayOfTheWeek = dateObject.getDay();
    const numberOfDaysToBeReturned = dayOfTheWeek === 0 ? 7 : dayOfTheWeek;
    return exports.getLastNTimeZoneAgnosticDays(baseDate, numberOfDaysToBeReturned);
};
exports.getCurrentDayOrDaysTillPreviousMonday = getCurrentDayOrDaysTillPreviousMonday;
const getCurrentDayOrDaysTillNextSunday = (baseDate) => {
    const dateObject = exports.getLocalDateObjectFromTimezoneAgnostic(baseDate);
    const dayOfTheWeek = dateObject.getDay();
    const numberOfDaysToBeReturned = 8 - (dayOfTheWeek === 0 ? 7 : dayOfTheWeek);
    return exports.getFollowingNTimeZoneAgnosticDays(baseDate, numberOfDaysToBeReturned);
};
exports.getCurrentDayOrDaysTillNextSunday = getCurrentDayOrDaysTillNextSunday;
