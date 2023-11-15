import { v4 } from "uuid";
import { Project, TEAMSIZE, TEAMTYPE, Team } from "../models/Project";
import { HATS, PERSONROLE, Person, SENIORITY } from "../models/People";
import { createNewPerson } from "./personUitls";




export function createTeam(initTeam?: Partial<Team>): Team {

    const t: Team = Object.assign({
        id: v4(),
        name: `Team NonName`,
        people: []
    }, initTeam);

    return t;
}

const defaultTeams: [TEAMSIZE, TEAMTYPE, Person[]][] = [

    // Development Teams

    [TEAMSIZE.MINI, TEAMTYPE.DEV, [
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Lead]] }),
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Senior]] }),
    ]],
    [TEAMSIZE.SMALL, TEAMTYPE.DEV, [
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Senior]] }),
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Mid]] }),
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Mid]] }),
    ]],
    [TEAMSIZE.MEDIUM, TEAMTYPE.DEV, [
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Lead]] }),
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Senior]] }),
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Mid]] }),
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Mid]] }),
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Junior]] }),
    ]],
    [TEAMSIZE.LARGE, TEAMTYPE.DEV, [
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Lead]] }),
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Senior]] }),
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Senior]] }),
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Senior]] }),
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Mid]] }),
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Mid]] }),
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Mid]] }),
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Junior]] }),
    ]],
    [TEAMSIZE.HUGE, TEAMTYPE.DEV, [
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Lead]] }),
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Senior]] }),
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Senior]] }),
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Senior]] }),
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Senior]] }),
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Mid]] }),
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Mid]] }),
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Mid]] }),
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Junior]] }),
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Junior]] }),
    ]],

    [TEAMSIZE.MINI, TEAMTYPE.QA, [
        createNewPerson({ roles: [[PERSONROLE.Tester, SENIORITY.Senior]] }),

    ]],
    [TEAMSIZE.SMALL, TEAMTYPE.QA, [
        createNewPerson({ roles: [[PERSONROLE.Tester, SENIORITY.Senior]] }),
        createNewPerson({ roles: [[PERSONROLE.Tester, SENIORITY.Mid]] }),
    ]],
    [TEAMSIZE.MEDIUM, TEAMTYPE.QA, [
        createNewPerson({ roles: [[PERSONROLE.Tester, SENIORITY.Senior]] }),
        createNewPerson({ roles: [[PERSONROLE.Tester, SENIORITY.Mid]] }),
        createNewPerson({ roles: [[PERSONROLE.Tester, SENIORITY.Junior]] }),
    ]],
    [TEAMSIZE.LARGE, TEAMTYPE.QA, [
        createNewPerson({ roles: [[PERSONROLE.Tester, SENIORITY.Lead]] }),
        createNewPerson({ roles: [[PERSONROLE.Tester, SENIORITY.Senior]] }),
        createNewPerson({ roles: [[PERSONROLE.Tester, SENIORITY.Senior]] }),
        createNewPerson({ roles: [[PERSONROLE.Tester, SENIORITY.Mid]] }),
        createNewPerson({ roles: [[PERSONROLE.Tester, SENIORITY.Mid]] }),
        createNewPerson({ roles: [[PERSONROLE.Tester, SENIORITY.Junior]] }),
    ]],
    [TEAMSIZE.HUGE, TEAMTYPE.QA, [
        createNewPerson({ roles: [[PERSONROLE.Tester, SENIORITY.Lead]] }),
        createNewPerson({ roles: [[PERSONROLE.Tester, SENIORITY.Senior]] }),
        createNewPerson({ roles: [[PERSONROLE.Tester, SENIORITY.Senior]] }),
        createNewPerson({ roles: [[PERSONROLE.Tester, SENIORITY.Senior]] }),
        createNewPerson({ roles: [[PERSONROLE.Tester, SENIORITY.Mid]] }),
        createNewPerson({ roles: [[PERSONROLE.Tester, SENIORITY.Mid]] }),
        createNewPerson({ roles: [[PERSONROLE.Tester, SENIORITY.Junior]] }),
        createNewPerson({ roles: [[PERSONROLE.Tester, SENIORITY.Junior]] }),
    ]],

    [TEAMSIZE.MINI, TEAMTYPE.UX, [
        createNewPerson({ roles: [[PERSONROLE.Designer, SENIORITY.Mid]] }),

    ]],
    [TEAMSIZE.SMALL, TEAMTYPE.UX, [
        createNewPerson({ roles: [[PERSONROLE.Designer, SENIORITY.Senior]] }),
        createNewPerson({ roles: [[PERSONROLE.Designer, SENIORITY.Mid]] }),
    ]],
    [TEAMSIZE.MEDIUM, TEAMTYPE.UX, [
        createNewPerson({ roles: [[PERSONROLE.Designer, SENIORITY.Senior]] }),
        createNewPerson({ roles: [[PERSONROLE.Designer, SENIORITY.Mid]] }),
        createNewPerson({ roles: [[PERSONROLE.Designer, SENIORITY.Junior]] }),
    ]],
    [TEAMSIZE.LARGE, TEAMTYPE.UX, [
        createNewPerson({ roles: [[PERSONROLE.Designer, SENIORITY.Lead]] }),
        createNewPerson({ roles: [[PERSONROLE.Designer, SENIORITY.Senior]] }),
        createNewPerson({ roles: [[PERSONROLE.Designer, SENIORITY.Mid]] }),
        createNewPerson({ roles: [[PERSONROLE.Designer, SENIORITY.Junior]] }),
    ]],
    [TEAMSIZE.HUGE, TEAMTYPE.UX, [
        createNewPerson({ roles: [[PERSONROLE.Designer, SENIORITY.Lead]] }),
        createNewPerson({ roles: [[PERSONROLE.Designer, SENIORITY.Senior]] }),
        createNewPerson({ roles: [[PERSONROLE.Designer, SENIORITY.Senior]] }),
        createNewPerson({ roles: [[PERSONROLE.Designer, SENIORITY.Mid]] }),
        createNewPerson({ roles: [[PERSONROLE.Designer, SENIORITY.Mid]] }),
        createNewPerson({ roles: [[PERSONROLE.Designer, SENIORITY.Junior]] }),
    ]],

    [TEAMSIZE.MINI, TEAMTYPE.FULL, [
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Senior], [PERSONROLE.Manager, SENIORITY.Junior]] }),
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Mid], [PERSONROLE.Tester, SENIORITY.Junior]] }),

    ]],
    [TEAMSIZE.SMALL, TEAMTYPE.FULL, [
        createNewPerson({ name: "Project Lead", roles: [[PERSONROLE.Developer, SENIORITY.Lead], [PERSONROLE.Manager, SENIORITY.Junior]] }),
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Senior]] }),
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Mid], [PERSONROLE.Designer, SENIORITY.Junior]] }),
        createNewPerson({ roles: [[PERSONROLE.Tester, SENIORITY.Mid]] }),
    ]],
    [TEAMSIZE.MEDIUM, TEAMTYPE.FULL, [
        createNewPerson({ roles: [[PERSONROLE.Manager, SENIORITY.Mid]] }),
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Lead]] }),
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Senior]] }),
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Mid]] }),
        createNewPerson({ roles: [[PERSONROLE.Designer, SENIORITY.Mid], [PERSONROLE.Developer, SENIORITY.Junior]] }),
        createNewPerson({ roles: [[PERSONROLE.Tester, SENIORITY.Mid]] }),

    ]],
    [TEAMSIZE.LARGE, TEAMTYPE.FULL, [
        createNewPerson({ name: "Project Manager", roles: [[PERSONROLE.Manager, SENIORITY.Mid]] }),
        createNewPerson({ name: "Designer / PO", roles: [[PERSONROLE.Designer, SENIORITY.Mid]] }),
        createNewPerson({ name: "Architect", roles: [[PERSONROLE.Developer, SENIORITY.Lead]] }),
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Senior]] }),
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Mid]] }),
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Mid]] }),
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Junior]] }),
        createNewPerson({ roles: [[PERSONROLE.Tester, SENIORITY.Mid], [PERSONROLE.Developer, SENIORITY.Junior]] }),
        createNewPerson({ roles: [[PERSONROLE.Tester, SENIORITY.Senior]] }),


    ]],
    [TEAMSIZE.HUGE, TEAMTYPE.FULL, [
        createNewPerson({ name: "Project Manager", roles: [[PERSONROLE.Manager, SENIORITY.Mid]] }),
        createNewPerson({ name: "Product Owner", roles: [[PERSONROLE.Manager, SENIORITY.Senior]] }),
        createNewPerson({ name: "Designer", roles: [[PERSONROLE.Designer, SENIORITY.Senior]] }),
        createNewPerson({ name: "Architect", roles: [[PERSONROLE.Developer, SENIORITY.Principal]] }),

        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Lead]] }),
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Senior]] }),
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Senior]] }),
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Mid]] }),
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Mid]] }),
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Mid]] }),
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Junior]] }),
        createNewPerson({ roles: [[PERSONROLE.Developer, SENIORITY.Junior]] }),

        createNewPerson({ roles: [[PERSONROLE.Tester, SENIORITY.Senior]] }),
        createNewPerson({ roles: [[PERSONROLE.Tester, SENIORITY.Mid]] }),
    ]],


];


export function getMembersForTeam(size: TEAMSIZE, type: TEAMTYPE, addMember: string[]): Person[] {


    const defTeam = defaultTeams.find(t => t[0] === size && t[1] === type);
    if (!defTeam) return [];

    const members: Person[] = [];


    defTeam[2].forEach(p => {
        const newPerson = createNewPerson(p);
        members.push(newPerson);
    });



    return members;
}


export function getFreeTeamName(project: Project, rootName = "Team "): string {
    let teamNo = project.teams.length + 1;
    let valid = false;
    while (!valid) {
        const sameName = project.teams.find(t => t.name === `${rootName}${teamNo}`);
        if (!sameName) {
            valid = true;
        } else {
            teamNo++;
        }
    }

    return `${rootName}${teamNo}`;

}