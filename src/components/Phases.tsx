import { Box, Button, ButtonGroup, Card, CardContent, IconButton, Typography } from "@mui/material";
import { PHASETYPE, Project, ProjectPhase } from "../models/Project";
import PhaseSlider from "./PhaseSlider";

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export interface PhasesProps {
    project: Project;
    onUpdate: (project: Project) => void;
}

const Phases = (props: PhasesProps) => {


    function updatePhase(phase: ProjectPhase) {
        const newPhases = props.project.phases.map(p => p.id === phase.id ? phase : p);

        props.onUpdate({ ...props.project, phases: newPhases });
    }

    function addNewPhase() {
        const newPhase: ProjectPhase = {
            id: Math.random().toString(36).substr(2, 9),
            type: PHASETYPE.DEFAULT,
            weeks: 4
        }

        const newPhases = [...props.project.phases, newPhase];

        props.onUpdate({ ...props.project, phases: newPhases });
    }

    // Move target phase up one position in the array
    function moveUp(target: number) {

        if (target === 0) return;
        
        const newPhases = [...props.project.phases];
        const item = newPhases.splice(target, 1)[0];
        newPhases.splice(target - 1, 0, item);
        props.onUpdate({ ...props.project, phases: newPhases });
    }
    

    function moveDown(target: number) {

        // If target is last item, do nothing
        if (target === props.project.phases.length - 1) return;

        const newPhases = [...props.project.phases];
        const item = newPhases.splice(target, 1)[0];
        newPhases.splice(target + 1, 0, item);
        props.onUpdate({ ...props.project, phases: newPhases });
    }


    return (
        <Card>
            <CardContent>

                <Typography variant="h5" component="div" sx={{ color: "primary.main", display: "flex", justifyContent: "space-between" }} >
                    Phases <Button variant="contained" onClick={addNewPhase} size="small"><AddIcon /></Button>
                </Typography>

                {props.project.phases.map((phase, index) => {

                    return (
                        <Box sx={{display: "flex", margin: "0", alignItems: "center", borderBottom: "ridge 2px #FFF2", padding: "0.5rem 0"}}>
                            <ButtonGroup variant="contained" orientation="vertical" size="small" sx={{marginRight: "0.5rem"}}>
                                <Button onClick={() => { moveUp(index) }} disabled={index === 0}><ArrowUpwardIcon /></Button >
                                <Button ><DeleteIcon /></Button>
                                <Button onClick={() => { moveDown(index) }} disabled={index === props.project.phases.length - 1}><ArrowDownwardIcon /></Button >
                            </ButtonGroup>
                            <PhaseSlider key={`phase-${index}`} phase={phase} onUpdate={updatePhase} />
                        </Box>

                    )

                })}

                

            </CardContent>
        </Card>
    )
}

export default Phases;



