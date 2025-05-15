
// src/MsalProviderWrapper.jsx
import React from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./azureAuthUtil";

const msalInstance = new PublicClientApplication(msalConfig);

export default function MsalProviderWrapper({ children }) {
  return (
    <MsalProvider instance={msalInstance}>
        {children}
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
