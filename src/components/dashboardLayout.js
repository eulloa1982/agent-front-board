// src/components/layouts/DashboardLayout.js
import { Box } from '@mui/material';

const DashboardLayout = ({ children }) => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: '100%',
      }}
    >
      {children}
    </Box>
  );
};


export default DashboardLayout;
