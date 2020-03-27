'use strict'

function validateDate() {
    let start_date = new Date(document.getElementById("start_date").value);
    let end_date = new Date(document.getElementById("end_date").value);

    if (start_date > end_date) {
        alert("End date cannot be less than start date");
        return false;
    }
    return true;
}