import { Modal, Card, CardHeader, Tabs, Tab, Box, Stack, Typography, Button } from "@mui/material";
import TeamMemberEditor from "./TeamMemberEditor";
import { Project } from "../models/Project";
import { PERSONROLE, Person, SENIORITY } from "../models/People";
import { useState } from "react";
import { createNewPerson } from "../utils/personUitls";


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


const PREMADEMEMBERS: Person[] = [
    createNewPerson({ name: "Software Architect", roles: [[PERSONROLE.Developer, SENIORITY.Lead]], allocation: 1 }),
    createNewPerson({ name: "Solution Architect", roles: [[PERSONROLE.Developer, SENIORITY.Lead], [PERSONROLE.Designer, SENIORITY.Junior]], allocation: 1 }),
    createNewPerson({ name: "Project Manager", roles: [[PERSONROLE.Manager, SENIORITY.Senior]], allocation: 1 }),
    createNewPerson({ name: "Product Owner", roles: [[PERSONROLE.Manager, SENIORITY.Senior]], allocation: 1 }),
]

const MemberModal = ({ cancelAction, createPerson, project }: { cancelAction: () => void, createPerson: (p: Person) => void, project: Project }) => {

    const [tab, setTab] = useState<"custom" | "wizard">("custom");

    return (
        <Modal open={true} onClose={cancelAction}>
            <Card sx={modalStyle} elevation={5}>
                <CardHeader title="New Team Member" />
                <Tabs value={tab} onChange={(e, v) => setTab(v)}>
                    <Tab value="custom" label="Custom" />
                    <Tab value="wizard" label="Wizard" />
                </Tabs>

                {tab === "custom" && <TeamMemberEditor onCreate={createPerson} onCancel={cancelAction} project={project} />}
                {tab === "wizard" && <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap sx={{mt: 2}}>
                    {PREMADEMEMBERS.map((p, i) => <PreMadeMember key={p.id} p={p} createPerson={createPerson} />)}
                </Stack>}


            </Card>
        </Modal>

    )
}


const PreMadeMember = ({ p, createPerson }: { p: Person, createPerson: (p: Person) => void }) => {

    return (
        <Button variant="contained" onClick={() => createPerson(p)}>{p.name}</Button>


    )

    // return (
    //     <Stack direction="row" spacing={2} sx={{m: 1}} onClick={() => createPerson(p)}>
    //         <Typography variant="body1">{p.name}</Typography>
    //     </Stack>
    // )
}

export default MemberModal;
