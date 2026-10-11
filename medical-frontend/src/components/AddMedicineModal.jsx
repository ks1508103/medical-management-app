<div className="col-12">
  <label className="form-label small fw-bold">Medicine Category</label>
  <select 
    className="form-select" 
    value={newMed.category} 
    onChange={(e) => setNewMed({ ...newMed, category: e.target.value })} 
    required>
    <option value="">Select category...</option>
    <option value="Tablet">💊 Tablet</option>
    <option value="Capsule">🟢 Capsule</option>
    <option value="Syrup">🧪 Syrup / Liquid</option>
    <option value="Injection">💉 Injection</option>
    <option value="Ointment">🧴 Ointment / Cream</option>
    <option value="Drops">💧 Drops</option>
  </select>
</div>