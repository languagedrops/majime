"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const standard_1 = require("./standard");
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
exports.getUTCTimeStamp = (year, month, day, hours = 0) => {
    return new Date(Date.UTC(year, month, day, hours)).getTime();
};
exports.getLocalTimeStamp = (year, month, day, hours = 0) => {
    return new Date(year, month, day, hours).getTime();
};
exports.getTimezoneAgnosticDayFromDate = (date) => date.getFullYear() * 10000 + date.getMonth() * 100 + date.getDate();
exports.getDayFromTimezoneAgnosticDate = (date) => date % 100;
exports.getYearFromTimezoneAgnosticDate = (date) => Math.trunc(date / 10000);
exports.getMonthFromTimezoneAgnosticDate = (date) => Math.trunc(date / 100) % 100;
exports.getLocalDateObjectFromTimezoneAgnostic = (input) => {
    const year = exports.getYearFromTimezoneAgnosticDate(input);
    const months = exports.getMonthFromTimezoneAgnosticDate(input);
    const day = exports.getDayFromTimezoneAgnosticDate(input);
    return new Date(year, months, day);
};
const knownMonthEndDates = new Set([31, 129, 231, 330, 431, 530, 631, 731, 830, 931, 1030]);
exports.isLeapYear = (year) => year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
exports.getFollowingTimeZoneAgnosticDay = (baseDate) => {
    const dateWithoutYear = baseDate % 10000;
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
exports.getPreviousTimeZoneAgnosticDay = (baseDate) => {
    const dateWithoutYear = baseDate % 10000;
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
exports.isTimezoneAgnosticPreviousDay = (baseDate, comparisonDate) => {
    return baseDate === exports.getFollowingTimeZoneAgnosticDay(comparisonDate);
};
exports.getLastNTimeZoneAgnosticDays = (baseDate, numberOfDays) => {
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
exports.getFollowingNTimeZoneAgnosticDays = (baseDate, numberOfDays) => {
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
exports.getTimeZoneAgnosticDatesBetweenDates = (smallerDate, higherDate) => {
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
exports.getTimeZoneAgnosticDaysDifference = (smallerDate, higherDate) => {
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
