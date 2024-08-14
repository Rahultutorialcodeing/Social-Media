import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface flowrfuctionState {
    value: any;
}

const initialState: flowrfuctionState = {
    value: ''
}

export const flofucSlice = createSlice({
    name: 'Fuction',
    initialState,
    reducers: {
        florFucStetus: (state, action: PayloadAction<any>) => {
            state.value = (action.payload)


        }
    }
})


export const { florFucStetus } = flofucSlice.actions

export default flofucSlice.reducer