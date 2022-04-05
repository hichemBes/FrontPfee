export interface Mission {
    missionId?: string,
    messionDescription?: string,
    creationDate?: Date,
    startDate?: Date,
    closeDate?: Date,
    estimatedDuration?: number,
    fk_project?: string,
    fk_MissionType?:string,
    fk_Filliale?: string,
    fk_User?: string,
    
}
