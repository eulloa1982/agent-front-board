import { useState } from 'react';
import { Grid, Typography, Box, Divider, Select, MenuItem, Button, TextField, CircularProgress, Card, CardContent } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useAgents } from '../utils/useAgents';
import { DataGrid } from '@mui/x-data-grid';
import PowerAppsEmbed from './powerAppsEmbed';



const TimePerAgentChart = () => {
  const { agents, loading: loadingAgents, error } = useAgents();
  const [selectedAgent, setSelectedAgent] = useState('');
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(false);
  const [filtros, setFiltros] = useState(null);

 const aplicarFiltros = (agentId, from, to) => {
  setFiltros({
    agentId,
    dateFrom: from ? dayjs(from).format("YYYY-MM-DD") : null,
    dateTo: to ? dayjs(to).format("YYYY-MM-DD") : null
  });
};

const DashboardCard = ({ title, children, height = 400 }) => (
  <Card
    variant="outlined"
    sx={{
      backgroundColor: '#ffffff',
      boxShadow: 'none',
      borderRadius: 1,
      display: 'flex',
      flexDirection: 'column',
      height: height
    }}
  >
    <CardContent sx={{ flexGrow: 0 }}>
      <Typography
        variant="subtitle1"
        fontFamily="Inter, Roboto, sans-serif"
        fontWeight={500}
        fontSize={14}
        color="text.secondary"
      >
        {title}
      </Typography>
    </CardContent>
    <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
      {children}
    </Box>
  </Card>
);
  const fetchTickets = () => {
    if (!selectedAgent) return alert('Seleccione un agente');

    setLoadingTickets(true);

    fetch('https://prod-37.eastus.logic.azure.com:443/workflows/5a2b048bea804fb1a0668828ba1cfd4f/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=iJDFE3lHNwp8aLMtzOpHyjFWwGvz7dhdlPTLyZkfyeA', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        agent_id: selectedAgent, 
        date_from: dateFrom ? dayjs(dateFrom).format('YYYY-MM-DD') : null, 
        date_to: dateTo ? dayjs(dateTo).format('YYYY-MM-DD') : null 
      })
    })
      .then(res => res.json())
      .then(data => {
        const results = data['ResultSets']['Table1'] || [];
        const formattedTickets = results.map((ticket, index) => ({
          id: index, // O usar ticket.ticket_id si es único
          ticket_id: ticket.ticket_id,
          ticket_title: ticket.ticket_title,
          total_time: ticket.total_time
        }));
        setTickets(formattedTickets);
        aplicarFiltros(selectedAgent,dateFrom,dateTo)
      })
      .catch(err => console.error('Error al cargar tickets:', err))
      .finally(() => setLoadingTickets(false));
  };

  const columns = [
    { field: 'ticket_id', headerName: 'Ticket ID', flex: 1 },
    { field: 'ticket_title', headerName: 'Título', flex: 2 },
    { 
      field: 'total_time', 
      headerName: 'Tiempo Total', 
      flex: 1,
      valueGetter: (params) => {
        const total = params || 0;
        const hours = Math.floor(total / 60);
        const minutes = total % 60;
        return `${hours}:${minutes.toString().padStart(2, '0')} hs`;
      }
    },
  ];

  return (
    <>
     <Grid size={4} item xs={8}>
        <DashboardCard title="Work Time per Agent (Tickets Closed and Resolved)" height={900}>
            <Box sx={{ flexGrow: 1, p: 2 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={3}>
                    {loadingAgents ? (
                        <CircularProgress size={24} />
                    ) : (
                        <Select
                        fullWidth
                        value={selectedAgent}
                        onChange={(e) => setSelectedAgent(e.target.value)}
                        displayEmpty
                        >
                        <MenuItem value="" disabled>Pick an agent</MenuItem>
                        {agents.map(agent => (
                            <MenuItem key={agent.id} value={agent.id}>{agent.name}</MenuItem>
                        ))}
                        </Select>
                    )}
                    {error && <Typography color="error">There is something wrong loading the agents</Typography>}
                    </Grid>
                    <Grid item xs={3}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                            label="Desde"
                            value={dateFrom}
                            onChange={setDateFrom}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </LocalizationProvider>
                        </Grid>
                    <Grid item xs={3}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                            label="Hasta"
                            value={dateTo}
                            onChange={setDateTo}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" color="primary" fullWidth onClick={fetchTickets}>
                            Buscar
                        </Button>
                    </Grid>
                </Grid>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ height: { xs: 400, md: 600 }, width: '100%' }}>
                <DataGrid
                rows={tickets}
                    columns={columns}
                    loading={loadingTickets}
                    pageSize={10}
                    rowsPerPageOptions={[5]}
                    disableColumnMenu
                    disableSelectionOnClick
                />
            </Box>
            
            
            </Box>
        </DashboardCard>
    </Grid>

    <Grid size={8} item xs={8}>
        <DashboardCard title="Not resolved tickets" height={900}>
            {filtros && <PowerAppsEmbed filtros={filtros} />}

        </DashboardCard>
    </Grid>
    </>        
  );
};

export default TimePerAgentChart;
/*
<Grid item xs={4}>
        <DashboardCard title="Work Time per Agent" height={900}>
</DashboardCard>
    </Grid>

    <Grid item xs={8}>
        <DashboardCard title="Work Time per Agent" height={900}>
            <Box sx={{ flexGrow: 1, p: 2 }}>
                <Grid container spacing={2} alignItems="center">
                {filtros && <PowerAppsEmbed filtros={filtros} />}
                </Grid>
                </Box>
                </DashboardCard>
                </Grid>

</Grid>*/