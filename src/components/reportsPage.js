import { Grid, Box } from '@mui/material';
import TimePerAgentChart from './timePerAgentChart';


const ReportsPage = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        
                <TimePerAgentChart />
            
        

        
      </Grid>
    </Box>
  );
};

export default ReportsPage;
/*

        <Grid size={4}>
          <DashboardCard title="Tickets by Hour">
           
          </DashboardCard>
        </Grid>

        <Grid size={4}>
          <DashboardCard title="Tickets by Source">
            
          </DashboardCard>
        </Grid>

        <Grid size={4 }>
          <DashboardCard title="Tickets by Agent">
           
          </DashboardCard>
        </Grid>


        <Grid size={4}>
          <DashboardCard title="Tickets by Category">
            
          </DashboardCard>
        </Grid>
        */