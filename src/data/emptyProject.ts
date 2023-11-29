import { v4 } from "uuid";
import { PERSONROLE, SENIORITY } from "../models/People";
import { PHASETYPE, Project } from "../models/Project";
import { createNewPerson } from "../utils/personUtils";

export const emptyProjectData: Project = {
    id: v4(),
    startDate: Date.now(),
    teams: [
        
    ],
    prices: [
        {
            id: "defaultprice",
            name: "Default",
            value: 90,

            min: 60,
            max: 125,
            default: true
        },
        

    ],
    phases: [
        
    ]
}