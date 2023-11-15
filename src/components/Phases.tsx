import { Card, CardContent } from "@mui/material";
import { PHASETYPE, Project, ProjectPhase } from "../models/Project";


import ProjectPhaseItem from "./ProjectPhaseItem";

export interface PhasesProps {
	project: Project;
	onUpdate: (project: Project) => void;
}

const Phases = (props: PhasesProps) => {
	function updatePhase(phase: ProjectPhase) {
		const newPhases = props.project.phases.map((p) => (p.id === phase.id ? phase : p));

		props.onUpdate({ ...props.project, phases: newPhases });
	}

	function addNewPhase() {
		const newPhase: ProjectPhase = {
			id: Math.random().toString(36).substr(2, 9),
			type: PHASETYPE.DEFAULT,
			weeks: 4,
            teamAllocations: []
		};

		const newPhases = [...props.project.phases, newPhase];

		props.onUpdate({ ...props.project, phases: newPhases });
	}

	function removePhase(phase: ProjectPhase) {
		const newPhases = props.project.phases.filter((p) => p.id !== phase.id);
		props.onUpdate({ ...props.project, phases: newPhases });
	}

	// // Move target phase up one position in the array
	// function moveUp(target: number) {
	// 	if (target === 0) return;

	// 	const newPhases = [...props.project.phases];
	// 	const item = newPhases.splice(target, 1)[0];
	// 	newPhases.splice(target - 1, 0, item);
	// 	props.onUpdate({ ...props.project, phases: newPhases });
	// }

	// function moveDown(target: number) {
	// 	// If target is last item, do nothing
	// 	if (target === props.project.phases.length - 1) return;

	// 	const newPhases = [...props.project.phases];
	// 	const item = newPhases.splice(target, 1)[0];
	// 	newPhases.splice(target + 1, 0, item);
	// 	props.onUpdate({ ...props.project, phases: newPhases });
	// }

	function moveUp(p: ProjectPhase) {
		const index = props.project.phases.findIndex((phase) => phase.id === p.id);
		if (index === 0) return;
		const newPhases = [...props.project.phases];
		newPhases.splice(index, 1);
		newPhases.splice(index - 1, 0, p);
		props.onUpdate({ ...props.project, phases: newPhases });
	}

	function moveDown(p: ProjectPhase) {}

	return (
		<>
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
							/>
						</CardContent>
					</Card>
				);
			})}
		</>
	);
};

export default Phases;
