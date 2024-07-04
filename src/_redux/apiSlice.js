import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// fetching the headers.

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api/v1',
    credentials: 'same-origin',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }
        headers.set("Content-Type", "application/json")
        return headers
    }
})

// create API endpoints

export const apiSlice = createApi({
    baseQuery,
    endpoints: (builder) => ({})
})