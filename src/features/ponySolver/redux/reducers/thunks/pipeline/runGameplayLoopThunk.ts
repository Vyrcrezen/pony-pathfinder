import { generateBaseMap, generateGameMap, generateGameMapGraph, generateHeroPath } from "../../gameResourcesSlice";
import updateMapStateThunk from "../apiThunk/updateMapStateThunk";
import { AppDispatch } from "../../../../../../global/redux/store";
import updateMapResourceThunk from "../apiThunk/updateMapResourceThunk";
import {setHasHeroActed, setIsBeingInitialized, setIsGameMapGraphCreated, setIsGameMapUpdated, setIsLevelOver, setIsMapStateFetched, setIsMapResourcesFetched, setIsPathCalculated, setIsRunning, setSteppingFinished, pushTaskDescription, setIsMapStatusUpdated, setIsAdvancingFinished, setIsNextLevelReady, setIsPlaythroughStateUpdated} from "../../gameStateSlice";
import GameState from "../../../../types/GameState";
import gameStepActionWrapper from "../wrapperThunk/gameStepWrapperThunk";
import getClosestTarget from "../../../../util/getClosestTarget";
import performHeroActionThunk from "../apiThunk/performHeroActionThunk";
import GameResources from "../../../../types/GameResources";

const runGameplayLoopThunk =
    ({ gameState, gameResources }: { gameState: GameState, gameResources: GameResources }) => async (dispatch: AppDispatch) => {

        const { token } = gameResources;

        dispatch(setIsRunning(true));

        if (!gameState.runtimeTasks.isMapStateFetched) {
            await gameStepActionWrapper(dispatch, gameState, 'Fetching mapState', updateMapStateThunk, {token});
            dispatch(setSteppingFinished(true));
            dispatch(setIsMapStateFetched(true));
        }
        if (gameState.runtimeTasks.isMapStateFetched && !gameState.runtimeTasks.isMapStatusUpdated) {
            dispatch(pushTaskDescription("Checking map status"));
            if (gameResources.mapState?.map.status === "WON") {
                dispatch(setIsLevelOver(true));
                dispatch(setIsAdvancingFinished(false));

                dispatch(setIsPlaythroughStateUpdated(false));
                dispatch(setIsNextLevelReady(false));

                dispatch(pushTaskDescription("Map status is won, laoding next level..."));
                
            }
            
            dispatch(setSteppingFinished(true));
            dispatch(setIsMapStatusUpdated(true));
        }
        if (gameState.runtimeTasks.isMapStatusUpdated && !gameState.runtimeTasks.isGameMapUpdated) {
            gameStepActionWrapper(dispatch, gameState, 'Generating GameMap', generateGameMap);
            dispatch(setSteppingFinished(true));
            dispatch(setIsGameMapUpdated(true));
        }
        if (gameState.runtimeTasks.isGameMapUpdated && !gameState.runtimeTasks.isGameMapGraphCreated) {
            gameStepActionWrapper(dispatch, gameState, 'Generating gameMap Graph', generateGameMapGraph);
            dispatch(setSteppingFinished(true));
            dispatch(setIsGameMapGraphCreated(true));
        }
        if (gameState.runtimeTasks.isGameMapGraphCreated && !gameState.runtimeTasks.isPathCalculated) {
            gameStepActionWrapper(dispatch, gameState, 'Calculating hero path', generateHeroPath);
            dispatch(setSteppingFinished(true));
            dispatch(setIsPathCalculated(true));
        }
        if (gameState.runtimeTasks.isPathCalculated && !gameState.runtimeTasks.hasHeroActed) {
            gameStepActionWrapper(dispatch, gameState, 'Performing hero action', performHeroActionThunk, { gameResources });
            dispatch(setSteppingFinished(true));
            dispatch(setHasHeroActed(true));
        }
        if (gameState.runtimeTasks.hasHeroActed) {
            dispatch(setSteppingFinished(true));

            dispatch(pushTaskDescription("Resetting main loop"));
            dispatch(setIsMapStateFetched(false));
            dispatch(setIsMapStatusUpdated(false));
            dispatch(setIsGameMapUpdated(false));
            dispatch(setIsGameMapGraphCreated(false));
            dispatch(setIsPathCalculated(false));
            dispatch(setHasHeroActed(false));
            dispatch(pushTaskDescription("Resetting main loop finished"));
        }

        dispatch(setSteppingFinished(true));
        dispatch(setIsRunning(false));
    };

export default runGameplayLoopThunk;
