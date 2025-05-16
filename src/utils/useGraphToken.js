// hooks/useGraphToken.js
import { useMsal } from '@azure/msal-react';
import { useEffect, useState } from 'react';

const SCOPES = ["User.ReadBasic.All"];

export function useGraphToken() {
  const { instance, accounts } = useMsal();
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (!accounts.length) return;
    const req = { scopes: SCOPES, account: accounts[0] };

    instance.acquireTokenSilent(req)
      .then(res => setToken(res.accessToken))
      .catch(() => instance.acquireTokenPopup(req)
        .then(res => setToken(res.accessToken))
        .catch(console.error)
      );
  }, [instance, accounts]);

  return token;
}
