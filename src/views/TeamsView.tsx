import { Box, Button, Card, CardActionArea, CardContent, CardHeader, Container, Paper, Stack, Typography } from "@mui/material";
import { ViewProps } from "../models/ViewProps";
import TeamContainer from "../components/TeamContainer";
import { Team } from "../models/Project";
import NewTeamCard from "../components/NewTeamCard";




const TeamsView = (props: ViewProps) => {

    function updateTeam(team: Team) {
        const newTeams = props.project.teams.map(t => {
            if (t.id === team.id) {
                return team;
            }
            return t;
        });
        props.onUpdate({ ...props.project, teams: newTeams });

    }

    function addNewTeam(team: Team) {
        const teams = [...props.project.teams, team];
        props.onUpdate({ ...props.project, teams: teams });
    }

    function removeTeam(team: Team) {
        const teams = props.project.teams.filter(t => t.id !== team.id);
        props.onUpdate({ ...props.project, teams: teams });
    }

    return (
        <Container maxWidth="lg">
            <Paper elevation={4} sx={{padding: "1rem"}}>

                <Typography variant="h4">Teams</Typography>

                <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap >
                    {props.project.teams.map((team, index) => {
                        return <TeamContainer key={`team-${team.id}`} project={props.project} team={team} updateTeam={updateTeam} removeTeam={removeTeam} />
                    })}


                    <NewTeamCard onCreate={addNewTeam} project={props.project}/>

                   
                </Stack>


            </Paper>
        </Container>
    )
}

export default TeamsView;
