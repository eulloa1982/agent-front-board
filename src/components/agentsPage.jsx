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

// URL de tu Logic App
const LOGIC_APP_URL = 'https://prod-93.eastus.logic.azure.com:443/workflows/ff86d55fd06247718eb18d676e4e14a7/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=MLRAda9VPX1_7F81diahvx-VzTeI4minZWXOADT-Tlg';
const GRAPH_BATCH_ENDPOINT = 'https://graph.microsoft.com/v1.0/$batch';

// Helper para dividir en chunks
function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export default function AgentsPage() {
  const token = useGraphToken();
  const [agents, setAgents] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Traer agentes desde Logic App y deduplicar por email
  useEffect(() => {
    fetch(LOGIC_APP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    })
      .then(res => {
        if (!res.ok) throw new Error('Error cargando agentes de SQL');
        return res.json();
      })
      .then(data => {
        const list = data.ResultSets?.Table1 || data.agents || [];
        // Deduplicar por email
        const map = new Map();
        list.forEach(a => {
          if (!map.has(a.email)) {
            map.set(a.email, { id: a.agent_id, name: a.name, email: a.email, socials: a.socials || {} });
          }
        });
        setAgents(Array.from(map.values()));
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // 2. Cuando tengamos token y lista de agentes, llamar a Graph en batches
  useEffect(() => {
    if (!token || agents.length === 0) return;
    setLoading(true);

    const agentChunks = chunkArray(agents, 15);
    const fetches = agentChunks.map((chunk, idx) => {
      const requests = chunk.map((ag, i) => ({
        id: `${idx}-${i}`,
        method: 'GET',
        url: `/users/${encodeURIComponent(ag.email)}?$select=displayName,jobTitle,mail,businessPhones,department`
      }));
      return fetch(GRAPH_BATCH_ENDPOINT, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ requests })
      })
        .then(res => {
          if (!res.ok) return res.text().then(text => { throw new Error(text); });
          return res.json();
        });
    });

    Promise.all(fetches)
      .then(results => {
        const map = {};
        results.forEach(batch => {
          batch.responses.forEach(r => {
            if (r.status === 200) {
              const user = r.body;
              if (user.mail) map[user.mail.toLowerCase()] = user;
            }
          });
        });
        setProfiles(
          agents.map(ag => {
            const prof = map[ag.email.toLowerCase()] || {};
            return {
              id: ag.id,
              name: prof.displayName || ag.name,
              role: prof.jobTitle || '—',
              email: prof.mail || ag.email,
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

  // 3. Renderizar cards
  return (
    <Grid container spacing={3}>
      {profiles.map(agent => (
        <Grid item xs={12} sm={6} md={4} key={agent.id}>
          <Card sx={{ maxWidth: 345, m: 'auto', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardHeader
              avatar={<Avatar alt={agent.name} src={agent.avatarUrl} sx={{ width: 56, height: 56 }} />}
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
              <Typography variant="body2" sx={{ mt: 1 }}><strong>Depto:</strong> {agent.department}</Typography>
            </CardContent>
            <Box sx={{ bgcolor: '#f5f5f5', p: 1, display: 'flex', justifyContent: 'center' }}>
              {agent.socials.linkedin && (<IconButton component="a" href={agent.socials.linkedin} target="_blank" rel="noopener"><LinkedInIcon/></IconButton>)}
              {agent.socials.twitter  && (<IconButton component="a" href={agent.socials.twitter}  target="_blank" rel="noopener"><TwitterIcon/></IconButton>)}
              {agent.socials.facebook && (<IconButton component="a" href={agent.socials.facebook} target="_blank" rel="noopener"><FacebookIcon/></IconButton>)}
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}





/*import React, { useEffect, useState } from 'react';
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

// URL de tu Logic App
const LOGIC_APP_URL = 'https://prod-93.eastus.logic.azure.com:443/workflows/ff86d55fd06247718eb18d676e4e14a7/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=MLRAda9VPX1_7F81diahvx-VzTeI4minZWXOADT-Tlg';
const GRAPH_BATCH_ENDPOINT = 'https://graph.microsoft.com/v1.0/$batch';

// Helper para dividir en chunks
function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export default function AgentsPage() {
  const token = useGraphToken();
  const [agents, setAgents] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Traer agentes desde Logic App
  useEffect(() => {
    fetch(LOGIC_APP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    })
      .then(res => {
        if (!res.ok) throw new Error('Error cargando agentes de SQL');
        return res.json();
      })
      .then(data => {
        const list = data.ResultSets?.Table1 || data.agents || [];
        setAgents(list.map(a => ({ id: a.agent_id, name: a.name, email: a.email, socials: a.socials || {} })));
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // 2. Cuando tengamos token y lista de agentes, llamar a Graph en batches
  useEffect(() => {
    if (!token || agents.length === 0) return;
    setLoading(true);

    const agentChunks = chunkArray(agents, 15); // batch de 15 para cumplir limits
    const fetches = agentChunks.map((chunk, idx) => {
      const requests = chunk.map((ag, i) => ({
        id: `${idx}-${i}`,
        method: 'GET',
        url: `/users/${encodeURIComponent(ag.email)}?$select=displayName,jobTitle,mail,businessPhones,department`
      }));
      return fetch(GRAPH_BATCH_ENDPOINT, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ requests })
      })
        .then(res => {
          if (!res.ok) return res.text().then(text => { throw new Error(text); });
          return res.json();
        });
    });

    Promise.all(fetches)
      .then(results => {
        const map = {};
        results.forEach(batch => {
          batch.responses.forEach(r => {
            if (r.status === 200) {
              const user = r.body;
              if (user.mail) map[user.mail.toLowerCase()] = user;
            }
          });
        });
        // merge
        setProfiles(
          agents.map(ag => {
            const prof = map[ag.email.toLowerCase()] || {};
            return {
              id: ag.id,
              name: prof.displayName || ag.name,
              role: prof.jobTitle || '—',
              email: prof.mail || ag.email,
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

  // 3. Renderizar cards
  return (
    <Grid container spacing={3}>
      {profiles.map(agent => (
        <Grid item xs={12} sm={6} md={4} key={agent.id}>
          <Card sx={{ maxWidth: 345, m: 'auto', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardHeader
              avatar={<Avatar alt={agent.name} src={agent.avatarUrl} sx={{ width: 56, height: 56 }} />}
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
              <Typography variant="body2" sx={{ mt: 1 }}><strong>Depto:</strong> {agent.department}</Typography>
            </CardContent>
            <Box sx={{ bgcolor: '#f5f5f5', p: 1, display: 'flex', justifyContent: 'center' }}>
              {agent.socials.linkedin && (<IconButton component="a" href={agent.socials.linkedin} target="_blank" rel="noopener"><LinkedInIcon/></IconButton>)}
              {agent.socials.twitter  && (<IconButton component="a" href={agent.socials.twitter}  target="_blank" rel="noopener"><TwitterIcon/></IconButton>)}
              {agent.socials.facebook && (<IconButton component="a" href={agent.socials.facebook} target="_blank" rel="noopener"><FacebookIcon/></IconButton>)}
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}*/
