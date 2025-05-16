import { useEffect, useState } from 'react';

const AGENTS_ENDPOINT = 'https://prod-24.eastus.logic.azure.com:443/workflows/7893ff7bbaaf4123b2b63e9227f4f1b0/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=ytsab_YPOakwe1aWGFoBty8yHrf3BHk5aSJOaSTrFqk';

export const useAgents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(AGENTS_ENDPOINT)
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar agentes');
        return res.json();
      })
      .then(data => {
        const results = data['ResultSets']['Table1'] || [];
        const formattedAgents = results.map(agent => ({
          id: agent.agent_id,
          name: agent.name
        }));
        setAgents(formattedAgents);
        console.log(formattedAgents)
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { agents, loading, error };
};
