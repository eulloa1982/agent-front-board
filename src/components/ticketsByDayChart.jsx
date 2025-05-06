import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const TicketsByDayBarChart = () => {
  const [tickets, setTickets] = useState([]);
  const user = true;

  useEffect(() => {
      if (user) {
        //setLoadingTickets(true);
  
        fetch('https://prod-63.eastus.logic.azure.com:443/workflows/7ec5684d805c4c208db79a05a798cf93/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=PJk3255iAvyyosuLId88xTWcmoYD1WrhMZP4K8iJFm4', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userEmail: 'm' })
        })
          .then(res => {
            if (!res.ok) throw new Error('Error al recuperar tickets');
            return res.json();
          })
          .then(data => {
            setTickets(data['ResultSets']['Table1'] || []);
            console.log(data)
            //setLoadingTickets(false);
          })
          .catch(err => {
            console.error('Error al cargar tickets:', err);
            //setErrorTickets(err);
            //setLoadingTickets(false);
          });
      }
    }, [user]);




  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={tickets} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="tickets" fill="#00bcd4" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TicketsByDayBarChart;
