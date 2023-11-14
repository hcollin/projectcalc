import { Container, Paper } from "@mui/material";
import { ViewProps } from "../models/ViewProps";
import Prices from "../components/Prices";






const PricesView = (props: ViewProps) => {

    return (
        <Container>
            <Paper>
                <Prices project={props.project} onUpdate={props.onUpdate} ></Prices>
            </Paper>
        </Container>
    )

}


export default PricesView;