import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { MissionType } from 'src/app/core/models/mission-type';
import { MissionTypesService } from 'src/app/core/services/mission-types.service';
import Swal from 'sweetalert2';
import { AddEditMissionTypeComponent } from '../add-edit-mission-type/add-edit-mission-type.component';

@Component({
  selector: 'app-list-mission-types',
  templateUrl: './list-mission-types.component.html',
  styleUrls: []
})
export class ListMissionTypesComponent implements OnInit {
  searchForm:FormGroup=new FormGroup({})
  listmissionTypes:MissionType[]=[]
  p:any
  constructor(private modalService:NgbModal,private missionTypeService:MissionTypesService) { }

  ngOnInit(): void {
    this.getList()
    this.createMissionTypeForm()
  }
  createMissionTypeForm(){
    this.searchForm=new FormGroup({
      missionTypeName: new FormControl(),
    })
  }
  getList(){
    this.missionTypeService.getList().subscribe((res)=>{
      this.listmissionTypes=res as MissionType[]
    })
  }
  AddmissionType(){
    let config: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    };
    var modalRef = this.modalService.open(AddEditMissionTypeComponent, config)
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
        this.getList()
        modalRef.close()
      }
    })
  }
  edit(type:any){
    const config = { backdrop: true, size: 'lg' }
    var modalRef = this.modalService.open(AddEditMissionTypeComponent, config)
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
        this.missionTypeService.deleteType(id).subscribe({
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

}
