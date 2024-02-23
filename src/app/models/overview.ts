export interface OverviewResponse {
    aggregated_at: string,
    color: string,
    status_en: string,
    status_ar: string,
    value: number,
    variable: {
        abbreviation_en: string
    },
    station: {
        name_en: string,
        name_ar: string
    }
}

export interface CustomOverviewResponse {
    [key: string]: {
        aggregated_at: string,
        color: string,
        status_en: string,
        status_ar: string,
        value: number,
        variable: {
            abbreviation_en: string
        },
        station: {
            name_en: string,
            name_ar: string
        }
    }[]
}