import { Box, Container, Grid, Paper, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { ViewProps } from "../models/ViewProps";
import { Gantt, ViewMode } from "gantt-task-react";
import { getGanttTasks } from "../utils/ganttUtils";
import { BarChart, PieChart, PieSeriesType, PieValueType } from "@mui/x-charts";
import { getAllocatedHoursForProject, getAllocatedHoursByPriceGroup } from "../utils/projectUtils";
import { MakeOptional } from "@mui/x-date-pickers/internals";
import HoursPerPriceGroupPie from "../components/charts/HoursPerPriceGroupPie";
import CostOfEachPhaseBars from "../components/charts/CostOfEachPhaseBars";
import { useState } from "react";
import ModeToggler from "../components/charts/ModeToggler";
import PerMemberPie from "../components/charts/PerMemberPie";

const ChartsView = (props: ViewProps) => {

    const [costMode, setCostMode] = useState<"total" | "groups">("total");
    const [pieMode, setPieMode] = useState<"hours" | "price" | "days">("hours");


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
                    <Grid item xs={12} xl={6}>
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                            <Typography variant="h6">Hours per pricegroup total</Typography>
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

                {/* <Grid container spacing={2}>
                    <Grid item xs={12} lg={6}>
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                            <Typography variant="h6">Hours per Member</Typography>

                        </Stack>
                        <PerMemberPie p={props.project} />
                    </Grid>
                </Grid> */}


                {/* <BarChart
                    xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                    series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}

                    height={500}

                /> */}



            </Paper>
        </Container>
    );
};

export default ChartsView;
