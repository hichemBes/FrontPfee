import { Component, OnInit } from '@angular/core';
import { IdentityServerService } from 'src/app/core/services/identity-server.service';
import { AuthentificationService } from 'src/app/core/services/authentification.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { UserauthService } from './../../core/services/userauth.service';
import { Router } from '@angular/router';
import * as signalR from '@microsoft/signalr';
import { Notification } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  notification: any
  verif;
  username;
  count
  e;

  constructor(private route: Router, public authentificationService: AuthentificationService, private noti: Notification, private as: UserauthService) {
    this.verif = this.as.islogged

    this.username = this.as.getusername()


  }


  ngOnInit(): void {


    this.e = this.as.Role()
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
  getNotification() {
    this.noti.getNotification().subscribe(data => {
      this.notification = data
      this.count = this.notification.length

      console.log(this.notification)
    })
  }


  logOut() {

    localStorage.clear();
    this.route.navigate(["login"])
    console.clear();

  }
}
