import React from 'react';

/**
 * EntityTable
 * - Displays entity-wise performance rows similar to the reference
 * - Uses demo rows with: name, revenue, profit, ebitda, cashflow, wc (days)
 * - Colors EBITDA delta green/red and adds direction icons
 */
const rows = [
  { name: 'NextGen Software Ltd.', revenue: '€68.3M', profit: '€8.1M', ebitda: '26.5%', cashflow: '€6.8M', wc: 52, positive: true },
  { name: 'Global Tech Solutions', revenue: '€62.6M', profit: '€6.3M', ebitda: '19.3%', cashflow: '€4.5M', wc: 76, positive: true },
  { name: 'Innovative Tech Solutions', revenue: '€54.6M', profit: '€5.3M', ebitda: '18.5%', cashflow: '€3.8M', wc: 45, positive: true },
  { name: 'Creative Design Group', revenue: '€36.5M', profit: '€4.1M', ebitda: '0.9%', cashflow: '€2.3M', wc: 88, positive: true },
  { name: 'Digital Dynamics Inc.', revenue: '€30.2M', profit: '€3.9M', ebitda: '3.9%', cashflow: '€1.9M', wc: 25, positive: false },
  { name: 'Helix Digital Innovations', revenue: '€22.3M', profit: '€0.3M', ebitda: '1.5%', cashflow: '€0.8M', wc: 36, positive: false },
];

const EntityTable = () => {
  return (
    <div className="bg-white rounded-3 border p-0 h-100 shadow-sm">
      <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
        <div className="fw-semibold"><i className="bi bi-table me-2" />Entity-wise Performance</div>
        <button className="btn btn-sm btn-light"><i className="bi bi-arrows-fullscreen" /></button>
      </div>
      <div className="table-responsive">
        <table className="table mb-0 companies-table">
          <thead className="table-light">
            <tr>
              <th>Company Name</th>
              <th>Revenue</th>
              <th>Net Profit</th>
              <th>EBITDA</th>
              <th>Cash Flow(€M)</th>
              <th>WC Cycle (Days)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name}>
                <td className="d-flex align-items-center gap-2"><i className="bi bi-building text-secondary" />{r.name}</td>
                <td>{r.revenue}</td>
                <td>{r.profit}</td>
                <td className={r.positive ? 'text-positive' : 'text-danger'}>
                  <i className={`bi me-1 ${r.positive ? 'bi-arrow-up-right' : 'bi-arrow-down-right'}`} />
                  {r.ebitda}
                </td>
                <td>{r.cashflow}</td>
                <td>{r.wc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EntityTable;
