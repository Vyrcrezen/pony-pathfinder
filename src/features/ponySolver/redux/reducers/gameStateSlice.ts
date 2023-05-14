import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import ReduxStore from "../../../../global/redux/types/ReduxStore";
import initialPonyStoreState from "../initialPonyStoreState";

const gameStateSlice = createSlice({
    name: "ponySolver/state",
    initialState: initialPonyStoreState.state,
    reducers: {
        gsSetIsInitialized: (state, action: PayloadAction<boolean>) => {
            state.isInitialized = action.payload;
        },
        gsSetIsBeingInitialized: (state, action: PayloadAction<boolean>) => {
            state.isBeingInitialized = action.payload;
        },
        gsPushTaskDescription: (state, action: PayloadAction<string>) => {
            state.taskLog.unshift(action.payload);
        },
        toggleIsPlaying: (state) => {
            state.isPlaying = !state.isPlaying;
        },
    },
});

export const {
    gsSetIsInitialized,
    gsSetIsBeingInitialized,
    gsPushTaskDescription,
    toggleIsPlaying
} = gameStateSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: ReduxStore) => state;

export default gameStateSlice.reducer;
