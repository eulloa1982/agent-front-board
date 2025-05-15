import { useEffect, useState } from 'react';
import { Grid, Badge, Typography, Box, Divider } from '@mui/material';

const COLORS = {
  New: '#15A4FF',
  Open: '#FFC26A',
  'In Progress': '#38D3BA',
  Resolved: '#FF6692'
};

const StatusPieChart = () => {
  const [tickets, setTickets] = useState([]);
  const [grouped, setGrouped] = useState({});
  const [total, setTotal] = useState(0);
  const user = true;

  useEffect(() => {
    if (user) {
      fetch('https://prod-28.eastus.logic.azure.com:443/workflows/46d2353e598441958df4ad2084441f66/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=s-5oxf1l_7H-lWk16mN7SmQieyVISxcIUg6X52_krR8', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail: 'm' })
      })
        .then(res => {
          if (!res.ok) throw new Error('Error al recuperar tickets');
          return res.json();
        })
        .then(data => {
          const results = data['ResultSets']['Table1'] || [];
          setTickets(results);

          // Agrupar por agente
          const groupedData = results.reduce((acc, curr) => {
            const { agent_id, agent_name, status, tickets_this_week } = curr;
            if (!acc[agent_id]) {
              acc[agent_id] = {
                agent_name,
                statuses: {}
              };
            }
            acc[agent_id].statuses[status] = tickets_this_week;
            return acc;
          }, {});
          setGrouped(groupedData);
          
          // Calcular total
          const totalCount = results.reduce((sum, r) => sum + r.tickets_this_week, 0);
          setTotal(totalCount);
        })
        .catch(err => {
          console.error('Error al cargar tickets:', err);
        });
    }
  }, [user]);
  console.log(tickets)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} >
        <Grid size={12} height='80%'>
          <Typography variant="h6" gutterBottom>Total tickets esta semana: {total}</Typography>
          <Divider sx={{ mb: 2 }} />
        </Grid>
        
      {Object.entries(grouped).map(([agentId, agentData]) => (
        <Grid size={3} height='80%' >
          <Typography variant="caption" gutterBottom sx={{ display: 'block' }}>{agentData.agent_name}</Typography>
          
            {Object.entries(agentData.statuses).map(([status, count]) => (
              <>
                <Badge
                  badgeContent={count}
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: COLORS[status] || '#999',
                      color: 'white',
                    }
                  }}
                >
                  
                </Badge>
                 <Typography variant="caption" gutterBottom sx={{m:2}}>{status}</Typography>
              </>
            ))}
          <Divider sx={{ mb: 2 }} /></Grid>
      ))}
      </Grid>
    </Box>
  );
};

export default StatusPieChart;