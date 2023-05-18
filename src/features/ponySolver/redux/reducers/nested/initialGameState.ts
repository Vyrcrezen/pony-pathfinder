import GameState from "../../../types/GameState";

const initialGameState: GameState = {
    taskLog: ["Not started"],

    needsNewGame: false,
    isPlaying: false,

    isStepFinished: false,
    isStepping: false,

    isInitialized: false,
    isBeingInitialized: false,
    initTasks: {
        isMapResourcesFetched: false,
        isInitMapStateFetched: false,
        isBaseMapGenerated: false
    },

    isRunning: false,
    isLevelOver: false,
    runtimeTasks: {
        isMapStateFetched: false,
        isMapStatusUpdated: false,
        isGameMapUpdated: false,
        isHeatMapUpdated: false,
        isGameMapGraphCreated: false,
        isPathCalculated: false,
        hasHeroActed: false,
    },

    isAdvancingFinished: true,
    isAdvancingLevel: false,
    advanceTasks: {
        isPlaythroughStateUpdated: false,
        isNextLevelReady: false
    }
}

export default initialGameState;
