import { configureStore } from '@reduxjs/toolkit'
import boderStetus from './BorderSclice'
import emailStetus from './EmailSlice'
import unfollowStetus from './UnfollowSlice'
import  profileStetus from './Profile-showSice'
import removerPhotoStetus  from './Remove-PhtoSlice'
import florFucStetus from './FollowersFuctionSlice'
import  postStetus  from './PostSlic'
import singleboderStetus from './SinglaBorde'
// ...

export const store = configureStore({
    reducer: {
        boderStetus,
        emailStetus,
        unfollowStetus,
        profileStetus,
        removerPhotoStetus,
        florFucStetus,
        postStetus,
        singleboderStetus
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch