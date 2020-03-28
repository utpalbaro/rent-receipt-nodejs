'use strict'

/**
 * @param date The date you want the last date of the month of
 * @returns The end date of the month
 */
let getLastDateOfMonth = function (date) {
    let month_end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return month_end;
}

/**
 * Monthwise
 * @param start_date The starting date
 * @param end_date The ending date
 * @param frequency Valid values are, 'daily', 'monthly', 'yearly'
 * @returns The list of Dates, with date set as 1
 */
// export this function
let getDatesBetweenDates = function (start_date, end_date, frequency) {
    let dates = [];
    switch (frequency.toLowerCase())
    {
        case 'monthly':
            getMonthlyDates(start_date, end_date, dates);
            break;
        default:
            break;
    }

    return dates;
}

let customDateFormat = function(date) {
    yy = date.getFullYear();
    mm = date.toLocaleString("default", {month: "long"});
    dd = date.getDate();

    return `${mm} ${dd}, ${yy}`
}

function getMonthlyDates(start_date, end_date, dates) {

    if (start_date > end_date)
        return;

    let datesObj = {};
    
    datesObj['start_date'] = start_date;

    let current_date = new Date(start_date.getTime());

    while (current_date <= end_date) {
        current_date = new Date(current_date.getFullYear(), current_date.getMonth() + 1, 1);
        datesObj['end_date'] = getLastDateOfMonth(current_date);
        datesObj['assessment_date'] = current_date;
    }
}

module.exports = { 
    getLastDateOfMonth: getLastDateOfMonth,
    getDatesBetweenDates: getDatesBetweenDates,
    customDateFormat: customDateFormat,
};