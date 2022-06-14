import axios from 'axios';

let API_KEY = 'YOUR API KEY';

// Create base URL API
export const API = axios.create({
  baseURL: `https://api.kontenbase.com/query/api/v1/${API_KEY}/`,
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.commin['Authorization'];
  }
};
