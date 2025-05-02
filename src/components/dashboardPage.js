// src/pages/DashboardPage.js
import React from 'react';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { Navigate } from 'react-router-dom';
import { Box, Grid, Card, CardContent, Typography } from '@mui/material';
import TicketsByDayBarChart from './ticketsByDayChart';
import TicketsByAgentBarChart from './ticketsByAgentChart';
import CategoryPieChart from './categoryPieChart';
import StatusPieChart from './statusPieChart';

const DashboardPage = () => {
  const isAuthenticated = useIsAuthenticated();
  const { accounts } = useMsal();
  const userEmail = accounts[0]?.username;

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ flex: 2, p: 2 }}>
          {/* First Row */}
            {/* Pie Chart 1 */}
            <Grid>
              <Card  sx={{ width: 500, boxShadow: 6, borderRadius: 4, p: 2, m:1 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Tickets por estado
                  </Typography>
                  <CategoryPieChart />
                </CardContent>
              </Card>
            </Grid>

            {/* Pie Chart 2 */}
            <Grid>
              <Card  sx={{ width: 500, boxShadow: 6, borderRadius: 4, p: 2, m:1 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Tickets por prioridad
                  </Typography>
                  <TicketsByDayBarChart />
                </CardContent>
              </Card>
            </Grid>
      </Box>

      {/* Second Row */}
      <Box sx={{ flex: 2, p: 2 }}>
          {/* Bar Chart 1 */}
          <Grid item xs={12}>
            <Card sx={{ width: 500, boxShadow: 6, borderRadius: 4, p: 2, m:1 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Tickets por agente
                </Typography>
                <TicketsByAgentBarChart />
              </CardContent>
            </Card>
          </Grid>

          {/* Bar Chart 2 */}
          <Grid item xs={12}>
            <Card sx={{ width: 500, boxShadow: 6, borderRadius: 4, p: 2, m:1 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Tickets por día
                </Typography>
                <StatusPieChart />
              </CardContent>
            </Card>
          </Grid>
      </Box>
    
      <Typography variant="h4" gutterBottom>
        Bienvenido al Dashboard
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Usuario: {userEmail}
      </Typography>
      
      
      
      
      {/* Aquí agregas tus gráficas y tablas */}

    </Box>
  );
};

export default DashboardPage;
