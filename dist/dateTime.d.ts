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
export declare const getTimeStamp: (year: number, month: 0 | 2 | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 1 | 11, day: number, hours?: number) => number;
export declare const getFirstDayOfTheWeek: (date: Date) => Date;
export declare const getStartOfTheWeek: (date: Date) => Date;
