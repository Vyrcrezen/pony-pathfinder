import updateMapStateThunk from "../apiThunk/updateMapStateThunk";
import { AppDispatch } from "../../../../../../global/redux/store";
import {setHasHeroActed, setIsBaseMapGenerated, setIsBeingInitialized, setIsGameMapGraphCreated, setIsGameMapUpdated, setIsHeatMapUpdated, setIsInitMapStateFetched, setIsInitialized, setIsLevelOver, setIsMapResourcesFetched, setIsMapStateFetched, setIsMapStatusUpdated, setIsPathCalculated, setSteppingFinished} from "../../gameStateSlice";
import GameState from "../../../../types/GameState";
import gameStepActionWrapper from "../wrapperThunk/gameStepWrapperThunk";
import { generateBaseMap } from "../../gameResourcesSlice";
import updateMapResourceThunk from "../apiThunk/updateMapResourceThunk";
import GameResources from "../../../../types/GameResources";

const initializeGameStateThunk =
    ({ gameState, gameResources }: { gameState: GameState, gameResources: GameResources }) => async (dispatch: AppDispatch) => {

        const { token } = gameResources;

        dispatch(setIsBeingInitialized(true));

        if (!gameState.initTasks.isMapResourcesFetched) {
            await gameStepActionWrapper(dispatch, gameState, 'Fetching mapResources', updateMapResourceThunk, {token});
            dispatch(setSteppingFinished(true));
            dispatch(setIsMapResourcesFetched(true));
        }
        if (gameState.initTasks.isMapResourcesFetched && !gameState.initTasks.isInitMapStateFetched) {
            await gameStepActionWrapper(dispatch, gameState, 'Fetching initial mapState', updateMapStateThunk, {token});
            dispatch(setSteppingFinished(true));
            dispatch(setIsInitMapStateFetched(true));
        }
        
        if (gameState.initTasks.isInitMapStateFetched && !gameState.initTasks.isBaseMapGenerated) {
            gameStepActionWrapper(dispatch, gameState, 'Generating baseMap', generateBaseMap);
            dispatch(setSteppingFinished(true));
            dispatch(setIsBaseMapGenerated(true));

            dispatch(setIsInitialized(true));

            // Reset the next game logic states to default, to be sure
            dispatch(setIsLevelOver(false));
            dispatch(setIsMapStateFetched(false));
            dispatch(setIsMapStatusUpdated(false));
            dispatch(setIsGameMapUpdated(false));
            dispatch(setIsHeatMapUpdated(false));
            dispatch(setIsGameMapGraphCreated(false));
            dispatch(setIsPathCalculated(false));
            dispatch(setHasHeroActed(false));
        }

        dispatch(setIsBeingInitialized(false));
    };

export default initializeGameStateThunk;
