import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subsidiary } from 'src/app/core/DTO/subsidiary-dto';
import { UserDto } from 'src/app/core/DTO/user-dto';
import { MissionDTO } from 'src/app/core/DTO/mission_dto';

import { Mission } from 'src/app/core/models/mission';
import { MissionType } from 'src/app/core/models/mission-type';
import { User } from 'src/app/core/models/user';
import { IdentityServerService } from 'src/app/core/services/identity-server.service';
import { MissionTypesService } from 'src/app/core/services/mission-types.service';
import { MissionService } from 'src/app/core/services/mission.service';
import { SubsidiaryService } from 'src/app/core/services/subsidiary.service';
import Swal from 'sweetalert2';
import { AddEditMissionComponent } from '../add-edit-mission/add-edit-mission.component';

@Component({
  selector: 'app-list-missions',
  templateUrl: './list-missions.component.html',
  styleUrls: []
})
export class ListMissionsComponent implements OnInit {
  listCollaborateurs:UserDto[]=[]
  typesMissions:MissionType[]=[]
  listSubsidiaries:Subsidiary[]=[]
  listMissions:Mission[]=[]
  listMissionsDTO:MissionDTO[]=[]


  p:any

  constructor(private missionTypeService:MissionTypesService, private subsidiaryService:SubsidiaryService,
     private fb: FormBuilder,
    private  identityService:IdentityServerService,private modalService:NgbModal, private missionService:MissionService) { }

  ngOnInit(): void {
    this.getListTypesMissions()
    this.getListSubsidiaries()
    this.getListCollaborateurs()
    this.getListMissions()
    this.getList()

  }

  getList(){
    this.missionService.getList().subscribe((res)=>{
      this.listMissions=res as Mission[]
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
  getListMissions(){
    this.missionService.getList().subscribe((res)=>{
      this.listMissions=res as MissionDTO[]
    })
  }
  createSearchForm(){

  }


  AddMission(){
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      size: 'xl'
    };
    var modalRef=this.modalService.open(AddEditMissionComponent, ngbModalOptions)
    modalRef.componentInstance.event.subscribe((res: string) => {
      if (res == 'refresh') {
        Swal.fire(
          {
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000, title: 'Ajouté avec succées',
            icon: 'success',
          })
        this.getListMissions()
        modalRef.close()
      }
    })
  }




  edit(type:any){
    const config = { backdrop: true, size: 'lg' }
    var modalRef = this.modalService.open(AddEditMissionComponent, config)
    modalRef.componentInstance.MissionType=type
    modalRef.componentInstance.event.subscribe((res: string) => {
      if (res == 'refresh') {
        Swal.fire(
          {
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000, title: 'modifié avec succées',
            icon: 'success',
          })
        this.getList()
        modalRef.close()
      }
    })
  }
  delete(id:any){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Voulez vous supprimer cet enregistrement ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'oui, Supprimer!',
      cancelButtonText: 'Non , Annuler!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.missionService.deleteMission(id).subscribe({
          next:res=>{
             console.log(res)
             this.getList()
            Swal.fire(
              {
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000, title: 'Supprimé avec succées',
                icon: 'success',
              })
          }
          ,
          error:err=>{
             console.error(err)
          }
        })
       
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          {
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000, title: 'Opération annlé',
            icon: 'success',
          })
      }
    })
    
  }

 

  searchForm = this.fb.group({
    fk_User: ''

   });
}
