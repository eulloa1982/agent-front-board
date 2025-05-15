import { useEffect, useState } from 'react';
import { ResponsiveContainer,Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';


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
      <RadarChart cx="50%" cy="50%" outerRadius="90%" innerRadius="10%" data={tickets}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" tick={{ fontSize: 10 }}/>
          <PolarRadiusAxis />
          <Radar name="Mike" dataKey="tickets_this_week" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
    </ResponsiveContainer>
  );
};

export default TicketsByAgentBarChart;