import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class typeRequestService {
    constructor(private _http: HttpClient) { }
    getlltyperequestList(): Observable<[]> {
        return this._http.get<[]>(environment.locall + 'api/TypeRequest/Getall');


    }
    delete(id: any) {
        return this._http.delete('https://localhost:44324/api/TypeRequest/deleteTypeRequest?id=' + id, { responseType: 'text' })
    }
    post(data: any) {
        return this._http.post('https://localhost:44324/api/TypeRequest/posttypeRequest', data)
    }
}