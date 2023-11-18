import { Container, Paper, Typography } from "@mui/material";
import { ViewProps } from "../models/ViewProps";
import { Gantt, ViewMode } from "gantt-task-react";
import { getGanttTasks } from "../utils/ganttUtils";

const ChartsView = (props: ViewProps) => {



    const tasks = getGanttTasks(props.project);

    console.log(tasks);

	return (
		<Container maxWidth="xl" sx={{ mt: 10 }}>
			<Paper elevation={4} sx={{ padding: "1rem" }}>
            <Typography variant="h4">Charts</Typography>



            <Gantt tasks={tasks} viewMode={ViewMode.Week}/>



            </Paper>
		</Container>
	);
};

export default ChartsView;
