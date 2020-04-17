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
const knownMonthEndDates = new Set([31, 231, 330, 431, 530, 631, 731, 830, 931, 1030, 1131]);
exports.isTimezoneAgnosticPreviousDay = (baseDate, comparisionDate) => {
    if (baseDate === comparisionDate) {
        return false;
    }
    const baseDateYearMonth = Math.trunc(baseDate / 100);
    const comparisionDateYearMonth = Math.trunc(comparisionDate / 100);
    if (baseDateYearMonth === comparisionDateYearMonth) {
        return exports.getDayFromTimezoneAgnosticDate(baseDate) - exports.getDayFromTimezoneAgnosticDate(comparisionDate) === 1;
    }
    const baseDateDay = exports.getDayFromTimezoneAgnosticDate(baseDate);
    const baseDateMonth = exports.getMonthFromTimezoneAgnosticDate(baseDate);
    const baseDateYear = exports.getYearFromTimezoneAgnosticDate(baseDate);
    const comparisionDateMonth = exports.getMonthFromTimezoneAgnosticDate(comparisionDate);
    const comparisionDateYear = exports.getYearFromTimezoneAgnosticDate(comparisionDate);
    if (baseDateYear === comparisionDateYear && baseDateMonth - comparisionDateMonth === 1 && baseDateDay === 1 && knownMonthEndDates.has(comparisionDate % 1000)) {
        // end of ordinal month
        return true;
    }
    else if (baseDateYear - comparisionDateYear === 1 && baseDateMonth === 0 && comparisionDateMonth === 11 && baseDateDay === 1 && exports.getDayFromTimezoneAgnosticDate(comparisionDate) === 31) {
        // end of year
        return true;
    }
    else if (baseDateYear === comparisionDateYear && baseDateMonth === 2 && comparisionDateMonth === 1 && baseDateDay === 1) {
        // end of february
        const baseDateObject = exports.getLocalDateObjectFromTimezoneAgnostic(baseDate);
        const comparisionDateObject = exports.getLocalDateObjectFromTimezoneAgnostic(comparisionDate);
        comparisionDateObject.setDate(exports.getDayFromTimezoneAgnosticDate(comparisionDate) + 1);
        return baseDateObject.getTime() === comparisionDateObject.getTime();
    }
    return false;
};
