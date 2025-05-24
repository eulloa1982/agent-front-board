import { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./azureAuthUtil";

const groupId = "bb7d859f-7032-405c-9dee-73cde7a6fb42"; // Object ID de 'cservices-group'

function useGroupValidation() {
  const { instance, accounts } = useMsal();

  useEffect(() => {
    if (accounts.length > 0) {
      instance.acquireTokenSilent({ ...loginRequest, account: accounts[0] })
        .then(response => {
          const claims = response.idTokenClaims;
          const userGroups = claims.groups || [];

          if (!userGroups.includes(groupId)) {
            // Redirigir o bloquear acceso
            window.location.href = "/unauthorized";
          }
        })
        .catch(err => console.error("Token error:", err));
    }
  }, [accounts, instance]);
}
