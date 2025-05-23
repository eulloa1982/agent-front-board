import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#00A1FF','#00CEB6'];

const CategoryPieChart = () => {
  const [tickets, setTickets] = useState([]);
  const user = true;
  
    useEffect(() => {
        if (user) {
          //setLoadingTickets(true);
    
          fetch('https://prod-10.eastus.logic.azure.com:443/workflows/8e35d20503bd42699706174ee8524622/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=AZrMN93T6s2vNY5OjObEbyNW2IR2Sfp_7tsaudTz4jI', {
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
    <ResponsiveContainer width="100%" height="100%" aspect={950 / 350}>
      <PieChart margin={{
          top: 150,
          right: 10,
          left: 0,
          bottom: 0,
        }}>
        <Pie
          data={tickets}
          dataKey="tickets_this_week"
          nameKey="ticket_source"
          startAngle={180}
          endAngle={0}
          cx="50%"
          cy="50%"
          outerRadius={140}
          paddingAngle={5}
          label
        >
          {tickets.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend layout='vertical' align='right' verticalAlign='top' iconSize={10} iconType='circle'/>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CategoryPieChart;
