import { generateBaseMap, generateGameMap, generateGameMapGraph, generateHeatMap, generateHeroPath, selectHeroAction } from "../../gameResourcesSlice";
import updateMapStateThunk from "../apiThunk/updateMapStateThunk";
import { AppDispatch } from "../../../../../../global/redux/store";
import {setHasHeroActed, setIsGameMapGraphCreated, setIsGameMapUpdated, setIsLevelOver, setIsMapStateFetched, setIsPathCalculated, setIsRunning, setSteppingFinished, pushTaskDescription, setIsMapStatusUpdated, setIsAdvancingFinished, setIsNextLevelReady, setIsPlaythroughStateUpdated, setIsHeatMapUpdated, setIsHeroActionSelected} from "../../gameStateSlice";
import GameState from "../../../../types/GameState";
import gameStepActionWrapper from "../wrapperThunk/gameStepWrapperThunk";
import performHeroActionThunk from "../apiThunk/performHeroActionThunk";
import GameResources from "../../../../types/GameResources";
import UserInput from "../../../../types/UserInput";

const runGameplayLoopThunk =
    ({ gameState, gameResources, userInput }: { gameState: GameState, gameResources: GameResources, userInput: UserInput }) => async (dispatch: AppDispatch) => {

        const { token } = gameResources;

        dispatch(setIsRunning(true));

        if (!gameState.runtimeTasks.isMapStateFetched) {
            await gameStepActionWrapper(dispatch, gameState, 'Fetching mapState', updateMapStateThunk, {token});
            dispatch(setSteppingFinished(true));
            dispatch(setIsMapStateFetched(true));
        }
        if (gameState.runtimeTasks.isMapStateFetched && !gameState.runtimeTasks.isMapStatusUpdated) {
            dispatch(pushTaskDescription("Checking map status"));
            if (gameResources.mapState?.map.status === "WON" || gameResources.mapState?.map.status === "LOST") {
                dispatch(setIsLevelOver(true));
                // dispatch(setIsAdvancingFinished(false));

                // dispatch(setIsPlaythroughStateUpdated(false));
                // dispatch(setIsNextLevelReady(false));

                dispatch(pushTaskDescription("Map status is won, loading next level..."));
            }
            
            dispatch(setSteppingFinished(true));
            dispatch(setIsMapStatusUpdated(true));
        }
        if (gameState.runtimeTasks.isMapStatusUpdated && !gameState.runtimeTasks.isGameMapUpdated) {
            gameStepActionWrapper(dispatch, gameState, 'Generating GameMap', generateGameMap);
            dispatch(setSteppingFinished(true));
            dispatch(setIsGameMapUpdated(true));
        }
        if (gameState.runtimeTasks.isGameMapUpdated && !gameState.runtimeTasks.isHeatMapUpdated) {
            dispatch(pushTaskDescription('Generating HeatMap'));
            dispatch(generateHeatMap({ bulletHeatSettings: userInput.bulletHeatSettings, ghostHeatSettings: userInput.ghostHeatSettings }));
            dispatch(setSteppingFinished(true));
            dispatch(setIsHeatMapUpdated(true));
        }
        if (gameState.runtimeTasks.isHeatMapUpdated && !gameState.runtimeTasks.isGameMapGraphCreated) {
            gameStepActionWrapper(dispatch, gameState, 'Generating gameMap Graph', generateGameMapGraph);
            dispatch(setSteppingFinished(true));
            dispatch(setIsGameMapGraphCreated(true));
        }
        if (gameState.runtimeTasks.isGameMapGraphCreated && !gameState.runtimeTasks.isPathCalculated) {
            gameStepActionWrapper(dispatch, gameState, 'Calculating hero path', generateHeroPath);
            dispatch(setSteppingFinished(true));
            dispatch(setIsPathCalculated(true));
        }
        if (gameState.runtimeTasks.isPathCalculated && !gameState.runtimeTasks.isHeroActionSelected) {
            gameStepActionWrapper(dispatch, gameState, 'Selecting hero action', selectHeroAction);
            dispatch(setSteppingFinished(true));
            dispatch(setIsHeroActionSelected(true));
        }
        if (gameState.runtimeTasks.isHeroActionSelected && !gameState.runtimeTasks.hasHeroActed) {
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
