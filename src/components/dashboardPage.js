// src/pages/DashboardPage.js
import React from 'react';
import { Box, Grid, Card, CardContent, Typography } from '@mui/material';
import TicketsByDayBarChart from './ticketsByDayChart';
import TicketsByAgentBarChart from './ticketsByAgentChart';
import CategoryPieChart from './categoryPieChart';
import StatusPieChart from './statusPieChart';

const DashboardPage = () => {
 
  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ flex: 2, p: 2 }}>
          {/* First Row */}
            {/* Pie Chart 1 */}
            <Grid>
              <Card  sx={{ width: 600, boxShadow: 6, borderRadius: 4, p: 1, m:0.5 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Tickets by source
                  </Typography>
                  <CategoryPieChart />
                </CardContent>
              </Card>
            </Grid>

            {/* Pie Chart 2 */}
            <Grid>
              <Card  sx={{ width: 600, boxShadow: 6, borderRadius: 4, p: 1, m:0.5 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Tickets by Agent
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
            <Card sx={{ width: 600, boxShadow: 6, borderRadius: 4, p: 1, m:0.5 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Tickets by Category
                </Typography>
                <TicketsByAgentBarChart />
              </CardContent>
            </Card>
          </Grid>

          {/* Bar Chart 2 */}
          <Grid item xs={12}>
            <Card sx={{ width: 600, boxShadow: 6, borderRadius: 4, p: 1, m:0.5 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Tickets by Status
                </Typography>
                <StatusPieChart />
              </CardContent>
            </Card>
          </Grid>
      </Box>
    
     
      
      
      
      
      {/* Aquí agregas tus gráficas y tablas */}

    </Box>
  );
};

export default DashboardPage;
