export default interface GameState {
    taskLog: string[];

    needsNewGame: boolean;
    isPlaying: boolean;

    isInitialized: boolean;
    isBeingInitialized: boolean;
    initTasks: {
        isMapStateFetched: boolean
    }

    isRunning: boolean;
    isLevelOver: boolean;
    runtimeTasks: {
        isMapResourceFetched: boolean,
        isDynamicMapUpdated: boolean,
        isPathingGraphCreated: boolean,
        isPathCalculated: boolean,
        hasHeroActed: boolean,
    }

    isNextLoaded: boolean;
    isNextBeingLoaded: boolean;
    resetTasks: {
        isPlaythroughStateUpdated: boolean,
        isNextLevelReady: boolean
    }
}
