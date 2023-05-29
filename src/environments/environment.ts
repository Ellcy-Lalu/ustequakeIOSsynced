// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAVUsSh6PAIQ7gD2pgG3M455CFE_a_AvfQ",
    authDomain: "ust-e-quake.firebaseapp.com",
    projectId: "ust-e-quake",
    storageBucket: "ust-e-quake.appspot.com",
    messagingSenderId: "881667849880",
    appId: "1:881667849880:web:ff9ca57a52707839119aed"
  },
  twilio: {
    accountSID: "AC66b275f4b5c7f911bbf764544c43d424",
    authToken: "50a6ee8d7ba77f207356bd7508428606"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
