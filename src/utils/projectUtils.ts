import { get } from "http";
import { SETTINGS, getConf } from "../data/settings";
import { PERSONROLE, SENIORITY } from "../models/People";
import { Project, ProjectPhase } from "../models/Project";
import { roundHoursToFullWorkingDays } from "./TimeUtils";

export function calculatePrice(project: Project): number {
	const pricegroups = getAllPriceGroupsInProject(project);

	let totalPrice = 0;
	const totalHours = getAllocatedHoursByPriceGroup(project);
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

export function getAllPriceGroupsInProject(project: Project): [string, number][] {
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

export function getAllocatedHoursByPriceGroup(project: Project): Record<string, number> {
	return project.phases.reduce((total, phase) => {
		const totalHours = getWorkHoursAndPriceGroupForPhase(project, phase);

		Object.keys(totalHours).forEach((pg) => {
			if (total[pg] === undefined) total[pg] = 0;

			total[pg] += totalHours[pg];
		});

		return total;
	}, {} as Record<string, number>);
}

interface phaseSummary {
	phaseId: string;
	phaseName: string;
	totalHours: number;
	totalPrice: number;
	pricePerGroup: Record<string, number>;
}

export function getPriceForEachPhase(p: Project): phaseSummary[] {
	const res: phaseSummary[] = [];

	p.phases.forEach((phase) => {
		const grp = getWorkHoursAndPriceGroupForPhase(p, phase);
		const th = getWorkHoursForPhase(p, phase);

		const pgs = Object.keys(grp);

		const pricePerGroup: Record<string, number> = {};

		const price = pgs.reduce((total, pg) => {
			const pricegroup = p.prices.find((price) => price.id === pg);
			if (!pricegroup) return total;
			const subPrice = pricegroup.value * grp[pg];

			if (pricePerGroup[pg] === undefined) pricePerGroup[pg] = 0;
			pricePerGroup[pg] += subPrice;

			return total + subPrice;
		}, 0);

		res.push({
			phaseId: phase.id,
			phaseName: phase.name || phase.type,
			totalHours: th,
			totalPrice: price,
			pricePerGroup: pricePerGroup,
		});
	});

	return res;
}

export interface MemberSummary {
	memberId: string;
	memberName: string;
	teams: [string, string][];
	totalHours: number;
	totalPrice: number;
	perPhase: [string, number, number][]; // [phaseId, hours, price]
	pricePerPriceGroup: Record<string, number>;
}

export function getProjectMemberSummary(p: Project): MemberSummary[] {
	let summary: MemberSummary[] = [];

	p.teams.forEach((team) => {
		team.people.forEach((person) => {
			// If person already exists, add a new team for th person
			const exists = summary.find((s) => s.memberId === person.id);
			if (exists) {
				exists.teams.push([team.id, team.name || team.id]);
				return;
			}

			summary.push({
				memberId: person.id,
				memberName: person.name || person.roles[0][0],
				teams: [[team.id, team.name || team.id]],
				totalHours: 0,
				totalPrice: 0,
				perPhase: [],
				pricePerPriceGroup: {},
			});
		});
	});

	p.phases.forEach((phase) => {
		summary = summary.map((member) => {
			const [hr, pr] = getHoursAndPriceForMemberInPhase(p, phase, member.memberId);

			member.totalHours += hr;
			member.totalPrice += pr;
			member.perPhase.push([phase.id, hr, pr]);

			return member;
		});
	});

	return summary;
}

export function getProjectMemberSummaryTotals(sum: MemberSummary[]): MemberSummary {
	const phaseTotals: [string, number, number][] = [];

	sum.forEach((summary) => {
		summary.perPhase.forEach((phase) => {
			const exists = phaseTotals.find((pt) => pt[0] === phase[0]);
			if (exists) {
				exists[1] += phase[1];
				exists[2] += phase[2];
				return;
			}
			phaseTotals.push([phase[0], phase[1], phase[2]]);
		});
	});

	return {
		memberId: "total",
		memberName: "Total",
		teams: [],
		totalHours: sum.reduce((total, member) => total + member.totalHours, 0),
		totalPrice: sum.reduce((total, member) => total + member.totalPrice, 0),
		perPhase: phaseTotals,
		pricePerPriceGroup: {},
	};
}

export function getHoursAndPriceForMemberInPhase(p: Project, phase: ProjectPhase, memberId: string): [number, number] {
	let hours = 0;
	let price = 0;

	const workWeekInHours = getConf("time.workWeek") * getConf("time.workingDay");

	phase.teamAllocations.forEach((talloc) => {
		// if (talloc.teamId !== memberId) return;

		const team = p.teams.find((team) => team.id === talloc.teamId);
		if (!team) return;

		const person = team.people.find((person) => person.id === memberId);
		if (!person) return;

		const pricegroup = p.prices.find((price) => price.id === person.pricegroup);
		if (!pricegroup) return;

		const ho = roundHoursToFullWorkingDays(person.allocation * workWeekInHours * talloc.allocation * phase.weeks);
		const pr = pricegroup.value * ho;
		hours += ho;
		price += pr;
	});

	return [hours, price];
}

export function getWorkHoursForPhase(project: Project, phase: ProjectPhase): number {
	const roundToDays = getConf("time.roundHoursToDays");
	return project.teams.reduce((total, team) => {
		const talloc = phase.teamAllocations.find((talloc) => talloc.teamId === team.id);

		if (!talloc) return total;

		const teamHoursPerWeek = team.people.reduce((total, person) => {
			return total + person.allocation * 37.5;
		}, 0);

		return roundHoursToFullWorkingDays(total + teamHoursPerWeek * talloc.allocation * phase.weeks);
	}, 0);
}

export function getWorkHoursForPhaseByTeam(project: Project, phase: ProjectPhase): Record<string, number> {
	return project.teams.reduce((total, team) => {
		const talloc = phase.teamAllocations.find((talloc) => talloc.teamId === team.id);

		if (!talloc) return total;

		const teamHoursPerWeek = team.people.reduce((total, person) => {
			return roundHoursToFullWorkingDays(total + person.allocation * 37.5);
		}, 0);

		total[team.id] = teamHoursPerWeek * talloc.allocation * phase.weeks;

		return total;
	}, {} as Record<string, number>);
}

function getWorkHoursAndPriceGroupForPhase(project: Project, phase: ProjectPhase): Record<string, number> {
	return project.teams.reduce((teamTotal, team) => {
		const talloc = phase.teamAllocations.find((talloc) => talloc.teamId === team.id);

		if (!talloc) return teamTotal;

		const teamHoursPerWeek = team.people.reduce(
			(ptotal, person) => {
				const pg = person.pricegroup;
				if (ptotal[pg] === undefined) ptotal[person.pricegroup] = 0;

				ptotal[pg] += roundHoursToFullWorkingDays(37.5 * talloc.allocation * person.allocation * phase.weeks);

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
		return roundHoursToFullWorkingDays(total + phase.weeks * 37.5);
	}, 0);
}

export function convertHoursToWorkingDays(hours: number): number {
	return hours / getConf("time.workingDay");
}

export function numberWithSpaces(x: number): string {
	const parts = x.toString().split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	return parts.join(".");
}

export function validateObjectAsProject(arg: any): arg is Project {
	if (!arg) return false;

	if (!arg.id) return false;
	if (!arg.name) return false;
	if (!arg.teams) return false;
	if (!arg.prices) return false;
	if (!arg.phases) return false;

	if (!Array.isArray(arg.teams)) return false;
	if (!Array.isArray(arg.prices)) return false;
	if (!Array.isArray(arg.phases)) return false;

	return true;
}
