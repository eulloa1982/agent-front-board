// src/hooks/useTicketsData.js
import { useState, useEffect } from 'react';

const useTicketsData = () => {
  const [tickets, setTickets] = useState([]);
  const [agents, setAgents] = useState([]);
  const [grouped, setGrouped] = useState({});
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchTickets = async (agent = '', startDate = '', endDate= '') => {
    setLoading(true);
    try {
      const res = await fetch('https://prod-28.eastus.logic.azure.com:443/workflows/46d2353e598441958df4ad2084441f66/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=s-5oxf1l_7H-lWk16mN7SmQieyVISxcIUg6X52_krR8', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agent: agent || null,
          startDate: startDate || null,
          endDate: endDate || null
        })
      });

      if (!res.ok) throw new Error('Error al recuperar tickets');

      const data = await res.json();
      const results = data['ResultSets'] ? data['ResultSets']['Table1'] : data;

      setTickets(results);

      // Agrupar por agente
      const groupedData = results.reduce((acc, curr) => {
        const { agent_id, agent_name, status, tickets_this_week } = curr;
        if (!acc[agent_id]) {
          acc[agent_id] = { agent_name, statuses: {} };
        }
        acc[agent_id].statuses[status] = tickets_this_week;
        return acc;
      }, {});
      setGrouped(groupedData);

      // Calcular total
      const totalCount = results.reduce((sum, r) => sum + r.tickets_this_week, 0);
      setTotal(totalCount);

      // Extraer agentes únicos
      const uniqueAgents = [...new Map(results.map(item => [item.agent_id, { id: item.agent_id, name: item.agent_name }])).values()];
      setAgents(uniqueAgents);
    } catch (error) {
      console.error('Error al cargar tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets(); // Carga inicial
  }, []);

  return { tickets, agents, grouped, total, loading, fetchTickets };
};

export default useTicketsData;
