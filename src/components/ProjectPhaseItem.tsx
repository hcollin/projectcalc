import {
	Button,
	ButtonGroup,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Slider,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { PHASETYPE, PhaseTeamAllocation, Project, ProjectPhase, Team } from "../models/Project";
import { useEffect, useState } from "react";

import Grid from "@mui/material/Unstable_Grid2";

import RemoveButton from "./buttons/RemoveButton";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CancelButton from "./buttons/CancelButton";
import SaveButton from "./buttons/SaveButton";
import EditButton from "./buttons/EditButton";


const ProjectPhaseItem = ({
	phase,
	project,
	onUpdate,
	onRemove,
	onMoveUp,
	onMoveDown,
}: {
	phase: ProjectPhase;
	project: Project;
	onUpdate: (phase: ProjectPhase) => void;
	onRemove: (phase: ProjectPhase) => void;
	onMoveUp: (phase: ProjectPhase) => void;
	onMoveDown: (phase: ProjectPhase) => void;
}) => {
	const [editMode, setEditMode] = useState<boolean>(false);
	const [value, setValue] = useState<number>(phase.weeks || 1);

	const [newName, setNewName] = useState<string>(phase.name || phase.type);
	const [newType, setNewType] = useState<PHASETYPE>(phase.type);
	const [allocations, setAllocations] = useState<PhaseTeamAllocation[]>(phase.teamAllocations || []);

	useEffect(() => {
		setValue(phase.weeks || 1);
	}, [phase]);

	function handleSliderChange(e: any, value: number | number[]) {
		setValue(value as number);
	}

	function handleCommit() {
		onUpdate({ ...phase, weeks: value });
	}

	function confirmEdit() {
		onUpdate({ ...phase, name: newName, type: newType, teamAllocations: allocations });
		setEditMode(false);
	}

	function updateTeamAllocation(phaseTeamAllocation: PhaseTeamAllocation) {
		const newAllocations = [...allocations];
		const index = newAllocations.findIndex((a) => a.teamId === phaseTeamAllocation.teamId);
		if (index === -1) {
			newAllocations.push(phaseTeamAllocation);
		} else {
			newAllocations[index] = phaseTeamAllocation;
		}
		setAllocations(newAllocations);
	
	}

	if (editMode) {
		return (
			<Grid container spacing={1} alignItems="center" justifyContent="flex-start">
				<Grid xs={4}>
					<TextField label="Phase Name" value={newName} onChange={(e) => setNewName(e.target.value)} fullWidth size="small" />
				</Grid>
				<Grid xs={3}>
					<FormControl fullWidth>
						<InputLabel>Phase Type</InputLabel>
						<Select value={newType} label="Phase Type" onChange={(e) => setNewType(e.target.value as PHASETYPE)} size="small">
							<MenuItem value={PHASETYPE.CONSULTING}>Consulting</MenuItem>
							<MenuItem value={PHASETYPE.RAMPUP}>Ramp Up</MenuItem>
							<MenuItem value={PHASETYPE.DEFAULT}>Development</MenuItem>
							<MenuItem value={PHASETYPE.RAMPDOWN}>Ramp Down</MenuItem>
							<MenuItem value={PHASETYPE.MAINTENANCE}>Maintenance</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid xs={5}>
					<Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
						<CancelButton onClick={() => setEditMode(false)} />
						<SaveButton onClick={() => confirmEdit()} />
					</Stack>
				</Grid>
				<Grid xs={12}><Typography variant="h6">Team Allocations</Typography></Grid>
				{project.teams.map((team) => {
					const teamAllocation = phase.teamAllocations.find((a) => a.teamId === team.id) || { teamId: team.id, allocation: 1 };

					return <TeamAllocationItem key={`${phase.id}-teamalloc-${team.id}`} team={team} phase={phase} alloc={teamAllocation} onUpdate={updateTeamAllocation} />;
				})}
			</Grid>
		);
	}

	return (
		<Grid container spacing={1} alignItems="center" justifyContent="flex-start">
			<Grid xs={3}>
				<Stack direction="row" spacing={2} alignItems="center">
					<ButtonGroup variant="contained" size="small">
						<Button size="small" onClick={() => onMoveUp(phase)}>
							<ArrowUpwardIcon fontSize="small" />
						</Button>
						<Button size="small" onClick={() => onMoveDown(phase)}>
							<ArrowDownwardIcon fontSize="small" />
						</Button>
					</ButtonGroup>

					<Typography variant="subtitle1">
						{phase.name || phase.type} {phase.name !== "" && <Typography variant="subtitle2">{phase.type}</Typography>}
					</Typography>
				</Stack>
			</Grid>

			<Grid xs={7}>
				<Stack direction="row" spacing={2} alignItems="center">
					<Slider value={value} min={1} max={52} onChange={handleSliderChange} onChangeCommitted={handleCommit} />
				</Stack>
			</Grid>
			<Grid xs={1}>
				<Typography variant="body2">{value} weeks</Typography>
			</Grid>
			<Grid xs={1}>
				<RemoveButton onClick={() => onRemove(phase)} noText />
				<EditButton onClick={() => setEditMode(!editMode)} noText />
			</Grid>
		</Grid>
	);
};

const TeamAllocationItem = ({
	team,
	phase,
	alloc,
	onUpdate,
}: {
	team: Team;
	phase: ProjectPhase;
	alloc: PhaseTeamAllocation;
	onUpdate: (phaseTeamAllocation: PhaseTeamAllocation) => void;
}) => {

	const [allValue, setAllValue] = useState<number>(alloc.allocation * 100);

	function commitAllocation(e: any, v: number | number[]) {
		if(typeof v === "number") {
			onUpdate({ ...alloc, allocation: v / 100 });
		}
	}

	return (
		<>
			<Grid xs={3}>{team.name}</Grid>
			<Grid xs={8}>
				<Slider
					value={allValue}
					min={0}
					max={100}
					onChange={(e, v) => setAllValue(v as number)}
					step={10}
					onChangeCommitted={commitAllocation}>

					</Slider>
			</Grid>
			<Grid xs={1}>{allValue}%</Grid>
		</>
	);
};

export default ProjectPhaseItem;
