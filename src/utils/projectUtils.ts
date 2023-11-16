import { SETTINGS } from "../data/settings";
import { PERSONROLE, SENIORITY } from "../models/People";
import { Project, ProjectPhase } from "../models/Project";

export function calculatePrice(project: Project): number {
	const pricegroups = getAllPriceGroupsInProject(project);

	let totalPrice = 0;
	const totalHours = getPriceForAllocatedHoursForProject(project);
	// console.log("\n\nTOTAL HOURS", totalHours);


	const pricegroupkeys = Object.keys(totalHours);
	// console.log(pricegroupkeys)

	pricegroupkeys.forEach((pgk) => {
		const pricegroup = project.prices.find((price) => price.id === pgk);
		if (!pricegroup) return;
		// const price = project.prices.find((priceItem) => priceItem.id === pricegroup[0]) || project.prices[0];
		const hours = totalHours[pricegroup.id] || 0;
		const subPrice = pricegroup.value * hours;
		
		totalPrice += subPrice;
	});
	
	return totalPrice;
}

function getAllPriceGroupsInProject(project: Project): [string, number][] {
	return project.teams.reduce((all, team) => {
		team.people.forEach((person) => {
			const val = [person.pricegroup, person.allocation] as [string, number];
			all.push(val);
		});
		return all;
	}, [] as [string, number][]);
}

export function getAllocatedHoursForProject(project: Project): number {
	return project.phases.reduce((total, phase) => {
		return total + getWorkHoursForPhase(project, phase);
	}, 0);
}

export function getPriceForAllocatedHoursForProject(project: Project): Record<string, number> {
	return project.phases.reduce((total, phase) => {
		const totalHours = getWorkHoursAndPriceGroupForPhase(project, phase);

		Object.keys(totalHours).forEach((pg) => {
			if (total[pg] === undefined) total[pg] = 0;

			total[pg] += totalHours[pg];
		});

		return total;
	}, {} as Record<string, number>);
}

export function getWorkHoursForPhase(project: Project, phase: ProjectPhase): number {
	return project.teams.reduce((total, team) => {
		const talloc = phase.teamAllocations.find((talloc) => talloc.teamId === team.id);

		if (!talloc) return total;

		const teamHoursPerWeek = team.people.reduce((total, person) => {
			return total + person.allocation * 37.5;
		}, 0);

		return total + teamHoursPerWeek * talloc.allocation * phase.weeks;
	}, 0);
}

export function getWorkHoursForPhaseByTeam(project: Project, phase: ProjectPhase): Record<string, number> {
	return project.teams.reduce((total, team) => {
		const talloc = phase.teamAllocations.find((talloc) => talloc.teamId === team.id);

		if (!talloc) return total;

		const teamHoursPerWeek = team.people.reduce((total, person) => {
			return total + person.allocation * 37.5;
		}, 0);

		total[team.id] = teamHoursPerWeek * talloc.allocation * phase.weeks;

		return total;
	}, {} as Record<string, number>)
}

function getWorkHoursAndPriceGroupForPhase(project: Project, phase: ProjectPhase): Record<string, number> {
	return project.teams.reduce((teamTotal, team) => {
		const talloc = phase.teamAllocations.find((talloc) => talloc.teamId === team.id);

		if (!talloc) return teamTotal;

		const teamHoursPerWeek = team.people.reduce(
			(ptotal, person) => {
				const pg = person.pricegroup;
				if (ptotal[pg] === undefined) ptotal[person.pricegroup] = 0;

				ptotal[pg] += 37.5 * talloc.allocation * person.allocation * phase.weeks;

				return ptotal;
			},
			{ ...teamTotal },
		);

		return teamHoursPerWeek;
	}, {} as Record<string, number>);
}

export function matchTeamsToPhases(project: Project): Project {
	const np = { ...project };

	const teamIds = np.teams.map((team) => team.id);
	const nphases = np.phases.map((phase) => {
		np.teams.forEach((team) => {
			const talloc = phase.teamAllocations.find((talloc) => talloc.teamId === team.id);

			if (!talloc) {
				phase.teamAllocations.push({
					teamId: team.id,
					allocation: 1,
				});
			}
		});

		phase.teamAllocations = phase.teamAllocations.filter((talloc) => {
			return teamIds.includes(talloc.teamId);
		});

		return phase;
	});

	return np;
}

export function getTotalHours(project: Project): number {
	return project.phases.reduce((total, phase) => {
		return total + phase.weeks * 37.5;
	}, 0);
}

export function convertHoursToWorkingDays(hours: number): number {
	return hours / 7.5;
}
