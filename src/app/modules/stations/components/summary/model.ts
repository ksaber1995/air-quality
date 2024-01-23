export const Header = [
    '3am',
    '4am',
    '5am',
    '6am',
    '7am',
    '8am',
]


export interface AirItem {
    PM2_5: number,
    PM10: number,
    CO: number,
    NO2: number,
    O3: number,
    SO2: number,
    windDirection: number,
    windSpeed: number,
    temperature: number,
    humidity: number
}



export const testItem = [
    { rounded: true, name: 'PM2_5', values: [{value: getRandomNumber()}, {value: getRandomNumber()}, {value: getRandomNumber()}, {value: getRandomNumber()}, {value: getRandomNumber()}, {value: getRandomNumber()}] },
    { rounded: true, name: 'PM10', values: [{value: getRandomNumber()}, {value: getRandomNumber()}, {value: getRandomNumber()}, {value: getRandomNumber()}, {value: getRandomNumber()}, {value: getRandomNumber()}] },
    { rounded: true, name: 'CO', values: [{value: getRandomNumber()}, {value: getRandomNumber()}, {value: getRandomNumber()}, {value: getRandomNumber()}, {value: getRandomNumber()}, {value: getRandomNumber()}] },
    { rounded: true, name: 'NO2', values: [{value: getRandomNumber()}, {value: getRandomNumber()}, {value: getRandomNumber()}, {value: getRandomNumber()}, {value: getRandomNumber()}, {value: getRandomNumber()}] },
    { rounded: true, name: 'O3', values: [{value: getRandomNumber()}, {value: getRandomNumber()}, {value: getRandomNumber()}, {value: getRandomNumber()}, {value: getRandomNumber()}, {value: getRandomNumber()}] },
    { rounded: true, name: 'SO2', values: [{value: getRandomNumber()}, {value: getRandomNumber()}, {value: getRandomNumber()}, {value: getRandomNumber()}, {value: getRandomNumber()}, {value: getRandomNumber()}] },
    { name: 'windDirection', values: [{value: getRandomNumber(360)}, {value: getRandomNumber(360)}, {value: getRandomNumber(360)}, {value: getRandomNumber(360)}, {value: getRandomNumber(360)}, {value: getRandomNumber(360)}] },
    { name: 'windSpeed', values: [{value: getRandomNumber()}, {value: getRandomNumber()}, {value: getRandomNumber()}, {value: getRandomNumber()}, {value: getRandomNumber()}, {value: getRandomNumber()}] },
    { name: 'temperature', values: [{value: getRandomNumber()}, {value: getRandomNumber()}, {value: getRandomNumber()}, {value: getRandomNumber()}, {value: getRandomNumber()}, {value: getRandomNumber()}] },
    { name: 'humidity', values: [{value: getRandomNumber()}, {value: getRandomNumber()}, {value: getRandomNumber()}, {value: getRandomNumber()}, {value: getRandomNumber()}, {value: getRandomNumber()}] }
]


export function getRandomNumber(max = 1000) {
    return Math.ceil(Math.random() * max)
}
