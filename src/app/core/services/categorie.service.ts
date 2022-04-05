import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CategorieService {

    constructor(private _http: HttpClient) {

    }
    getallcategories() {
        return this._http.get('https://localhost:44324/api/Category/GetAll')
    }


    delete(id: any) {
        return this._http.delete('https://localhost:44324/api/Category/deleteCategory?id=' + id, { responseType: 'text' })
    }
    post(data: any) {
        return this._http.post('https://localhost:44324/api/Category/PostCategory', data)
    }
    getfunction(id: any) {
        return this._http.get('https://localhost:44324/api/CategFunction/getbycategoryId?categoryId=' + id)
    }
    deletefunctioofuser(id: any) {
        return this._http.delete('https://localhost:44324/api/CategFunction/deleteFunctioncat?id=' + id, { responseType: 'text' })
    }
    addcategoriefunction(data: any) {
        return this._http.post('https://localhost:44324/api/CategFunction/PostCategory', data)
    }
}