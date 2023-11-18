import { useEffect, useState } from "react";
import { Project } from "../models/Project";
import { Stack, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

const ProjectSettings = ({ project, onUpdate }: { project: Project; onUpdate: (p: Project) => void }) => {
	const [pname, setPname] = useState<string>(project.name || "");
	const a = dayjs(new Date());
	const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(project.startDate || Date.now()));

	useEffect(() => {
		if (project.name) {
			setPname(project.name);
		} else {
			setPname("");
		}
	}, [project.name]);

	useEffect(() => {
		if (project.startDate) {
			setStartDate(dayjs(project.startDate));
		} else {
			setStartDate(dayjs(Date.now()));
		}
	}, [project.startDate]);

	function change(n: string) {
		setPname(n);
		onUpdate({ ...project, name: n });
	}

	function changeStartDate(date: Dayjs | null) {
		if (date) {
			setStartDate(date);

			if (date.isValid()) {
				onUpdate({ ...project, startDate: date.unix() * 1000 });
			}
		}
	}

	return (
		<Stack direction="row" spacing={2}>
			<TextField label="Project name" value={pname} onChange={(e) => change(e.target.value)} />
			<DatePicker label="Project Start Date" value={startDate} onChange={changeStartDate} />
		</Stack>
	);
};

export default ProjectSettings;
