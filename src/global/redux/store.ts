import { configureStore } from "@reduxjs/toolkit";

import ReduxStore from "./types/ReduxStore";
import ponySolverSlice from "../../features/ponySolver/redux/reducers/ponySolverSlice";
import initialPonyStoreState from "../../features/ponySolver/redux/initialPonyStoreState";
import thunk from "redux-thunk";

const initialState: ReduxStore = {
    ponySolver: initialPonyStoreState
}

const store = configureStore({
    reducer: {
        ponySolver: ponySolverSlice
    },
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat(thunk);
    },
    preloadedState: initialState
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
