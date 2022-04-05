import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/core/models/project';
import { ProjectService } from 'src/app/core/services/project.service';
import Swal from 'sweetalert2';
import { AddEditProjectsComponent } from '../add-edit-projects/add-edit-projects.component';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: []
})
export class ListProjectsComponent implements OnInit {
  searchForm:FormGroup=new FormGroup({})
  listProjects:Project[]=[]
  p:any
  constructor(private modalService:NgbModal,private projectService:ProjectService) { }

  ngOnInit(): void {
    this.getList()
    this.createMissionTypeForm()
  }
  createMissionTypeForm(){
    this.searchForm=new FormGroup({
      projectName: new FormControl(),
    })
  }
  getList(){
    this.projectService.getList().subscribe((res)=>{
      this.listProjects=res as Project[]
    })
  }
  AddProject(){
    const config = { backdrop: true, size: 'lg' }
    var modalRef = this.modalService.open(AddEditProjectsComponent, config)
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
  edit(project:any){
    const config = { backdrop: true, size: 'lg' }
    var modalRef = this.modalService.open(AddEditProjectsComponent, config)
    modalRef.componentInstance.project=project
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
        this.projectService.deleteproject(id).subscribe({
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
