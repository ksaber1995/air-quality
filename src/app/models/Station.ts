interface ReadingStatus {
    sequence: number;
}

interface Reading {
    aggregated_at: string;
    // status: ReadingStatus[];
    value: number;
    color: string;
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
    code: string;
    name_en: string;
    name_ar: string | null;
    aqi: AqiData[];
    variables: Aqi[];
    weather: WeatherData[];
    latitude: number;
    longitude: number;

    organization: {
        name_ar: string,
        name_en: string
    }
}
