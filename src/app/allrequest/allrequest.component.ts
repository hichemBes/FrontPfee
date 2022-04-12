import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RequestService } from '../core/services/request.service';
import { UserauthService } from '../core/services/userauth.service';

@Component({
  selector: 'app-allrequest',
  templateUrl: './allrequest.component.html',
  styleUrls: ['./allrequest.component.scss']
})
export class AllrequestComponent implements OnInit {

  tab: any;
  p: any;
  verif = false
  search: any

  constructor(private route: Router, private req: RequestService, private sa: UserauthService, private matDialog: MatDialog) {
    if (!localStorage.getItem('Token')) {
      this.route.navigate(["login"])
    }
    if (this.sa.loggedIn() == false) {
      this.route.navigate(["login"])
    }
  }
  ngOnInit(): void {
    this.verif = this.sa.Role()
    console.log(this.verif)
    this.getallrequest()
  }
  getallrequest() {
    this.req.getllrequest().subscribe(data => {
      this.tab = data



      for (var i in this.tab) {
        if (this.tab[i].status == 'InProgress') {
          this.tab[i].status = 'En Cours '
        }
        if (this.tab[i].status == 'NotDone') {
          this.tab[i].status = 'Pas encore Valideé '

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
      this.ngOnInit();

    } else {
      this.tab = this.tab.filter(res => {
        return res.status.toLowerCase().match(this.search.toLowerCase())
      })
    }

  }
}
