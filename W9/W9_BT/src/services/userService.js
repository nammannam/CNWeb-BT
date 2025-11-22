import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

// Get all users
export const getAllUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.message || 'Failed to fetch users' 
    };
  }
};

// Create new user
export const createUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.message || 'Failed to create user' 
    };
  }
};

// Update user
export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, userData);
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.message || 'Failed to update user' 
    };
  }
};

// Delete user
export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error.message || 'Failed to delete user' 
    };
  }
};
