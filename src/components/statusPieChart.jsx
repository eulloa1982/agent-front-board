import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Abiertos', value: 10 },
  { name: 'En Proceso', value: 5 },
  { name: 'Cerrados', value: 15 },
  { name: 'Reabiertos', value: 3 },
];

const COLORS = ['#4caf50', '#ff9800', '#9e9e9e', '#2196f3'];

const StatusPieChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={90}
          label
        >
          {data.map((entry, index) => (
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
