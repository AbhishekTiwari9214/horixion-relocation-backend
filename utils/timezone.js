function indianTime(){
    let dateAndTime={}
    const standardTime = new Date(); 
    const targetTimeZone = 'Asia/Kolkata';
    const offsetDifference = standardTime.getTimezoneOffset() * 60000; 
    const targetTime = new Date(standardTime.getTime() + offsetDifference);
    const indianDate = standardTime.toLocaleDateString();
    const indianTimeStr = standardTime.toLocaleTimeString();
    const standardDate = targetTime.toLocaleDateString(undefined, { timeZone: targetTimeZone });
    const standardTimeStr = targetTime.toLocaleTimeString(undefined, { timeZone: targetTimeZone });
    dateAndTime['Standard_Date']= standardDate;
    dateAndTime['Standard_Time']= standardTimeStr;
    dateAndTime['Indian_Date']= indianDate;
    dateAndTime['Indian_Time']= indianTimeStr;
    return dateAndTime
}


function dateDifference(date1,date2){
    
if(!date1){
    date1 = new Date();
}else{
    date1 = new Date(date1);
}
if(!date2){
    date2 = new Date(new Date().getTime() + 5 * 60 * 60 * 1000 + 30 * 60 * 1000);
}else{
    date2 = new Date(date2);
}


const timeDifference = (date1 - date2);


const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
let difference={
    Days:days,
    Hours:hours,
    Minutes: minutes,
    Seconds: seconds
}
return difference
}







module.exports={indianTime,dateDifference}
