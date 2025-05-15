// src/RequireAuth.jsx
import React from "react";
import { useMsalAuthentication} from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { loginRequest } from "./azureAuthUtil";
import { CircularProgress, Box, Typography } from "@mui/material";

export default function RequireAuth({ children }) {
  const { login, result, error } = useMsalAuthentication(
    InteractionType.Popup,
    loginRequest
  );

  if (error) {
    return <Typography color="error">Error autenticando: {error.message}</Typography>;
  }

  if (!result) {
    // aún sin token
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
        <Typography>Cargando autenticación…</Typography>
      </Box>
    );
  }

  // token obtenido, renderiza hijos
  return children;
}
