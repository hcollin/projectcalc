import { Card, CardHeader, CardContent, Stack, Button, CardActionArea, Select, MenuItem, FormControl, InputLabel, FormHelperText, FormGroup, FormControlLabel, Checkbox } from "@mui/material";

import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useEffect, useState } from "react";
import { Project, TEAMSIZE, TEAMTYPE, Team } from "../models/Project";
import { v4 } from "uuid";
import { createTeam, getFreeTeamName, getMembersForTeam } from "../utils/TeamUtils";

const ADDITIONALMEMBERS: [string, string][] = [
    ["PD", "Project Director"],
    ["PM", "Project Manager"],
    ["PO", "Product Owner"],
    ["SM", "Scrum Master"],
    ["SA", "Solution Architect"],
    ["TM", "Test Manager"],

];


const NewTeamCard = ({ onCreate, project }: { onCreate: (t: Team) => void, project: Project }) => {

    const [size, setSize] = useState<TEAMSIZE>(TEAMSIZE.SMALL);
    const [type, setType] = useState<TEAMTYPE>(TEAMTYPE.DEV);
    const [addMembers, setAddMembers] = useState<string[]>([]);


    function toggleAdditionalMember(member: string) {
        setAddMembers((prev) => {

            if (prev.includes(member)) {
                return prev.filter(m => m !== member);
            }
            return [...prev, member];

        });
    }


    function handleCreate() {

        const team: Team = createTeam({
            name: getFreeTeamName(project),
            people: getMembersForTeam(size, type, addMembers)
        });
        onCreate(team);
    }

    function handleCreateEmpty() {

        const team: Team = createTeam({
            name: getFreeTeamName(project)
        });
        onCreate(team);
    }



    return (
        <Card elevation={5} sx={{ maxWidth: "30rem" }}>
            <CardHeader title="New Team" />
            <CardContent>
                <Stack direction="column" spacing={2}>

                    <FormControl>
                        <InputLabel>Size</InputLabel>
                        <Select
                            label="Size"
                            value={size}
                            size="small"
                            onChange={(e) => setSize(e.target.value as TEAMSIZE)}
                        >
                            <MenuItem value={TEAMSIZE.MINI}>Mini</MenuItem>
                            <MenuItem value={TEAMSIZE.SMALL}>Small </MenuItem>
                            <MenuItem value={TEAMSIZE.MEDIUM}>Medium </MenuItem>
                            <MenuItem value={TEAMSIZE.LARGE}>Large</MenuItem>
                            <MenuItem value={TEAMSIZE.HUGE}>Huge</MenuItem>

                        </Select>
                        <FormHelperText>The actual team size depends on the type</FormHelperText>
                    </FormControl>

                    <FormControl>
                        <InputLabel>Type</InputLabel>
                        <Select
                            label="Type"
                            value={type}
                            size="small"
                            onChange={(e) => setType(e.target.value as TEAMTYPE)}
                        >
                            <MenuItem value={TEAMTYPE.FULL}>Full Project Team</MenuItem>
                            <MenuItem value={TEAMTYPE.DEV}>Development</MenuItem>
                            <MenuItem value={TEAMTYPE.UX}>Design</MenuItem>
                            <MenuItem value={TEAMTYPE.QA}>QA & Test</MenuItem>

                        </Select>
                        <FormHelperText>What type of team this is?</FormHelperText>
                    </FormControl>

                    <FormGroup>
                        <InputLabel>Additional Team Members</InputLabel>
                        <Stack direction="row" spacing={0} flexWrap="wrap">
                            {ADDITIONALMEMBERS.map((m) => {

                                return (
                                    <FormControlLabel control={<Checkbox checked={addMembers.includes(m[0])} onChange={() => toggleAdditionalMember(m[0])} />} label={m[1]} key={`new-member-${m[0]}`} sx={{ flex: "0 0 auto", width: "48%" }} />
                                )
                            })}
                        </Stack>

                    </FormGroup>



                </Stack>
            </CardContent>
            <CardActionArea>
                <CardContent>
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" onClick={handleCreate} startIcon={<GroupAddIcon />}>Create Team</Button>
                        <Button variant="outlined" onClick={handleCreateEmpty} startIcon={<GroupAddIcon />}>Create Empty Team</Button>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    )

}

export default NewTeamCard;