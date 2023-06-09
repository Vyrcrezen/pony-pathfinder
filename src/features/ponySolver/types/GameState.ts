export default interface GameState {
    taskLog: string[];

    needsNewGame: boolean;
    isPlaying: boolean;

    isStepping: boolean;
    isStepFinished: boolean;

    isInitialized: boolean;
    isBeingInitialized: boolean;
    initTasks: {
        isMapResourcesFetched: boolean,
        isInitMapStateFetched: boolean,
        isBaseMapGenerated: boolean,
    }

    isRunning: boolean;
    isLevelOver: boolean;
    runtimeTasks: {
        isMapStateFetched: boolean,
        isMapStatusUpdated: boolean,
        isGameMapUpdated: boolean,
        isHeatMapUpdated: boolean,
        isGameMapGraphCreated: boolean,
        isPathCalculated: boolean,
        isHeroActionSelected: boolean,
        hasHeroActed: boolean,
    }

    isAdvancingFinished: boolean;
    isAdvancingLevel: boolean;
    advanceTasks: {
        isPlaythroughStateUpdated: boolean,
        isNextLevelReady: boolean,
        isLevelReset: boolean
    }
}
