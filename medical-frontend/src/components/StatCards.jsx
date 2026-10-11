import React from 'react';
function StatCards({ stats }) {
  return (
    <div className="row g-3 mb-4">
      <div className="col-md-4">
        <div className="p-3 bg-white shadow-sm rounded border-start border-primary border-4">
          <span className="text-muted small fw-bold text-uppercase">Total Medicines</span>
          <h4 className="fw-bold mt-1 mb-0">{stats.totalMedicines}</h4>
        </div>
      </div>
      <div className="col-md-4">
        <div className="p-3 bg-white shadow-sm rounded border-start border-warning border-4">
          <span className="text-muted small fw-bold text-uppercase">Low Stock Alerts</span>
          <h4 className="fw-bold mt-1 mb-0 text-danger">{stats.lowStockCount}</h4>
        </div>
      </div>
      <div className="col-md-4">
        <div className="p-3 bg-white shadow-sm rounded border-start border-success border-4">
          <span className="text-muted small fw-bold text-uppercase">Total Bills Generated</span>
          <h4 className="fw-bold mt-1 mb-0">{stats.totalBills}</h4>
        </div>
      </div>
    </div>
  );
}
export default StatCards;