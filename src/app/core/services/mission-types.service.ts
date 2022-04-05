import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MissionTypesService {

  constructor(private _http:HttpClient) { }
  getList(){
    return this._http.get(environment.baseUrl+'/MissionType')
  }
  addType(type:any){
    return this._http.post(environment.baseUrl+'/MissionType/postMissionType', type)
  }
  editType(type:any){
    return this._http.put(environment.baseUrl+'/MissionType/putMissionType', type,{responseType:'text'})
  }
  deleteType(id:any){
    return this._http.delete(environment.baseUrl+'/MissionType/deleteMissionType?id='+id,{responseType:'text'})
  }
}
