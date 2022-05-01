import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RequestService } from '../core/services/request.service';
import { UserauthService } from '../core/services/userauth.service';
import * as signalR from '@microsoft/signalr';

@Component({
  selector: 'app-allrequest',
  templateUrl: './allrequest.component.html',
  styleUrls: ['./allrequest.component.scss']
})
export class AllrequestComponent implements OnInit {
  lentgh: any
  tab: any;
  p: any;
  verif2 = false
  search: any

  constructor(private route: Router, private req: RequestService, private sa: UserauthService, private matDialog: MatDialog) {
    if (!localStorage.getItem('Token')) {
      this.route.navigate(["login"])
    }
    if (this.sa.loggedIn() == false) {
      this.route.navigate(["login"])
    }
    this.getallrequest()
  }
  ngOnInit(): void {
    this.verif2 = this.sa.Role()
    console.log(this.verif2)


    //   const connection = new signalR.HubConnectionBuilder()
    //     .configureLogging(signalR.LogLevel.Information)
    //     .withUrl('https://localhost:44324/notify')
    //     .build();
    //   connection.start().then(function () {
    //     console.log('SignalR Connected!');
    //   }).catch(function (err) {
    //     console.log('error', err.toString())
    //     return console.error(err.toString());

    //   });

    //   connection.on("BroadcastMessage", () => {
    //   });

  }
  getallrequest() {
    this.req.getllrequest().subscribe(data => {
      this.tab = data
      this.lentgh = this.tab.length



      for (var i in this.tab) {
        if (this.tab[i].status == 'InProgress') {
          this.tab[i].status = 'En Cours '
        }
        if (this.tab[i].status == 'NotDone') {
          this.tab[i].status = 'Pas encore Valideé '

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

  }
  Search() {

    if (this.search == "") {
      this.getallrequest();

    } else {
      this.tab = this.tab.filter(res => {
        return res.requesttype.toLowerCase().match(this.search.toLowerCase())
      })
    }

  }
}
