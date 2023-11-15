import { Box, Card, CardContent, CardHeader, Container, Drawer, Paper, Stack, Typography } from "@mui/material";
import { Project } from "../models/Project";
import TotalPrice from "../components/TotalPrice";
import { getTotalHours } from "../utils/projectUtils";





const ProjectSummary = ({ project }: { project: Project }) => {

    const hours = getTotalHours(project);

    const months = Math.floor(hours / (21 * 7.5));

    const days = Math.floor((hours - (months * 21 * 7.5)) / 7.5);

    const restHours = hours - (months * 21 * 7.5) - (days * 7.5);

    // const weeks = Math.round(days / 5);



    return (
        <Paper sx={{ position: "fixed", bottom: 0, right: 0, padding: "0.5rem 1rem" }}>

            <Stack direction="row" spacing={3}>

                <TotalPrice project={project} />

                <Card>
                    <CardContent>
                        <Typography variant="body1">Duration</Typography>
                            <Typography variant="h6">

                                {months}m {days}d {restHours}h
                            </Typography>

                    </CardContent>
                </Card>
            </Stack>



        </Paper>

    )
}


export default ProjectSummary;