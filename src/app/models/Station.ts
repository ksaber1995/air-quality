interface ReadingStatus {
    sequence: number;
}

export interface Reading {
    aggregated_at: string;
    // status: ReadingStatus[];
    value: number;
    color: string;
    status_ar: string
    status_en: string
}

interface Variable {
    id: number;
    abbreviation_en: string;
    name_en: string | null;
    name_ar: string | null;
    code: string

}

interface Unit {
    code: string;
    abbreviation_en?: string
}

interface AqiData {
    aggregated_at: string;
    status: ReadingStatus[];
    color: string;
    status_ar: string,
    status_en: string
    value: number
    variable: {
        abbreviation_en: string

    }
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


export interface DetailedStation {
    code: string,
    name_en: string,
    name_ar: string,
    organization: {
        name_en: string,
        name_ar: string
    },
    aqi: AqiData[],

    variables: Aqi[],

    weather: Aqi[],
    others: Aqi[]

}
