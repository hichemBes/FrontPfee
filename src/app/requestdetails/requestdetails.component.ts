import { Component, OnInit } from '@angular/core';
import { RequestService } from './../core/services/request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PieceService } from './../core/services/piece.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddrequestComponent } from './../popup/addrequest/addrequest.component';
import { AddpieceComponent } from './../addpiece/addpiece.component';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-requestdetails',
  templateUrl: './requestdetails.component.html',
  styleUrls: ['./requestdetails.component.scss']
})
export class RequestdetailsComponent implements OnInit {
  de: any
  status: any
  username: any
  tab: any
  p: any
  pieces: any
  l: any
  Description: any
  searchForm: FormGroup = new FormGroup({})
  search: any
  creationDate: any
  constructor(private req: RequestService, private modalService: NgbModal, private route: ActivatedRoute, private piece: PieceService) { }

  ngOnInit(): void {
    this.de = this.route.snapshot.paramMap.get("detail")
    console.log(this.de)
    this.getrequestdetails()
    this.getallpiecejointe()

  }
  addPieces() {

    const config = { backdrop: true, size: 'lg' }
    var modalRef = this.modalService.open(AddpieceComponent, config)
    modalRef.componentInstance.fromParent = this.de
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
        this.getallpiecejointe()

        modalRef.close()
      }
    })
  }
  getrequestdetails() {
    this.req.getrequestbyid(this.de).subscribe(data => {
      this.tab = data
      this.Description = this.tab.requestDescription
      this.username = this.tab.username
      this.creationDate = this.tab.creationDate
      this.status = this.tab.status
      console.log(this.tab, typeof (this.tab))

      if (this.status == 'InProgress') {
        this.status = 'En attente validation Siége'

      }
      if (this.tab.status == 'NotDone') {
        this.status = 'Pas encore Valideé de responsable Filliale'

        console.log(this.status)
      }
      if (this.tab.status == 'waitingvalidation') {
        this.status = 'valider par responsable Filliale'

        console.log(this.status)
      }
      console.log(this.tab)


    }, error => {
      console.log(error)
    })
  }
  getallpiecejointe() {
    this.piece.get(this.de).subscribe(data => {
      this.pieces = data
      this.l = this.pieces.length



      console.log(this.pieces)
    },
      err => {
        console.log(err)
      })
  }

  getp(id: any, c: any) {
    console.log(typeof (id), id)
    console.log(c)
    this.piece.getpiece(id).subscribe(blob => {

      const a = document.createElement('a')



      const objectUrl = URL.createObjectURL(blob.body)
      a.href = objectUrl
      a.download = c;
      a.click();
      URL.revokeObjectURL(objectUrl);
    }

    )


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
        this.piece.delete(id).subscribe({
          next: res => {
            console.log(res)
            this.getallpiecejointe()
            this.getrequestdetails()
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
  Search() {


    if (this.search == "") {
      this.ngOnInit();

    } else {
      this.pieces = this.pieces.filter(res => {
        return res.name.toLowerCase().match(this.search.toLowerCase())
      })
    }
  }
}
