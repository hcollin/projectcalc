import { Box, Button, Card, CardActionArea, CardContent, CardHeader, Container, Paper, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { ViewProps } from "../models/ViewProps";
import TeamContainer from "../components/TeamContainer";
import { PhaseTeamAllocation, Team } from "../models/Project";
import NewTeamCard from "../components/NewTeamCard";
import { matchTeamsToPhases } from "../utils/projectUtils";
import { useState } from "react";


import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';

const TeamsView = (props: ViewProps) => {

	const [showDetails, setShowDetails] = useState<boolean>(true);

	function updateTeam(team: Team) {
		const newTeams = props.project.teams.map((t) => {
			if (t.id === team.id) {
				return team;
			}
			return t;
		});

		const newProject = matchTeamsToPhases({ ...props.project, teams: newTeams });
		props.onUpdate(newProject);
	}

	function addNewTeam(team: Team) {
		const teams = [...props.project.teams, team];
		const newProject = matchTeamsToPhases({ ...props.project, teams: teams });
		props.onUpdate(newProject);
	}

	function removeTeam(team: Team) {
		const teams = props.project.teams.filter((t) => t.id !== team.id);
		props.onUpdate({ ...props.project, teams: teams });
	}

	function switchDetails(b: boolean) {
		if(b === null) return;
		setShowDetails(b);
	}

	return (
		<Container maxWidth="xl" sx={{ mt: 10 }}>
			<Paper elevation={4} sx={{ padding: "1rem" }}>
				<Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
					<Typography variant="h4">Teams</Typography>
					<ToggleButtonGroup value={showDetails} exclusive onChange={(e, v) => switchDetails(v)} color="primary">
						<ToggleButton value={true} aria-label="Show details"><UnfoldMoreIcon fontSize="small"/></ToggleButton>
						<ToggleButton value={false} aria-label="Show details"><UnfoldLessIcon fontSize="small"/></ToggleButton>
					</ToggleButtonGroup>


				</Stack>


				<Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap>
					{props.project.teams.map((team, index) => {
						return <TeamContainer key={`team-${team.id}`} project={props.project} team={team} updateTeam={updateTeam} removeTeam={removeTeam} showDetails={showDetails} />;
					})}

					<NewTeamCard onCreate={addNewTeam} project={props.project} />
				</Stack>
			</Paper>
		</Container>
	);
};

export default TeamsView;
