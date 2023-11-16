import { Box, Card, CardContent, Container, Paper, Stack, Typography } from "@mui/material";
import { ViewProps } from "../models/ViewProps";
import { PHASETYPE } from "../models/Project";
import ProjectTimeline from "../components/ProjectTimeline";




const ProjectTimelineView = (props: ViewProps) => {

    const projectTotalWeeks = props.project.phases.reduce((acc, phase) => acc + phase.weeks, 0);
    const phaseLengths = props.project.phases.map(p => {

        return p.weeks / projectTotalWeeks * 100;
    })

    const phaseColors: Record<PHASETYPE, string> = {
        [PHASETYPE.CONSULTING]: "phaseConsulting.main",
        [PHASETYPE.RAMPUP]: "phaseRampUp.main",
        [PHASETYPE.DEFAULT]: "phaseDevelopment.main",
        [PHASETYPE.RAMPDOWN]: "phaseRampDown.main",
        [PHASETYPE.MAINTENANCE]: "phaseMaintenance.main",
    }

    return (
        <Container maxWidth="xl">
            <Paper elevation={4} sx={{ padding: "1rem" }}>
                <Typography variant="h4">Project Timeline</Typography>

                <Stack direction="column" spacing={3}>

                    <Card>
                        <CardContent>

                            <ProjectTimeline project={props.project} onUpdate={props.onUpdate} />

                        </CardContent>
                    </Card>


                </Stack>


            </Paper>
        </Container>

    )

}

export default ProjectTimelineView;