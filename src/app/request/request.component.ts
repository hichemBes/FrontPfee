import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserauthService } from '../core/services/userauth.service';
import { RequestService } from './../core/services/request.service';
import { Req } from './../core/models/request';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';


@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  tab: any;
  verif = false

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
    this.getallrequest()
  }
  getallrequest() {
    this.req.getllrequest().subscribe(data => {
      this.tab = data
      let request: Req

      request = this.tab

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
}
