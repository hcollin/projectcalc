import { CardContent, Select, MenuItem, Button, Stack } from "@mui/material";
import { PERSONROLE, Person, SENIORITY } from "../models/People";
import { createNewPerson, rolesArray, seniorityArray } from "../utils/personUitls";
import { useState } from "react";

import CancelIcon from '@mui/icons-material/Cancel';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const PersonGenerator = ({ onCreate, onCancel }: { onCreate: (p: Person) => void, onCancel: () => void }) => {

    const [role, setRole] = useState<PERSONROLE>(PERSONROLE.Developer);
    const [sen, setSen] = useState<SENIORITY>(SENIORITY.Mid);

    function newPerson() {
        const p: Person = createNewPerson({
            roles: [
                [role, sen]
            ]
        });
        onCreate(p);
    }

    return (
        <CardContent>
            <Stack direction="row" spacing={2}>
                <Select

                    value={role}
                    size="small"
                    label="Role"
                    onChange={(e) => setRole(e.target.value as PERSONROLE)}>
                    {rolesArray().map((role, index) => {

                        return (
                            <MenuItem key={`role-${index}`} value={role[1]}>{role[0]}</MenuItem>
                        )
                    })}

                </Select>
                <Select

                    size="small"
                    value={sen}
                    label="Seniority"
                    onChange={(e) => setSen(e.target.value as SENIORITY)}>
                    {seniorityArray().map((seniority, index) => {

                        return (
                            <MenuItem key={`role-${index}`} value={seniority[1]}>{seniority[0]}</MenuItem>
                        )
                    })}

                </Select>
                <Button variant="contained" onClick={newPerson} startIcon={<PersonAddIcon />}>
                    Add
                </Button>
                <Button variant="contained" color="secondary" startIcon={<CancelIcon />} onClick={onCancel}>Cancel</Button>
            </Stack>
        </CardContent>
    )

}


export default PersonGenerator;