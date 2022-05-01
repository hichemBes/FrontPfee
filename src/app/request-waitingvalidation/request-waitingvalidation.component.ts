import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserauthService } from './../core/services/userauth.service';
import { RequestService } from 'src/app/core/services/request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-request-waitingvalidation',
  templateUrl: './request-waitingvalidation.component.html',
  styleUrls: ['./request-waitingvalidation.component.scss']
})
export class RequestWaitingvalidationComponent implements OnInit {
  tab: any;
  search;
  p;
  length
  constructor(private route: Router, private sa: UserauthService, private req: RequestService) {
    if (!localStorage.getItem('Token')) {
      this.route.navigate(["login"])
    }
    if (this.sa.loggedIn() == false) {
      this.route.navigate(["login"])
    }
  }

  ngOnInit(): void {
    this.getNotDone()
  }
  update(requestId: any, requesttype, Organisme, fk_user, requestDescription, date) {
    let u = {
      requestId: requestId,
      state: 1,
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
        this.req.updaterquest(stringify).subscribe(data => {
          console.log(data)
          this.getNotDone()
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

  getNotDone() {
    this.req.getNotDone().subscribe(data => {
      this.tab = data
      console.log(this.tab)
      this.length = this.tab.length
      for (var i in this.tab) {
        if (this.tab[i].status == 'NotDone') {
          this.tab[i].status = 'Pas encore Valideé de responsable Filliale  '

        }
        if (this.tab[i].status == 'waitingvalidation') {
          this.tab[i].status = 'En attente validation '

        }
      }
    }
      , err => {
        console.log(err)
      }
    )

  }
  Search() {

    if (this.search == "") {
      this.getNotDone()

    } else {
      this.tab = this.tab.filter(res => {
        return res.requesttype.toLowerCase().match(this.search.toLowerCase())
      })
    }

  }
}
