import _ from "lodash";
import GameState from "../types/GameState";

export default function getDefaultGameState(persistedStates?: {taskLog?: string[], isPlaying?: boolean} ) {

    const {taskLog, isPlaying} = persistedStates ?? {};

    const defaultGameState: GameState = {
        taskLog: taskLog ?? ["Not started"],
    
        needsNewGame: false,
        isPlaying: isPlaying ?? false,
    
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
            isHeroActionSelected: false,
            hasHeroActed: false,
        },
    
        isAdvancingFinished: false,
        isAdvancingLevel: false,
        advanceTasks: {
            isPlaythroughStateUpdated: false,
            isNextLevelReady: false,
            isLevelReset: false
        }
    };

    return _.cloneDeep(defaultGameState);
}
