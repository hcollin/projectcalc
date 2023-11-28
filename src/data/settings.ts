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

// These are the default settings hard coded to the system
const DEFAULTSETTINGS: Settings = {
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

// These settings can be changed project by project (not implemented yet)
export const SETTINGS: Settings = Object.assign({}, DEFAULTSETTINGS);

// These are session specific settings that can be changed by the user
const dynamicSettings: { [key: string]: number } = {};

export function setConf(key: string, value: number) {
	dynamicSettings[key] = value;
}

export function getConf(key: string): number {

	if (dynamicSettings[key] !== undefined) {
		return dynamicSettings[key];
	}

	const projectSettings = createProjectSettings(SETTINGS);

	if (projectSettings[key] === undefined) {
		throw new Error("No such setting: " + key);
	}


	return projectSettings[key];


}

function createProjectSettings(projectS: Settings): { [key: string]: number } {
	return Object.assign({}, convertSettingsToFlatObject(DEFAULTSETTINGS), convertSettingsToFlatObject(projectS));
}

function convertSettingsToFlatObject(targetSettings: Settings): { [key: string]: number } {

	const smap: { [key: string]: number } = {};

	Object.keys(targetSettings).forEach((key) => {

		const value = targetSettings[key as keyof Settings];

		if (typeof value === "object") {
			Object.keys(value).forEach((subkey) => {

				smap[key + "." + subkey] = value[subkey as keyof Settings[keyof Settings]];
			});
		} else {
			if (typeof value === "number")
				smap[key] = value;
		}
	});

	return smap;
}
