import { Project, Team } from "../models/Project";



export interface TeamProps {
    project: Project;
    team: Team;
}

const TeamContainer = (props: TeamProps) => {

    return (
        <div>
            <h1>Team</h1>
        </div>
    )

}

export default TeamContainer;