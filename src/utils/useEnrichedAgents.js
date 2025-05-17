// utils/useEnrichedAgents.js
import { useEffect, useState } from 'react';
import { useGraphToken } from './useGraphToken';

const LOGIC_APP_URL = 'https://prod-93.eastus.logic.azure.com:443/workflows/ff86d55fd06247718eb18d676e4e14a7/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=MLRAda9VPX1_7F81diahvx-VzTeI4minZWXOADT-Tlg';
const GRAPH_BATCH_ENDPOINT = 'https://graph.microsoft.com/v1.0/$batch';

function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export const useEnrichedAgents = () => {
  const token = useGraphToken();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //const photosFetched = useRef(false);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await fetch(LOGIC_APP_URL, { method: 'POST' });
        if (!res.ok) throw new Error('Error fetching agents from SQL');
        const data = await res.json();
        const list = data.ResultSets?.Table1 || data.agents || [];

        const unique = new Map();
        list.forEach(a => {
          if (!unique.has(a.email)) {
            unique.set(a.email, {
              id: a.agent_id,
              name: a.name,
              email: a.email,
              disabled: a.disabled_agent,
              is_supervisor: a.isSupervisor,
              socials: a.socials || {},
              categories: a.category_name ? [a.category_name] : []
            });
          } else if (a.category_name) {
            const agent = unique.get(a.email);
            if (!agent.categories.includes(a.category_name)) {
              agent.categories.push(a.category_name);
            }
          }
        });

        const agents = Array.from(unique.values());
        console.log("Agents from sql", agents)
        const chunks = chunkArray(agents, 15);

       const batchResponses = await Promise.all(
        chunks.map((group, groupIndex) => {
            const requests = group.map((ag, i) => ({
            id: `${groupIndex}-${i}`,
            method: 'GET',
            url:
                `/users/${encodeURIComponent(ag.email)}?` +
                '$select=' +
                [
                'displayName','givenName','surname','mail','userPrincipalName',
                'jobTitle','department','officeLocation','mobilePhone',
                'businessPhones','preferredLanguage','employeeId'
                ].join(',') +
                '&$expand=manager($select=displayName,mail)'
            }));

            return fetch(GRAPH_BATCH_ENDPOINT, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ requests })
            }).then(async res => {
            const json = await res.json();
            if (!res.ok) throw new Error(JSON.stringify(json));
            console.log(`📦 Batch #${groupIndex + 1} response:`, json); // 👈 Aquí haces el log de cada batch
            return json;
            });
        })
        );

        const map = {};
        batchResponses.forEach(batch => {
          batch.responses.forEach(r => {
            if (r.status === 200 && r.body.mail) {
              map[r.body.mail.toLowerCase()] = r.body;
            }
          });
        });

        const enriched = agents.map(ag => {
          const user = map[ag.email.toLowerCase()] || {};
          return {
            ...ag,
            name: user.displayName || ag.name,
            role: user.jobTitle || '—',
            phone: user.businessPhones?.[0] || user.mobilePhone || '—',
            department: user.department || '—',
            officeLocation: user.officeLocation || '—',
            preferredLanguage: user.preferredLanguage || '—',
            employeeId: user.employeeId || '—',
            manager: user.manager?.displayName || '—',
            avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || ag.name)}&background=0D8ABC&color=fff`,
            photoUrl: null
          };
        });

        setProfiles(enriched);
        console.log("Agents all profile", enriched)
        // Fetch photos once
        const photoResults = await Promise.all(
          enriched.map((p, idx) =>
            fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(p.email)}/photo/$value`, {
              headers: { Authorization: `Bearer ${token}` }
            })
              .then(res => res.ok ? res.blob() : Promise.reject())
              .then(blob => URL.createObjectURL(blob))
              .then(url => ({ idx, url }))
              .catch(() => null)
          )
        );

        const updated = [...enriched];
        photoResults.forEach(r => { if (r) updated[r.idx].photoUrl = r.url; });
        setProfiles(updated);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchAgents();
  }, [token]);

  return { profiles, loading, error };
};
