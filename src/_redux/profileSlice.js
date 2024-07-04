import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile",
    initialState : { firstName: null, lastName: null },
    reducers: {
        // Get the profile
        setProfile: (state, action) => {
            const { firstName, lastName } = action.payload
            state.firstName = firstName
            state.lastName = lastName
        },
        // clear the profile
        unsetProfile: (state) => {
            state.firstName = null
            state.lastName = null
        }
    }
})

// export dispatches

export const { setProfile, unsetProfile } = profileSlice.actions

export default profileSlice.reducer

// create selectors

export const selectCurrentFirstName = (state) => state.profile.firstName
export const selectCurrentLastName = (state) => state.profile.lastName