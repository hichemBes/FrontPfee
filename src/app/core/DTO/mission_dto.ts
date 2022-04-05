
export interface MissionDTO {
    missionId?: string,
    messionDescription?: string,
    creationDate?: Date,
    startDate?: Date,
    closeDate?: Date,
    State?:number,
    estimatedDuration?: number,
    fk_project?: string,
    fk_MissionType?:string,
    MissionTypeName?:string,
    fk_Filliale?: string,
    Label?:string,
    fk_User?: string,
    fullName?: string

    

}
