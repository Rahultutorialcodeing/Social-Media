import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface removePhotoState {
    value: boolean;
}

const initialState: removePhotoState = {
    value: false
}

export const removerPhotoSlice = createSlice({
    name: 'Stetus',
    initialState,
    reducers: {
        removerPhotoStetus: (state, action: PayloadAction<boolean>) => {
            state.value = (action.payload)
            // console.log(action.payload)


        }
    }
})


export const { removerPhotoStetus } = removerPhotoSlice.actions

export default removerPhotoSlice.reducer