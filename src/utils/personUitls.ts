import { PERSONROLE, Person, SENIORITY } from "../models/People";
import { v4 as uuidv4 } from 'uuid';




export function createNewPerson(initVals?: Partial<Person>): Person {
    const person: Person = Object.assign(
        {
            id: uuidv4(),
            roles: [[PERSONROLE.Developer, SENIORITY.Mid]],
            pricegroup: "defaultprice"
        }, 
        initVals || {});

    if (initVals && initVals.id) person.id = uuidv4();

    if (!person.name) {
        if (person.roles.length > 0) {
            const mainRole = person.roles[0];

            person.name = `${mainRole[1] !== SENIORITY.Mid ? mainRole[1] + " " : ""}${mainRole[0]}`;
        }
    }

    return person;
}


export function rolesArray(): [string, PERSONROLE][] {

    return Array.from(Object.keys(PERSONROLE).reduce((roles, key) => {
        const val = PERSONROLE[key as keyof typeof PERSONROLE];

        const role = [key, val] as [string, PERSONROLE];

        roles.add(role);

        return roles;

    }, new Set<[string, PERSONROLE]>()));

}


export function seniorityArray(): [string, SENIORITY][] {
    return Array.from(Object.keys(SENIORITY).reduce((seniority, key) => {
        const val = SENIORITY[key as keyof typeof SENIORITY];

        const role = [key, val] as [string, SENIORITY];

        seniority.add(role);

        return seniority;

    }, new Set<[string, SENIORITY]>()));

}