import { Project } from "./Project";


export interface ViewProps {
    project: Project;
    onUpdate: (p: Project) => void;
}