import { generateGameMap, generateGameMapGraph, generateHeatMap, generateHeroPath, selectHeroAction } from "../../gameResourcesSlice";
import updateMapStateThunk from "../apiThunk/updateMapStateThunk";
import { AppDispatch } from "../../../../../../global/redux/store";
import {setHasHeroActed, setIsGameMapGraphCreated, setIsGameMapUpdated, setIsLevelOver, setIsMapStateFetched, setIsPathCalculated, setIsRunning, setSteppingFinished, pushTaskDescription, setIsMapStatusUpdated, setIsHeatMapUpdated, setIsHeroActionSelected} from "../../gameStateSlice";
import GameState from "../../../../types/GameState";
import gameStepActionWrapper from "../wrapperThunk/gameStepWrapperThunk";
import performHeroActionThunk from "../apiThunk/performHeroActionThunk";
import GameResources from "../../../../types/GameResources";
import UserInput from "../../../../types/UserInput";

/**
 * 
 * @param param0 an object like: `{ gameState: GameState, gameResources: GameResources, userInput: UserInput }`, where `GameState`, `GameResources` and `UserInput` are from the Redux store
 */
const runGameplayLoopThunk =
    ({ gameState, gameResources, userInput }: { gameState: GameState, gameResources: GameResources, userInput: UserInput }) => async (dispatch: AppDispatch) => {

        const { token } = gameResources;

        // Make sure that multiple gameplay thunk instances can't be run simultaneously
        dispatch(setIsRunning(true));

        // Get the mapState, which stores the location of dynamic agents, as well as data on whether the game is WON or LOST
        if (!gameState.runtimeTasks.isMapStateFetched) {
            await gameStepActionWrapper(dispatch, gameState, 'Fetching mapState', updateMapStateThunk, {token});
            dispatch(setSteppingFinished(true));
            dispatch(setIsMapStateFetched(true));
        }
        // If the game is either WON or LOST, end the gameplay loop, and have the 'advance' thunk set up the next level
        else if (gameState.runtimeTasks.isMapStateFetched && !gameState.runtimeTasks.isMapStatusUpdated) {
            dispatch(pushTaskDescription("Checking map status"));
            if (gameResources.mapState?.map.status === "WON" || gameResources.mapState?.map.status === "LOST") {
                dispatch(setIsLevelOver(true));
                dispatch(pushTaskDescription("Map status is won, loading next level..."));
            }
            
            dispatch(setSteppingFinished(true));
            dispatch(setIsMapStatusUpdated(true));
        }
        // The GameMap is the internal object that stores all dynamic entities in a predictable manner
        else if (gameState.runtimeTasks.isMapStatusUpdated && !gameState.runtimeTasks.isGameMapUpdated) {
            gameStepActionWrapper(dispatch, gameState, 'Generating GameMap', generateGameMap);
            dispatch(setSteppingFinished(true));
            dispatch(setIsGameMapUpdated(true));
        }
        // The HeatMap is calculated for each cell based on a user input formula as well as some weight settings. Uses a custom Flood Fill algorithm
        else if (gameState.runtimeTasks.isGameMapUpdated && !gameState.runtimeTasks.isHeatMapUpdated) {
            dispatch(pushTaskDescription('Generating HeatMap'));
            dispatch(generateHeatMap({ bulletHeatSettings: userInput.bulletHeatSettings, ghostHeatSettings: userInput.ghostHeatSettings }));
            dispatch(setSteppingFinished(true));
            dispatch(setIsHeatMapUpdated(true));
        }
        // The Game Map Graph object is a graph, where each cell is a vertex, and has an edge for each of its neighboring cells which isn't an obstacle
        // The edge cost is calculated based on the heat value, and multiplied by the graphEdgeMultiplier user input value
        else if (gameState.runtimeTasks.isHeatMapUpdated && !gameState.runtimeTasks.isGameMapGraphCreated) {
            dispatch(pushTaskDescription('Generating gameMap Graph'));
            dispatch(generateGameMapGraph({ userInput }));
            dispatch(setSteppingFinished(true));
            dispatch(setIsGameMapGraphCreated(true));
        }
        // The Game Map Graph is handed over to dijstra.js to give back the shortest path to the nearest treasure, taking into account the edge weights
        else if (gameState.runtimeTasks.isGameMapGraphCreated && !gameState.runtimeTasks.isPathCalculated) {
            gameStepActionWrapper(dispatch, gameState, 'Calculating hero path', generateHeroPath);
            dispatch(setSteppingFinished(true));
            dispatch(setIsPathCalculated(true));
        }
        // The MOVE hero action might be overwritten under some circumstances to avoid running into a fireball, or to hit an enemy which is blocking the path
        else if (gameState.runtimeTasks.isPathCalculated && !gameState.runtimeTasks.isHeroActionSelected) {
            gameStepActionWrapper(dispatch, gameState, 'Selecting hero action', selectHeroAction);
            dispatch(setSteppingFinished(true));
            dispatch(setIsHeroActionSelected(true));
        }
        // Send the selected hero action to the remote server
        else if (gameState.runtimeTasks.isHeroActionSelected && !gameState.runtimeTasks.hasHeroActed) {
            await gameStepActionWrapper(dispatch, gameState, 'Performing hero action', performHeroActionThunk, { gameResources });
            dispatch(setSteppingFinished(true));
            dispatch(setHasHeroActed(true));
        }
        // Reset all the variables, so that the gameplay loop can start over
        else if (gameState.runtimeTasks.hasHeroActed) {
            dispatch(setSteppingFinished(true));

            dispatch(pushTaskDescription("Resetting main loop"));
            dispatch(setIsMapStateFetched(false));
            dispatch(setIsMapStatusUpdated(false));
            dispatch(setIsGameMapUpdated(false));
            dispatch(setIsHeatMapUpdated(false));
            dispatch(setIsGameMapGraphCreated(false));
            dispatch(setIsPathCalculated(false));
            dispatch(setIsHeroActionSelected(false));
            dispatch(setHasHeroActed(false));
            dispatch(pushTaskDescription("Resetting main loop finished"));
        }

        dispatch(setSteppingFinished(true));
        dispatch(setIsRunning(false));
    };

export default runGameplayLoopThunk;
