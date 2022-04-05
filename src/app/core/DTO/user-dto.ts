import { RoleDto } from "./role-dto"
export class UserDto {
    applicationId?: number
    userID?: string
    userUserName?: string
    applicationName?: string
    userEmployeeId?: string
    userFullName?: string
    userEmail?: string
    userPassword?: string
    userSubsidiaryCode?: string
    userIsEnabled?:boolean
    userAvatar?: string
    userNickName?: string
    userApplicationPermissions?: []
    userApplicationRoles?:RoleDto []=[]
    matricule?:string
    userId?:string
}
