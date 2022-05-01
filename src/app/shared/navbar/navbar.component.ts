import { Component, OnInit } from '@angular/core';
import { IdentityServerService } from 'src/app/core/services/identity-server.service';

import { OAuthService } from 'angular-oauth2-oidc';
import { UserauthService } from './../../core/services/userauth.service';
import { Router } from '@angular/router';
import * as signalR from '@microsoft/signalr';
import { Notification } from 'src/app/core/services/notification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  isLoggedIn: Observable<boolean>;
  notification: any
  function;
  verif;
  username;
  count
  e;
  count2;

  constructor(private route: Router, private noti: Notification, private as: UserauthService) {

    this.isLoggedIn = this.as.isLoggedIn();
    this.isLoggedIn.subscribe(data => {
      this.verif = data
      console.log(data)
    }

    )

    this.username = this.as.getusername()
    this.function = localStorage.getItem("Role");


  }


  ngOnInit(): void {
    this.verif = this.as.Role()
    console.log(this.function)

    this.getNotificationbyuser()

    // this.e = this.as.Role()
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
      console.log("BroadcastMessage")
      this.getNotificationbyuser()



    })


  }
  toggleNotifi() {
    var box = document.getElementById('box');
    var down = false;
    if (down) {
      box.style.height = '0px';
      box.style.opacity = '0';
      down = false;
    } else {
      box.style.height = '510px';
      box.style.opacity = '1';
      down = true;
    }

  }
  reset() {
    this.count2 = 0
    console.log('aa')
  }
  getNotification() {
    this.noti.getNotification().subscribe(data => {
      this.notification = data
      this.count = this.notification.length
      this.count2 = this.notification.length
      console.log(this.notification)
    })
  }
  delete() {
    console.log("log this iiiii")
  }
  async getNotificationbyuser() {
    var id = localStorage.getItem("userid")
    console.log(id)
    this.noti.getbyuser(id).subscribe(
      data => {
        this.notification = data
        this.count = this.notification.length
        this.count2 = this.notification.length
        console.log(this.notification)

      }
    )
  }

  logOut() {

    this.as.logout()
  }
}