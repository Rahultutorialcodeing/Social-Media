import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface bodertState {
    value: boolean;
}

const initialState: bodertState = {
    value: false
}

export const boderSlice = createSlice({
    name: 'Stetus',
    initialState,
    reducers: {
        boderStetus: (state, action: PayloadAction<boolean>) => {
            state.value = (action.payload)
    
           
        }
    }
})


export const { boderStetus } = boderSlice.actions

export default boderSlice.reducer