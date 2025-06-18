import { useEffect, useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const TicketsByAgentBarChart = () => {
  const [tickets, setTickets] = useState([]);
  const user = true;

  useEffect(() => {
    if (user) {
      fetch('https://prod-49.eastus.logic.azure.com:443/workflows/78c43496829e474abc793e946cb8464b/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=VECyw4EtDX7zMvY2aV9phII7VDII5qg7HocLSBgEMMc', {
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
      <BarChart data={tickets} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fontSize: 10, angle: -15 }} interval={0} />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="tickets_this_week" name="Tickets" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TicketsByAgentBarChart;
