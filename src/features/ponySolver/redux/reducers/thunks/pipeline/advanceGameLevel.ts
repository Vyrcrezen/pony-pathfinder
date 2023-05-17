import { AppDispatch } from "../../../../../../global/redux/store";
import GameState from "../../../../types/GameState";

import GameResources from "../../../../types/GameResources";
import { setIsAdvancingFinished, setIsAdvancingLevel, setIsBaseMapGenerated, setIsInitMapStateFetched, setIsInitialized, setIsMapResourcesFetched, setIsNextLevelReady, setIsPlaythroughStateUpdated, setSteppingFinished } from "../../gameStateSlice";
import gameStepActionWrapper from "../wrapperThunk/gameStepWrapperThunk";
import updatePlaythroughStateThunk from "../apiThunk/updatePlaythroughStateThunk";
import postNextLevelThunk from "../apiThunk/postNextLevelThunk";
import postResetLevelThunk from "../apiThunk/postResetLevelThunk";

const advanceGameLevel =
    ({ gameState, gameResources }: { gameState: GameState, gameResources: GameResources }) => async (dispatch: AppDispatch) => {

        const { token } = gameResources;

        dispatch(setIsAdvancingLevel(true));

        if (!gameState.advanceTasks.isPlaythroughStateUpdated) {
            await gameStepActionWrapper(dispatch, gameState, 'Updating playthrough state', updatePlaythroughStateThunk, { token });
            dispatch(setSteppingFinished(true));
            dispatch(setIsPlaythroughStateUpdated(true));
        }
        else if (gameState.advanceTasks.isPlaythroughStateUpdated && !gameState.advanceTasks.isNextLevelReady) {
            if ( gameResources.mapState?.map.status === "WON" ) await gameStepActionWrapper(dispatch, gameState, 'Getting next level', postNextLevelThunk, { token });
            else await gameStepActionWrapper(dispatch, gameState, 'Resetting current level :(', postResetLevelThunk, { token });
            
            dispatch(setSteppingFinished(true));
            dispatch(setIsNextLevelReady(true));

            dispatch(setIsAdvancingFinished(true));
            dispatch(setIsInitialized(false));

            dispatch(setIsMapResourcesFetched(false));
            dispatch(setIsInitMapStateFetched(false));
            dispatch(setIsBaseMapGenerated(false));
        }

        dispatch(setIsAdvancingLevel(false));

    };

export default advanceGameLevel;
