import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrganismeService {



    constructor(private _http: HttpClient) {


    }
    getAllorganisme(): Observable<[]> {
        return this._http.get<[]>(environment.locall + 'GetAll')
    }
    postorganisme(data: any) {
        return this._http.post('https://localhost:44324/PostOrganisme', data)
    }

    deleteorganisme(id: any) {
        return this._http.delete('https://localhost:44324/deleteCategory?id=' + id, { responseType: 'text' })
    }

}