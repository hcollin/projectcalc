import { Container, Paper, Typography } from "@mui/material";
import { ViewProps } from "../models/ViewProps";




const TeamsView = (props: ViewProps) => {

    return (
        <Container maxWidth="lg">
            <Paper elevation={4}>
                <Typography variant="h3">Teams</Typography>



            </Paper>
        </Container>
    )
}

export default TeamsView;
