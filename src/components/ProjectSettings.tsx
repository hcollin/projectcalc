import { useEffect, useState } from "react";
import { Project } from "../models/Project";
import { Stack, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";



const ProjectSettings = ({project, onUpdate}: {project: Project, onUpdate: (p: Project) => void} ) => {
    
    const [pname, setPname] = useState<string>(project.name || "");
    const a = dayjs(new Date());
    const [startDate, setStartDate] = useState<Dayjs|null>(dayjs(Date.now()));

    useEffect(() => {
        if(project.name) {
            setPname(project.name);
        } else {
            setPname("");
        }
        

    }, [project.name]);

    function change(n: string) {
        setPname(n);
        onUpdate({...project, name: n});
    }





    return (
        <Stack direction="row" spacing={2} >
        <TextField label="Project name" value={pname} onChange={(e) => change(e.target.value)} />
        <DatePicker 
            label="Project Start Date"
            value={startDate} 
            onChange={(date) => setStartDate(date)}
            

            
            
        />
        </Stack>
    )

}

export default ProjectSettings;