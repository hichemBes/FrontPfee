import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { UserauthService } from '../core/services/userauth.service';
import { CategorieService } from './../core/services/categorie.service';
import { AddcategorieComponent } from './../popup/addcategorie/addcategorie.component';
import { ViewcatfunctionComponent } from './../popup/viewcatfunction/viewcatfunction.component';
import { AddcatfunctionComponent } from './../popup/addcatfunction/addcatfunction.component';
import * as signalR from '@microsoft/signalr';
import { Notification } from '../core/services/notification.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  searchForm: FormGroup = new FormGroup({})
  categories: any
  p: any
  search: any
  constructor(private route: Router, private c: CategorieService, private sa: UserauthService, private noti: Notification, private modalService: NgbModal) {
    if (this.sa.loggedIn() == false || this.sa.Role() == false) {
      this.route.navigate(["login"])

    }

  }

  ngOnInit(): void {
    this.getall()

    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl('https://localhost:44324/notify')
      .build();
    connection.start().then(function () {
      console.log('SignalR Connected!');
    }).catch(function (err) {
      console.log('error', err.toString())
      return console.error(err.toString());

    });

    connection.on("BroadcastMessage", () => {
      this.getNotification()
      console.log("BroadcastMessage")
    });
  }
  getNotification() {
    this.noti.getNotification().subscribe(data => {
      console.log(data)
    }
    )

  }

  addcategorie() {
    const config = { backdrop: true, size: 'lg' }
    var modalRef = this.modalService.open(AddcategorieComponent, config)
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
        this.c.delete(id).subscribe({
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

  getall() {
    this.c.getallcategories().subscribe(data => {
      this.categories = data

    }, err => {
      console.log(err)
    }
    )


  }
  Search() {


    if (this.search == "") {
      this.ngOnInit();

    } else {
      this.categories = this.categories.filter(res => {
        return res.categorytype.toLowerCase().match(this.search.toLowerCase())
      })
    }
  }
  open(id: any, c: any) {
    const config = { backdrop: true, size: 'lg' }
    var modalRef = this.modalService.open(ViewcatfunctionComponent, config)
    modalRef.componentInstance.fromParent = {
      "id": id,
      "typecategorie": c
    }
  }
  open2(id: any, c: any) {
    const config = { backdrop: true, size: 'lg' }
    var modalRef = this.modalService.open(AddcatfunctionComponent, config)
    modalRef.componentInstance.fromParent = {
      "id": id,
      "typecategorie": c
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
}
