import React from 'react';

const insights = [
  {
    title: 'Monthly Variance Summaries',
    text: (
      <>
        <span className="insight-entity">Helix Digital Innovations</span> reported an 8% decline in profit this month, primarily driven by increased logistics expenses.
      </>
    ),
    icon: 'bi-graph-down',
  },
  {
    title: 'Recommended Actions',
    text: (
      <>
        Reduce payroll costs in <span className="insight-entity">Crestview Technologies</span> by 12% to improve efficiency.
      </>
    ),
    icon: 'bi-check2-circle',
  },
  {
    title: 'Market Trends',
    text: (
      <>
        <span className="insight-entity">Quantum Innovations LLC</span> has seen a 15% increase in customer demand, attributed to the launch of their new product line.
      </>
    ),
    icon: 'bi-activity',
  },
  {
    title: 'Future Projections',
    text: (
      <>
        Analysts predict a 10% growth in revenue for <span className="insight-entity">Helix Digital Innovations</span> next quarter, as new partnerships expand market reach.
      </>
    ),
    icon: 'bi-rocket-takeoff',
  },
];

const InsightsPanel = () => {
  return (
    <div className="insights-panel rounded-3 border p-0 h-100 shadow-sm">
      <div className="d-flex align-items-center justify-content-between p-3 border-bottom insights-panel-header">
        <div className="fw-semibold d-flex align-items-center gap-2 text-warning"><i className="bi bi-lightning-charge-fill" /> Insights</div>
        <button className="btn btn-sm btn-light"><i className="bi bi-arrows-fullscreen" /></button>
      </div>
      <div className="p-3">
        <ul className="list-unstyled mb-0">
          {insights.map((i) => (
            <li key={i.title} className="insight-item pb-3 mb-3">
              <div className="d-flex align-items-start gap-2 mb-1">
                <span className="insight-bullet"><i className={`bi ${i.icon}`} /></span>
                <div className="fw-medium">{i.title}</div>
              </div>
              <div className="small text-muted ms-4">
                {i.text}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InsightsPanel;
