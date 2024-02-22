export function OmmanDate(dateString?) {
    const date  = dateString ? new Date(dateString ) : new Date();

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
  