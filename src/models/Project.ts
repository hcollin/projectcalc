import { PERSONROLE, Person, SENIORITY } from "./People";


export interface Project {
    id: string;
    teams: Team[];
    prices: PriceItem[];
    phases: ProjectPhase[];


}

export interface Team {
    id: string;
    name?: string;
    people: Person[];
}

export interface PriceItem {
    id: string;
    name: string;
    value: number;
    min?: number;
    max?: number;
    default?: true;

}


export interface ProjectPhase {
    id: string;
    weeks: number;
    type: PHASETYPE;

}

export enum PHASETYPE {

    DEFAULT = "Development",        // Normal default project development phase

    CONSULTING = "Consulting",  // Consulting phase with higher prices and less people and short period

    RAMPUP = "Rampup",          // Rampup phase with less crew and focus on learning and setting up
    //CRUNCH = "Crunch",          // Crunch phase with more crew and focus on getting things done fast for a short period
    //SKELETON = "Skeleton",      // Skeleton phase with minumum crew and on keeping things running
    RAMPDOWN = "Rampdown",      // Rampdown phase with less crew and focus on documentation and handover

    MAINTENANCE = "Maintenance",// Maintenance with no active development of new features, bug fixes etc. only
}


export enum TEAMSIZE {
    MINI,
    SMALL,
    MEDIUM,
    LARGE,
    HUGE
}


export enum TEAMTYPE {
    FULL = "Full Project Team",
    DEV = "Development Team",
    UX = "Design Team",
    QA = "QA & Test Team",
}