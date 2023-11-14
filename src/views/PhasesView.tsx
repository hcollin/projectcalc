import { Container, Paper } from "@mui/material";
import Phases from "../components/Phases";
import { ViewProps } from "../models/ViewProps";



const PhasesView = (props: ViewProps) => {


    return (
        <Container>
            <Paper>
                <Phases project={props.project} onUpdate={props.onUpdate} ></Phases>
            </Paper>
        </Container>
    )
}

export default PhasesView;