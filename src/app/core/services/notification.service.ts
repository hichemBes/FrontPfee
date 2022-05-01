import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class Notification {

    constructor(private _http: HttpClient) { }

    getNotification() {
        return this._http.get('https://localhost:44324/Find')
    }
    getbyuser(id: any): Observable<any> {
        return this._http.get<[]>('https://localhost:44324/findbyuser?id=' + id)
    }
    deleteNotification(id: any) {
        return this._http.delete('https://localhost:44324/Delete?id=' + id, { responseType: 'text' })
    }

}
