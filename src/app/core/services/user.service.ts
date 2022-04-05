import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }
  serachUserWithKeyWord(searchKey:string) {
    return this._http.get(environment.userManagement + '/user/SerachUserWithKeyWord?searchKey='+searchKey)
  }
}
