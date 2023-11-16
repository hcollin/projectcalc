export interface Settings {
	time: {
		workingDay: number; // How many hours in a working day
		workWeek: number; // How many working days in a week
		workMonth: number; // How many working days in a month
		holidayWeeks: number; // How many weeks of holiday per year
	};
	agile: {
		sprintLength: number; // How many weeks is a sprint
	};
}

export const SETTINGS: Settings = {
	time: {
		workingDay: 7.5,
		workWeek: 5,
		workMonth: 21,
		holidayWeeks: 5,
	},
	agile: {
		sprintLength: 2,
	},
};
