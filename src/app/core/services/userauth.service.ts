import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';


const httoption = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('Token')
  })
}
@Injectable({
  providedIn: 'root'
})
export class UserauthService {

  user: User;
  helper = new JwtHelperService();
  Token;


  url = "https://localhost:44377/Identity/register"
  url2 = "https://localhost:44377/Identity/login"
  url3 = "https://localhost:44377/Identity/addRole"
  url4 = "https://localhost:44377/Identity/allusers"
  url5 = "https://localhost:44377/Identity/getrolesofuser?Username="
  islogged: Boolean = false;
  constructor(private http: HttpClient) {


  }
  getallusers(): Observable<string[]> {
    return this.http.get<string[]>(this.url4)
  }

  postrole(data) {
    console.log(httoption)
    return this.http.post(this.url3, data, httoption)

  }
  signup(data) {
    return this.http.post<any>(this.url, data);
  }
  login(data) {
    return this.http.post<any>(this.url2, data);
  }
  savelocal(username: any, res) {

    localStorage.setItem("username", username);
    this.Token = res.token
    localStorage.setItem("Token", res.token)
    let decode = this.helper.decodeToken(this.Token)
    let role = decode.role;
    let userid = decode.nameid
    localStorage.setItem("userid", userid)

    localStorage.setItem("Role", role)

  }
  // getallusers(): Observable<string[]> {
  //   return this.http

  // }
  getusername() {
    let token = localStorage.getItem("Token")
    let decode = this.helper.decodeToken(token)
    return decode.given_name

  }

  loggedIn() {

    let token: any = localStorage.getItem('Token')
    let decodeToken = this.helper.decodeToken(token)

    if (this.helper.isTokenExpired(token)) {
      return false;
    }
    return true
  }
  Role() {
    let token: any = localStorage.getItem('Token')
    let decodeToken = this.helper.decodeToken(token)
    let role = decodeToken.role
    var c = role.find(ele => ele == "Admin")
    if (c !== "Admin") {
      return false;
    }
    else {
      return true
    }

  }
  getRolebyusername(username: any): Observable<string[]> {
    return this.http.get<string[]>(this.url5 + username);
  }
}