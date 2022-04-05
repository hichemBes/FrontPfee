import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

export const authPasswordFlowConfig: AuthConfig = {
  // Url of the Identity Provider
   issuer:environment.ingressURL,
  // issuer: 'http://localhost:5001',
  // URL of the SPA to redirect the user to after login
  // redirectUri: window.location.origin ,

 redirectUri: 'http://localhost:4200',


 silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  responseType: 'id_token token',
  clientId: 'ProjectmanagementTPAP',

  // responseType: 'code',
  // dummyClientSecret: 'test_app_implicit_secret',
  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one

   scope: 'openid profile offline_access IdentityServerApi ProjectmanagementTPAPApi',
   showDebugInformation: true,
   requireHttps: false,

  postLogoutRedirectUri: 'http://localhost:4200',
};
