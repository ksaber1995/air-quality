export interface BreakPoint {
    breakpoint_end: number
    breakpoint_start: number
    color: string
    sequence: number
    status_ar: string
    status_en: string

}

export interface VariableBreakPoint {
    abbreviation_en: string
    code: string
    description_ar: string
    description_en: string
    name_ar: string
    variable_breakpoints: BreakPoint []
}