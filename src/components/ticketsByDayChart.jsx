import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LabelList
} from 'recharts';

const TicketsByDayBarChart = () => {
  const [tickets, setTickets] = useState([]);
  const user = true;

  useEffect(() => {
    if (user) {
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
        })
        .catch(err => {
          console.error('Error al cargar tickets:', err);
        });
    }
  }, [user]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={tickets}
        layout="vertical"
        margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" allowDecimals={false} />
        <YAxis
          type="category"
          dataKey="name"
          width={100}
          tick={{ fontSize: 10, angle: -15 }}
          interval={0} 
        />
        <Tooltip />
        <Bar dataKey="tickets_this_week" fill="#00bcd4" barSize={20}>
          <LabelList dataKey="tickets_this_week" position="right" fontSize={12} fill="#333" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TicketsByDayBarChart;
