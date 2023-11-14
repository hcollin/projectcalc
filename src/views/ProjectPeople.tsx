import { Container, Paper } from "@mui/material";
import { Project } from "../models/Project";
import TeamContainer from "../components/TeamContainer";


export interface ProjectPeopleProps {
    project: Project;
}

const ProjectPeople = (props: ProjectPeopleProps) => {

    return (

        <Paper>
            Project People

            <TeamContainer project={props.project} team={props.project.teams[0]} />
        </Paper>

    );
};

export default ProjectPeople;