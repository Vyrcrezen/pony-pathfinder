import { combineReducers, configureStore } from "@reduxjs/toolkit";

import ReduxStore from "./types/ReduxStore";
import gameResourcesSlice from "../../features/ponySolver/redux/reducers/gameResourcesSlice";
import initialPonyStoreState from "../../features/ponySolver/redux/initialPonyStoreState";
import thunk from "redux-thunk";
import gameStateSlice from "../../features/ponySolver/redux/reducers/gameStateSlice";

const initialState: ReduxStore = {
    ponySolver: initialPonyStoreState
}

const combinedPonyReducers = combineReducers({
    resources: gameResourcesSlice,
    state: gameStateSlice
});

const store = configureStore({
    reducer: {
        ponySolver: combinedPonyReducers
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
