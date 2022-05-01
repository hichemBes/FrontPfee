import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserauthService } from '../core/services/userauth.service';
import { RequestService } from './../core/services/request.service';
import { Req } from './../core/models/request';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddrequestComponent } from './../popup/addrequest/addrequest.component';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  tab: any;
  p: any;
  verif = false
  search: any
  conut: any

  constructor(private route: Router, private req: RequestService, private modalService: NgbModal, private sa: UserauthService, private matDialog: MatDialog) {
    if (!localStorage.getItem('Token')) {
      this.route.navigate(["login"])
    }
    if (this.sa.loggedIn() == false) {
      this.route.navigate(["login"])
    }
  }
  ngOnInit(): void {

    // const connection = new signalR.HubConnectionBuilder()
    //   .configureLogging(signalR.LogLevel.Information)
    //   .withUrl('https://localhost:44324/notify')
    //   .build();
    // connection.start().then(function () {
    //   console.log('SignalR Connected!');
    // }).catch(function (err) {
    //   console.log('error', err.toString())
    //   return console.error(err.toString());

    // });

    // connection.on("BroadcastMessage", () => {
    //   this.getNotification()
    //   console.log("BroadcastMessage")
    // });

    this.verif = this.sa.Role()
    console.log(this.verif)

    this.getallrequest()
  }
  getallrequest() {
    var d = localStorage.getItem('userid')
    this.req.getrequestuser(d).subscribe(data => {
      this.tab = data


      this.conut = this.tab.length
      for (var i in this.tab) {
        if (this.tab[i].status == 'InProgress') {
          this.tab[i].status = 'En attente validation Siége '
        }
        if (this.tab[i].status == 'NotDone') {
          this.tab[i].status = 'Pas encore Valideé de responsable Filliale '

        }
        if (this.tab[i].status == 'waitingvalidation') {
          this.tab[i].status = 'valider par responsable Filliale '

        }
      }

      console.log(this.tab)

    }, error => {
      console.log(error)
    })
  }
  popupRequest() {


  }
  popupview() {
    console.log("aaa")

  }
  popupall() {




  }

  addDemande() {

    const config = { backdrop: true, size: 'lg' }
    var modalRef = this.modalService.open(AddrequestComponent, config)
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
        this.getallrequest()
        modalRef.close()
      }
    })

  }
  Search() {

    if (this.search == "") {
      this.ngOnInit();

    } else {
      this.tab = this.tab.filter(res => {
        return res.status.toLowerCase().match(this.search.toLowerCase())
      })
    }

  }
  btnClick(id: any) {
    this.route.navigateByUrl('request/details:' + id);

  }
}