import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private _http:HttpClient) { }
  getList(){
    return this._http.get(environment.baseUrl+'/Project')
  }
  addproject(project:any){
    return this._http.post(environment.baseUrl+'/Project/postProject', project)
  }
  editproject(project:any){
    return this._http.put(environment.baseUrl+'/Project/putProject', project,{responseType:'text'})
  }
  deleteproject(id:any){
    return this._http.delete(environment.baseUrl+'/Project/deleteProject?id='+id,{responseType:'text'})
  }
}
