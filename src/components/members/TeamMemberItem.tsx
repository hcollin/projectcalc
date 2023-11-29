import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import { Person } from "../../models/People";
import { Project, Team } from "../../models/Project";
import { useState } from "react";

import RemoveButton from "../buttons/RemoveButton";
import EditButton from "../buttons/EditButton";
import MemberModal from "./MemberModal";

const TeamMemberItem = ({
	project,
	person,
	team,
	onUpdate,
	onRemove,
	detailedInfo,
}: {
	project: Project;
	person: Person;
	team: Team;
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
			<CardContent sx={{ p: 2, pt: pds1, tb: pds1, "&:last-child": { pb: pds1 } }}>
				<Stack direction="row" spacing={2} useFlexGap justifyContent="space-between" alignItems="center">
					{!detailedInfo && (
						<Typography variant="body1" color="info">
							{name}
						</Typography>
					)}
					{detailedInfo && (
						<Box>
							<Typography variant="body1" color="info">
								{name}
							</Typography>
							<Stack direction="row" spacing={2}>
								<Typography variant="body2">Allocation: {allocation * 100}%</Typography>
								<Typography variant="body2">Price: {priceItem.value}€/h</Typography>
							</Stack>
							<Stack direction="row" spacing={1} sx={{ mt: 1 }}>
								{roles.map((r, i) => {
									const label = `${r[1]} ${r[0]}`;
									return <Chip label={label} />;
								})}
							</Stack>
						</Box>
					)}
					{!editMode && (
						<Box>
							<RemoveButton onClick={() => onRemove(person)} noText />
							<EditButton onClick={() => setEditMode(true)} noText />
						</Box>
					)}
					{editMode && <MemberModal cancelAction={cancelEditMode} createPerson={saveEdit} project={project} editablePerson={person} team={team} />}
				</Stack>
			</CardContent>
		</Card>
	);
};

export default TeamMemberItem;
