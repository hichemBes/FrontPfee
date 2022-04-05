import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subsidiary } from 'src/app/core/DTO/subsidiary-dto';
import { UserDto } from 'src/app/core/DTO/user-dto';
import { Mission } from 'src/app/core/models/mission';
import { MissionType } from 'src/app/core/models/mission-type';
import { IdentityServerService } from 'src/app/core/services/identity-server.service';
import { MissionTypesService } from 'src/app/core/services/mission-types.service';
import { MissionService } from 'src/app/core/services/mission.service';
import { SubsidiaryService } from 'src/app/core/services/subsidiary.service';
import { registerLocaleData } from '@angular/common';
import  localeFr  from '@angular/common/locales/fr';
registerLocaleData(localeFr,'fr');
@Component({
  selector: 'app-add-edit-mission',
  templateUrl: './add-edit-mission.component.html',
  styleUrls: []
})
export class AddEditMissionComponent implements OnInit {
  missionForm: FormGroup
  @Input() mission:Mission={}
  listSubsidiaries: Subsidiary[]=[];
  listCollaborateurs: UserDto[]=[];
  typesMissions: MissionType[]=[];
  event:EventEmitter<any> =new EventEmitter()
  constructor(private subsidiaryService:SubsidiaryService,private missionTypeService:MissionTypesService,
    private identityService:IdentityServerService, public activeModal:NgbActiveModal, private missionSevice:MissionService) { }

  ngOnInit(): void {
    this.createMissonForm(this.mission)
    this.getListSubsidiaries()
    this.getListTypesMissions()
    this.getListCollaborateurs()
  }
  createMissonForm(mission:Mission){
    this.missionForm= new FormGroup({
      missionId:new FormControl(mission.missionId==undefined?'00000000-0000-0000-0000-000000000000': mission.missionId),
      messionDescription:new FormControl(mission.messionDescription),
      creationDate:new FormControl(mission.creationDate==undefined? new Date():mission.creationDate),
      startDate:new FormControl(mission.startDate),
     // estimatedDuration:new FormControl(mission.estimatedDuration),
     // realDuration:new FormControl(mission.realDuration),
      fk_project:new FormControl(mission.fk_project==undefined?'00000000-0000-0000-0000-000000000000':mission.fk_project),
      fk_MissionType:new FormControl(mission.fk_MissionType),
      fk_Filliale:new FormControl(mission.fk_Filliale),
      fk_User:new FormControl(mission.fk_User),
    })
  }
  getListSubsidiaries(){
    this.subsidiaryService.getList().subscribe((res)=>{
      this.listSubsidiaries=res as Subsidiary[]
    })
  }
  getListCollaborateurs(){
    this.identityService.getUsersByAppId().subscribe((res:any)=>{
      this.listCollaborateurs= res.filter(u=>u.userApplicationRoles[0].roleName=="Collaborateur TPAP")      
    })
  }
  getListTypesMissions(){
    this.missionTypeService.getList().subscribe((res)=>{
      this.typesMissions=res as MissionType[]
    })
  }
  onSubmit(){
    if(this.missionForm.value.missionId=='00000000-0000-0000-0000-000000000000'){
      this.missionSevice.addMission(this.missionForm.value).subscribe((res)=>{
        this.event.emit('refresh')
      })
    }
    else{
      this.missionSevice.editMission(this.missionForm.value).subscribe((res)=>{
        this.event.emit('refresh')
      })
    }
  }

}
