import { Configuration } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
      clientId: "62c0ef0d-31de-4e60-9f2d-aaedbea7b89e",
      authority: "https://login.microsoftonline.com/0ae51e19-07c8-4e4b-bb6d-648ee58410f4",
      redirectUri: "https://ca0vmdcbr01.br.bosch.com/"
  },
  cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

/**
* Scopes you add here will be prompted for user consent during sign-in.
* By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
* For more information about OIDC scopes, visit: 
* https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
*/
export const loginRequest = {
  scopes: ["User.Read"]
};

//"AppRoleAssignment.ReadWrite.All"

/**
* Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
* https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
*/
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me" //e.g. https://graph.microsoft.com/v1.0/me
};

