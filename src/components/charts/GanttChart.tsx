import { Gantt, Task, ViewMode } from "gantt-task-react";
import { Project } from "../../models/Project";


import { Card, CardContent, useTheme } from "@mui/material";
import { useState } from "react";
import ModeToggler from "./ModeToggler";


import "gantt-task-react/dist/index.css";


const GanttChart = ({ p }: { p: Project }) => {

    const theme = useTheme();
    const [vm, setVm] = useState<ViewMode>(ViewMode.Month);


    let previousEnd: Date = new Date();
    const endDates: Record<string, Date> = {};
    const tasks: Task[] = p.phases.map((phase, index) => {


        let pstart = new Date();
        if (!phase.startTime && index === 0) {
            pstart = new Date(p.startDate);
        }
        if (!phase.startTime && phase.startAfter.length === 0 && index > 0) {
            pstart = new Date(previousEnd);
        }
        if (!phase.startTime && phase.startAfter.length > 0 && index > 0) {
            const et = endDates[phase.startAfter[0]];
            if (et) {
                pstart = new Date(et);
            }
        }




        const pend = new Date(pstart.getTime() + 60000 * 60 * 24 * 7 * phase.weeks);
        // console.log(phase.name, ":\n", pstart, "\n", pend);

        previousEnd = new Date(pend);
        endDates[phase.id] = pend;

        const t: Task = {
            start: pstart,
            end: pend,
            name: phase.name || phase.type,
            id: phase.id,
            type: 'task',
            progress: 0,
            isDisabled: true,
        }
        return t;
    });

    return (
        <Card>
            <CardContent>
                <ModeToggler value={vm} onChange={(v) => setVm(v as ViewMode)} options={[["Day", ViewMode.Day], ["Week", ViewMode.Week], ["Month", ViewMode.Month], ["Year", ViewMode.Year]]} />
                
                <Gantt
                    tasks={tasks}
                    viewMode={vm}
                    locale="fi"
                    barFill={60}
                    listCellWidth=""
                    handleWidth={20}
                    columnWidth={100}
                    barBackgroundColor={theme.palette.primary.dark}
                    barProgressColor={theme.palette.success.main}
                // onDateChange={onTaskChange}
                // onTaskDelete={onTaskDelete}
                // onProgressChange={onProgressChange}
                // onDoubleClick={onDblClick}
                // onClick={onClick}
                />
                
            </CardContent>
        </Card>



    )

}

export default GanttChart;