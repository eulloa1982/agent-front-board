import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';


const TicketsByAgentBarChart = () => {
  const [tickets, setTickets] = useState([]);
    const user = true;
  
    useEffect(() => {
        if (user) {
          //setLoadingTickets(true);
    
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
    <ResponsiveContainer >
      <BarChart data={tickets} width="100%" height="100%">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="tickets_this_week" fill="#3f51b5" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TicketsByAgentBarChart;
