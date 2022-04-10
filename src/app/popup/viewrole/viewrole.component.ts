import { Component, EventEmitter, Inject, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserauthService } from 'src/app/core/services/userauth.service';
import Swal from 'sweetalert2';
import { UsersComponent } from './../../users/users.component';

@Component({
  selector: 'app-viewrole',
  templateUrl: './viewrole.component.html',
  styleUrls: ['./viewrole.component.scss']
})
export class ViewroleComponent implements OnInit {
  actionTypeForm: FormGroup = new FormGroup({})
  @Input() fromParent
  roles: any
  p: any
  event: EventEmitter<any> = new EventEmitter()
  constructor(public activeModal: NgbActiveModal, private sa: UserauthService) { }

  ngOnInit(): void {
    this.getroles()

  }
  getroles() {
    console.log(this.fromParent)
    this.sa.getRolebyusername(this.fromParent).subscribe(data => {
      this.roles = data
      console.log(this.roles)
    },
      error => {
        console.log(error)
      })
  }
  delete(rolename: any) {
    console.log("rolename", rolename)
    console.log(this.fromParent)
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
        this.sa.deleteRole(this.fromParent, rolename).subscribe({
          next: res => {
            console.log(res)

            Swal.fire(
              {
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000, title: 'Supprimé avec succées',
                icon: 'success',
              })
            this.getroles()
          }




        }
        ), err => {
          console.log(err)

        }
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
