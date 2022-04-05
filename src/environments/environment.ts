// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'http://localhost:54718/api',
  ingressURL: 'http://192.168.160.57/hajerauth',
  userManagement: 'http://192.168.160.57/production-user-management/api',
  subsidiaryMs: 'http://192.168.49.175:32049/api',
  AttachementUrl: 'http://192.168.49.175:31005/api',
  locall: 'https://localhost:44324/',
  ApplicationId: 53

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
