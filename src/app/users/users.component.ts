import { Component, OnInit } from '@angular/core';
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
  c: any
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
    this.sa.getallusers().subscribe(data => {

      this.tab = data;


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



}

