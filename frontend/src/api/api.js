import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: 'http://127.0.0.1:4000' });

export const api = createApi({
    baseQuery,
    tagTypes: ['Patient'],
    endpoints: (builder) => ({}),
});