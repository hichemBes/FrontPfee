import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { UserauthService } from '../core/services/userauth.service';
import { AddorganismeComponent } from '../popup/addorganisme/addorganisme.component';
import { OrganismeService } from './../core/services/organisme.service';
import { filter } from 'rxjs/operators';



@Component({
  selector: 'app-organisme',
  templateUrl: './organisme.component.html',
  styleUrls: ['./organisme.component.scss']
})
export class OrganismeComponent implements OnInit {
  searchForm: FormGroup = new FormGroup({})
  organismes: any
  p: any
  search: any
  constructor(private service: OrganismeService, private route: Router, private modalService: NgbModal, private sa: UserauthService, private router: Router) {
    if (this.sa.loggedIn() == false || this.sa.Role() == false) {
      this.route.navigate(["login"])
    }
  }

  ngOnInit(): void {
    this.getallorganisme()
    this.createSearchForm()

  }
  getallorganisme() {
    this.service.getAllorganisme().subscribe(data => {

      this.organismes = data;
    }, erro => {
      console.log(erro)
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
        this.service.deleteorganisme(id).subscribe({
          next: res => {
            console.log(res)
            this.getallorganisme()
            Swal.fire(
              {
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000, title: 'Supprimé avec succées',
                icon: 'success',
              })
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

  addorganisme() {

    const config = { backdrop: true, size: 'lg' }
    var modalRef = this.modalService.open(AddorganismeComponent, config)
    modalRef.componentInstance.event.subscribe((res) => {
      if (res == 'refresh') {
        Swal.fire(
          {
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000, title: 'Ajouté avec succées',
            icon: 'success',
          })
        this.getallorganisme()
        modalRef.close()
      }
    })
  }
  createSearchForm() {
    this.searchForm = new FormGroup({
      actionTypeName: new FormControl(),
    })


    // // const config =
    // var config = new MatDialogConfig
    //   ( { backdrop: true, size: 'lg' });




    // this.matDialog.open(AddorganismeComponent,config)

    console.log(this.searchForm.value)
  }
  Search() {


    if (this.search == "") {
      this.ngOnInit();

    } else {
      this.organismes = this.organismes.filter(res => {
        return res.name.toLowerCase().match(this.search.toLowerCase())
      })
    }
  }
}

