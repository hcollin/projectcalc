import { PERSONROLE, SENIORITY } from "../models/People";
import { Project } from "../models/Project";



export function calculatePrice(project: Project): number {

    const roles = getAllRolesInProject(project);

    let hourPrice = 0;
    project.prices.forEach(priceItem => {

        priceItem.roles.forEach(priceItemRole => {

            roles.forEach(role => {
                if (priceItemRole[0] === role[0] && (priceItemRole[1] === SENIORITY.all || priceItemRole[1] === role[1])) {
                    hourPrice += priceItem.value;
                }
            })
        });

    });



    return hourPrice * getTotalHours(project);
}


function getAllRolesInProject(project: Project): [PERSONROLE, SENIORITY][] {
    return project.teams.reduce((all, team) => {
        team.people.forEach(person => {
            person.roles.forEach(role => {
                all.push(role);
            })
        });
        return all;
    }, [] as [PERSONROLE, SENIORITY][]);

}

function getTotalHours(project: Project): number {

    return project.phases.reduce((total, phase) => {
        return total + (phase.weeks * 40);
    }, 0);

}