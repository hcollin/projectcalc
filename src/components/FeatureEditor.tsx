import { v4 } from "uuid";
import { Project, ProjectPhase, ProjectPhaseFeature } from "../models/Project";
import { Card, CardActionArea, CardActions, CardContent, CardHeader, TextField, Typography } from "@mui/material";
import CancelButton from "./buttons/CancelButton";
import SaveButton from "./buttons/SaveButton";
import { useState } from "react";


export interface FeatureEditorProps {
    feature?: ProjectPhaseFeature;
    phase: ProjectPhase;
    project: Project;
    onClose: () => void;
    onUpdate: (project: ProjectPhaseFeature) => void;
}

const FeatureEditor = (props: FeatureEditorProps) => {

    const [newName, setNewName] = useState<string>(props.feature?.name || "");

    const feature: ProjectPhaseFeature = props.feature || {
        id: v4(),
        name: newName
    }

    const handleCommit = () => {
        props.onUpdate({...feature, name: newName});
        props.onClose();
    }

    return (

        <Card elevation={5}>
            <CardHeader title={feature.name !== "" ? `Edit feature: ${feature.name}` : `New feature for ${props.phase.name ||props.phase.type}`} />
            

            <CardContent>

                <TextField
                    label="Feature name"
                    variant="outlined"
                    value={newName}
                    fullWidth
                    onChange={(e) => setNewName(e.target.value)}

                />

                
            </CardContent>

            <CardActionArea>
                <CardActions>
                    <CancelButton onClick={() => { props.onClose() }} />
                    <SaveButton onClick={handleCommit} />
                </CardActions>
            </CardActionArea>
        </Card>

    )
}


export default FeatureEditor;