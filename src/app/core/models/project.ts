import { VisAVis } from "./vis-avis";

export interface Project {
    projectId?: string,
    projectName?: string,
    projectDescription?: string,
    startDate?: Date,
    estimatedDuration?: 0,
    realDuration?: 0,
    creationDate?: Date,
    closedDate?: Date,
    activeState?: boolean,
    color?:string,
    visAvis?:VisAVis[]

}
