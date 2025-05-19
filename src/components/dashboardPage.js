import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import TicketsByAgentBarChart from './ticketsByAgentChart';
import TicketsByDayBarChart from './ticketsByDayChart';
import CategoryPieChart from './categoryPieChart';
import StatusPieChart from './statusPieChart';
import TicketsCountByHour from './ticketsCOuntByHour';

const DashboardCard = ({ title, children }) => (
  <Card
    variant="outlined"
    sx={{
      backgroundColor: '#ffffff',
      boxShadow: 'none',
      borderRadius: 1,
      height: '100%'
    }}
  >
    <CardContent sx={{ height: 300 }}>
      <Typography variant="subtitle1"
        fontFamily="Inter, Roboto, sans-serif"
        fontWeight={500}
        fontSize={14}
        color="text.secondary">
          {title}
      </Typography>
       <Box sx={{ height: '100%' }}>{children}</Box>
    </CardContent>
  </Card>
);

const DashboardPage = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={8} height='50%'>
          <DashboardCard title="Tickets by Status">
            <StatusPieChart />
          </DashboardCard>
        </Grid>
        {/* Primera fila: 3 tarjetas */}
        <Grid size={4}>
          <DashboardCard title="Tickets by Hour">
            <TicketsCountByHour />
          </DashboardCard>
        </Grid>

        <Grid size={4}>
          <DashboardCard title="Tickets by Source">
            <CategoryPieChart />
          </DashboardCard>
        </Grid>

        <Grid size={4}>
          <DashboardCard title="Tickets by Agent">
            <TicketsByDayBarChart />
          </DashboardCard>
        </Grid>

        {/* Segunda fila: 2 tarjetas */}
        <Grid size={4}>
          <DashboardCard title="Tickets by Category">
            <TicketsByAgentBarChart />
          </DashboardCard>
        </Grid>

        
      </Grid>
    </Box>
  );
};

export default DashboardPage;
