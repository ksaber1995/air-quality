interface ReadingStatus {
    sequence: number;
}

interface Reading {
    aggregated_at: string;
    status: ReadingStatus[];
}

interface Variable {
    id: number;
    abbreviation_en: string;
    name_en: string | null;
    name_ar: string | null;
}

interface Unit {
    code: string;
}

interface AqiData {
    aggregated_at: string;
    status: ReadingStatus[];
}

interface Aqi {
    variable: Variable;
    unit: Unit;
    readings: Reading[];
}

interface WeatherData {
    variable: Variable;
    unit: Unit;
    readings: Reading[];
}

export interface Station {
    id: number;
    name_en: string;
    name_ar: string | null;
    coordinates: string;
    aqi: Aqi[];
    variables: Aqi[];
    weather: WeatherData[];
}

