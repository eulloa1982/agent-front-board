// src/components/layouts/DashboardLayout.js
import React from 'react';
import { AppBar, Box, CssBaseline, Drawer, IconButton, Toolbar, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useMsal } from '@azure/msal-react';
import { styled } from '@mui/material/styles';

const drawerWidth = 240;

const Main = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: drawerWidth,
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const DashboardLayout = ({ children }) => {
  const { instance, accounts } = useMsal();
  const userEmail = accounts[0]?.username;

  const handleLogout = () => {
    instance.logoutRedirect();
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Ticket Dashboard
          </Typography>
          {userEmail && (
            <>
              <Typography variant="body1" sx={{ mr: 2 }}>
                {userEmail}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        {/* Agrega aquí links si usas navegación */}
      </Drawer>

      <Main>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
};

export default DashboardLayout;
