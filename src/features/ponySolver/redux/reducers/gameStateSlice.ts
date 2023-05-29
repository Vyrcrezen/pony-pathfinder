import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import ReduxStore from "../../../../global/redux/types/ReduxStore";
import initialPonyStoreState from "../initialPonyStoreState";
import getDefaultGameState from "../../initializers/getDefaultGameState";

const gameStateSlice = createSlice({
    name: "ponySolver/state",
    initialState: initialPonyStoreState.state,
    reducers: {
        setIsInitialized: (state, action: PayloadAction<boolean>) => {
            state.isInitialized = action.payload;
        },
        setIsBeingInitialized: (state, action: PayloadAction<boolean>) => {
            state.isBeingInitialized = action.payload;
        },
        setIsRunning: (state, action: PayloadAction<boolean>) => {
            state.isRunning = action.payload;
        },
        setIsLevelOver: (state, action: PayloadAction<boolean>) => {
            state.isLevelOver = action.payload;
        },
        setIsAdvancingFinished: (state, action: PayloadAction<boolean>) => {
            state.isAdvancingFinished = action.payload;
        },
        setIsAdvancingLevel: (state, action: PayloadAction<boolean>) => {
            state.isAdvancingLevel = action.payload;
        },
        pushTaskDescription: (state, action: PayloadAction<string>) => {
            state.taskLog.unshift(action.payload);
            if (state.taskLog.length > 100) state.taskLog.length = 100;
        },
        /**
         * The game either be played or stepped. This reducer sets the playing state.
         */
        toggleIsPlaying: (state) => {
            state.isPlaying = !state.isPlaying;
        },
        /**
         * The game either be played or stepped. This reducer triggers the next game step.
         */
        setIsStepping: (state, action: PayloadAction<boolean>) => {
            state.isStepFinished = false;
            state.isStepping = action.payload;
        },
        /**
         * This reducer is called by the gameplay thunks to signal that the recently requested step is finished.
         */
        setSteppingFinished: (state, action: PayloadAction<boolean>) => {
            state.isStepFinished = action.payload;
        },
        resetLevelState: (state, action: PayloadAction<{taskLog?: string[], isPlaying?: boolean}>) => {
            return getDefaultGameState({ taskLog: action?.payload.taskLog, isPlaying: action?.payload.isPlaying});
        },
        // initTasks
        setIsMapResourcesFetched: (state, action: PayloadAction<boolean>) => {
            state.initTasks.isMapResourcesFetched = action.payload;
        },
        setIsInitMapStateFetched: (state, action: PayloadAction<boolean>) => {
            state.initTasks.isInitMapStateFetched = action.payload;
        },
        setIsBaseMapGenerated: (state, action: PayloadAction<boolean>) => {
            state.initTasks.isBaseMapGenerated = action.payload;
        },
        // runtimeTasks
        setIsMapStateFetched: (state, action: PayloadAction<boolean>) => {
            state.runtimeTasks.isMapStateFetched = action.payload;
        },
        setIsMapStatusUpdated: (state, action: PayloadAction<boolean>) => {
            state.runtimeTasks.isMapStatusUpdated = action.payload;
        },
        setIsGameMapUpdated: (state, action: PayloadAction<boolean>) => {
            state.runtimeTasks.isGameMapUpdated = action.payload;
        },
        setIsHeatMapUpdated: (state, action: PayloadAction<boolean>) => {
            state.runtimeTasks.isHeatMapUpdated = action.payload;
        },
        setIsGameMapGraphCreated: (state, action: PayloadAction<boolean>) => {
            state.runtimeTasks.isGameMapGraphCreated = action.payload;
        },
        setIsPathCalculated: (state, action: PayloadAction<boolean>) => {
            state.runtimeTasks.isPathCalculated = action.payload;
        },
        setIsHeroActionSelected: (state, action: PayloadAction<boolean>) => {
            state.runtimeTasks.isHeroActionSelected = action.payload;
        },
        setHasHeroActed: (state, action: PayloadAction<boolean>) => {
            state.runtimeTasks.hasHeroActed = action.payload;
        },
        // advanceTasks
        setIsPlaythroughStateUpdated: (state, action: PayloadAction<boolean>) => {
            state.advanceTasks.isPlaythroughStateUpdated = action.payload;
        },
        setIsNextLevelReady: (state, action: PayloadAction<boolean>) => {
            state.advanceTasks.isNextLevelReady = action.payload;
        },
        setIsLevelReset: (state, action: PayloadAction<boolean>) => {
            state.advanceTasks.isLevelReset = action.payload;
        }
    },
});

export const {
    setIsInitialized,
    setIsBeingInitialized,
    setIsRunning,
    setIsLevelOver,
    setIsAdvancingFinished,
    setIsAdvancingLevel,
    pushTaskDescription,
    toggleIsPlaying,
    setIsStepping,
    setSteppingFinished,
    resetLevelState,
    setIsMapResourcesFetched,
    setIsInitMapStateFetched,
    setIsBaseMapGenerated,
    setIsMapStateFetched,
    setIsMapStatusUpdated,
    setIsGameMapUpdated,
    setIsHeatMapUpdated,
    setIsGameMapGraphCreated,
    setIsPathCalculated,
    setIsHeroActionSelected,
    setHasHeroActed,
    setIsPlaythroughStateUpdated,
    setIsNextLevelReady,
    setIsLevelReset,
} = gameStateSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: ReduxStore) => state;

export default gameStateSlice.reducer;
