import { Box, Typography } from "@mui/material";
import { PHASETYPE, Project, ProjectPhase } from "../models/Project";
import { ViewProps } from "../models/ViewProps";
import { getAllocatedHoursForProject, getWorkHoursForPhase, getWorkHoursForPhaseByTeam } from "../utils/projectUtils";

const phaseColors: Record<PHASETYPE, string> = {
    [PHASETYPE.CONSULTING]: "phaseConsulting.main",
    [PHASETYPE.RAMPUP]: "phaseRampUp.main",
    [PHASETYPE.DEFAULT]: "phaseDevelopment.main",
    [PHASETYPE.RAMPDOWN]: "phaseRampDown.main",
    [PHASETYPE.MAINTENANCE]: "phaseMaintenance.main",
}


const ProjectTimeline = ({ project, onUpdate }: ViewProps) => {

    const projectTotalWeeks = project.phases.reduce((acc, phase) => acc + phase.weeks, 0);
    const phaseLengths = project.phases.map(p => {

        return p.weeks / projectTotalWeeks * 100;
    })




    return (
        <Box sx={{ width: '100%', display: "flex", flexDirection: "row" }}>
            {project.phases.map((phase, index) => {

                return <Box key={`phase-${phase.id}`} sx={{ width: `${phaseLengths[index]}%`, display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-start", height: "20rem", border: "solid 1px transparent" }}>

                    <TimelineHours phase={phase} project={project} />
                    <TimelinePhaseItem phase={phase} />

                </Box>
            })}
        </Box>


    )

}


const TimelineHours = ({ phase, project }: { phase: ProjectPhase, project: Project }) => {

    const hours = getWorkHoursForPhase(project, phase);
    const totalHours = getAllocatedHoursForProject(project);
    const teamHours = getWorkHoursForPhaseByTeam(project, phase);

    const maxHeight = 400;
    const drawHeight = ((hours / totalHours) * maxHeight);

    
    const fs = Math.max(8, drawHeight/3);

    return (
        <Box sx={{ backgroundColor: "info.dark", padding: "0.25rem", display: "flex", justifyContent: "center", alignItems: "center", height: `${drawHeight}px`, width: "100%", overflow: "hidden", marginBottom: "2px" }}>
            
            <Typography variant="mini" sx={{fontSize: fs}} >{hours}h</Typography>
        </Box>
    );

}

const TimelinePhaseItem = ({ phase }: { phase: ProjectPhase }) => {

    return (
        <Box sx={{ backgroundColor: phaseColors[phase.type], width: "100%", color: "primary.contrastText", padding: "0.25rem", display: "flex", justifyContent: "flex-start", alignItems: "center", height: "2.5rem", overflow: "hidden" }}>
            <Typography variant="mini">{phase.name || phase.type}</Typography>
        </Box>
    )

}

export default ProjectTimeline;
