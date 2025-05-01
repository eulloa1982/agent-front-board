import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Lunes', tickets: 5 },
  { day: 'Martes', tickets: 8 },
  { day: 'Miércoles', tickets: 6 },
  { day: 'Jueves', tickets: 10 },
  { day: 'Viernes', tickets: 4 },
];

const TicketsByDayBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
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
