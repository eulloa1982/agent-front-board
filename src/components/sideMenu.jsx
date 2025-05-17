// SideMenu.js
import React, { useState } from 'react';
import { Box, List, ListItemButton, ListItemIcon, Tooltip, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
//import CategoryIcon from '@mui/icons-material/Category';
import TimelineIcon from '@mui/icons-material/Timeline';
import SettingsIcon from '@mui/icons-material/Settings';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import IconButton from '@mui/material/IconButton';

const miniWidth = 60;
const expandedWidth = 240;

const menuItems = [
  { to: '/dashboard', icon: <DashboardIcon />, text: 'Dashboard' },
  { to: '/agents',    icon: <PeopleIcon />,    text: 'Agents'    },
  { to: '/reports',   icon: <TimelineIcon />,  text: 'Time Reports'   },
  { to: '/status',  icon: <SettingsIcon />,  text: 'Status'  },
];

const SideMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mini Drawer */}
      <Box
        sx={{
          width: miniWidth,
          bgcolor: '#f0f0f0',
          borderRight: 1, borderColor: 'divider',
          display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 2,
          height: '100vh'
        }}
      >
        <List>
          {menuItems.map(({ to, icon, text }) => (
            <Tooltip title={text} placement="right" key={to}>
              <ListItemButton
                component={NavLink}
                to={to}
                onClick={() => setOpen(true)}
                sx={{
                  justifyContent: 'center',
                  '&.active': { bgcolor: 'action.selected' }
                }}
              >
                <ListItemIcon sx={{ minWidth: 0 }}>{icon}</ListItemIcon>
              </ListItemButton>
            </Tooltip>
          ))}
        </List>
      </Box>

      {/* Expanded Drawer */}
      {open && (
        <Box
          sx={{
            width: expandedWidth,
            transition: 'width 0.3s',
            borderRight: 1, borderColor: 'divider',
            bgcolor: '#fafafa',
            height: '100vh'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
            <IconButton onClick={() => setOpen(false)}>
              <ChevronLeftIcon />
            </IconButton>
          </Box>
          <List>
            {menuItems.map(({ to, icon, text }) => (
              <ListItemButton
                component={NavLink}
                to={to}
                key={to}
                sx={{
                  '&.active': { bgcolor: 'action.selected' }
                }}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <Typography variant="body1">{text}</Typography>
              </ListItemButton>
            ))}
          </List>
        </Box>
      )}
    </>
  );
};

export default SideMenu;
