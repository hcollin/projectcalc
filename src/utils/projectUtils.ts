import { PERSONROLE, SENIORITY } from "../models/People";
import { Project } from "../models/Project";



export function calculatePrice(project: Project): number {

    const pricegroups = getAllPriceGroupsInProject(project);

    let totalPrice = 0;
    const totalHours = getTotalHours(project);


    pricegroups.forEach(pricegroup => {

        const price = project.prices.find(priceItem => priceItem.id === pricegroup) || project.prices[0];

        const subPrice = price.value * totalHours;

        totalPrice += subPrice;


    });

    return totalPrice;
}

function getAllPriceGroupsInProject(project: Project): string[] {

    return project.teams.reduce((all, team) => {
        team.people.forEach(person => {

            all.push(person.pricegroup);
        });
        return all;
    }, [] as string[]);
}



export function getTotalHours(project: Project): number {

    return project.phases.reduce((total, phase) => {
        return total + (phase.weeks * 37.5);
    }, 0);

}