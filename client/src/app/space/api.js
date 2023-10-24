import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const spacesApi = createApi({
  reducerPath: 'spacesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/spaces/' }),
  endpoints: (builder) => ({
    getSpaces: builder.query({
      query: () => ``,
    }),
    getSpacesById: builder.query({
      query: (uid) => `${uid}`,
    }),
    getCheckSpace: builder.query({
      query: (uid) => `check-space/${uid}`,
    }),
    deleteSpaceById: builder.mutation({
      query: (uid) => ({
        url: `delete/${uid}`,
        method: 'DELETE',
      }),
    }),
    postSpace: builder.mutation({
      query: (newSpace) => ({
        url: 'create',
        method: 'POST',
        body: newSpace,
      }),
    }),
    updateSpace: builder.mutation({
      query: ({ uid, updatedSpace }) => ({
        url: `update/${uid}`,
        method: 'PUT',
        body: updatedSpace,
      }),
    }),
    
  }),
});

export const {
  useGetSpacesQuery,
  useGetSpacesByIdQuery,
  useGetCheckSpaceQuery,
  useDeleteSpaceByIdMutation,
  usePostSpaceMutation,
  useUpdateSpaceMutation,
} = spacesApi;
