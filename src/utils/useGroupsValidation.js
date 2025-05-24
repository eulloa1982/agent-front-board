
import { useState, useEffect } from 'react';
import { useMsal } from '@azure/msal-react';

const ALLOWED_GROUP_IDS = [
  'bb7d859f-7032-405c-9dee-73cde7a6fb42' // ← tu ID del grupo cservices-group
];

const useGroupValidation = () => {
  const { instance, accounts } = useMsal();
  const [isInGroup, setIsInGroup] = useState(false);

  useEffect(() => {
    const checkGroups = async () => {
      if (accounts.length > 0) {
        const account = accounts[0];

        try {
          const response = await instance.acquireTokenSilent({
            scopes: ['User.Read'],
            account: account
          });

          const idToken = response.idToken;
          const tokenPayload = JSON.parse(atob(idToken.split('.')[1]));

          const userGroups = tokenPayload.groups || [];

          const isAllowed = userGroups.some(groupId => ALLOWED_GROUP_IDS.includes(groupId));
          setIsInGroup(isAllowed);

        } catch (err) {
          console.error("Group validation error:", err);
          setIsInGroup(false);
        }
      }
    };

    checkGroups();
  }, [accounts, instance]);

  return isInGroup;
};

export default useGroupValidation;
