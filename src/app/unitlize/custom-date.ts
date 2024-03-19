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


export function FromOmmanDateUTC(date: Date) {

    // Get the current time in milliseconds
    var currentTime = date.getTime();

    // Define the UTC+4 offset in milliseconds (4 hours * 60 minutes * 60 seconds * 1000 milliseconds)
    var utc4Offset = 4 * 60 * 60 * 1000;

    // Adjust the time by adding the UTC+4 offset
    var utc4Time = new Date(currentTime - utc4Offset);

    return utc4Time;
}


export function formatTime(date: Date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();

    let period = hours < 12 ?  'am' : 'pm';
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12
    return hours + ':' + minutes + ' ' + period;
}

export function getTimeOnNumber(date: Date) {
    let hours = date.getHours();

    return hours
}


export function getDayName(index, lang) {
    const weekdaysEnglish = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekdaysArabic = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

    if(lang === 'ar'){
        return weekdaysArabic[index]

    }else{

        return weekdaysEnglish[index]
    }
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

    return date
}


export function formatDateYYMMDD(date: Date) {

    // Get year, month, and day components
    const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
    let month = (date.getMonth() + 1).toString(); // Month is 0-indexed, so add 1
    if (month.length === 1) {
        month = '0' + month; // Add leading zero if month is a single digit
    }
    let day = date.getDate().toString();
    if (day.length === 1) {
        day = '0' + day; // Add leading zero if day is a single digit
    }

    // Concatenate year, month, and day with no separators
    const formattedDate = day + '/' + month + '/' + year;

    return formattedDate;
}