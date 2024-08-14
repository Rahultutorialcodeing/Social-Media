import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface unfollowState {
    value: boolean;
}

const initialState: unfollowState = {
    value: false
}

export const unfollowSlice = createSlice({
    name: 'Stetus',
    initialState,
    reducers: {
        unfollowStetus: (state, action: PayloadAction<boolean>) => {
            state.value = (action.payload)
            // console.log(action.payload)


        }
    }
})


export const { unfollowStetus } = unfollowSlice.actions

export default unfollowSlice.reducer