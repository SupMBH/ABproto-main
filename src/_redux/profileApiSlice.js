import { apiSlice } from "./apiSlice";

// create API calls to retrieve and update user's profile

export const profileApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProfile: builder.mutation({
            query: () => ({
                url: "user/profile",
                method: "POST",
                body: {},
            })
        }),
        updateProfile: builder.mutation({
            query: (userData) => ({
                url: "/user/profile",
                method: "PUT",
                body: { ...userData }
            })
        })
    })
})

export const { useGetProfileMutation } = profileApiSlice
export const { useUpdateProfileMutation } = profileApiSlice