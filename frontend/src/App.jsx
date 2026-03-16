import { useState, useEffect, useCallback } from 'react';
import itemService from './services/itemService';
import ItemCard from './components/ItemCard';
import ItemForm from './components/ItemForm';
import './App.css';

const STATUSES = ['ALL', 'FOUND', 'CLAIMED', 'UNCLAIMED'];

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      let data;
      if (searchQuery.trim()) {
        data = await itemService.searchByName(searchQuery);
      } else if (activeFilter !== 'ALL') {
        data = await itemService.filterByStatus(activeFilter);
      } else {
        data = await itemService.getAllItems();
      }
      setItems(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch items. Make sure the backend is running on port 8080.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, activeFilter]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleCreate = async (item) => {
    try {
      await itemService.createItem(item);
      showNotification('Item reported successfully!');
      setShowForm(false);
      fetchItems();
    } catch (err) {
      showNotification('Failed to create item.', 'error');
      console.error(err);
    }
  };

  const handleUpdate = async (item) => {
    try {
      await itemService.updateItem(editingItem.id, item);
      showNotification('Item updated successfully!');
      setEditingItem(null);
      setShowForm(false);
      fetchItems();
    } catch (err) {
      showNotification('Failed to update item.', 'error');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await itemService.deleteItem(id);
      showNotification('Item deleted successfully!');
      fetchItems();
    } catch (err) {
      showNotification('Failed to delete item.', 'error');
      console.error(err);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const statusCounts = items.reduce(
    (acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    },
    {}
  );

  return (
    <div className="app">
      {/* Notification Toast */}
      {notification && (
        <div className={`notification notification-${notification.type}`}>
          <span className="notification-icon">
            {notification.type === 'success' ? '✓' : '✕'}
          </span>
          {notification.message}
        </div>
      )}

      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo">
              <span className="logo-icon">🔍</span>
              <div>
                <h1 className="logo-title">Lost & Found</h1>
                <p className="logo-subtitle">College Portal</p>
              </div>
            </div>
          </div>
          <button className="btn btn-primary btn-glow" onClick={() => { setEditingItem(null); setShowForm(true); }}>
            <span className="btn-icon">+</span>
            Report Item
          </button>
        </div>
      </header>

      {/* Stats Bar */}
      <section className="stats-bar">
        <div className="stat-card">
          <span className="stat-number">{items.length}</span>
          <span className="stat-label">Total Items</span>
        </div>
        <div className="stat-card stat-found">
          <span className="stat-number">{statusCounts['FOUND'] || 0}</span>
          <span className="stat-label">Found</span>
        </div>
        <div className="stat-card stat-claimed">
          <span className="stat-number">{statusCounts['CLAIMED'] || 0}</span>
          <span className="stat-label">Claimed</span>
        </div>
        <div className="stat-card stat-unclaimed">
          <span className="stat-number">{statusCounts['UNCLAIMED'] || 0}</span>
          <span className="stat-label">Unclaimed</span>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="controls">
        <div className="search-box">
          <span className="search-icon">🔎</span>
          <input
            type="text"
            placeholder="Search items by name..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (e.target.value) setActiveFilter('ALL');
            }}
            className="search-input"
          />
          {searchQuery && (
            <button className="search-clear" onClick={() => setSearchQuery('')}>✕</button>
          )}
        </div>
        <div className="filter-tabs">
          {STATUSES.map((status) => (
            <button
              key={status}
              className={`filter-tab ${activeFilter === status ? 'filter-tab-active' : ''}`}
              onClick={() => {
                setActiveFilter(status);
                setSearchQuery('');
              }}
            >
              {status}
            </button>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        {loading ? (
          <div className="loading-state">
            <div className="spinner" />
            <p>Loading items...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <span className="error-icon">⚠️</span>
            <p>{error}</p>
            <button className="btn btn-outline" onClick={fetchItems}>Retry</button>
          </div>
        ) : items.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📦</span>
            <h3>No items found</h3>
            <p>
              {searchQuery
                ? `No results for "${searchQuery}"`
                : activeFilter !== 'ALL'
                ? `No items with status "${activeFilter}"`
                : 'No items have been reported yet.'}
            </p>
            <button className="btn btn-primary" onClick={() => { setEditingItem(null); setShowForm(true); }}>
              Report an Item
            </button>
          </div>
        ) : (
          <div className="items-grid">
            {items.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modal Overlay */}
      {showForm && (
        <div className="modal-overlay" onClick={handleCloseForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingItem ? 'Edit Item' : 'Report Found Item'}</h2>
              <button className="modal-close" onClick={handleCloseForm}>✕</button>
            </div>
            <ItemForm
              item={editingItem}
              onSubmit={editingItem ? handleUpdate : handleCreate}
              onCancel={handleCloseForm}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
