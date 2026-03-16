import { useState, useEffect } from 'react';

function ItemForm({ item, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    itemName: '',
    locationFound: '',
    dateFound: new Date().toISOString().split('T')[0],
    status: 'FOUND',
  });

  useEffect(() => {
    if (item) {
      setFormData({
        itemName: item.itemName || '',
        locationFound: item.locationFound || '',
        dateFound: item.dateFound || new Date().toISOString().split('T')[0],
        status: item.status || 'FOUND',
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="item-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label" htmlFor="itemName">Item Name</label>
        <input
          id="itemName"
          className="form-input"
          type="text"
          name="itemName"
          value={formData.itemName}
          onChange={handleChange}
          placeholder="e.g. Blue Backpack, Silver Watch..."
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="locationFound">Location Found</label>
        <input
          id="locationFound"
          className="form-input"
          type="text"
          name="locationFound"
          value={formData.locationFound}
          onChange={handleChange}
          placeholder="e.g. Library 2nd Floor, Cafeteria..."
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="dateFound">Date Found</label>
        <input
          id="dateFound"
          className="form-input"
          type="date"
          name="dateFound"
          value={formData.dateFound}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="status">Status</label>
        <select
          id="status"
          className={`form-select ${!item ? 'disabled-select' : ''}`}
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
          disabled={!item}
        >
          <option value="FOUND">Found</option>
          {item && <option value="UNCLAIMED">Unclaimed</option>}
          {item && <option value="CLAIMED">Claimed</option>}
        </select>
        {!item && (
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            New reports are automatically marked as Found.
          </span>
        )}
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-outline" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {item ? '💾 Update Item' : '➕ Report Item'}
        </button>
      </div>
    </form>
  );
}

export default ItemForm;
