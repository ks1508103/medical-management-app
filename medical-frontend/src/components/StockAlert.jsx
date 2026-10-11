import React from 'react';
function StockAlert({ message }) {
  if (!message) return null;
  return (
    <div className="alert alert-danger alert-dismissible fade show" role="alert">
      <i className="bi bi-exclamation-triangle-fill me-2"></i>
      <strong>SMS Notification Triggered:</strong> {message}
    </div>
  );
}
export default StockAlert;