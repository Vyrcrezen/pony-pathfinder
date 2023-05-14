
const initialGameState = {
    taskLog: ["Not started"],

    needsNewGame: false,
    isPlaying: false,

    isInitialized: false,
    isBeingInitialized: false,
    initTasks: {
        isMapStateFetched: false
    },

    isRunning: false,
    isLevelOver: false,
    runtimeTasks: {
        isMapResourceFetched: false,
        isDynamicMapUpdated: false,
        isPathingGraphCreated: false,
        isPathCalculated: false,
        hasHeroActed: false,
    },

    isNextLoaded: false,
    isNextBeingLoaded: false,
    resetTasks: {
        isPlaythroughStateUpdated: false,
        isNextLevelReady: false
    }
}

export default initialGameState;
