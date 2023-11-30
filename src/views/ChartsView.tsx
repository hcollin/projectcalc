import { Box, Card, CardContent, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import { ViewProps } from "../models/ViewProps";
import HoursPerPriceGroupPie from "../components/charts/HoursPerPriceGroupPie";
import CostOfEachPhaseBars from "../components/charts/CostOfEachPhaseBars";

import ModeToggler from "../components/charts/ModeToggler";
import useStoredState from "../hooks/useStoredState";
import GanttChart from "../components/charts/GanttChart";

const ChartsView = (props: ViewProps) => {

    const [costMode, setCostMode] = useStoredState<"total" | "groups">("chartview-costmode", "total");
    const [pieMode, setPieMode] = useStoredState<"hours" | "price" | "days">("chartview-piemode", "hours");

    function changePieMode(mode: string) {
        if (mode === "hours" || mode === "price" || mode === "days") {
            setPieMode(mode);
        }
    }

    function changeCostMode(mode: string) {
        if (mode === "total" || mode === "groups") {
            setCostMode(mode);
        }
    }

    return (
        <Container maxWidth="xl" sx={{ mt: 10 }}>
            <Paper elevation={4} sx={{ padding: "1rem" }}>
                <Typography variant="h4">Charts</Typography>

                <Grid container spacing={2}>

                    <Grid item xs={12} xl={12}>
                        <Typography variant="h6">Gantt</Typography>
                        <GanttChart p={props.project} />
                    </Grid>

                </Grid>


                <Grid container spacing={2}>

                    <Grid item xs={12} xl={12}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: "block", height: "1rem", width: "2900px", backgroundColor: "primary.main" }} />
                            </CardContent>
                        </Card>

                    </Grid>

                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={12} xl={6}>
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                            <Typography variant="h6">Per pricegroup</Typography>
                            <ModeToggler value={pieMode} onChange={changePieMode} options={[["hours", "Hours"], ["price", "Price"], ["days", "Days"]]} />
                        </Stack>
                        <HoursPerPriceGroupPie p={props.project} mode={pieMode} />
                    </Grid>
                    <Grid item xs={12} xl={6}>
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                            <Typography variant="h6">Cost of each phase</Typography>
                            <ModeToggler value={costMode} onChange={changeCostMode} options={[["total", "Total"], ["groups", "Groups"]]} />
                        </Stack>
                        <CostOfEachPhaseBars p={props.project} mode={costMode} />
                    </Grid>
                </Grid>






            </Paper>
        </Container>
    );
};

export default ChartsView;
