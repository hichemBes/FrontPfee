import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { UserauthService } from './../core/services/userauth.service';
import { Router } from '@angular/router';
import { LoginComponent } from './../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  messageErorr = ""
  constructor(private sa: UserauthService, private route: Router) { }

  ngOnInit(): void {
  }
  register(f: any) {
    let data = f.value;
    console.log(f.value)
    console.log(data)

    this.sa.signup(data).subscribe(res => {
      console.log(res.succeeded == true)
        , this.route.navigate(["login"])

    })


    err => {
      console.log(err)


    }
  }

}

