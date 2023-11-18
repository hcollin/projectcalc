import { Project } from "../models/Project";

export function loadProjectFromLocalStorage(fn: string): Project | undefined {
	if (window.localStorage) {
		const project = window.localStorage.getItem(fn);
		if (project) {
			return JSON.parse(project);
		}
	}
	return undefined;
}

export function saveProjectToLocalStorage(project: Project) {
	if (window.localStorage) {
		const fn = projectFileName(project);
		console.log("File name: ", fn);
		window.localStorage.setItem(fn, JSON.stringify(project));
		if (!checkIfFileExists(fn)) {
			console.error("File not saved");
			return false;
		}
		saveToProjectFileList(project);
	} else {
		console.error("No local storage available");
	}
}

export function removeFileFromLocalStorage(fn: string) {
	if (window.localStorage) {
		window.localStorage.removeItem(fn);
		if (checkIfFileExists(fn)) {
			console.error("File not removed");
			return false;
		}
		removeProjectFileListItem(fn);

		return true;
	}
	return false;
}

export function checkIfFileExists(fn: string): boolean {
	if (window.localStorage) {
		const project = window.localStorage.getItem(fn);
		if (project) {
			return true;
		}
	}
	return false;
}

export function projectFileName(project: Project, json = false) {
	return `project-calculator-${project.id}${json ? ".json" : ""}`;
}

export interface ProjectFileListItem {
	name: String;
	id: String;
	fn: string;
	created: number;
	modified: number;
}

const PROJECTFILELISTNAME = "project-calculator-projects-list";

export function saveToProjectFileList(project: Project) {
	if (window.localStorage) {
		const fn = projectFileName(project);

		const projectList = loadProjectFileList();
		const index = findProjectFileListItemIndex(project, projectList);

		if (index >= 0) {
			const newProjectListItem = { ...projectList[index], modified: Date.now(), name: project.name || "Unnamed project" };
			projectList.splice(index, 1, newProjectListItem);
		} else {
			const newProjectListItem = { name: project.name || "Unnamed project", id: project.id, fn, created: Date.now(), modified: Date.now() };
			projectList.push(newProjectListItem);
		}

		window.localStorage.setItem(PROJECTFILELISTNAME, JSON.stringify(projectList));
	}
}

export function findProjectFileListItemIndex(project: Project, list?: ProjectFileListItem[]): number {
	const projectList = list || loadProjectFileList();
	return projectList.findIndex((p) => p.id === project.id);
}

export function loadProjectFileList(): ProjectFileListItem[] {
	if (window.localStorage) {
		const projectList = window.localStorage.getItem(PROJECTFILELISTNAME);
		if (projectList) {
			return JSON.parse(projectList);
		} else {
			window.localStorage.setItem(PROJECTFILELISTNAME, JSON.stringify([]));
			return [];
		}
	}
	return [];
}

export function removeProjectFileListItem(fn: string) {
	if (window.localStorage) {
		const projectList = loadProjectFileList();
		const index = projectList.findIndex((p) => p.fn === fn);
		if (index >= 0) {
			projectList.splice(index, 1);
			window.localStorage.setItem(PROJECTFILELISTNAME, JSON.stringify(projectList));
		}
	}
}
