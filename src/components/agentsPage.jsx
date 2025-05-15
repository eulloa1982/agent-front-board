import React from 'react';
import { Grid, Card, CardHeader, CardContent, Avatar, Typography, IconButton, Box } from '@mui/material';
import { Email as EmailIcon, Phone as PhoneIcon, LinkedIn as LinkedInIcon, Twitter as TwitterIcon, Facebook as FacebookIcon } from '@mui/icons-material';

// Ejemplo de datos de agentes
const agents = [
  {
    id: 1,
    name: 'Juan Pérez',
    role: 'Soporte Técnico',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    email: 'juan.perez@ejemplo.com',
    phone: '+1 555 123 456',
    socials: {
      linkedin: 'https://linkedin.com/in/juanperez',
      twitter: 'https://twitter.com/juanperez',
      facebook: 'https://facebook.com/juanperez'
    }
  },
  {
    id: 2,
    name: 'Ana Gómez',
    role: 'Desarrolladora',
    avatarUrl: 'https://i.pravatar.cc/150?img=2',
    email: 'ana.gomez@ejemplo.com',
    phone: '+1 555 987 654',
    socials: {
      linkedin: 'https://linkedin.com/in/anagomez',
      twitter: 'https://twitter.com/anagomez',
      facebook: 'https://facebook.com/anagomez'
    }
  },
  {
    id: 3,
    name: 'Carlos López',
    role: 'Gestor de Proyectos',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
    email: 'carlos.lopez@ejemplo.com',
    phone: '+1 555 246 810',
    socials: {
      linkedin: 'https://linkedin.com/in/carloslopez',
      twitter: 'https://twitter.com/carloslopez',
      facebook: 'https://facebook.com/carloslopez'
    }
  }
];

const AgentsPage = () => {
    return(
    <Grid container spacing={3}>
      {agents.map(agent => (
        <Grid item xs={12} sm={6} md={4} key={agent.id}>
          <Card sx={{ maxWidth: 345, m: 'auto', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardHeader
              avatar={
                <Avatar
                  alt={agent.name}
                  src={agent.avatarUrl}
                  sx={{ width: 56, height: 56 }}
                />
              }
              title={
                <Typography variant="h6">
                  {agent.name}
                </Typography>
              }
              subheader={
                <Typography variant="body2" color="text.secondary">
                  {agent.role}
                </Typography>
              }
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Información de contacto:
              </Typography>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <EmailIcon fontSize="small" sx={{ mr: 1 }} />
                {agent.email}
              </Typography>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                <PhoneIcon fontSize="small" sx={{ mr: 1 }} />
                {agent.phone}
              </Typography>
            </CardContent>
            {/* Footer para redes sociales */}
            <Box sx={{ bgcolor: '#f5f5f5', p: 1, display: 'flex', justifyContent: 'center' }}>
              {agent.socials.linkedin && (
                <IconButton
                  component="a"
                  href={agent.socials.linkedin}
                  target="_blank"
                  rel="noopener"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon />
                </IconButton>
              )}
              {agent.socials.twitter && (
                <IconButton
                  component="a"
                  href={agent.socials.twitter}
                  target="_blank"
                  rel="noopener"
                  aria-label="Twitter"
                >
                  <TwitterIcon />
                </IconButton>
              )}
              {agent.socials.facebook && (
                <IconButton
                  component="a"
                  href={agent.socials.facebook}
                  target="_blank"
                  rel="noopener"
                  aria-label="Facebook"
                >
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

export default AgentsPage;