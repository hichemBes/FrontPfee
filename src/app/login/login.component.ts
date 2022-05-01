import { Component, OnInit } from '@angular/core';
import { UserauthService } from './../core/services/userauth.service';
import { Router } from '@angular/router';
import { User } from '../core/models/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  messageErorr;
  Token: any;
  user: User
  username;
  constructor(private sa: UserauthService, private route: Router) {
    if (this.sa.loggedIn() == true) {
      this.route.navigate(["Home"])
    }
  }


  ngOnInit(): void {
  }
  Login(f: any) {
    let data = f.value;

    console.log(data)
    // let k = {
    //   "username": "aallllaa",
    //   "password": "AAAaaaa@@@bbb000"
    // }

    this.sa.login(data).subscribe(
      res => {
        console.log(res),


          this.username = data.username,

          this.sa.savelocal(data.username, res)

        this.route.navigate(["Home"]).then(() => {
          window.location.reload();
        })


      },
      error => {
        (error === 'Unauthorized')

        this.messageErorr = "Incorrect email or password "
        console.log(this.messageErorr)
      })
  }
}