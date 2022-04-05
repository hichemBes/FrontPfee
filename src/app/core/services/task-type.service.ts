import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskTypeService {

  constructor(private _http:HttpClient) { }
  getList(){
    return this._http.get(environment.baseUrl+'/TaskType')
  }
  addType(type){
    return this._http.post(environment.baseUrl+'/TaskType/postTaskType', type)
  }
  editType(type){
    return this._http.put(environment.baseUrl+'/TaskType/putTaskType', type,{responseType:'text'})
  }
  deleteType(id){
    return this._http.delete(environment.baseUrl+'/TaskType/deleteTaskType?id='+id,{responseType:'text'})
  }
}
