// src/components/StatusPieChart.jsx
import { Grid, Badge, Typography, Box, Divider, CardContent } from '@mui/material';

const COLORS = {
  New: '#15A4FF',
  Open: '#FFC26A',
  'In Progress': '#38D3BA',
  Resolved: '#FF6692',
  Closed: '#999999'
};


const StatusPieChart = ({ grouped, total, selectedAgent, startDate, endDate }) => {
  const filteredGrouped = selectedAgent
    ? { [selectedAgent]: grouped[selectedAgent] }
    : grouped;

  const isZoomed = !!selectedAgent;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={4} height='50%'>
          <Typography variant={isZoomed ? "h5" : "h6"} gutterBottom>
            Tickets from {startDate} to {endDate}
          </Typography>
          
        </Grid>
        <Grid size={12} height='50%'>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {Object.entries(filteredGrouped).map(([agentId, agentData]) => (
              <CardContent sx={{
                  backgroundColor: '#ffffff',
                  boxShadow: 'none',
                  borderRadius: 1,
                }}>
              <Box item xs={8} key={agentId}>
                <Typography
                  variant={isZoomed ? "subtitle1" : "caption"}
                  gutterBottom
                  sx={{ display: 'block', fontWeight: isZoomed ? 'bold' : 'normal' }}
                >
                  {agentData.agent_name}
                </Typography>

                {Object.entries(agentData.statuses).map(([status, count]) => (
                  <Grid size={6} key={status} display="flex" alignItems="center" mb={isZoomed ? 2 : 1}>
                    <Badge
                      badgeContent={count}
                      sx={{
                        '& .MuiBadge-badge': {
                          backgroundColor: COLORS[status] || '#999',
                          color: 'white',
                          marginRight: '8px',
                          fontSize: isZoomed ? '1rem' : '0.75rem',
                          height: isZoomed ? 28 : 20,
                          minWidth: isZoomed ? 28 : 20,
                        }
                      }}
                    />
                    <Typography
                      variant={isZoomed ? "body1" : "caption"}
                      sx={{ ml: 2 }}
                    >
                      {status}
                    </Typography>
                  </Grid>
                ))}

                <Divider sx={{ mb: 2 }} />
              </Box>
              </CardContent>
            ))}
            
          </Grid>
          
          
        </Grid>
        
      </Grid>
    </Box>
  );
};

export default StatusPieChart;
