import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { UserauthService } from '../core/services/userauth.service';
import { Categtypeservice } from './../core/services/categtyperequest.service';

@Component({
  selector: 'app-viewtyperequestcat',
  templateUrl: './viewtyperequestcat.component.html',
  styleUrls: ['./viewtyperequestcat.component.scss']
})
export class ViewtyperequestcatComponent implements OnInit {
  categories: any
  utlisateurs: any
  p: any
  @Input() fromParent
  event: EventEmitter<any> = new EventEmitter()

  constructor(public activeModal: NgbActiveModal, private sa: UserauthService, private s: Categtypeservice) { }

  ngOnInit(): void {
    this.getallCategorierequest()
    console.log(this.fromParent)
  }
  getallCategorierequest() {
    this.s.getbyreqid(this.fromParent).subscribe((data) => {
      this.categories = data

    },
      err => {
        console.log(err)
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
        this.s.delete(id).subscribe({
          next: res => {

            Swal.fire(
              {
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000, title: 'Supprimé avec succées',
                icon: 'success',
              })
            this.getallCategorierequest()

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