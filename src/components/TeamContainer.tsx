import { Button, Card, CardActionArea, CardContent, CardHeader, Divider, MenuItem, Select, Stack, TextField } from "@mui/material";
import { Project, Team } from "../models/Project";
import PersonItem from "./PersonItem";
import { PERSONROLE, Person } from "../models/People";
import { createNewPerson, rolesArray } from "../utils/personUitls";
import PersonGenerator from "./PersonGenerator";
import { useState } from "react";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';


export interface TeamProps {
    project: Project;
    team: Team;
    updateTeam: (team: Team) => void;
    removeTeam: (team: Team) => void;
}

const TeamContainer = (props: TeamProps) => {

    const [state, setState] = useState<string>("MAINACTIONS")
    const [newName, setNewName] = useState<string>(props.team.name || "");

    const people = props.team.people;

    function updatePerson(person: Person) {
        const newPeople = people.map(p => {
            if (p.id === person.id) {
                return person;
            }
            return p;
        });
        props.updateTeam({ ...props.team, people: newPeople });
    }

    function removePerson(person: Person) {
        const newPeople = people.filter(p => p.id !== person.id);
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
                        <PersonItem key={`person-${person.id}`} person={person} onUpdate={updatePerson} onRemove={removePerson} />
                    )
                })}



            </CardContent>
            {state === "NEWMEMBER" && <CardActionArea>
                <PersonGenerator onCreate={newPerson} onCancel={cancelAction} />

            </CardActionArea>}
            {state === "MAINACTIONS" && <CardActionArea>
                <CardContent>
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" color="primary" startIcon={<PersonAddIcon />} onClick={() => setState("NEWMEMBER")}>New Member</Button>
                        <Button variant="contained" color="primary" startIcon={<DriveFileRenameOutlineIcon />} onClick={() => setState("RENAME")}>Rename</Button>
                        <Button variant="contained" color="error" startIcon={<DeleteForeverIcon />} onClick={deleteTeam}>Delete Team</Button>
                    </Stack>
                </CardContent>
            </CardActionArea>}

            {state === "RENAME" && <CardActionArea>

                <CardContent>
                    <Stack direction="row" spacing={2}>
                        <TextField
                            label="Team Name"
                            defaultValue={newName}
                            variant="outlined"
                            onChange={(e) => setNewName(e.target.value)}
                        />
                        <Button variant="contained" color="primary" startIcon={<DriveFileRenameOutlineIcon />} onClick={renameTeam}>OK</Button>
                        <Button variant="contained" color="secondary" startIcon={<PersonAddIcon />} onClick={cancelAction}>Cancel</Button>
                    </Stack>
                </CardContent></CardActionArea>
            }


        </Card>
    )

}

export default TeamContainer;