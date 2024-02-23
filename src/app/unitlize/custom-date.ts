export function OmmanDate(dateString?) {
    const date = dateString ? new Date(dateString) : new Date(Date.now());
    
    // Get the current time in milliseconds
    var currentTime = date.getTime();

    // Define the UTC+4 offset in milliseconds (4 hours * 60 minutes * 60 seconds * 1000 milliseconds)
    var utc4Offset = 4 * 60 * 60 * 1000;

    // Adjust the time by adding the UTC+4 offset
    var utc4Time = new Date(currentTime + utc4Offset);

    return utc4Time;

}


export function formatTime(date: Date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();

    let period = hours < 12 ? 'am' : 'pm';
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12
    return hours + ':' + minutes + ' ' + period;
}

export function getTimeOnNumber(date: Date) {
    let hours = date.getHours();

    return hours
}



export function getDateOnNumber(targetDate: Date) {
    const dayName = getDayName(targetDate.getDay())
    const new_index = weeksEndsToday().findIndex(res=> res === dayName)
  
  

    console.log(new_index, 'new index')
    return new_index
}


export function weeksEndsToday() {
    const today = new Date();
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDayIndex = today.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday

    const weekdaysEndingToday = [];
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - (currentDayIndex - i));
        weekdaysEndingToday.push(
            weekdays[date.getDay()]
        );
    }


    return weekdaysEndingToday.reverse();
}

function getDayName(index){
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return weekdays[index]
}


export function daysSincePastDate(pastDate: Date): number {
    const currentDate = OmmanDate();
    const differenceInMilliseconds = currentDate.getTime() - pastDate.getTime();
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    return 32 - differenceInDays;
}



export function getDateNsDaysAgo(n) {
    const currentDate = OmmanDate();
    const nDaysAgo = OmmanDate(currentDate);
    nDaysAgo.setDate(currentDate.getDate() - n);
    const date = OmmanDate(nDaysAgo);

    const formattedDate = `${nDaysAgo.getDate()}/${nDaysAgo.getMonth() + 1}/${nDaysAgo.getFullYear()}`;
    return formattedDate
}