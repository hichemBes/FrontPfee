import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskType } from 'src/app/core/models/task-type';
import { TaskTypeService } from 'src/app/core/services/task-type.service';
import Swal from 'sweetalert2';
import { AddEditActionTypesComponent } from '../../actionTypes/add-edit-action-types/add-edit-action-types.component';
import { AddEditTaskTypesComponent } from '../add-edit-task-types/add-edit-task-types.component';

@Component({
  selector: 'app-list-task-types',
  templateUrl: './list-task-types.component.html',
  styleUrls: []
})
export class ListTaskTypesComponent implements OnInit {
  listTaskTypes: TaskType[] = []
  p: any
  searchForm: FormGroup
  constructor(private taskTypeService: TaskTypeService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getListtaskTypes()
    this.createSearchForm()
  }
  createSearchForm() {
    this.searchForm = new FormGroup({
      taskTypeName: new FormControl()
    })
  }
  getListtaskTypes() {
    this.taskTypeService.getList().subscribe((res) => {
      this.listTaskTypes = res as TaskType[]
    })
  }
  AddTaskType() {
    const config = { backdrop: true, size: 'lg' }
    var modalRef = this.modalService.open(AddEditTaskTypesComponent, config)
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
        this.getListtaskTypes()
        modalRef.close()
      }
    })
  }
  delete(id: any) {
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
        this.taskTypeService.deleteType(id).subscribe({
          next: res => {
            console.log(res)
            this.getListtaskTypes()
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
          error: err => {
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
  edit(taskType) {
    const config = { backdrop: true, size: 'lg' }
    var modalRef = this.modalService.open(AddEditTaskTypesComponent, config)
    modalRef.componentInstance.taskType = taskType
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
        this.getListtaskTypes()
        modalRef.close()
      }
    })
  }

}
