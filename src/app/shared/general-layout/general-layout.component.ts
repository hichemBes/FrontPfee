import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/core/services/authentification.service';
import { UserauthService } from 'src/app/core/services/userauth.service';

@Component({
  selector: 'app-general-layout',
  templateUrl: './general-layout.component.html',
})
export class GeneralLayoutComponent implements OnInit {

  constructor(public authentificationService: AuthentificationService, private as: UserauthService) {

  }
  isExist: boolean = false;


  ngOnInit(): void {
    this.authentificationService.getUsersByAppId().subscribe(
      res => {
        this.authentificationService.listUsersByAppId = res as any[]

      })
  }

  logOut() {

    if (this.authentificationService.listUsersByAppId.length == 0) {
      this.authentificationService.refresh();
      this.authentificationService.logOut();
    }
    else {
      if (this.authentificationService.idTokenClaimsObject) {
        this.isExist = this.authentificationService.listUsersByAppId.find(x => x.userUserName == this.authentificationService.idTokenClaimsObject.IdentityCardNumber)
        if (!this.isExist) {
          this.authentificationService.logOut();
        }
      }

    }
  }
}
