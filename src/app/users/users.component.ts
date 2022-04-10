import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { UserauthService } from '../core/services/userauth.service';
import { AddroleComponent } from '../popup/addrole/addrole.component';
import { ViewroleComponent } from './../popup/viewrole/viewrole.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  tab: any
  searchForm: FormGroup = new FormGroup({})
  c: any
  p: any
  search: any
  constructor(private modalService: NgbModal, private sa: UserauthService, private route: Router, private matDialog: MatDialog) {
    if (!localStorage.getItem('Token')) {
      this.route.navigate(["login"])
    }
    if (this.sa.loggedIn() == false) {
      this.route.navigate(["login"])
    }
    if (this.sa.Role() == false) {
      this.route.navigate(["login"])

    }
  }

  ngOnInit(): void {

    this.getalluser()
  }
  getalluser() {
    this.sa.getallusers().subscribe(data => {

      this.tab = data;
      console.log(this.tab)


    }, error => {
      console.log(error)
    })

  }

  open(userName: any) {
    const config = { backdrop: true, size: 'lg' }
    var modalRef = this.modalService.open(AddroleComponent, config)
    modalRef.componentInstance.fromParent = userName
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

  ViewRole(userName: any) {

    const config = { backdrop: true, size: 'lg' }
    var modalRef = this.modalService.open(ViewroleComponent, config)
    modalRef.componentInstance.fromParent = userName

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



  // console.log(config.data);
  // let ref = this.matDialog.open(ViewroleComponent, config);

  deleteuser(id: any) {
    // console.log(id)
    // this.sa.deletuser(id).subscribe()
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
        this.sa.deletuser(id).subscribe({
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
            this.getalluser()
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
  Search() {
    console.log(this.search)
    if (this.search == "") {
      this.ngOnInit();

    } else {
      this.tab = this.tab.filter(res => {
        return res.userName.toLowerCase().match(this.search.toLowerCase())
      })
    }

  }
}


