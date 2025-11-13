import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiConfig } from './apiConfig';
import { RootState } from '../redux/store';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiConfig.BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['User', 'Auth'],
  endpoints: () => ({}),
});
