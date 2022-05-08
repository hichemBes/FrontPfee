import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserauthService } from './../core/services/userauth.service';
import { RequestService } from 'src/app/core/services/request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-final-validation',
  templateUrl: './final-validation.component.html',
  styleUrls: ['./final-validation.component.scss']
})
export class FinalValidationComponent implements OnInit {
  tab;
  p;
  length
  constructor(private router: Router, as: UserauthService, private request: RequestService) { }

  ngOnInit(): void {
    this.getrequest()

  }
  update(requestId: any, requesttype, Organisme, fk_user, requestDescription, date) {
    let u = {
      requestId: requestId,
      state: 3,
      fk_Organisme: Organisme,
      fk_RequestType: requesttype,
      fk_user: fk_user,
      requestDescription: requestDescription,
      creationDate: date



    }
    var stringify = JSON.stringify(u)
    stringify = JSON.parse(stringify)
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Voulez vous Validez Cette Demande ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'oui, Valider!',
      cancelButtonText: 'Non , Annuler!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(stringify)
        this.request.updaterquest(stringify).subscribe(data => {
          console.log(data)
          this.getrequest()
        }, err => {
          console.log(err)
        })
        Swal.fire(
          {
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000, title: 'Validation  avec succées',
            icon: 'success',
          })
      }


      // })

      else if (
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
  getrequest() {
    this.request.getinprogress().subscribe(
      data => {
        this.tab = data
        this.length = this.tab.length
        for (var i in this.tab) {
          if (this.tab[i].status == 'InProgress') {
            this.tab[i].status = 'En Cours '
          }
        }
      },
      err => {
        console.log(err)
      }
    )

  }
}
