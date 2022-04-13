import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class Categtypeservice {

    constructor(private _http: HttpClient) {

    }
    post(data: any) {
        return this._http.post('https://localhost:44324/api/typereqCatg/Post', data)
    }
    getbyreqid(data: any) {
        return this._http.get('https://localhost:44324/api/typereqCatg/gettypeRequestCatg2?id=' + data)
    }
    delete(id: any) {
        return this._http.delete('https://localhost:44324/api/typereqCatg/delete?idcategory=' + id, { responseType: 'text' })
    }
}