import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  IconButton,
  Tooltip,Typography
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import TimelineIcon from '@mui/icons-material/Timeline';
import SettingsIcon from '@mui/icons-material/Settings';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const miniWidth = 60;
const expandedWidth = 490;

const menuItems = [
  { icon: <DashboardIcon />, text: 'Dashboard' },
  { icon: <PeopleIcon />, text: 'Agents' },
  { icon: <CategoryIcon />, text: 'Categories' },
  { icon: <TimelineIcon />, text: 'Reports' },
  { icon: <SettingsIcon />, text: 'Settings' },
];

const SideMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mini Drawer (fijo) */}
      <Box
        sx={{
          width: miniWidth,
          backgroundColor: '#f0f0f0',
          borderRight: '1px solid #ccc',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: 2,
          height: '100vh',
        }}
      >
        <List>
          {menuItems.map((item, index) => (
            <Tooltip title={item.text} placement="right" key={index}>
              <ListItem button onClick={() => setOpen(true)}>
                <ListItemIcon sx={{ minWidth: 0 }}>{item.icon}</ListItemIcon>
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Box>

      {/* Expanded Drawer (colapsable) */}
      {open && (
        <Box
          sx={{
            width: expandedWidth,
            overflow: 'hidden',
            transition: 'width 0.3s ease',
            borderRight: '1px solid #ccc',
            backgroundColor: '#fafafa',
            height: '100vh',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
            <IconButton onClick={() => setOpen(false)}>
              <ChevronLeftIcon />
            </IconButton>
          </Box>
          <List>
            {menuItems.map((item, index) => (
              <ListItem button key={index}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <Typography variant="caption" gutterBottom sx={{m:0}}>{item.text} </Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </>
  );
};

export default SideMenu;
