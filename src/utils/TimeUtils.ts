import { SETTINGS } from "../data/settings";

export function workingDaysInAYear(holidays: boolean = false): number {
	if (!holidays) return SETTINGS.time.workMonth * 12;

	return SETTINGS.time.workMonth * 12 - SETTINGS.time.holidayWeeks * SETTINGS.time.workWeek;
}

export interface ReadableTime {
	years: number;
	months: number;
	days: number;
	hours: number;
	minutes: number;
}

export function weeksToReadableTime(weeks: number, holidays: boolean = false): ReadableTime {
	const hours = weeks * SETTINGS.time.workWeek * SETTINGS.time.workingDay;

	return hoursToReadableTime(hours, holidays);
}

export function hoursToReadableTime(hours: number, holidays: boolean = false): ReadableTime {
	const months = Math.floor(hours / (SETTINGS.time.workMonth * SETTINGS.time.workingDay));

	const days = Math.floor((hours - months * SETTINGS.time.workMonth * SETTINGS.time.workingDay) / SETTINGS.time.workingDay);

	const restHours = hours - months * SETTINGS.time.workMonth * SETTINGS.time.workingDay - days * SETTINGS.time.workingDay;


	const t: ReadableTime = {
		years: 0,
		months: months,
		days: days,
		hours: restHours,
		minutes: 0,
	};


	if (months > 12) {
		t.years = Math.floor(months / 12);
		t.months = months - t.years * 12;
	}


	return t;

}