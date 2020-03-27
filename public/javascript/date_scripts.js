'use strict'

function customDateFormat(date) {
    let yy = date.getFullYear();
    let mm = date.toLocaleString("default", {month: "long"});
    let dd = date.getDate();

    return `${mm} ${dd}, ${yy}`
}

function getLastDateOfMonth(date) {
    let month_end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return month_end;
}
