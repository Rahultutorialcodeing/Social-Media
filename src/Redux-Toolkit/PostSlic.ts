import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface postState {
    value: boolean;
}

const initialState: postState = {
    value: false
}

export const postSlice = createSlice({
    name: 'Post',
    initialState,
    reducers: {
        postStetus: (state, action: PayloadAction<boolean>) => {
            state.value = (action.payload)
    
           
        }
    }
})


export const { postStetus } = postSlice.actions

export default postSlice.reducer