// src/pages/DashboardPage.jsx
import { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  MenuItem,
  Button
} from '@mui/material';
import useTicketsData from './hooks/useTicketsData';
import TicketsByAgentBarChart from './ticketsByAgentChart';
import TicketsByDayBarChart from './ticketsByDayChart';
import StatusPieChart from './statusPieChart';
import TicketsCountByHour from './ticketsCOuntByHour';


const DashboardCard = ({ title, children }) => (
  <Card
    variant="outlined"
    sx={{
      backgroundColor: '#ffffff',
      boxShadow: 'none',
      borderRadius: 1,
      height: '100%',
    }}
  >
    <CardContent sx={{ height: 300 }}>
      <Typography
        variant="subtitle1"
        fontFamily="Inter, Roboto, sans-serif"
        fontWeight={500}
        fontSize={14}
        color="text.secondary"
      >
        {title}
      </Typography>
      <Box sx={{ height: '100%' }}>{children}</Box>
    </CardContent>
  </Card>
);

const DashboardPage = () => {
  const { agents, fetchTickets, grouped, total, loading } = useTicketsData();
  const [selectedAgent, setSelectedAgent] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFilter = () => {
    fetchTickets(selectedAgent, startDate, endDate); // Traemos todo desde el backend
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      {/* Filtros globales */}
      <DashboardCard>
        <Grid container spacing={2} mb={2}>
        
          <Grid size={2} height='50%'>
            <Grid item xs={3}>
            <TextField
              select
              label="Agente"
              size="small"
              sx={{ width: '160px', ml: 2, mb: 2 }}

              value={selectedAgent}
              onChange={(e) => setSelectedAgent(e.target.value)}
            >
              <MenuItem value="">Todos</MenuItem>
              {agents.map((agent) => (
                <MenuItem key={agent.id} value={agent.id}>
                  {agent.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={2}>
            <TextField
              label="Fecha Inicio"
              type="date"
              size="small" 
              sx={{m:2}}
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              label="Fecha Fin"
              type="date"
              size="small" 
              sx={{m:2}}
              InputLabelProps={{ shrink: true }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Grid>

          <Grid item xs={3} display="flex" alignItems="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleFilter}
              disabled={loading}
            >
              {loading ? 'Cargando...' : 'Buscar'}
            </Button>
          </Grid>

        </Grid>
        
      

        {/* Gráficos */}
        <Grid size={8} height='50%'>
            <StatusPieChart
              grouped={grouped}
              total={total}
              selectedAgent={selectedAgent}
              startDate={startDate}
              endDate={endDate}
            />
        </Grid>
      </Grid>
      </DashboardCard>

     <Grid container spacing={2} mb={2} mt={2}>

        <Grid size={6}>
          <DashboardCard title="Tickets by Hour (Average in the week)">
            <TicketsCountByHour />
          </DashboardCard>
        </Grid>

        <Grid size={6}>
          <DashboardCard title="Tickets Created in the week">
            <TicketsByDayBarChart />
          </DashboardCard>
        </Grid>

        <Grid size={6}>
          <DashboardCard title="Tickets by Category">
            <TicketsByAgentBarChart />
          </DashboardCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;