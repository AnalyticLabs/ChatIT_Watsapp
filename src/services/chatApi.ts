import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    getChats: builder.query({
      query: () => "users",
      transformResponse: (response) =>
        response.users.slice(0, 12).map((u, i) => ({
          id: i + 1,
          name: `${u.firstName} ${u.lastName}`,
          lastMessage: "Hey! How are you doing?",
          time: "12:4" + i,
          unread: i % 3 === 0 ? i : 0,
          isArchived: i % 4 === 0,
          avatar: u.image,
        })),
    }),

    getMessages: builder.query({
      // Use comments endpoint as mock messages; filter by 'postId' as chatId
      query: (chatId) => `comments/post/${chatId}`,
      transformResponse: (response) =>
        response.comments.map((c, i) => ({
          id: c.id,
          text: c.body,
          time: `10:1${i}`,
          isOwn: c.user.id % 2 === 0, // fake ownership
        })),
    }),

    sendMessage: builder.mutation({
      // This is just a placeholder POST; replace with your own API in real app
      query: ({ chatId, text }) => ({
        url: `comments/add`,
        method: "POST",
        body: {
          body: text,
          postId: chatId,
          userId: 1, // fake user id
        },
      }),
      // Optimistically simulate success by returning the new message directly
      transformResponse: (response, meta, arg) => ({
        id: Date.now(),
        text: arg.text,
        time: new Date().toLocaleTimeString(),
        isOwn: true,
      }),
    }),
  }),
});

export const { useGetChatsQuery, useGetMessagesQuery, useSendMessageMutation } = chatApi;
