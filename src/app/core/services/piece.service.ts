import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PieceService {
    constructor(private _http: HttpClient) { }

    get(data: any): Observable<[]> {
        return this._http.get<[]>('https://localhost:44324/api/Pieces/getbyrequest?id=' + data);


    }

    getpiece(id: any) {
        return this._http.get('https://localhost:44324/api/Pieces/download/' + id, { responseType: 'blob' })


    }
    upload(id: any, data: any) {
        return this._http.post('https://localhost:44324/api/Pieces/uploadfile?fk=' + id, data)
    }
}