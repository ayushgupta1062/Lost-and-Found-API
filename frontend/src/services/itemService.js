import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/items';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const itemService = {
  // Get all items
  getAllItems: async () => {
    const response = await api.get('');
    return response.data;
  },

  // Get item by ID
  getItemById: async (id) => {
    const response = await api.get(`/${id}`);
    return response.data;
  },

  // Create a new item
  createItem: async (item) => {
    const response = await api.post('', item);
    return response.data;
  },

  // Update an item
  updateItem: async (id, item) => {
    const response = await api.put(`/${id}`, item);
    return response.data;
  },

  // Delete an item
  deleteItem: async (id) => {
    await api.delete(`/${id}`);
  },

  // Search by name
  searchByName: async (name) => {
    const response = await api.get(`/search?name=${name}`);
    return response.data;
  },

  // Filter by status
  filterByStatus: async (status) => {
    const response = await api.get(`/status/${status}`);
    return response.data;
  },
};

export default itemService;
