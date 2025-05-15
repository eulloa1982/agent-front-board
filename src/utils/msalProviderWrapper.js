
// src/MsalProviderWrapper.jsx
import React from "react";
import { PublicClientApplication, InteractionType } from "@azure/msal-browser";
import { MsalProvider, MsalAuthenticationTemplate } from "@azure/msal-react";
import { msalConfig, loginRequest } from "./azureAuthUtil";

const msalInstance = new PublicClientApplication(msalConfig);

export default function MsalProviderWrapper({ children }) {
  return (
    <MsalProvider instance={msalInstance}>
      <MsalAuthenticationTemplate
        interactionType={InteractionType.Popup}
        authenticationRequest={loginRequest}
        loadingComponent={<div>Cargando autenticación...</div>}
        errorComponent={<div>Error al autenticar</div>}
      >
        {children}
      </MsalAuthenticationTemplate>
    </MsalProvider>
  );
}
// src/MsalProviderWrapper.jsx
/*import React from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import RequireAuth from "./requireAuth";
import { msalConfig } from "./azureAuthUtil";

const msalInstance = new PublicClientApplication(msalConfig);

export default function MsalProviderWrapper({ children }) {
  return (
    <MsalProvider instance={msalInstance}>
      <RequireAuth>
        {children}
      </RequireAuth>
    </MsalProvider>
  );
}*/
