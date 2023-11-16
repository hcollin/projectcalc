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
            name: "Requirements",
            weeks: 4,
            type: PHASETYPE.CONSULTING,
            teamAllocations: [
                {
                    teamId: "team-1",
                    allocation: 1
                }
            ]
        },
        {
            id: "phase-2",
            name: "Design and PoC",
            weeks: 8,
            type: PHASETYPE.RAMPUP,
            teamAllocations: [
                {
                    teamId: "team-1",
                    allocation: 1
                }
            ]
        },
        {
            id: "phase-3",
            name: "MVP Development",
            weeks: 12,
            type: PHASETYPE.DEFAULT,
            teamAllocations: [
                {
                    teamId: "team-1",
                    allocation: 1
                }
            ]
        },
        {
            id: "phase-4",
            name: "Version 1.0 Development",
            weeks: 24,
            type: PHASETYPE.DEFAULT,
            teamAllocations: [
                {
                    teamId: "team-1",
                    allocation: 1
                }
            ]
        },
        {
            id: "phase-5",
            name: "Fixes and Handover",
            weeks: 8,
            type: PHASETYPE.RAMPDOWN,
            teamAllocations: [
                {
                    teamId: "team-1",
                    allocation: 1
                }
            ]
        },{
            id: "phase-6",
            name: "Maintenance Start",
            weeks: 2,
            type: PHASETYPE.MAINTENANCE,
            teamAllocations: [
                {
                    teamId: "team-1",
                    allocation: 1
                }
            ]
        }
    ]
}