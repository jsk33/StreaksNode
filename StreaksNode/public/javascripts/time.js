// declare constants here


// functions
let time = {
    init: function init() {

    },


}

time.init();

// desired behaviour:
// if the target items are not complete by midnight, the count should reset to zero
// make a target -> target gets a dueDate property that's set to midnight of today's date
// load app -> check dueDate of each item -> if passed, set the count to 0
// click complete -> increment counter -> set dueDate to midnight of tomorrow's date