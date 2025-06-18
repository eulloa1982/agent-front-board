import { useEffect, useState } from 'react';
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,AreaChart,Area
} from 'recharts';

const TicketsCountByHour = () => {
  const [tickets, setTickets] = useState([]);
  const user = true;

  useEffect(() => {
    if (user) {
      fetch('https://prod-22.eastus.logic.azure.com:443/workflows/743f00d9713a4d02b6b2f8fe76a2e8f3/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=uZnegIRs0tz6POF_7R0ZK9tiqd46PO9uKdsWCzGXEO4', {
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
     <ResponsiveContainer width="100%" height="100%" >
      <AreaChart
        data={tickets}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <XAxis dataKey="hour_of_day" tick={{ fontSize: 10 }}/>
        <YAxis  dataKey="ticket_count" tick={{ fontSize: 10 }} activeDot={{ r: 8 }}/>
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div style={{
                  background: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: 6,
                  padding: "8px 12px",
                  fontFamily: "Inter, Roboto, sans-serif",
                  fontSize: 13,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}>
          <div><strong>Hora:</strong> {label}:00</div>
          <div><strong>Tickets:</strong> {payload[0].value}</div>
        </div>
      );
    }
    return null;
  }}
/>

        <Area type="monotone" dataKey="ticket_count" stroke="#8884d8" fill="#8884d8" strokeWidth={2}/>
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default TicketsCountByHour;