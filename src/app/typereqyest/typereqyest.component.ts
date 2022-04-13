import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { CategorieService } from '../core/services/categorie.service';
import { typeRequestService } from '../core/services/typerequest.service';
import { AddtyperequestComponent } from './../popup/addtyperequest/addtyperequest.component';
import { TyperequestcatgComponent } from './../typerequestcatg/typerequestcatg.component';
import { ViewtyperequestcatComponent } from './../viewtyperequestcat/viewtyperequestcat.component';

@Component({
  selector: 'app-typereqyest',
  templateUrl: './typereqyest.component.html',
  styleUrls: ['./typereqyest.component.scss']
})
export class TypereqyestComponent implements OnInit {
  ts: any
  searchForm: FormGroup = new FormGroup({})
  p: any
  search: any
  categories: any
  constructor(private s: typeRequestService, private modalService: NgbModal, private c: CategorieService,) { }

  ngOnInit(): void {
    this.getall()
  }
  ajouter(c: any) {
    const config = { backdrop: true, size: 'lg' }
    var modalRef = this.modalService.open(TyperequestcatgComponent, config)
    modalRef.componentInstance.fromParent = c
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
        modalRef.close()
      }
    })

  }
  voir(d: any) {
    const config = { backdrop: true, size: 'lg' }
    var modalRef = this.modalService.open(ViewtyperequestcatComponent, config)
    modalRef.componentInstance.fromParent = d

  }
  addtype() {
    const config = { backdrop: true, size: 'lg' }
    var modalRef = this.modalService.open(AddtyperequestComponent, config)
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
        this.getall()
        modalRef.close()
      }
    })

  }
  getall() {
    this.s.getlltyperequestList().subscribe(data => {
      this.ts = data

    }, err => {
      console.log(err)
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
        this.s.delete(id).subscribe({
          next: res => {
            console.log(res)
            this.getall()
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
  createSearchForm() {
    this.searchForm = new FormGroup({
      actionTypeName: new FormControl(),
    })
  }

  Search() {


    if (this.search == "") {
      this.ngOnInit();

    } else {
      this.ts = this.ts.filter(res => {
        return res.requestTypeName.toLowerCase().match(this.search.toLowerCase())
      })
    }
  }

}
