import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface profileState {
    value: boolean;
}

const initialState: profileState = {
    value: false
}

export const profileSlice = createSlice({
    name: 'Stetus',
    initialState,
    reducers: {
        profileStetus: (state, action: PayloadAction<boolean>) => {
            state.value = (action.payload)
            // console.log(action.payload)


        }
    }
})


export const { profileStetus } = profileSlice.actions

export default profileSlice.reducer