import { baseApi } from './baseApi';
import { User, LoginRequest, LoginResponse, RegisterRequest } from '../types/authTypes';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.mutation<LoginResponse, void>({
      query: () => ({
        url: 'chat/conversations',
        method: 'GET',
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const {
  useGetConversationsMutation,
} = authApi;
