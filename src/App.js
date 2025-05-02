// src/App.js
import React from 'react';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/dashboardLayout';
import DashboardPage from './components/dashboardPage';

const msalConfig = {
  auth: {
    clientId: 'TU_CLIENT_ID',
    authority: 'https://login.microsoftonline.com/TU_TENANT_ID',
    redirectUri: '/',
  },
};

const pca = new PublicClientApplication(msalConfig);

function App() {
  return (
    <MsalProvider instance={pca}>
      <Router>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
          </Routes>
        </DashboardLayout>
      </Router>
    </MsalProvider>
  );
}

export default App;
