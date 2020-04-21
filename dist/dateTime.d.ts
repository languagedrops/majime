export {  };
declare global  {
    interface Date {
        oneHourValue: number;
        oneMinuteValue: number;
        addSeconds(seconds: number): Date;
        addMinutes(minutes: number): Date;
        addHours(hours: number): Date;
    }
}
export declare const addSecondsToDate: (date: Date, seconds: number) => Date;
export declare const addMinutesToDate: (date: Date, minutes: number) => Date;
export declare const addHoursToDate: (date: Date, hours: number) => Date;
export declare const addDaysToDate: (date: Date, days: number) => Date;
export declare const getDateDifference: (date1: Date, date2: Date) => Date;
export declare const getDaysDifference: (date1: Date, date2: Date) => number;
export declare const getHoursDifference: (date1: Date, date2: Date) => number;
export declare const getMinutesDifference: (date1: Date, date2: Date) => number;
export declare const getSecondsDifference: (date1: Date, date2: Date) => number;
export declare const getMillisecondsBetweenDates: (first: Date, second: Date) => number;
export declare const getMillisecondsSinceDate: (date: Date) => number;
export declare const getSecondsSinceDate: (date: Date) => number;
export declare const getMinutesSinceDate: (date: Date) => number;
export declare const getHoursSinceDate: (date: Date) => number;
export declare const getDaysSinceDate: (date: Date) => number;
export declare const formatDate: (date: Date, addSeconds?: boolean) => string;
export declare const oneHourValue: number;
export declare const oneMinuteValue: number;
export declare enum Month {
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
export declare const getUTCTimeStamp: (year: number, month: Month, day: number, hours?: number) => number;
export declare const getLocalTimeStamp: (year: number, month: Month, day: number, hours?: number) => number;
export declare const getTimezoneAgnosticDayFromDate: (date: Date) => number;
export declare const getDayFromTimezoneAgnosticDate: (date: number) => number;
export declare const getYearFromTimezoneAgnosticDate: (date: number) => number;
export declare const getMonthFromTimezoneAgnosticDate: (date: number) => number;
export declare const getLocalDateObjectFromTimezoneAgnostic: (input: number) => Date;
export declare const isLeapYear: (year: number) => boolean;
export declare const getFollowingTimeZoneAgnosticDay: (baseDate: number) => number;
export declare const getPreviousTimeZoneAgnosticDay: (baseDate: number) => number;
export declare const isTimezoneAgnosticPreviousDay: (baseDate: number, comparisonDate: number) => boolean;
export declare const getLastSevenTimeZoneAgnosticDays: (baseDate: number) => number[];
