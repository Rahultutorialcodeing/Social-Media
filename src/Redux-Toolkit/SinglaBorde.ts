import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface singlebodertState {
    value: boolean;
}

const initialState: singlebodertState = {
    value: false
}

export const singleboderSlice = createSlice({
    name: 'Singlwborder',
    initialState,
    reducers: {
        singleboderStetus: (state, action: PayloadAction<boolean>) => {
            state.value = (action.payload)
    
           
        }
    }
})


export const { singleboderStetus } = singleboderSlice.actions

export default singleboderSlice.reducer