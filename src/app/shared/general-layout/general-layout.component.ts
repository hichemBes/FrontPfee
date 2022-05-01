import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserauthService } from 'src/app/core/services/userauth.service';

@Component({
  selector: 'app-general-layout',
  templateUrl: './general-layout.component.html',
})
export class GeneralLayoutComponent implements OnInit {
  isLoggedIn: Observable<boolean>;
  LoginStatus$: Observable<boolean>;
  verif
  UserName$: Observable<string>;
  constructor(private as: UserauthService, private router: Router, private sa: UserauthService) {
    this.isLoggedIn = this.as.isLoggedIn();
    this.isLoggedIn.subscribe(data => {
      this.verif = data
      console.log(data)
    })
  }
  isExist: boolean = false;



  ngOnInit(): void {






    // this.authentificationService.getUsersByAppId().subscribe(
    //   res => {
    //     this.authentificationService.listUsersByAppId = res as any[]

    //   })
  }

  // logOut() {

  //   if (this.authentificationService.listUsersByAppId.length == 0) {
  //     this.authentificationService.refresh();
  //     this.authentificationService.logOut();
  //   }
  //   else {
  //     if (this.authentificationService.idTokenClaimsObject) {
  //       this.isExist = this.authentificationService.listUsersByAppId.find(x => x.userUserName == this.authentificationService.idTokenClaimsObject.IdentityCardNumber)
  //       if (!this.isExist) {
  //         this.authentificationService.logOut();
  //       }
  //     }

  //   }
  // }
}
