import React, { useState, useEffect } from 'react';
import { CssBaseline, CircularProgress, Button, Box } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import DashboardLayout from './components/dashboardLayout';
import DashboardPage from './components/dashboardPage';
import MsalProviderWrapper from './utils/msalProviderWrapper';
import SideMenu from './components/sideMenu';
import AgentsPage from './components/agentsPage';
//import RequireAuth from './utils/requireAuth';
import ReportsPage from './components/reportsPage';
import Settings from './components/settings';
import useGroupValidation from './utils/useGroupsValidation';
// Componente para gestionar la autenticación
const AuthComponent = ({ setAuthenticated }) => {
  const { instance, accounts } = useMsal();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (accounts.length > 0) {
      setAuthenticated(true);
    }
    setLoading(false);
  }, [accounts, setAuthenticated]);

  const handleLogin = () => {
    instance.loginPopup()
      .then(() => setAuthenticated(true))
      .catch(error => console.error(error));
  };

  const handleLogout = () => {
    instance.logoutPopup()
      .then(() => setAuthenticated(false))
      .catch(error => console.error(error));
  };

  if (loading) return <CircularProgress />;

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
  const [authenticated, setAuthenticated] = useState(false);
const isInGroup = useGroupValidation();
console.log(isInGroup)
  return (
    <MsalProviderWrapper>
       <BrowserRouter>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <SideMenu />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DashboardLayout>
               {authenticated ? (
                <AuthComponent setAuthenticated={setAuthenticated} />
               ) : (
                <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                      <Route path="/agents" element={<AgentsPage />} />
                      <Route path="/reports" element={<ReportsPage />} />
                      <Route path="/status" element={<Settings />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
               )}
              
            </DashboardLayout>
          </Box>
        </Box>
      </BrowserRouter>
    </MsalProviderWrapper>
  );
};

export default App;


/*import React from 'react';
import { CssBaseline, Box } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useIsAuthenticated } from '@azure/msal-react';
import MsalProviderWrapper from './utils/msalProviderWrapper';
import SideMenu from './components/sideMenu';
import DashboardLayout from './components/dashboardLayout';
import DashboardPage from './components/dashboardPage';
import AgentsPage from './components/agentsPage';
import ReportsPage from './components/reportsPage';
import Settings from './components/settings';
import useGroupValidation from './utils/useGroupsValidation';

const AppContent = () => {
  const isAuthenticated = useIsAuthenticated();
  const isInGroup = useGroupValidation(); // esto retorna true o false

  if (!isAuthenticated || !isInGroup) {
    return (
      <Box
        sx={{
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 20,
        }}
      >
        No tienes acceso autorizado
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <SideMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/agents" element={<AgentsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/status" element={<Settings />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </DashboardLayout>
      </Box>
    </Box>
  );
};

const App = () => {
  return (
    <MsalProviderWrapper>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </MsalProviderWrapper>
  );
};

export default App;*/

