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
    getrequestbyid(id: any): Observable<[]> {
        return this._http.get<[]>('https://localhost:44324/api/Request/getById?id=' + id);
    }
    postrequest(data: any): Observable<[]> {
        return this._http.post<[]>('https://localhost:44324/api/Request/postRequest', data)
    }

}
