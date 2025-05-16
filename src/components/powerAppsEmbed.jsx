function PowerAppsEmbed({ filtros }) {
  const powerAppsBaseUrl = "https://apps.powerapps.com/play/e/2e0edf08-9e29-eca4-a427-aa5232d0cf0b/a/04738810-15f3-4da1-9050-ae172b6140ad?tenantId=7313ad10-b885-4b50-9c75-9dbbd975618f&hint=f21cbe4a-9acf-49d9-a1d4-91f1e71477a6&sourcetime=1747404776053&screen=details"; // Reemplaza esto

  const params = new URLSearchParams({
    agent: filtros.agentId,
    from: filtros.dateFrom,
    to: filtros.dateTo,
  });

  const iframeUrl = `${powerAppsBaseUrl}&${params.toString()}`;

  return (
    <iframe
      src={iframeUrl}
      width="100%"
      height="800px"
      allowFullScreen
      title="PowerApps"
    />
  );
}

export default PowerAppsEmbed;
