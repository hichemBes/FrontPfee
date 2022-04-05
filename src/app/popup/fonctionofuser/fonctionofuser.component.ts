import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserauthService } from 'src/app/core/services/userauth.service';
import Swal from 'sweetalert2';
import { functionofuserService } from '../../core/services/functionofuser.service.';

@Component({
  selector: 'app-fonctionofuser',
  templateUrl: './fonctionofuser.component.html',
  styleUrls: ['./fonctionofuser.component.scss']
})
export class FonctionofuserComponent implements OnInit {
  actionTypeForm: FormGroup = new FormGroup({})
  @Input() fromParent
  fonctiouser: any
  p: any;
  event: EventEmitter<any> = new EventEmitter()
  constructor(public activeModal: NgbActiveModal, private sa: UserauthService, private f: functionofuserService) { }

  ngOnInit(): void {
    this.getalluseroffunction()
  }
  getalluseroffunction() {
    this.f.getallfunctioofuser(this.fromParent.id).subscribe((data) => {
      this.fonctiouser = data
      console.log(data)

    },
      error => {
        console.log(error)
      })


  }
  delete(id: any) {
    console.log(id)
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
        this.f.deleteuserf(id).subscribe({
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
            this.getalluseroffunction()
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
