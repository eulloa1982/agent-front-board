// src/components/AgentsPage.jsx
import React, { useEffect, useState } from 'react';
import { useGraphToken } from '../utils/useGraphToken';
import {
  Grid, Card, CardHeader, CardContent, Avatar,
  Typography, IconButton, Box, CircularProgress
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Facebook as FacebookIcon
} from '@mui/icons-material';

const GRAPH_BATCH_ENDPOINT = 'https://graph.microsoft.com/v1.0/$batch';
// Reemplaza con tu URL de Logic App
const LOGIC_APP_URL = 'https://prod-93.eastus.logic.azure.com:443/workflows/ff86d55fd06247718eb18d676e4e14a7/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=MLRAda9VPX1_7F81diahvx-VzTeI4minZWXOADT-Tlg';

export default function AgentsPage() {
  const token = useGraphToken();              // 1. Hook que te da el accessToken o null
  const [agents, setAgents] = useState([]);   // agentes mínimos desde SQL
  const [profiles, setProfiles] = useState([]);// perfiles enriquecidos
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  // 2. Traer agentes desde Logic App
  useEffect(() => {
    fetch(LOGIC_APP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})                 // ajusta payload si tu Logic App lo necesita
    })
      .then(res => {
        if (!res.ok) throw new Error('Error cargando agentes de SQL');
        return res.json();
      })
      .then(data => {
        const list = data.ResultSets?.Table1 || data.agents || [];
        setAgents(list.map(a => ({
          id:     a.agent_id,
          name:   a.name,
          email:  a.email,
          socials: a.socials || {}
        })));
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // 3. Cuando tengamos token y lista de agentes, disparar batch Graph
  useEffect(() => {
    if (!token || agents.length === 0) return;
    setLoading(true);

    const batchRequests = agents.map((ag, i) => ({
      id: `${i}`,
      method: 'GET',
      url: `/users/${encodeURIComponent(ag.email)}?$select=displayName,jobTitle,mail,businessPhones,department`
    }));

    fetch(GRAPH_BATCH_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ requests: batchRequests })
    })
      .then(res => {
        if (!res.ok) throw new Error('Error en batch de Graph');
        return res.json();
      })
      .then(batch => {
        // Combina SQL + Graph
        const map = {};
        batch.responses.forEach(r => {
          if (r.status === 200) map[r.id] = r.body;
        });
        setProfiles(
          agents.map((ag, i) => {
            const prof = map[`${i}`] || {};
            return {
              id:    ag.id,
              name:  prof.displayName || ag.name,
              role:  prof.jobTitle    || '—',
              email: prof.mail        || ag.email,
              phone: prof.businessPhones?.[0] || '—',
              department: prof.department || '—',
              avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(prof.displayName||ag.name)}&background=0D8ABC&color=fff`,
              socials: ag.socials
            };
          })
        );
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [token, agents]);

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
        <Typography>Cargando agentes…</Typography>
      </Box>
    );
  }
  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  // 4. Renderiza las cards usando la misma estructura y estilos
  return (
    <Grid container spacing={3}>
      {profiles.map(agent => (
        <Grid item xs={12} sm={6} md={4} key={agent.id}>
          <Card sx={{ maxWidth: 345, m: 'auto', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardHeader
              avatar={
                <Avatar alt={agent.name} src={agent.avatarUrl} sx={{ width: 56, height: 56 }} />
              }
              title={<Typography variant="h6">{agent.name}</Typography>}
              subheader={<Typography variant="body2" color="text.secondary">{agent.role}</Typography>}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="body2" color="text.secondary">Información de contacto:</Typography>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <EmailIcon fontSize="small" sx={{ mr: 1 }} />{agent.email}
              </Typography>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                <PhoneIcon fontSize="small" sx={{ mr: 1 }} />{agent.phone}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <strong>Depto:</strong> {agent.department}
              </Typography>
            </CardContent>
            <Box sx={{ bgcolor: '#f5f5f5', p: 1, display: 'flex', justifyContent: 'center' }}>
              {agent.socials.linkedin && (
                <IconButton component="a" href={agent.socials.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn">
                  <LinkedInIcon />
                </IconButton>
              )}
              {agent.socials.twitter && (
                <IconButton component="a" href={agent.socials.twitter} target="_blank" rel="noopener" aria-label="Twitter">
                  <TwitterIcon />
                </IconButton>
              )}
              {agent.socials.facebook && (
                <IconButton component="a" href={agent.socials.facebook} target="_blank" rel="noopener" aria-label="Facebook">
                  <FacebookIcon />
                </IconButton>
              )}
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
