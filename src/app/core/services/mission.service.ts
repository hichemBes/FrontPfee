import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/user';
import { Mission } from '../models/mission';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  constructor(private _http:HttpClient) { }

  listCollaborateurs:User[]=[];
  listMissions:Mission[]=[];

  getList(){
    return this._http.get(environment.baseUrl+'/Mission')
  }
  addMission(mission:any){
    return this._http.post(environment.baseUrl+'/Mission/postMission', mission)
  }
  editMission(mission:any){
    return this._http.put(environment.baseUrl+'/Mission/putMission', mission,{responseType:'text'})
  }
  deleteMission(id:any){
    return this._http.delete(environment.baseUrl+'/Mission/deleteMission?id='+id,{responseType:'text'})
  }

  FiltreMissionsByUser() {
    return this._http.get(environment.baseUrl + '/Mission/FiltreMissionsByUser');
  }

}
