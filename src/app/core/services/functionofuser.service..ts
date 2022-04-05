import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class functionofuserService {
    constructor(private _http: HttpClient) { }
    getallfunctioofuser(id: any) {
        return this._http.get('https://localhost:44324/api/FunctionofUser/getfonctionobyid?Id=' + id)

    }
    postfunctionuser(data) {
        return this._http.post('https://localhost:44324/api/FunctionofUser/postfunctionofuser', data)
    }
    deleteuserf(id: any) {
        return this._http.delete('https://localhost:44324/api/FunctionofUser/delete?id=' + id, { responseType: 'text' })
    }
}