import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RequestService {
    headers = { responseType: "text" }

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
    getrequestuser(id: any): Observable<[]> {
        return this._http.get<[]>('https://localhost:44324/api/Request/getbyuser?userid=' + id);
    }
    getwaitingvalidation(): Observable<[]> {
        return this._http.get<[]>("https://localhost:44324/api/Request/waitingvalidation");
    }
    getNotDone(): Observable<[]> {
        return this._http.get<[]>("https://localhost:44324/api/Request/getstatusNotDone");
    }
    getstatitcs(id: any): Observable<[]> {
        return this._http.get<[]>("https://localhost:44324/api/Request/statitcs?id=" + id)
    }
    updaterquest(data: any) {
        return this._http.put("https://localhost:44324/api/Request/updateRequest", data, { responseType: "text" })

    }
    getinprogress() {
        return this._http.get<[]>("https://localhost:44324/api/Request/getstatusInProgress")
    }
}



