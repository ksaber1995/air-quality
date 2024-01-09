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
    { rounded: true, name: 'PM2_5', values: [getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber()] },
    { rounded: true, name: 'PM10', values: [getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber()] },
    { rounded: true, name: 'CO', values: [getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber()] },
    { rounded: true, name: 'NO2', values: [getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber()] },
    { rounded: true, name: 'O3', values: [getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber()] },
    { rounded: true, name: 'SO2', values: [getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber()] },
    { name: 'windDirection', values: [getRandomNumber(360), getRandomNumber(360), getRandomNumber(360), getRandomNumber(360), getRandomNumber(360), getRandomNumber(360)] },
    { name: 'windSpeed', values: [getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber()] },
    { name: 'temperature', values: [getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber()] },
    { name: 'humidity', values: [getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber()] }
]


function getRandomNumber(max = 1000) {
    return Math.ceil(Math.random() * max)
}
