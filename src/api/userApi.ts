import { AxiosResponse } from 'axios';

import { IUserState } from '../store/slices/appSlice'
import { ILoyaltyProgram, IUserPointsResponse } from '../views/Loyalty/Loyalty'

import { backend } from './configs/axios';

interface INonceResponse {
  nonce: string;
  wallet: string;
}

interface IUserResponse {
  wallet: string;
  pistisScoreTokenId: number;
  assetsValue: 0;
}

interface IProgramsResponse {
  programs: ILoyaltyProgram[];
}

const urls = {
  wallets: {
    me: '/wallets/me',
    myLoyaltyPrograms: 'wallets/my-loyalty-programs',
  },
  auth: {
    nonce: 'auth/nonce',
    verify: 'auth/verify',
    logout: 'auth/logout',
  },
  loyalty: {
    getPrograms: 'loyalty/programs',
    getUserLoyaltyTokens: 'loyalty/customer-points',
  },
};

export const userApi = {
  url: backend.defaults.baseURL,
  getUser: async (): Promise<AxiosResponse<IUserResponse>> => {
    return await backend.request({
      method: 'GET',
      url: `${userApi.url}${urls.wallets.me}`,
    });
  },
  getNonce: async (address: string): Promise<AxiosResponse<INonceResponse>> => {
    return await backend.request({
      method: 'GET',
      url: `${userApi.url}/${urls.auth.nonce}/${address}`,
    });
  },
  verify: async (address: string, signature: string): Promise<AxiosResponse<boolean>> => {
    return await backend.request({
      method: 'POST',
      url: `${userApi.url}/${urls.auth.verify}`,
      data: {
        wallet: address,
        signature,
      },
    });
  },
  getLoyaltyPrograms: async (): Promise<AxiosResponse<IProgramsResponse>> => {
    return await backend.request({
      method: 'GET',
      url: `${userApi.url}/${urls.wallets.myLoyaltyPrograms}`,
    });
  },
  getUserLoyaltyPoints: async (token: number): Promise<AxiosResponse<IUserPointsResponse>> => {
    return await backend.request({
      method: 'GET',
      url: `${userApi.url}/${urls.loyalty.getUserLoyaltyTokens}/${token}`,
    });
  },
  setUserLoyaltyPoints: async (
    token: number,
    points: number
  ): Promise<AxiosResponse<IUserPointsResponse>> => {
    return await backend.request({
      method: 'POST',
      url: `${userApi.url}/${urls.loyalty.getUserLoyaltyTokens}/${token}`,
      data: {
        points,
      },
    });
  },
  logout: async (): Promise<AxiosResponse<IUserState>> => {
    return await backend.request({
      method: 'POST',
      url: `${userApi.url}/${urls.auth.logout}`,
    });
  },
};
