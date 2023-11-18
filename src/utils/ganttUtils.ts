import { Task } from "gantt-task-react";
import { Project } from "../models/Project";


/**
 * Gantt library uses this project is gantt-task-react
 * 
 * https://github.com/MaTeMaTuK/gantt-task-react
 * 
 * 
 */


/**
 * 
 * @param project 
 * @returns 
 */
export function getGanttTasks(project: Project): Task[] {

    let previousEndDate = new Date(project.startDate);

    const tasks: Task[] = project.phases.map((phase, index) => {
      
        const endDate = new Date(previousEndDate.getTime() + (phase.weeks * 7 * 24 * 60 * 60 * 1000));

        const t: Task = {
            start:  previousEndDate,
            name: phase.name || phase.type,
            end: endDate,
            id: phase.id,
            type: "task",
            progress: 0,
            isDisabled: false,
        };

        previousEndDate = endDate;


        return t;
        
    });

    

    return tasks;
}