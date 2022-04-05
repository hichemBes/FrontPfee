import { Component, OnInit } from '@angular/core';
import { IdentityServerService } from 'src/app/core/services/identity-server.service';
import { AuthentificationService } from 'src/app/core/services/authentification.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { UserauthService } from './../../core/services/userauth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: []
})
export class NavbarComponent implements OnInit {
  verif;
  username;
  constructor(public identityService: IdentityServerService, private route: Router, private oauthService: OAuthService, public authentificationService: AuthentificationService, private as: UserauthService) {
    this.verif = this.as.islogged

    this.username = this.as.getusername()

  }


  ngOnInit(): void {
  }


  logOut() {

    localStorage.clear();
    this.route.navigate(["login"])

  }
}
