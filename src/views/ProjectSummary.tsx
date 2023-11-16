import { Box, Card, CardContent, CardHeader, Container, Drawer, Paper, Stack, Typography } from "@mui/material";
import { Project } from "../models/Project";
import TotalPrice from "../components/TotalPrice";
import { getAllocatedHoursForProject, getTotalHours } from "../utils/projectUtils";
import { SETTINGS } from "../data/settings";

const ProjectSummary = ({ project }: { project: Project }) => {
	const hours = getTotalHours(project);

	const months = Math.floor(hours / (SETTINGS.time.workMonth * SETTINGS.time.workingDay));

	const days = Math.floor((hours - months * SETTINGS.time.workMonth * SETTINGS.time.workingDay) / SETTINGS.time.workingDay);

	const restHours = hours - months * SETTINGS.time.workMonth * SETTINGS.time.workingDay - days * SETTINGS.time.workingDay;

	// const weeks = Math.round(days / 5);

	const billHours = getAllocatedHoursForProject(project);

	return (
		<Paper sx={{ position: "fixed", bottom: 0, right: 0, padding: "0.5rem 1rem" }}>
			<Stack direction="row" spacing={3}>
				<TotalPrice project={project} />

				<Card elevation={5}>
					<CardContent>
						<Typography variant="body1">Duration</Typography>
						<Typography variant="h6">
							{months}m {days}d {restHours}h
						</Typography>
					</CardContent>
				</Card>

				<Card elevation={5}>
					<CardContent>
						<Typography variant="body1">Billable Hours</Typography>
						<Typography variant="h6">{billHours}h</Typography>
					</CardContent>
				</Card>
			</Stack>
		</Paper>
	);
};

export default ProjectSummary;
