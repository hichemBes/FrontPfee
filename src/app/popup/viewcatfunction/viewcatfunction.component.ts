import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { CategorieService } from './../../core/services/categorie.service';

@Component({
  selector: 'app-viewcatfunction',
  templateUrl: './viewcatfunction.component.html',
  styleUrls: ['./viewcatfunction.component.scss']
})
export class ViewcatfunctionComponent implements OnInit {
  actionTypeForm: FormGroup = new FormGroup({})
  @Input() fromParent
  fonctioncategories: any
  p: any;
  constructor(public activeModal: NgbActiveModal, private route: Router, private c: CategorieService) { }

  ngOnInit(): void {
    this.getall()
  }
  getall() {
    this.c.getfunction(this.fromParent.id).subscribe(data => {
      this.fonctioncategories = data
      console.log(data)

    }, err => {
      console.log(err)
    })
  }
  delete(id: any) {
    console.log(typeof (id), id)
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
        this.c.deletefunctioofuser(id).subscribe({
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
            this.ngOnInit()
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


