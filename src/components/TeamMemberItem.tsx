import {
	Accordion,
	AccordionActions,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	FormControl,
	InputLabel,
	List,
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
import MemberModal from "./MemberModal";

const TeamMemberItem = ({
	project,
	person,
	onUpdate,
	onRemove,
	detailedInfo
}: {
	project: Project;
	person: Person;
	onUpdate: (p: Person) => void;
	onRemove: (p: Person) => void;
	detailedInfo: boolean;
}) => {
	const [editMode, setEditMode] = useState<boolean>(false);


	const { id, name, roles, pricegroup, allocation } = person;

	const priceItem = project.prices.find((p) => p.id === pricegroup) || {
		name: "No price group",
		value: 0,
	};


	function cancelEditMode() {
		setEditMode(false);
	}

	function saveEdit(p: Person) {
		onUpdate(p);
		setEditMode(false);
	}

	const pds1 = detailedInfo ? 2 : 1;

	return (
		<Card sx={{ mb: 1 }}>
			<CardContent sx={{ p: 2, pt: pds1, tb: pds1, '&:last-child': { pb: pds1 } }}>

				<Stack direction="row" spacing={2} useFlexGap justifyContent="space-between" alignItems="center">
					{!detailedInfo && <Typography variant="body1" color="info">{name}</Typography>}
					{detailedInfo &&
						<Box>
							<Typography variant="body1" color="info">{name} </Typography>
							<Stack direction="row" spacing={2}>
								<Typography variant="body2">Allocation: {allocation * 100}%</Typography>
								<Typography variant="body2">Price: {priceItem.value}€/h</Typography>
							</Stack>
							<Stack direction="row" spacing={1} sx={{ mt: 1 }}>
								{roles.map((r, i) => {
									const label = `${r[1]} ${r[0]}`
									return (
										<Chip label={label} />
									)
								})}
							</Stack>

						</Box>
					}
					{!editMode && <Box>
						<RemoveButton onClick={() => onRemove(person)} noText />
						<EditButton onClick={() => setEditMode(true)} noText />
					</Box>}
					{editMode &&
						<MemberModal cancelAction={cancelEditMode} createPerson={saveEdit} project={project} editablePerson={person} />
					}
				</Stack>
			</CardContent>
		</Card>
	)
};

export default TeamMemberItem;
