import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface emailState {
    value: string;
}

const initialState: emailState = {
    value: ''
}

export const emailSlice = createSlice({
    name: 'Stetus',
    initialState,
    reducers: {
        emailStetus: (state, action: PayloadAction<string>) => {
            state.value = (action.payload)


        }
    }
})


export const { emailStetus } = emailSlice.actions

export default emailSlice.reducer