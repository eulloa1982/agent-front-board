import React, { useState } from 'react';
import { Box, Typography, CircularProgress, Grid } from '@mui/material';
import { useEnrichedAgents } from '../utils/useEnrichedAgents';
import AgentTable from './agents/agentTable';
import AgentCard from './agents/agentsCard';

export default function AgentsPage() {
  const { profiles, loading, error } = useEnrichedAgents();
  const [selectedAgent, setSelectedAgent] = useState(null);

  if (loading) return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <CircularProgress />
      <Typography>Loading agents…</Typography>
    </Box>
  );
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Registered agents</Typography>
      <Grid container spacing={2}>
        <Grid size={6} height='50%'>
          <AgentTable rows={profiles} onSelect={setSelectedAgent} />
        </Grid>
        <Grid size={6} sx={{m:2}} height='50%'>
          <AgentCard agent={selectedAgent} />
        </Grid>
      </Grid>
    </Box>
  );
}




/*
import React, { useEffect, useState, useRef } from 'react';
import { useGraphToken } from '../utils/useGraphToken';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  IconButton,
  Box,
  CircularProgress
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Facebook as FacebookIcon
} from '@mui/icons-material';

// URL de tu Logic App
const LOGIC_APP_URL =
  'https://prod-93.eastus.logic.azure.com:443/workflows/ff86d55fd06247718eb18d676e4e14a7/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=MLRAda9VPX1_7F81diahvx-VzTeI4minZWXOADT-Tlg';
const GRAPH_BATCH_ENDPOINT = 'https://graph.microsoft.com/v1.0/$batch';

// Helper: divide array en chunks de tamaño dado
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
  const photosFetched = useRef(false);

  // 1. Obtener agentes desde SQL vía Logic App y deduplicar, acumulando categorías
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
        const unique = new Map();
        list.forEach(a => {
          if (!unique.has(a.email)) {
            unique.set(a.email, {
              id: a.agent_id,
              name: a.name,
              email: a.email,
              isSupervisor: a.isSupervisor,
              disabled_agent: a.disabled_agent,
              socials: a.socials || {},
              categories: a.category_name ? [a.category_name] : []
            });
          } else if (a.category_name) {
            const agent = unique.get(a.email);
            if (!agent.categories.includes(a.category_name)) {
              agent.categories.push(a.category_name);
            }
          }
        });
        setAgents(Array.from(unique.values()));
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // 2. Enriquecer con Graph en batches y campos adicionales
  useEffect(() => {
    if (!token || agents.length === 0) return;
    setLoading(true);
    const chunks = chunkArray(agents, 15);
    const batchCalls = chunks.map((group, groupIndex) => {
      const requests = group.map((ag, i) => ({
        id: `${groupIndex}-${i}`,
        method: 'GET',
        url:
          `/users/${encodeURIComponent(ag.email)}?` +
          '$select=' +
          [
            'displayName','givenName','surname','mail','userPrincipalName',
            'jobTitle','department','officeLocation','mobilePhone',
            'businessPhones','preferredLanguage','employeeId'
          ].join(',') +
          '&$expand=manager($select=displayName,mail)'
      }));
      return fetch(GRAPH_BATCH_ENDPOINT, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ requests })
      }).then(res => {
        if (!res.ok) return res.text().then(text => { throw new Error(text); });
        return res.json();
      });
    });
    Promise.all(batchCalls)
      .then(responses => {
        const map = {};
        responses.forEach(batch => batch.responses.forEach(r => {
          if (r.status === 200 && r.body.mail) {
            map[r.body.mail.toLowerCase()] = r.body;
          }
        }));
        const initialProfiles = agents.map(ag => {
          const user = map[ag.email.toLowerCase()] || {};
          return {
            ...ag,
            name: user.displayName || ag.name,
            role: user.jobTitle || '—',
            phone: user.businessPhones?.[0] || user.mobilePhone || '—',
            department: user.department || '—',
            officeLocation: user.officeLocation || '—',
            preferredLanguage: user.preferredLanguage || '—',
            employeeId: user.employeeId || '—',
            manager: user.manager?.displayName || '—',
            avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName||ag.name)}&background=0D8ABC&color=fff`,
            photoUrl: null
          };
        });
        setProfiles(initialProfiles);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [token, agents]);

  // 3. Cargar fotos una sola vez
  useEffect(() => {
    if (!token || profiles.length === 0 || photosFetched.current) return;
    photosFetched.current = true;
    const fetchPhotos = profiles.map((p, idx) =>
      fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(p.email)}/photo/$value`,{
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.ok? res.blob(): Promise.reject())
        .then(blob => URL.createObjectURL(blob))
        .then(url => ({ idx, url }))
        .catch(() => null)
    );
    Promise.all(fetchPhotos).then(results => {
      const updated = [...profiles];
      results.forEach(r => { if (r) updated[r.idx].photoUrl = r.url; });
      setProfiles(updated);
    });
  }, [token, profiles]);

  if (loading) return (
    <Box sx={{ textAlign:'center', mt:4 }}><CircularProgress/><Typography>Cargando agentes…</Typography></Box>
  );
  if (error) return <Typography color="error">Error: {error}</Typography>;

  // 4. Renderizar cards incluyendo categorías
  return (
    <Grid container spacing={3}>
      {profiles.map(agent => (
        <Grid size={4} item xs={12} sm={6} md={4} key={agent.id}>
          <Card sx={{ display:'flex', flexDirection:'column', height:'100%' }}>
            <CardHeader
              avatar={<Avatar src={agent.photoUrl||agent.avatarUrl} sx={{width:56,height:56}}/>}
              title={<Typography variant="h6">{agent.name}</Typography>}
              subheader={<Typography color="text.secondary">{agent.role}</Typography>}
            />
            <CardContent sx={{flexGrow:1}}>
              <Typography variant="body2" color="text.secondary">Data contact:</Typography>
              <Typography sx={{display:'flex',alignItems:'center',mt:1}}>
                <EmailIcon fontSize="small" sx={{mr:1}}/>{agent.email}
              </Typography>
              <Typography sx={{display:'flex',alignItems:'center',mt:0.5}}>
                <PhoneIcon fontSize="small" sx={{mr:1}}/>{agent.phone}
              </Typography>
              <Typography variant="body2" sx={{mt:1}}><strong>Location:</strong> {agent.officeLocation}</Typography>
              <Typography variant="body2"><strong>Department:</strong> {agent.department}</Typography>
              <Typography variant="body2"><strong>Tickets categories:</strong> {agent.categories.join(', ')}</Typography>
            </CardContent>
            <Box sx={{bgcolor:'#f5f5f5',p:1,display:'flex',justifyContent:'center'}}>
              {agent.socials.linkedin&&<IconButton component="a" href={agent.socials.linkedin} target="_blank"><LinkedInIcon/></IconButton>}
              {agent.socials.twitter &&<IconButton component="a" href={agent.socials.twitter}  target="_blank"><TwitterIcon/></IconButton>}
              {agent.socials.facebook&&<IconButton component="a" href={agent.socials.facebook} target="_blank"><FacebookIcon/></IconButton>}
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

*/
