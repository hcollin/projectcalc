import { PERSONROLE, SENIORITY } from "../models/People";
import { PHASETYPE, Project } from "../models/Project";
import { createNewPerson } from "../utils/personUitls";

export const exampleProject: Project = {
    id: "proj-1",
    teams: [
        {
            id: "team-1",
            people: [
                createNewPerson({ name: "PM / PO", roles: [[PERSONROLE.Manager, SENIORITY.Mid]], pricegroup: "highprice" }),
                createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Senior]] }),
                createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Mid]] }),
                createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Mid]] }),



            ]
        }
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
        {
            id: "highprice",
            name: "Manager",
            value: 110,

            min: 60,
            max: 150
        },

    ],
    phases: [
        {
            id: "phase-1",
            weeks: 16,
            type: PHASETYPE.DEFAULT,
            teamAllocations: [
                {
                    teamId: "team-1",
                    allocation: 1
                }
            ]

        }
    ]
}