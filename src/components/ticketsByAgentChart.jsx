import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Carlos', tickets: 12 },
  { name: 'Ana', tickets: 9 },
  { name: 'Luis', tickets: 15 },
  { name: 'Esteban', tickets: 7 },
];

const TicketsByAgentBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="tickets" fill="#3f51b5" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TicketsByAgentBarChart;
