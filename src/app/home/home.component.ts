import { Component, OnInit } from '@angular/core';
import { UserauthService } from '../core/services/userauth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  role: any;
  constructor(private sa: UserauthService, private route: Router) {

    if (this.sa.Role() == true) {
      this.role = "Admin"

    }

    if (this.sa.loggedIn() == false) {
      this.route.navigate(["login"])
    }
    else {
      this.role = this.sa.Role()
    }
    // if (this.sa.loggedIn() == true) {
    //   console.log("connected")
    // } else {

    //   this.route.navigate(["login"])

    // }
  }

  ngOnInit(): void {
  }

}
