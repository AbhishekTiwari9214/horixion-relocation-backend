const dbrequest = require('./dbrequest')



function weekList(startDate, endDate, currentWeek) {
    let acc = []
    currentWeek = currentWeek ? currentWeek : 1;
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        if (currentDate.getDay() !== 0) { // Exclude Sundays
            acc.push({ taskName: '', taskDate: currentDate.toISOString(), hours: 0, description: '', submitted: 0, addedOn: '', submitedOn: '', week: currentWeek })
        }
        currentDate.setDate(currentDate.getDate() + 1);

        if (currentDate.getDay() === 1) { // If Monday, increment the week number
            currentWeek++;
        }
    }
    return acc
}



// function getWeekOfMonth(startDate,endDate) {
//     let currentWeek = 1;
//     let currentDate = new Date(startDate);

//     while (currentDate <= endDate) {
//         if (currentDate.getDay() !== 0) { // Exclude Sundays
//             console.log(`Week ${currentWeek}: ${currentDate.toDateString()} to `);
//         }
//         currentDate.setDate(currentDate.getDate() + 1);

//         if (currentDate.getDay() === 1) { // If Monday, increment the week number
//             console.log(`${currentDate.toDateString()}`);
//             currentWeek++;
//         }
//     }
//     return Math.ceil((dayOfMonth + offset - 1) / 7);
// }
// function getWeekOfMonth(date) {
//     const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
//     const firstWeekdayOfMonth = firstDayOfMonth.getDay() === 0 ? 7 : firstDayOfMonth.getDay(); // Adjust if Sunday is the first day of the week
//     const startingWeekday = 1; // Monday
//     const offset = (startingWeekday - firstWeekdayOfMonth + 7) % 7;
//     const dayOfMonth = date.getDate();

//     // Exclude Sundays from the calculation
//     if (date.getDay() === 0) {
//         return null;
//     }

//     return Math.ceil((dayOfMonth + offset - 1) / 7);
// }

// let weekList = (studentList,currentDay, endDate) => {
//     const today = new Date();
//     let fixeddate=currentDay?currentDay:1
//     const currentYear = today.getFullYear();
//     const currentMonth = today.getMonth();
//     let acc=`insert into students.timesheet (emailId,taskDate,week)values`
//     // Get the number of days in the current month
//     const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

//     // Loop through each day of the month
//     studentList.map((item,i)=>{
//     for (let day = currentDay?currentDay:1; day <= daysInMonth; day++) {
//         const currentDate = new Date(currentYear, currentMonth, day);
//         const weekOfMonth = getWeekOfMonth(currentDate);
//         if (weekOfMonth !== null) {
//             if(i==0 && (day==fixeddate)){
//                 acc+=`('${item.emailId}','${currentDate.toISOString()}',${weekOfMonth})`
//             }else{
//             acc+=`,('${item.emailId}','${currentDate.toISOString()}',${weekOfMonth})`

//             }
//         }
//     }

//     })

//     dbrequest(acc).then(data=>{
//         console.log('timesheet added');
//     }).catch(err => console.log(err));

// }


module.exports = weekList

/*// Function to get the week number of the month for a given date, excluding Sundays
function getWeeksInRange(startDate, endDate) {
    let currentWeek = 1;
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        if (currentDate.getDay() !== 0) { // Exclude Sundays
            console.log(`Week ${currentWeek}: ${currentDate.toDateString()} to `);
        }
        currentDate.setDate(currentDate.getDate() + 1);

        if (currentDate.getDay() === 1) { // If Monday, increment the week number
            console.log(`${currentDate.toDateString()}`);
            currentWeek++;
        }
    }
}

// Example usage:
const startDate = new Date(2024, 2, 5); // February 1, 2024
const endDate = new Date(2024, 2, 29); // February 29, 2024

getWeeksInRange(startDate, endDate);*/



/*
// Function to get the week difference between a start date and a submitted date
function getWeekDifference(startDate, submittedDate) {
    // Adjust the start date to the nearest Monday
    const startDay = startDate.getDay(); // 0 (Sunday) to 6 (Saturday)
    const adjustedStartDate = new Date(startDate);
    adjustedStartDate.setDate(startDate.getDate() + (startDay === 0 ? 1 : (8 - startDay)));

    // Adjust the submitted date to the nearest Monday
    const submittedDay = submittedDate.getDay(); // 0 (Sunday) to 6 (Saturday)
    const adjustedSubmittedDate = new Date(submittedDate);
    adjustedSubmittedDate.setDate(submittedDate.getDate() + (submittedDay === 0 ? 1 : (8 - submittedDay)));

    // Calculate the difference in weeks
    const millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
    const weekDifference = Math.round((adjustedSubmittedDate - adjustedStartDate) / millisecondsPerWeek);

    return weekDifference;
}

// Example usage:a
const startDate = new Date(2024, 1, 15); // January 1, 2024

// Example submitted dates2
const submittedDate1 = new Date(2024, 1, 18); // Wednesday
 // Monday
console.log(`Week difference for submittedDate1: ${getWeekDifference(startDate, submittedDate1)}`);

*/