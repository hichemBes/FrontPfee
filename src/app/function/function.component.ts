import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { UserauthService } from '../core/services/userauth.service';
import { FunctionService } from './../core/services/function.service';
import { AddfunctionComponent } from './../popup/addfunction/addfunction.component';
import { FonctionofuserComponent } from './../popup/fonctionofuser/fonctionofuser.component';
import { AdduserComponent } from './../popup/adduser/adduser.component';

@Component({
  selector: 'app-function',
  templateUrl: './function.component.html',
  styleUrls: ['./function.component.scss']
})
export class FunctionComponent implements OnInit {
  utlisateur: any
  functioofusers: any
  p: any
  search: any
  constructor(private sa: FunctionService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getallfonctionofusers()
  }
  getallfonctionofusers() {
    this.sa.getallfunction().subscribe(res => {
      this.functioofusers = res

    }, error => {
      console.log(error)
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
        this.sa.delete(id).subscribe({
          next: res => {
            console.log(res)
            this.getallfonctionofusers()
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
      this.functioofusers = this.functioofusers.filter(res => {
        return res.name.toLowerCase().match(this.search.toLowerCase())
      })
    }
  }

  addFunction() {
    const config = { backdrop: true, size: 'lg' }
    var modalRef = this.modalService.open(AddfunctionComponent, config)
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
        this.getallfonctionofusers()
        modalRef.close()

      }
    })
  }
  open(id: any, c: any) {
    const config = { backdrop: true, size: 'lg' }
    var modalRef = this.modalService.open(FonctionofuserComponent, config)
    modalRef.componentInstance.fromParent = {
      "id": id,
      "name": c

    }
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
  adduser(id: any, c: any) {

    const config = { backdrop: true, size: 'lg' }
    var modalRef = this.modalService.open(AdduserComponent, config)
    modalRef.componentInstance.fromParent = id
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

}





