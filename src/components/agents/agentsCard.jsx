import React from 'react';
import {
  Card, CardHeader, CardContent, Avatar, Typography, IconButton, Box
} from '@mui/material';
import {
  Email as EmailIcon, Phone as PhoneIcon,
  LinkedIn as LinkedInIcon, Twitter as TwitterIcon, Facebook as FacebookIcon
} from '@mui/icons-material';

export default function AgentCard({ agent }) {
  if (!agent) return null;

  return (
    <Card sx={{ mt: 2 }}>
      <CardHeader
        avatar={<Avatar src={agent.photoUrl || agent.avatarUrl} sx={{ width: 56, height: 56 }} />}
        title={<Typography variant="h6">{agent.name}</Typography>}
        subheader={<Typography color="text.secondary">{agent.role}</Typography>}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">Contacto:</Typography>
        <Typography sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <EmailIcon fontSize="small" sx={{ mr: 1 }} />{agent.email}
        </Typography>
        <Typography sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
          <PhoneIcon fontSize="small" sx={{ mr: 1 }} />{agent.phone}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}><strong>Ubicación:</strong> {agent.officeLocation}</Typography>
        <Typography variant="body2"><strong>Departamento:</strong> {agent.department}</Typography>
        <Typography variant="body2"><strong>Categorías:</strong> {agent.categories.join(', ')}</Typography>
        <Typography variant="body2"><strong>Manager:</strong> {agent.manager}</Typography>
        <Typography variant="body2"><strong>Empleado ID:</strong> {agent.employeeId}</Typography>
        <Typography variant="body2"><strong>Idioma:</strong> {agent.preferredLanguage}</Typography>
      </CardContent>
      <Box sx={{ bgcolor: '#f5f5f5', p: 1, display: 'flex', justifyContent: 'center' }}>
        {agent.socials.linkedin && <IconButton component="a" href={agent.socials.linkedin} target="_blank"><LinkedInIcon /></IconButton>}
        {agent.socials.twitter && <IconButton component="a" href={agent.socials.twitter} target="_blank"><TwitterIcon /></IconButton>}
        {agent.socials.facebook && <IconButton component="a" href={agent.socials.facebook} target="_blank"><FacebookIcon /></IconButton>}
      </Box>
    </Card>
  );
}
