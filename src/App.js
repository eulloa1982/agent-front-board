import React, { useState, useEffect } from 'react';
import { CssBaseline, CircularProgress, Button, Box } from '@mui/material';
import { useMsal } from '@azure/msal-react';
import DashboardLayout from './components/dashboardLayout';
import DashboardPage from './components/dashboardPage';
import MsalProviderWrapper from './utils/msalProviderWrapper'; // Importar el wrapper
import SideMenu from './components/sideMenu';
// Componente para gestionar la autenticación
const AuthComponent = ({ setAuthenticated }) => {
  const { instance, accounts } = useMsal();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (accounts.length > 0) {
      setAuthenticated(true);  // Usuario autenticado
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [accounts, setAuthenticated]);

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
      {accounts.length > 0 ? (
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
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <SideMenu />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DashboardLayout>
        <DashboardPage />
        </DashboardLayout>
      </Box>
    </Box>
  );
};

export default App;

/*

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  return (
   
    <MsalProviderWrapper>
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <CssBaseline />
        <DashboardLayout>
          <DashboardPage />
          
        </DashboardLayout>
      </Box>
       </MsalProviderWrapper>
    
  );
};
 {/*<MsalProviderWrapper>



      <CssBaseline />
      <DashboardLayout>
       
        {!authenticated ? (
          <AuthComponent setAuthenticated={setAuthenticated} />
        ) : (
          // Mostrar el Dashboard solo si el usuario está autenticado
          <DashboardPage />
        )}
      </DashboardLayout>
      </MsalProviderWrapper>
*/