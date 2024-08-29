import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.93:3001/api/v1/'; // Replace with your API base URL

export const loginUser = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}user/login`, userData);
  return response.data;
};

export const registerUser = async (formData) => {
  const response = await axios.post(`${API_BASE_URL}user/register`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Required for formData
    },
  });
  return response.data;
};
