import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IdentityServerService {

  listUsersByAppId: any[] = new Array();
 // claimsObject;
  AppRolePermissionList: any[] = new Array()
  claimsObject:any;
  constructor(private http: HttpClient,private oauthService: OAuthService) { }

  getRoleByApplicationId(){
    return this.http.get(environment.ingressURL+'/api/Roles/RoleByApplicationID?id='+ environment.ApplicationId)
   }

   getUsersByAppId(){
     return this.http.get(environment.ingressURL +'/api/Users/GetAllByApplication/' +environment.ApplicationId )
   }
   postUser(identityUserObject: any){
    return this.http.post(environment.ingressURL+'/api/Users',identityUserObject )
  }

   getListUserAffectedToApp() {
     return this.http.get(environment.ingressURL + '/review-identityserver/api/Users/GetAllByApplication/'+ environment.ApplicationId)
   }


   deleteUserFromApp(UserToDelete: any){
     return this.http.post(environment.ingressURL +'/review-identityserver/api/Users/DeleteUserFromApp', UserToDelete)
   }

  //#region identity server
  // get userName() {
  //   const claims = this.oauthService.getIdentityClaims();
  //   if (!claims) return null;
  //   return claims['given_name'];
  // }

  get idTokenClaimsObject(): any {
    return this.oauthService.getIdentityClaims();

  }

  get idToken(): string {
    return this.oauthService.getIdToken();
  }

  get accessToken(): string {
    return this.oauthService.getAccessToken();
  }

  logOut() {
    this.oauthService.logOut();
  }
  refresh() {
    this.oauthService.refreshToken();
  }
}
