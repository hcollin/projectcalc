import {
	Accordion,
	AccordionActions,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	Card,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { Person, SENIORITY } from "../models/People";
import { Project } from "../models/Project";
import { useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

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

	const { id, name, roles, pricegroup } = person;

	const priceItem = project.prices.find((p) => p.id === pricegroup) || {
		name: "No price group",
		value: 0,
	};

	function saveMember() {
		const newPerson = { ...person, name: newName, pricegroup: newPriceGroup };
		onUpdate(newPerson);
		setEditMode(false);
	}

	function cancelEditMode() {
		setEditMode(false);
	}

	return (
		<Accordion>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>{name}</AccordionSummary>
			{editMode && (
				<AccordionDetails>
					<TextField label="Name" value={newName} onChange={(e) => setNewName(e.target.value)} />

					<Select value={newPriceGroup} onChange={(e) => setNewPriceGroup(e.target.value as string)}>
						{project.prices.map((price) => {
							return (
								<MenuItem value={price.id} key={price.id}>
									{price.name} {price.value} €/h
								</MenuItem>
							);
						})}
					</Select>
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
					</Stack>
				</AccordionDetails>
			)}
			{!editMode && (
				<AccordionActions>
					<Button variant="contained" size="small" color="error" onClick={() => onRemove(person)} startIcon={<PersonRemoveIcon />}>
						Remove
					</Button>
					<Button variant="contained" size="small" color="primary" onClick={() => setEditMode(true)} startIcon={<ModeEditIcon />}>
						Edit Mode
					</Button>
				</AccordionActions>
			)}
			{editMode && (
				<AccordionActions>
					<Button variant="contained" size="small" color="secondary" onClick={cancelEditMode} startIcon={<CancelIcon />}>
						Cancel
					</Button>
					<Button variant="contained" size="small" color="primary" onClick={saveMember} startIcon={<SaveIcon />}>
						Save
					</Button>
				</AccordionActions>
			)}
		</Accordion>
	);
};

export default TeamMemberItem;
