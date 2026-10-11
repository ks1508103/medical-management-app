import React, { useState } from 'react';
function BillingForm({ medicines, onProcessBilling }) {
  const [customer, setCustomer] = useState({
    name: '',
    mobile: '',
    address: '',
    medId: '',
    quantity: 1
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onProcessBilling(customer);
    setCustomer({ name: '', mobile: '', address: '', medId: '', quantity: 1 });
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0"><i className="bi bi-receipt me-2"></i>Patient/Customer Billing & SMS</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="form-label small">Patient/Customer Name</label>
            <input type="text" className="form-control form-control-sm" 
              value={customer.name} onChange={(e) => setCustomer({...customer, name: e.target.value})} required />
          </div>
          <div className="mb-2">
            <label className="form-label small">Mobile Number</label>
            <input type="tel" className="form-control form-control-sm" 
              value={customer.mobile} onChange={(e) => setCustomer({...customer, mobile: e.target.value})} required />
          </div>
          <div className="mb-2">
            <label className="form-label small">Address</label>
            <textarea className="form-control form-control-sm" rows="2" 
              value={customer.address} onChange={(e) => setCustomer({...customer, address: e.target.value})} required></textarea>
          </div>
          <div className="mb-2">
            <label className="form-label small">Select Medicine</label>
            <select className="form-select form-select-sm" 
              value={customer.medId} onChange={(e) => setCustomer({...customer, medId: e.target.value})} required>
              <option value="">Choose medicine...</option>
              {medicines.map((m) => (
                <option key={m.id} value={m.id}>{m.name} (Stock: {m.stock})</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label small">Quantity</label>
            <input type="number" className="form-control form-control-sm" min="1" 
              value={customer.quantity} onChange={(e) => setCustomer({...customer, quantity: e.target.value})} required />
          </div>
          <button type="submit" className="btn btn-success btn-sm w-100 fw-bold">
            Generate Bill & Check Stock SMS
          </button>
        </form>
      </div>
    </div>
  );
}
export default BillingForm;