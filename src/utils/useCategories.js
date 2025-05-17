import { useEffect, useState } from 'react';

const CATEGORIES_ENDPOINT = 'https://prod-88.eastus.logic.azure.com:443/workflows/0ea937fbe8094a91be463e949f38c20b/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=sV94AzLSJh904spmSIjX4Q9-PVbbPCzlHpA0LIQV8EE';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(CATEGORIES_ENDPOINT)
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar agentes');
        return res.json();
      })
      .then(data => {
        const results = data['ResultSets']['Table1'] || [];
        const formattedCategories = results.map(category => ({
          id: category.category_id,
          name: category.name,
          description: category.description
        }));
        setCategories(formattedCategories);
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { categories, setCategories, loading, error };
};
