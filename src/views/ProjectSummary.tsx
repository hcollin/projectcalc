import { Box, Card, CardContent, CardHeader, Container, Drawer, Paper, Typography } from "@mui/material";
import { Project } from "../models/Project";
import TotalPrice from "../components/TotalPrice";





const ProjectSummary = ({ project }: { project: Project }) => {

    return (
        <Paper sx={{ position: "fixed", bottom: 0, right: 0, display: "flex", alignItems: "center", padding: "0.5rem 1rem" }}>
            
            
                <TotalPrice project={project} />
            
        </Paper>

    )
}


export default ProjectSummary;