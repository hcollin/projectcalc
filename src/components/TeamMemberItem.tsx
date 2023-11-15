import {
	Accordion,
	AccordionActions,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	Card,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Slider,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Person, SENIORITY } from "../models/People";
import { Project } from "../models/Project";
import { useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import CancelButton from "./CancelButton";
import SaveButton from "./SaveButton";
import RemoveButton from "./RemoveButton";
import EditButton from "./EditButton";

const TeamMemberItem = ({
	project,
	person,
	onUpdate,
	onRemove,
}: {
	project: Project;
	person: Person;
	onUpdate: (p: Person) => void;
	onRemove: (p: Person) => void;
}) => {
	const [editMode, setEditMode] = useState<boolean>(false);

	const [newName, setNewName] = useState<string>(person.name || "");
	const [newPriceGroup, setNewPriceGroup] = useState<string>(person.pricegroup || "");
	const [newAllocation, etNewAllocation] = useState<number>(person.allocation ? person.allocation * 100 : 100);

	const { id, name, roles, pricegroup } = person;

	const priceItem = project.prices.find((p) => p.id === pricegroup) || {
		name: "No price group",
		value: 0,
	};

	function saveMember() {
		const newPerson = { ...person, name: newName, pricegroup: newPriceGroup, allocation: newAllocation / 100 };
		onUpdate(newPerson);
		setEditMode(false);
	}

	function cancelEditMode() {
		setEditMode(false);
	}

	function handleSliderChange(e: any, value: number | number[]) {
		etNewAllocation(value as number);
	}

	return (
		<Accordion>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Box>
					<Typography variant="body1" color="info">{name} <Typography variant="mini" color="info.light"> ({person.allocation * 100}% @ {priceItem.value}€/h)</Typography></Typography>
					</Box>
				</AccordionSummary>
			{editMode && (
				<AccordionDetails>
					<Grid container spacing={1}>
						<Grid xs={7}>
							<TextField label="Name" value={newName} onChange={(e) => setNewName(e.target.value)} />
						</Grid>
						<Grid xs={5}>
							<FormControl>
								<InputLabel>Price Group</InputLabel>
								<Select value={newPriceGroup} onChange={(e) => setNewPriceGroup(e.target.value as string)} label="Price Group">
									{project.prices.map((price) => {
										return (
											<MenuItem value={price.id} key={price.id}>
												{price.name} {price.value} €/h
											</MenuItem>
										);
									})}
								</Select>
							</FormControl>
						</Grid>
					</Grid>

					<Stack direction="column" spacing={1} alignItems="flex-start" justifyContent="flex-start" sx={{marginTop: "1rem"}}>
					<Typography variant="body1">Allocation {newAllocation}%</Typography>
					
					<Slider
						value={newAllocation}
						min={0}
						max={100}
						onChange={handleSliderChange}
						marks={true}
						
						step={10}
					></Slider>
					</Stack>

				</AccordionDetails>
			)}
			{!editMode && (
				<AccordionDetails>
					<Stack direction="row" spacing={2} useFlexGap justifyContent="space-between">
						<Box>
							<Typography variant="body1">Roles</Typography>
							<Stack direction="column" spacing={1}>
								{roles.map((role, index) => {
									return (
										<Stack direction="row" spacing={1}>
											<Typography variant="body2">
												{role[1] !== SENIORITY.Mid && `${role[1]} `}
												{role[0]}
											</Typography>
										</Stack>
									);
								})}
							</Stack>
						</Box>
						<Box>
							<Typography variant="body1">Price</Typography>
							<Typography variant="body2">{priceItem.name}</Typography>
							<Typography variant="body2">{priceItem.value} €/h</Typography>
						</Box>
						<Box>
							<Typography variant="body1">Allocation</Typography>
							<Typography variant="body2">{person.allocation * 100}%</Typography>
						</Box>
					</Stack>
				</AccordionDetails>
			)}
			{!editMode && (
				<AccordionActions>
					<RemoveButton onClick={() => onRemove(person)} noText />
					{/* <Button variant="contained" size="small" color="error" onClick={() => onRemove(person)} startIcon={<PersonRemoveIcon />}>
						Remove
					</Button> */}
					<EditButton onClick={() => setEditMode(true)} />
					{/* <Button variant="contained" size="small" color="primary" onClick={() => setEditMode(true)} startIcon={<ModeEditIcon />}>
						Edit Mode
					</Button> */}
				</AccordionActions>
			)}
			{editMode && (
				<AccordionActions>
					<CancelButton onClick={cancelEditMode} />
					<SaveButton onClick={saveMember} />
				</AccordionActions>
			)}
		</Accordion>
	);
};

export default TeamMemberItem;
