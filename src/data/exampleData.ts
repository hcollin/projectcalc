import { PERSONROLE, SENIORITY } from "../models/People";
import { PHASETYPE, Project } from "../models/Project";

export const exampleProject: Project = {
    id: "proj-1",
    teams: [
        {
            id: "team-1",
            people: [
                {
                    id: "person-1",
                    roles: [[PERSONROLE.Developer, SENIORITY.Mid]]
                },
                {
                    id: "person-2",
                    roles: [[PERSONROLE.Developer, SENIORITY.Mid]]
                },
                {
                    id: "person-3",
                    roles: [[PERSONROLE.Developer, SENIORITY.Senior]]
                },
                {
                    id: "person-4",
                    roles: [[PERSONROLE.Manager, SENIORITY.Mid]]
                }
            ]
        }
    ],
    prices: [
        {
            name: "Developer",
            value: 90,
            roles: [[PERSONROLE.Developer, SENIORITY.all]],
            min: 60,
            max: 125
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