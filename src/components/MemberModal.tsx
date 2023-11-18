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


const PREMADEMEMBERS: (Person | string)[] = [

    "Architects",
    createNewPerson({ name: "Software Architect", roles: [[PERSONROLE.Developer, SENIORITY.Lead]], allocation: 1 }),
    createNewPerson({ name: "Solution Architect", roles: [[PERSONROLE.Developer, SENIORITY.Lead], [PERSONROLE.Designer, SENIORITY.Junior]], allocation: 1 }),

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
    createNewPerson({ name: "Test Manager", roles: [[PERSONROLE.Tester, SENIORITY.Senior], [PERSONROLE.Manager, SENIORITY.Mid]], allocation: 1 }),
    createNewPerson({ name: "Test Automation Developer", roles: [[PERSONROLE.Tester, SENIORITY.Mid]], allocation: 1 }),
    createNewPerson({ name: "Senior Test Automation Developer", roles: [[PERSONROLE.Tester, SENIORITY.Senior]], allocation: 1 }),
    createNewPerson({ name: "Test Manager", roles: [[PERSONROLE.Tester, SENIORITY.Senior], [PERSONROLE.Manager, SENIORITY.Mid]], allocation: 1 }),
]

const MemberModal = ({ cancelAction, createPerson, project, editablePerson }: { editablePerson?: Person, cancelAction: () => void, createPerson: (p: Person) => void, project: Project }) => {

    const [tab, setTab] = useState<"custom" | "wizard">("custom");

    const title = editablePerson ? `Edit ${editablePerson.name}` : "New Team Member";

    return (
        <Modal open={true} onClose={cancelAction}>
            <Card sx={modalStyle} elevation={5}>

                <CardHeader title={title} />
                {!editablePerson && <>

                    <Tabs value={tab} onChange={(e, v) => setTab(v)}>
                        <Tab value="custom" label="Custom" />
                        <Tab value="wizard" label="Wizard" />
                    </Tabs>
                </>}

                {tab === "custom" && !editablePerson && <TeamMemberEditor onCreate={createPerson} onCancel={cancelAction} project={project} />}
                {tab === "custom" && editablePerson && <TeamMemberEditor onCreate={createPerson} onCancel={cancelAction} project={project} editablePerson={editablePerson} />}
                {tab === "wizard" && <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap sx={{ mt: 2 }}>
                    {PREMADEMEMBERS.map((p, i) => {

                        if (typeof p === "string") return (<Box><Typography key={i} variant="body1">{p}</Typography></Box>);

                        return (<PreMadeMember key={p.id} p={p} createPerson={createPerson} />);

                    })}
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


