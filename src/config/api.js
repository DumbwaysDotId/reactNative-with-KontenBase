import axios from 'axios';

let API_KEY = '2e3c2a4c-d0bb-45bf-90ba-046719690637';

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
