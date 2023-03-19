import { backend } from './configs/axios';

const urls = {
  wallets: {
    me: '/wallets/me',
  }
};

export const userApi = {
  url: backend.defaults.baseURL
};
