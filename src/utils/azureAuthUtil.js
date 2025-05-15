// src/authConfig.js
export const msalConfig = {
    auth: {
      clientId: "eba64229-dc11-4fdb-a6d9-d0d6888d20d1", // 👈 desde Azure Portal
      authority: "https://login.microsoftonline.com/7313ad10-b885-4b50-9c75-9dbbd975618f",
      redirectUri: "https://mydashboard.lmitservices.com/", // o tu dominio en Azure
    },
    cache: {
      cacheLocation: "sessionStorage", // o localStorage
      storeAuthStateInCookie: false,
    },
  };
  
  export const loginRequest = {
    scopes: ["User.Read", "User.ReadBasic.All"], // puedes agregar más scopes según tu app
  };