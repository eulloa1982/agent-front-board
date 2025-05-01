import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./utils/azureAuthUtil";

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
        <>
          <h1>Bienvenido, {accounts[0].name}</h1>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </>
      ) : (
        <button onClick={handleLogin}>Iniciar sesión</button>
      )}
    </div>
  );
}

