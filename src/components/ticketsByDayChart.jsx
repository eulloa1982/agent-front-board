import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,LabelList } from 'recharts';

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

  const renderCustomizedLabel = (props) => {
    const { x, y, width, value } = props;
    const radius = 15;

    return (
      <g>
        <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" />
        <text x={x + width / 2} y={y - radius} fill="#fff" textAnchor="middle" dominantBaseline="middle" fontSize={10}>
          {value.split(' ').map(p => p[0].toUpperCase()).join('')}
        </text>
      </g>
    );
  };


  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={tickets} 
          height={300}
            margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={ false }/>
        <YAxis allowDecimals={false} tick={ false } />
        <Tooltip />
        <Bar dataKey="tickets_this_week" fill="#00bcd4" maxPointSize={5}>
          <LabelList dataKey="name" content={renderCustomizedLabel} />
          <LabelList dataKey="tickets_this_week" position="insideTop" fill="#fff" fontSize={10} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TicketsByDayBarChart;
