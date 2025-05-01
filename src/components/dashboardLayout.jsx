// src/components/layouts/DashboardLayout.js
import React from 'react';
import { Box, CssBaseline, AppBar, Toolbar, Typography, Drawer } from '@mui/material';
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
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Ticket Dashboard
          </Typography>
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
        {/* Aquí podrías añadir navegación */}
      </Drawer>

      <Main>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
};

export default DashboardLayout;
