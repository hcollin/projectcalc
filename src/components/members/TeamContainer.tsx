import { Box, Button, Card, CardActionArea, CardContent, CardHeader, Divider, MenuItem, Modal, Select, Stack, TextField, Typography } from "@mui/material";
import { Project, Team } from "../../models/Project";
import TeamMemberItem from "./TeamMemberItem";
import { PERSONROLE, Person } from "../../models/People";
import { createNewPerson, rolesArray } from "../../utils/personUitls";
import TeamMemberEditor from "./TeamMemberEditor";
import { useState } from "react";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import RemoveButton from "../buttons/RemoveButton";
import MemberModal from "./MemberModal";

export interface TeamProps {
	project: Project;
	team: Team;
	showDetails: boolean;
	updateTeam: (team: Team) => void;
	removeTeam: (team: Team) => void;
}

const modalStyle = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "auto",
	minWidth: "50%",
	maxWidth: 800,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 2,
};

const TeamContainer = (props: TeamProps) => {
	const [state, setState] = useState<string>("MAINACTIONS");
	const [newName, setNewName] = useState<string>(props.team.name || "");

	const people = props.team.people;

	function updatePerson(person: Person) {
		const newPeople = people.map((p) => {
			if (p.id === person.id) {
				return person;
			}
			return p;
		});
		props.updateTeam({ ...props.team, people: newPeople });
	}

	function removePerson(person: Person) {
		const newPeople = people.filter((p) => p.id !== person.id);
		props.updateTeam({ ...props.team, people: newPeople });
	}

	function newPerson(p: Person) {
		const newPeople = [...people, p];
		props.updateTeam({ ...props.team, people: newPeople });
		setState("MAINACTIONS");
	}

	function cancelAction() {
		setState("MAINACTIONS");
	}

	function deleteTeam() {
		props.removeTeam(props.team);
	}

	function renameTeam() {
		setState("MAINACTIONS");
		props.updateTeam({ ...props.team, name: newName });
	}

	const title = `${props.team.name || props.team.id} (${props.team.people.length} members)`;

	return (
		<Card elevation={8}>
			<CardHeader title={title} />

			<CardContent>
				{people.map((person, index) => {
					return (
						<TeamMemberItem key={`person-${person.id}`} project={props.project} person={person} onUpdate={updatePerson} onRemove={removePerson} detailedInfo={props.showDetails}/>
					);
				})}
			</CardContent>
			{state === "NEWMEMBER" && <MemberModal cancelAction={cancelAction} createPerson={newPerson} project={props.project} />}

			{/* <Modal open={state === "NEWMEMBER"} onClose={cancelAction}>
				<Card sx={modalStyle} elevation={5}>
					<CardHeader title="New Team Member" />
					<TeamMemberEditor onCreate={newPerson} onCancel={cancelAction} project={props.project} />
				</Card>
			</Modal> */}

			{state === "NEWMEMBER" && (
				<CardActionArea>
					<Typography variant="body1" component="div" color="info" align="center">
						Creating a new team member!
					</Typography>
				</CardActionArea>
			)}
			{state === "MAINACTIONS" && (
				<CardActionArea>
					<CardContent>
						<Stack direction="row" spacing={2}>
							<Button variant="contained" color="primary" startIcon={<PersonAddIcon />} onClick={() => setState("NEWMEMBER")}>
								New Member
							</Button>
							<Button variant="contained" color="primary" startIcon={<DriveFileRenameOutlineIcon />} onClick={() => setState("RENAME")}>
								Rename
							</Button>
							<RemoveButton onClick={deleteTeam} />
							{/* <Button variant="contained" color="error" startIcon={<DeleteForeverIcon />} onClick={deleteTeam}>
								Delete Team
							</Button> */}
						</Stack>
					</CardContent>
				</CardActionArea>
			)}

			{state === "RENAME" && (
				<CardActionArea>
					<CardContent>
						<Stack direction="row" spacing={2}>
							<TextField label="Team Name" defaultValue={newName} variant="outlined" onChange={(e) => setNewName(e.target.value)} />

							<Button variant="contained" color="secondary" startIcon={<PersonAddIcon />} onClick={cancelAction}>
								Cancel
							</Button>
							<Button variant="contained" color="primary" startIcon={<DriveFileRenameOutlineIcon />} onClick={renameTeam}>
								OK
							</Button>
						</Stack>
					</CardContent>
				</CardActionArea>
			)}
		</Card>
	);
};

export default TeamContainer;
