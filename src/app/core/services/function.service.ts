import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FunctionService {
    constructor(private _http: HttpClient) { }
    getallfunction() {
        return this._http.get('https://localhost:44324/api/Function')
    }
    //     this._http.post(){

    //     }
    // }
    delete(id: any) {
        return this._http.delete('https://localhost:44324/api/Function/deleteFunction?id=' + id, { responseType: 'text' })

    }
    post(f: any) {
        return this._http.post('https://localhost:44324/api/Function/postFunction', f)
    }

}