import axios from 'axios';

export const backend = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.REACT_APP_API_DOMAIN,
});
