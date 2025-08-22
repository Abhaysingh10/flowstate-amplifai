export const mockCompanies = Array.from({ length: 24 }).map((_, idx) => {
  const names = [
    'Global Tech Solutions', 'Tech Innovation Corp', 'NexGen Innovations',
    'Synergy Solutions', 'Vertex Global Services', 'Nordic Systems AB',
    'Quantum Computing Inc', 'Pinnacle Systems', 'Pacific Solutions Ltd',
    'Innovatech Dynamics', 'Technosphere Groups', 'BluePeak Analytics',
  ];
  const ceos = ['Nichol James','Alex Morgan','Jordan Lee','Martin Luthar','Jatin Mehta','Jay Dublin'];
  const revenue = Math.floor(Math.random()*400+60);
  const profit = Math.floor(Math.random()*80-10);
  const ebitda = Math.floor(Math.random()*60+2);
  const margin = Math.random()*30;
  return {
    id: idx+1,
    name: names[idx % names.length],
    ceo: ceos[idx % ceos.length],
    revenue: `€${revenue}M`,
    profit: `${profit >= 0 ? '+' : ''}€${profit}M`,
    ebitda: `+€${ebitda}M`,
    margin: `${margin.toFixed(1)}%`,
    insights: ['Strong Growth','High Profitability','Good Growth','Market Leader','Reliable Returns']
      .slice(0, (idx % 3) + 2),
  };
});




