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
    let delta = 1;  // default is monthly
    switch (frequency.toLowerCase())
    {
        case 'monthly':
            delta = 1;
            break;
        case 'quarterly':
            delta = 3;
            break;
        case 'biennially':
            delta = 6;
            break;
        case 'annually':
            delta = 12;
            break;
        default:
            break;
    }

    getDatesBetween(start_date, end_date, delta, dates);
    return dates;
}

let customDateFormat = function(date) {
    let yy = date.getFullYear();
    let mm = date.toLocaleString("default", {month: "long"});
    let dd = date.getDate();

    return `${mm} ${dd}, ${yy}`
}

function getDatesBetween(start_date, end_date, delta, dates) {
    if (start_date > end_date)
        return;

    let datesObj = {};

    let current_date = new Date(start_date.getTime());

    while (current_date <= end_date) {
        // start_date is the start of the month
        datesObj.start_date = customDateFormat(current_date);

        // end_date is one day less than the starting date of the next month
        current_date = new Date(current_date.getFullYear(), current_date.getMonth() + delta, 0);
        datesObj.end_date = customDateFormat(current_date);

        current_date.setDate(current_date.getDate() + 1);
        datesObj.assessment_date = customDateFormat(current_date);

        datesObj.duration = delta;

        dates.push(Object.assign({}, datesObj));
    }

    // set the end_date to the user supplied date
    dates[dates.length - 1].end_date = customDateFormat(end_date);

    // set the assessment date to one day after the user supplied end_date
    current_date = new Date(end_date.getTime());
    current_date.setDate(end_date.getDate() + 1);
    dates[dates.length - 1].assessment_date = customDateFormat(current_date);

    // fix the duration if less than delta
    let difference = diffInMonths(start_date, end_date);
    dates[dates.length - 1].duration = difference < delta ? difference : delta;
}

function diffInMonths(start_date, end_date) {
    return Math.ceil((end_date - start_date)/(60*60*24*30*1000))
}

module.exports = { 
    getLastDateOfMonth: getLastDateOfMonth,
    getDatesBetweenDates: getDatesBetweenDates,
    customDateFormat: customDateFormat,
};