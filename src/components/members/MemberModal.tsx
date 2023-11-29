import { Modal, Card, CardHeader, Tabs, Tab, Box, Stack, Typography, Button } from "@mui/material";
import TeamMemberEditor from "./TeamMemberEditor";
import { Project, Team } from "../../models/Project";
import { PERSONROLE, Person, SENIORITY } from "../../models/People";
import { useState } from "react";
import { createNewPerson, getAllExistingMembers } from "../../utils/personUtils";
import { v4 } from "uuid";
import { create } from "domain";
import { get } from "http";

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

const PREMADEMEMBERS: (Person | string)[] = [
	"Architects",
	createNewPerson({ name: "Software Architect", roles: [[PERSONROLE.Developer, SENIORITY.Lead]], allocation: 1 }),
	createNewPerson({
		name: "Solution Architect",
		roles: [
			[PERSONROLE.Developer, SENIORITY.Lead],
			[PERSONROLE.Designer, SENIORITY.Junior],
		],
		allocation: 1,
	}),

	"Managers",
	createNewPerson({ name: "Project Manager", roles: [[PERSONROLE.Manager, SENIORITY.Senior]], allocation: 1 }),
	createNewPerson({ name: "Product Owner", roles: [[PERSONROLE.Manager, SENIORITY.Senior]], allocation: 1 }),
	createNewPerson({ name: "Scrum Master", roles: [[PERSONROLE.Manager, SENIORITY.Mid]], allocation: 1 }),

	"Developers",
	createNewPerson({ name: "Backend Developer", roles: [[PERSONROLE.Developer, SENIORITY.Mid]], allocation: 1 }),
	createNewPerson({ name: "Senior Backend Developer", roles: [[PERSONROLE.Developer, SENIORITY.Senior]], allocation: 1 }),

	createNewPerson({ name: "Frontend Developer", roles: [[PERSONROLE.Developer, SENIORITY.Mid]], allocation: 1 }),
	createNewPerson({ name: "Senior Frontend Developer", roles: [[PERSONROLE.Developer, SENIORITY.Senior]], allocation: 1 }),

	createNewPerson({ name: "Junior Developer", roles: [[PERSONROLE.Developer, SENIORITY.Junior]], allocation: 1 }),

	"Designers",
	createNewPerson({ name: "UX Designer", roles: [[PERSONROLE.Designer, SENIORITY.Mid]], allocation: 1 }),
	createNewPerson({ name: "Service Designer", roles: [[PERSONROLE.Designer, SENIORITY.Senior]], allocation: 1 }),

	"Testers",
	createNewPerson({
		name: "Test Manager",
		roles: [
			[PERSONROLE.Tester, SENIORITY.Senior],
			[PERSONROLE.Manager, SENIORITY.Mid],
		],
		allocation: 1,
	}),
	createNewPerson({ name: "Test Automation Developer", roles: [[PERSONROLE.Tester, SENIORITY.Mid]], allocation: 1 }),
	createNewPerson({ name: "Senior Test Automation Developer", roles: [[PERSONROLE.Tester, SENIORITY.Senior]], allocation: 1 }),
];

const MemberModal = ({
	cancelAction,
	createPerson,
	project,
	editablePerson,
	team
}: {
	editablePerson?: Person;
	cancelAction: () => void;
	createPerson: (p: Person) => void;
	project: Project;
	team: Team;
}) => {
	const [tab, setTab] = useState<"custom" | "wizard" | "inproject">("custom");

	const title = editablePerson ? `Edit ${editablePerson.name}` : "New Team Member";

	const existingMembers = getAllExistingMembers(project);

	function selectExistingMember(p: Person) {
		createPerson({ ...p });
		cancelAction();
	}

	return (
		<Modal open={true} onClose={cancelAction}>
			<Card sx={modalStyle} elevation={5}>
				<CardHeader title={title} />
				{!editablePerson && (
					<>
						<Tabs value={tab} onChange={(e, v) => setTab(v)}>
							<Tab value="custom" label="Custom" />
							<Tab value="wizard" label="Wizard" />
							<Tab value="inproject" label="Existing" />
						</Tabs>
					</>
				)}

				{tab === "custom" && !editablePerson && <TeamMemberEditor onCreate={createPerson} onCancel={cancelAction} project={project} />}
				{tab === "custom" && editablePerson && (
					<TeamMemberEditor onCreate={createPerson} onCancel={cancelAction} project={project} editablePerson={editablePerson} />
				)}
				{tab === "wizard" && (
					<Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 2 }}>
						{PREMADEMEMBERS.map((p, i) => {
							if (typeof p === "string")
								return (
									<Box sx={{ width: "100%", p: 0, m: 0 }}>
										<Typography key={i} variant="body2">
											{p}
										</Typography>
									</Box>
								);

							return <PreMadeMember key={p.id} p={p} createPerson={createPerson} />;
						})}
					</Stack>
				)}
				{tab === "inproject" &&
					<Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 2 }}>
						{existingMembers.map((p) => {

							let fromTeam: string = "";

							if (p.teamId !== undefined) {

								// Do not include people from the same team 
								if (p.teamId === team.id) return null;

								// Do not include people that are already in the target team (even if they are from another team)
								const exists = team.people.find(tp => tp.id === p.id);
								if(exists) return null;

								const pt = project.teams.find(t => t.id === p.teamId);
								if (pt) {
									fromTeam = ` from ${pt?.name}`;
								}



							}
							// if(p.teamId !== undefined && p.teamId === team.id) return null;
							return <Button variant="contained" onClick={() => selectExistingMember(p)}>{p.name}{fromTeam}</Button>;
						})}
					</Stack>}
			</Card>
		</Modal>
	);
};

const PreMadeMember = ({ p, createPerson }: { p: Person; createPerson: (p: Person) => void }) => {
	function prepPreMadePerson() {
		const np = { ...p, id: v4() };
		createPerson(np);
	}

	return (
		<Button variant="contained" onClick={prepPreMadePerson}>
			{p.name}
		</Button>
	);

	// return (
	//     <Stack direction="row" spacing={2} sx={{m: 1}} onClick={() => createPerson(p)}>
	//         <Typography variant="body1">{p.name}</Typography>
	//     </Stack>
	// )
};

export default MemberModal;
