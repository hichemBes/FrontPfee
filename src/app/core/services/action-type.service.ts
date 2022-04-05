import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { environment } from "src/environments/environment"


@Injectable({
  providedIn: 'root'
})
export class ActionTypeService {

  constructor(private _http:HttpClient) { }
  getList(){
    return this._http.get(environment.baseUrl+'/ActionType')
  }
  addType(type:any){
    return this._http.post(environment.baseUrl+'/ActionType/postActionType', type)
  }
  editType(type:any){
    return this._http.put(environment.baseUrl+'/ActionType/putActionType', type,{responseType:'text'})
  }
  deleteType(id:any){
    return this._http.delete(environment.baseUrl+'/ActionType/deleteActionType?id='+id,{responseType:'text'})
  }
}
