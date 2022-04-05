import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RequestService {
    constructor(private _http: HttpClient) { }
    getllrequest(): Observable<[]> {
        return this._http.get<[]>(environment.locall + 'api/Request/getallrequest');


    }
    // postrequest(){
    //     this._http.post(){

    //     }
    // }

}
