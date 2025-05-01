import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./utils/azureAuthUtil";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function App() {
  const { instance, accounts } = useMsal();

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch(e => {
      console.error("Login error:", e);
    });
  };

  const handleLogout = () => {
    instance.logoutPopup();
  };

  return (
    <div>
      {accounts.length > 0 ? (
        <Stack spacing={2} direction="row">
          <h1>Bienvenido, {accounts[0].name}</h1>
          <Button onClick={handleLogout} variant="outlined">Sign Out</Button>
        </Stack>
      ) : (
        <Button onClick={handleLogin} variant="outlined">Sign In</Button>
      )}
    </div>
  );
}

