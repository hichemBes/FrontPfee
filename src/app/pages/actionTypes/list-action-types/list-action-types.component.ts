import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActionType } from 'src/app/core/models/action-type';
import { ActionTypeService } from 'src/app/core/services/action-type.service';
import Swal from 'sweetalert2';
import { AddEditActionTypesComponent } from '../add-edit-action-types/add-edit-action-types.component';

@Component({
  selector: 'app-list-action-types',
  templateUrl: './list-action-types.component.html',
  styleUrls: []
})
export class ListActionTypesComponent implements OnInit {
  searchForm: FormGroup=new FormGroup({})
  listActionTypes:ActionType[]=[]
  p:any
  constructor(private actionTypeService:ActionTypeService, private modalService:NgbModal) { }

  ngOnInit(): void {
    this.getListActionTypes()
    this.createSearchForm()
  }
  getListActionTypes(){
    this.actionTypeService.getList().subscribe((res)=>{
      this.listActionTypes=res as ActionType[]
    })
  }
  createSearchForm(){
    this.searchForm=new FormGroup({
      actionTypeName: new FormControl(),
    })
  }
  AddActionType(){
    const config = { backdrop: true, size: 'lg' }
    var modalRef = this.modalService.open(AddEditActionTypesComponent, config)
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
        this.getListActionTypes()
        modalRef.close()
      }
    })
  }
  edit(type:any){
    const config = { backdrop: true, size: 'lg' }
    var modalRef = this.modalService.open(AddEditActionTypesComponent, config)
    modalRef.componentInstance.actionType=type
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
        this.getListActionTypes()
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
        this.actionTypeService.deleteType(id).subscribe({
          next:res=>{
             console.log(res)
             this.getListActionTypes()
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
