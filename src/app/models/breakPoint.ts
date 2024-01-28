export interface BreakPoint {

    breakpoint_end :number
    breakpoint_start : number
    color : string
    message : string
    sequence : number
   
}

export interface VariableBreakPoint extends BreakPoint{
    variable_id: number
}