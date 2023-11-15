import { PERSONROLE, SENIORITY } from "../models/People";
import { PHASETYPE, Project } from "../models/Project";
import { createNewPerson } from "../utils/personUitls";

export const exampleProject: Project = {
    id: "proj-1",
    teams: [
        {
            id: "team-1",
            people: [
                createNewPerson({ name: "PM / PO", roles: [[PERSONROLE.Manager, SENIORITY.Mid]]  }),
                createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Senior]]  }),
                createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Mid]]  }),
                createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Mid]]  }),
                
                

            ]
        }
    ],
    prices: [
        {
            name: "Default",
            value: 90,
            roles: [],
            min: 60,
            max: 125,
            default: true
        },
        {
            name: "Developer",
            value: 90,
            roles: [[PERSONROLE.Developer, SENIORITY.all]],
            min: 60,
            max: 125,
        },
        {
            name: "Manager",
            value: 110,
            roles: [[PERSONROLE.Manager, SENIORITY.all]],
            min: 60,
            max: 150
        },

    ],
    phases: [
        {
            id: "phase-1",
            weeks: 16,
            type: PHASETYPE.DEFAULT
        }
    ]
}