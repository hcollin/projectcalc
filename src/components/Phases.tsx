import { Button, ButtonGroup, Card, CardContent, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { PHASETYPE, Project, ProjectPhase } from "../models/Project";


import ProjectPhaseItem from "./ProjectPhaseItem";
import { useState } from "react";


import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import LoopIcon from '@mui/icons-material/Loop';

export interface PhasesProps {
	project: Project;
	onUpdate: (project: Project) => void;
}

const Phases = (props: PhasesProps) => {

	const [timeMode, setTimeMode] = useState<"WEEK" | "SPRINT" | "MONTH">("WEEK");

	function updatePhase(phase: ProjectPhase) {
		const newPhases = props.project.phases.map((p) => (p.id === phase.id ? phase : p));

		props.onUpdate({ ...props.project, phases: newPhases });
	}

	function addNewPhase() {
		const newPhase: ProjectPhase = {
			id: Math.random().toString(36).substr(2, 9),
			type: PHASETYPE.DEFAULT,
			weeks: 4,
			teamAllocations: [],
			startAfter: [],
			features: []

		};

		const newPhases = [...props.project.phases, newPhase];

		props.onUpdate({ ...props.project, phases: newPhases });
	}

	function removePhase(phase: ProjectPhase) {
		const newPhases = props.project.phases.filter((p) => p.id !== phase.id);
		props.onUpdate({ ...props.project, phases: newPhases });
	}

	function moveUp(p: ProjectPhase) {
		const index = props.project.phases.findIndex((phase) => phase.id === p.id);
		if (index === 0) return;
		const newPhases = [...props.project.phases];
		newPhases.splice(index, 1);
		newPhases.splice(index - 1, 0, p);
		props.onUpdate({ ...props.project, phases: newPhases });
	}

	function moveDown(p: ProjectPhase) { }

	return (
		<>
			<ToggleButtonGroup
				value={timeMode}
				exclusive
				onChange={(e, value) => { setTimeMode(value) }}
			>
				<ToggleButton value="WEEK"><CalendarViewWeekIcon /></ToggleButton>
				<ToggleButton value="SPRINT"><LoopIcon /></ToggleButton>
				<ToggleButton value="MONTH"><CalendarViewMonthIcon /></ToggleButton>
			</ToggleButtonGroup>

			{props.project.phases.map((phase, index) => {
				return (
					<Card elevation={7}>
						<CardContent>
							<ProjectPhaseItem
								key={`phase-${phase.id}`}
								phase={phase}
								project={props.project}
								onUpdate={updatePhase}
								onRemove={removePhase}
								onMoveUp={moveUp}
								onMoveDown={moveDown}
								timeMode={timeMode}
							/>
						</CardContent>
					</Card>
				);
			})}
		</>
	);
};

export default Phases;
