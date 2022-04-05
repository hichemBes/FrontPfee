import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubsidiaryService {

  constructor(private _http:HttpClient) { }
  getList(){
    return this._http.get(environment.subsidiaryMs+'/Subsidiary')
  }
}
