import React from 'react';

/**
 * MetricCard
 * - Displays a KPI tile with title, primary value, and delta indicator
 * - Props:
 *   - title: string label for the metric
 *   - value: formatted metric value (e.g., "€24.5B")
 *   - delta: change text (e.g., "+12.5% YoY")
 *   - positive: boolean to color delta as positive/negative
 *   - icon: optional Bootstrap Icon class for top-right glyph
 */
const MetricCard = ({ title, value, delta, positive = true, icon }) => {
  return (
    <div className="bg-white rounded-3 border p-3 h-100 shadow-sm">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <div className="text-muted small">{title}</div>
        {icon && <i className={`bi ${icon} text-secondary`} />}
      </div>
      <div className="fs-3 fw-semibold">{value}</div>
      <div className={`small d-flex align-items-center gap-1 ${positive ? 'text-positive' : 'text-danger'}`}>
        <i className={`bi ${positive ? 'bi-arrow-up-right' : 'bi-arrow-down-right'}`} />
        <span>{delta}</span>
      </div>
    </div>
  );
};

export default MetricCard;
