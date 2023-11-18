import {
	CardContent,
	Select,
	MenuItem,
	Button,
	Stack,
	Typography,
	Box,
	IconButton,
	FormControl,
	InputLabel,
	CardActions,
	CardActionArea,
	Chip,
	Card,
	Divider,
	TextField,
	Slider,
} from "@mui/material";
import { PERSONROLE, Person, SENIORITY } from "../../models/People";
import { createNewPerson, rolesArray, seniorityArray } from "../../utils/personUitls";
import { useState } from "react";

import CancelIcon from "@mui/icons-material/Cancel";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CancelButton from "../buttons/CancelButton";
import SaveButton from "../buttons/SaveButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { v4 } from "uuid";
import { Project } from "../../models/Project";

const TeamMemberEditor = ({
	editablePerson,
	project,
	onCreate,
	onCancel,
}: {
	editablePerson?: Person;
	project: Project;
	onCreate: (p: Person) => void;
	onCancel: () => void;
}) => {
	const [person, setPerson] = useState<Person>(
		editablePerson || {
			id: v4(),
			roles: [[PERSONROLE.Developer, SENIORITY.Mid]],
			pricegroup: project.prices[0].id,
			allocation: 1,
		},
	);

	const [role, setRole] = useState<PERSONROLE>(PERSONROLE.Developer);
	const [sen, setSen] = useState<SENIORITY>(SENIORITY.Mid);
	const [allo, setAllo] = useState<number>(100);

	function addRole() {
		if (
			person.roles.find((r) => {
				return r[0] === role && r[1] === sen;
			})
		) {
			return;
		}
		const newRole: [PERSONROLE, SENIORITY] = [role, sen];

		const newRoles = [...person.roles, newRole];
		setPerson({ ...person, roles: newRoles });
	}

	function removeRole(i: number) {
		const newRoles = person.roles.filter((r, index) => {
			return index !== i;
		});
		setPerson({ ...person, roles: newRoles });
	}

	function newPerson() {
		if (person.roles.length === 0) return;
		const p = { ...person, allocation: allo / 100 };
		console.log(p.name, p);
		if (!p.name || p.name === "") {
			const r = p.roles[0];
			p.name = `${r[1] === SENIORITY.Mid ? "" : r[1] + " "}${r[0]}`;
		}
		onCreate(p);
	}

	return (
		<>
			<CardContent sx={{ width: "100%" }}>
				<Card elevation={8} sx={{ mb: 1 }}>
					<CardContent>
						<Stack direction="row" justifyContent="space-between">
							<TextField
								size="small"
								sx={{ m: 0, width: "40%" }}
								id="person-name"
								label="Name or Title"
								value={person.name}
								onChange={(e) => {
									setPerson({ ...person, name: e.target.value });
								}}
							/>
							<FormControl sx={{ m: 0, minWidth: "40%" }}>
								<InputLabel id="pricegroup-label">Price Group</InputLabel>
								<Select
									size="small"
									label="Price Group"
									value={person.pricegroup}
									fullWidth
									onChange={(e) => {
										setPerson({ ...person, pricegroup: e.target.value as string });
									}}
								>
									{project.prices.map((price, index) => {
										return (
											<MenuItem key={`price-${index}`} value={price.id}>
												{price.name}
											</MenuItem>
										);
									})}
								</Select>
							</FormControl>
							<Box sx={{ width: "10%" }}></Box>
						</Stack>
					</CardContent>
				</Card>

				<Card elevation={8} sx={{ mb: 1 }}>
					<CardContent>
						<Stack direction="row" spacing={1} sx={{ m: 1, mb: 3 }} flexWrap="wrap" useFlexGap>
							{person.roles.map((role, index) => {
								return (
									<Chip key={`role-$${role[0]}-${role[1]}-{index}`} label={`${role[0]} - ${role[1]}`} onDelete={() => removeRole(index)} />
								);
							})}
						</Stack>
						<Stack direction="row" justifyContent="space-between">
							<FormControl sx={{ m: 0, minWidth: "40%" }}>
								<InputLabel id="role-label">Role</InputLabel>
								<Select value={role} size="small" label="Role" onChange={(e) => setRole(e.target.value as PERSONROLE)}>
									{rolesArray().map((role, index) => {
										return (
											<MenuItem key={`role-${index}`} value={role[1]}>
												{role[0]}
											</MenuItem>
										);
									})}
								</Select>
							</FormControl>
							<FormControl sx={{ m: 0, minWidth: "40%" }}>
								<InputLabel id="seniority-label">Seniority</InputLabel>
								<Select size="small" value={sen} label="Seniority" onChange={(e) => setSen(e.target.value as SENIORITY)}>
									{seniorityArray().map((seniority, index) => {
										return (
											<MenuItem key={`role-${index}`} value={seniority[1]}>
												{seniority[0]}
											</MenuItem>
										);
									})}
								</Select>
							</FormControl>
							<Box sx={{ width: "10%" }}>
								<IconButton onClick={addRole} size="small" color="primary">
									<AddIcon />
								</IconButton>
							</Box>
						</Stack>
					</CardContent>
				</Card>

				<Card elevation={8} sx={{ mb: 1 }}>
					<CardContent>
						<Stack direction="row" spacing={3} justifyContent="space-between" alignItems="center">
							<Typography variant="body2" component="div" color="default">
								Allocation
							</Typography>
							<Slider aria-label="Allocation" value={allo} min={0} max={100} step={10} onChange={(e, v) => setAllo(v as number)} marks={true} />
							<Typography variant="body1" component="div" color="default">
								{allo}%
							</Typography>
						</Stack>
					</CardContent>
				</Card>
			</CardContent>

			<CardActionArea>
				<CardActions>
					<CancelButton onClick={onCancel} />
					<SaveButton onClick={newPerson} />
				</CardActions>
			</CardActionArea>
		</>
	);
};

export default TeamMemberEditor;
