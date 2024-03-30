export const WindConverter = (value: number) : string =>{
    if(value > 0 && value <= 45) return 'N';
    if(value > 45 && value <= 90) return 'NE';
    if(value > 90 && value <= 135) return 'E';
    if(value > 135 && value <= 180) return 'SE';
    if(value > 180 && value <= 225) return 'S';
    if(value > 225 && value <= 270) return 'SW';
    if(value > 270 && value <= 315) return 'W';
    if(value > 315 && value <= 360) return 'NW';

    return 'NA'
}