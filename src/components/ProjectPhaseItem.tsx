import {
	Button,
	ButtonGroup,
	Card,
	CardContent,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	Slider,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { PHASETYPE, ProjectPhase } from "../models/Project";
import { useEffect, useState } from "react";

import Grid from "@mui/material/Unstable_Grid2";

import RemoveButton from "./RemoveButton";
import EditIcon from "@mui/icons-material/Edit";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CancelButton from "./CancelButton";
import SaveButton from "./SaveButton";

const ProjectPhaseItem = ({
	phase,
	onUpdate,
	onRemove,
	onMoveUp,
	onMoveDown,
}: {
	phase: ProjectPhase;
	onUpdate: (phase: ProjectPhase) => void;
	onRemove: (phase: ProjectPhase) => void;
	onMoveUp: (phase: ProjectPhase) => void;
	onMoveDown: (phase: ProjectPhase) => void;
}) => {
	const [editMode, setEditMode] = useState<boolean>(false);
	const [value, setValue] = useState<number>(phase.weeks || 1);

	const [newName, setNewName] = useState<string>(phase.name || phase.type);
	const [newType, setNewType] = useState<PHASETYPE>(phase.type);

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
		onUpdate({ ...phase, name: newName, type: newType });
		setEditMode(false);
	}

	if (editMode) {
		return (
			<Grid container spacing={1} alignItems="center" justifyContent="flex-start">
				<Grid xs={4}>
					<TextField label="Phase Name" value={newName} onChange={(e) => setNewName(e.target.value)} fullWidth  size="small"/>
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
					
					<Typography variant="subtitle1">{phase.name || phase.type} {phase.name !== "" && <Typography variant="subtitle2">{phase.type}</Typography>}</Typography>
					
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
				<IconButton onClick={() => setEditMode(!editMode)} size="small">
					<EditIcon color="primary" />
				</IconButton>
			</Grid>
		</Grid>
	);
};

export default ProjectPhaseItem;
