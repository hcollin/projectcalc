import { Box, Divider, FormControl, FormControlLabel, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { PHASETYPE, Project, ProjectPhase, Team } from "../models/Project";
import { ViewProps } from "../models/ViewProps";
import { getAllocatedHoursForProject, getWorkHoursForPhase, getWorkHoursForPhaseByTeam } from "../utils/projectUtils";
import { weeksToReadableTime } from "../utils/TimeUtils";
import { useState } from "react";

import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';

const phaseColors: Record<PHASETYPE, string> = {
	[PHASETYPE.CONSULTING]: "phaseConsulting.main",
	[PHASETYPE.RAMPUP]: "phaseRampUp.main",
	[PHASETYPE.DEFAULT]: "phaseDevelopment.main",
	[PHASETYPE.RAMPDOWN]: "phaseRampDown.main",
	[PHASETYPE.MAINTENANCE]: "phaseMaintenance.main",
};

const ProjectTimeline = ({ project, onUpdate }: ViewProps) => {
	const [hourMode, setHourMode] = useState<"total" | "team">("total");

	const projectTotalWeeks = project.phases.reduce((acc, phase) => acc + phase.weeks, 0);
	const phaseLengths = project.phases.map((p) => {
		return (p.weeks / projectTotalWeeks) * 100;
	});

	function handleHourModeChange(event: React.MouseEvent<HTMLElement>, newMode: "total" | "team") {
		if (newMode === null) return;
		setHourMode(newMode);
	}

	return (
		<>
			<Stack direction="row" spacing={3} justifyContent="space-between" alignItems="center">
				<Typography variant="h6">Project Timeline</Typography>

				<ToggleButtonGroup value={hourMode} color="primary" exclusive onChange={handleHourModeChange}>
					<ToggleButton value="total" size="small">
						<HourglassFullIcon fontSize="small" />
					</ToggleButton>
					<ToggleButton value="team" size="small">
						<StackedBarChartIcon fontSize="small" />
					</ToggleButton>
				</ToggleButtonGroup>
			</Stack>
            <Divider sx={{margin: "0.5rem 0"}} />
			<Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
				{project.phases.map((phase, index) => {
					return (
						<Box
							key={`phase-${phase.id}`}
							sx={{
								width: `${phaseLengths[index]}%`,
								display: "flex",
								flexDirection: "column",
								justifyContent: "flex-end",
								alignItems: "flex-start",
								// height: "20rem",
								border: "solid 1px transparent",
							}}
						>
							{hourMode === "total" && <TimelineTotalPhaseHours phase={phase} project={project} />}
							{hourMode === "team" && <TimeLinePhaseTeamHours phase={phase} project={project} />}
							<TimelinePhaseItem phase={phase} />
						</Box>
					);
				})}
			</Box>
		</>
	);
};

const TimelineTotalPhaseHours = ({ phase, project }: { phase: ProjectPhase; project: Project }) => {
	const hours = getWorkHoursForPhase(project, phase);
	const totalHours = getAllocatedHoursForProject(project);
	const teamHours = getWorkHoursForPhaseByTeam(project, phase);

	// Total Hours Block
	const maxHeight = project.phases.length * 125;
	const drawHeight = (hours / totalHours) * maxHeight;
	const fs = Math.max(8, drawHeight / 3.5);

	return (
		<Box
			sx={{
				backgroundColor: "info.dark",
				padding: "0.25rem",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: `${drawHeight}px`,
				width: "100%",
				overflow: "hidden",
				marginBottom: "2px",
			}}
		>
			<Typography variant="mini" sx={{ fontSize: fs }}>
				{Math.round(hours)}h
			</Typography>
		</Box>
	);
};

const TimeLinePhaseTeamHours = ({ phase, project }: { phase: ProjectPhase; project: Project }) => {
	const totalHours = getAllocatedHoursForProject(project);
	const teamHours = getWorkHoursForPhaseByTeam(project, phase);

	const maxHeight = project.phases.length * 125;

	const teamColors = ["#CBBC5B", "#9EAF56", "#72A157", "#48915A", "#127F5D", "#006D5F"];

	return (
		<>
			{Object.entries(teamHours).map(([tid, hours], index) => {
				if (hours === 0) return null;

				const team = project.teams.find((t) => t.id === tid);

				const drawHeight = (hours / totalHours) * maxHeight;
				const fs = Math.max(8, drawHeight / 3.5);
				const tcol = teamColors[teamColors.length - index - 1];

				const cornerRad = index === 0 ? "0.25rem" : "0px";
				return (
					<Box
						sx={{
							backgroundColor: `${tcol}`,
							padding: "0.25rem",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							height: `${drawHeight}px`,
							width: "100%",
							overflow: "hidden",
							marginBottom: "2px",
							borderTopRightRadius: cornerRad,
							borderTopLeftRadius: cornerRad,
						}}
					>
						<Typography variant="mini" sx={{ fontSize: fs }} color="#FFF">
							{team ? team.name || team.id : ""} {Math.round(hours)}h
						</Typography>
					</Box>
				);
			})}
		</>
	);
};

const TimelinePhaseItem = ({ phase }: { phase: ProjectPhase }) => {
	const rt = weeksToReadableTime(phase.weeks);

	return (
		<>
			<Box
				sx={{
					backgroundColor: phaseColors[phase.type],
					width: "100%",
					color: "primary.contrastText",
					padding: "0.25rem",
					display: "flex",
					justifyContent: "flex-start",
					alignItems: "center",
					height: "2.5rem",
					overflow: "hidden",
				}}
			>
				<Typography variant="mini">{phase.name || phase.type}</Typography>
			</Box>
			<Box
				sx={{
					backgroundColor: "transparent",
					width: "100%",
					color: "primary.text",
					padding: "0.25rem",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "1rem",
					overflow: "hidden",
					border: "solid 1px",
					borderColor: "primary.text",
					borderTop: "none",
					marginTop: "0.25rem",
				}}
			>
				<Typography variant="mini">{phase.weeks}w</Typography>
			</Box>
			<Box
				sx={{
					backgroundColor: "transparent",
					width: "100%",
					color: "primary.text",
					padding: "0.25rem",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "1rem",
					overflow: "hidden",
					border: "solid 1px",
					borderColor: "primary.text",
					borderBottom: "none",
					borderTop: "none",
				}}
			>
				<Typography variant="mini">
					{rt.years > 0 && `${rt.years}y `}
					{rt.months > 0 && `${rt.months}m `}
					{rt.days > 0 && `${rt.days}d `}
					{rt.hours > 0 && `${rt.hours}h `}
				</Typography>
			</Box>
		</>
	);
};

export default ProjectTimeline;
