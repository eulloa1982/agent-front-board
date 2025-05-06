import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/*const data = [
  { name: 'Abiertos', value: 10 },
  { name: 'En Proceso', value: 5 },
  { name: 'Cerrados', value: 15 },
  { name: 'Reabiertos', value: 3 },
];*/

const COLORS = ['#4caf50', '#ff9800', '#9e9e9e', '#2196f3'];

const StatusPieChart = () => {
  const [tickets, setTickets] = useState([]);
  const user = true;
  
    useEffect(() => {
        if (user) {
          //setLoadingTickets(true);
    
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
              setTickets(data['ResultSets']['Table1'] || []);
              //console.log(data['ResultSets']['Table1'])
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
      <PieChart>
        <Pie
          data={tickets}
          dataKey="status_this_week"
          nameKey="status"
          outerRadius={90}
          label
        >
          {tickets.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default StatusPieChart;
