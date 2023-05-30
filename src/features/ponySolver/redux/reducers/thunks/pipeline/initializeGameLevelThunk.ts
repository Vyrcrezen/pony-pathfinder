import updateMapStateThunk from "../apiThunk/updateMapStateThunk";
import { AppDispatch } from "../../../../../../global/redux/store";
import {setIsBaseMapGenerated, setIsBeingInitialized, setIsInitMapStateFetched, setIsInitialized, setIsMapResourcesFetched, setSteppingFinished} from "../../gameStateSlice";
import GameState from "../../../../types/GameState";
import gameStepActionWrapper from "../wrapperThunk/gameStepWrapperThunk";
import { generateBaseMap } from "../../gameResourcesSlice";
import updateMapResourceThunk from "../apiThunk/updateMapResourceThunk";
import GameResources from "../../../../types/GameResources";

/**
 * Performs game setup tasks like: fetching the `mapResources` and `mapState`, as well as generating the obstacle map, which won't change throughout the level
 * @param param0 an object like: `{ gameState: GameState, gameResources: GameResources }`, where `GameState` and `GameResources` are from the Redux store
 */
const initializeGameStateThunk =
    ({ gameState, gameResources }: { gameState: GameState, gameResources: GameResources }) => async (dispatch: AppDispatch) => {

        const { token } = gameResources;

        // Make sure that multiple initialization thunk instances can't be run simultaneously
        dispatch(setIsBeingInitialized(true));

        if (!gameState.initTasks.isMapResourcesFetched) {
            await gameStepActionWrapper(dispatch, gameState, 'Fetching mapResources', updateMapResourceThunk, {token});
            dispatch(setSteppingFinished(true));
            dispatch(setIsMapResourcesFetched(true));
        }
        else if (gameState.initTasks.isMapResourcesFetched && !gameState.initTasks.isInitMapStateFetched) {
            await gameStepActionWrapper(dispatch, gameState, 'Fetching initial mapState', updateMapStateThunk, {token});
            dispatch(setSteppingFinished(true));
            dispatch(setIsInitMapStateFetched(true));
        }
        
        else if (gameState.initTasks.isInitMapStateFetched && !gameState.initTasks.isBaseMapGenerated) {
            gameStepActionWrapper(dispatch, gameState, 'Generating baseMap', generateBaseMap);
            dispatch(setSteppingFinished(true));
            dispatch(setIsBaseMapGenerated(true));

            dispatch(setIsInitialized(true));
        }

        dispatch(setIsBeingInitialized(false));
    };

export default initializeGameStateThunk;
