function ItemCard({ item, onEdit, onDelete }) {
  const statusDot = {
    FOUND: '🔵',
    CLAIMED: '🟢',
    UNCLAIMED: '🟡',
  };

  return (
    <div className="item-card">
      <div className="item-card-header">
        <div>
          <h3 className="item-name">{item.itemName}</h3>
          <span className="item-id">#ID-{item.id}</span>
        </div>
        <span className={`status-badge status-${item.status}`}>
          {statusDot[item.status] || '⚪'} {item.status}
        </span>
      </div>

      <div className="item-details">
        <div className="item-detail">
          <span className="detail-icon">📍</span>
          <span className="detail-label">Location</span>
          <span className="detail-value">{item.locationFound}</span>
        </div>
        <div className="item-detail">
          <span className="detail-icon">📅</span>
          <span className="detail-label">Date</span>
          <span className="detail-value">
            {new Date(item.dateFound).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </div>
      </div>

      <div className="item-actions">
        <button className="btn btn-outline" onClick={() => onEdit(item)}>
          ✏️ Edit
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(item.id)}>
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default ItemCard;
