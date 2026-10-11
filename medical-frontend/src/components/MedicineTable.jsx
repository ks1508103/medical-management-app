import React from 'react';
function MedicineTable({ medicines }) {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-dark text-white">
        <h5 className="mb-0">Medicine Inventory</h5>
      </div>
      <div className="card-body">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((med) => (
              <tr key={med.id}>
                <td className="fw-semibold">{med.name}</td>
                <td>{med.category}</td>
                <td>₹{med.price.toFixed(2)}</td>
                <td>{med.stock} units</td>
                <td>
                  {med.stock <= 5 ? (
                    <span className="badge bg-danger">Critical / Out of Stock</span>
                  ) : med.stock <= 15 ? (
                    <span className="badge bg-warning text-dark">Low Stock</span>
                  ) : (
                    <span className="badge bg-success">Available</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default MedicineTable;