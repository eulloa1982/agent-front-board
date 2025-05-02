import React, { useState, useEffect } from 'react';
import { CssBaseline, CircularProgress, Button } from '@mui/material';
import { useMsal } from '@azure/msal-react';
import DashboardLayout from './components/dashboardLayout';
import DashboardPage from './components/dashboardPage';
import MsalProviderWrapper from './utils/msalProviderWrapper'; // Importar el wrapper

// Componente para gestionar la autenticación
const AuthComponent = () => {
  const { instance, accounts } = useMsal();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (accounts.length > 0) {
      setAuthenticated(true);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [accounts]);

  const handleLogin = () => {
    instance.loginPopup().then((response) => {
      setAuthenticated(true);
    }).catch((error) => {
      console.error(error);
    });
  };

  const handleLogout = () => {
    instance.logoutPopup().then(() => {
      setAuthenticated(false);
    }).catch((error) => {
      console.error(error);
    });
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      {authenticated ? (
        <Button variant="contained" color="primary" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
      )}
    </>
  );
};

const App = () => {
  return (
    <MsalProviderWrapper>
      <CssBaseline />
      <DashboardLayout>
        <AuthComponent />
        <DashboardPage />
      </DashboardLayout>
    </MsalProviderWrapper>
  );
};

export default App;
