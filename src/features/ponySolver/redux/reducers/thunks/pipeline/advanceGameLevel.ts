import { AppDispatch } from "../../../../../../global/redux/store";
import GameState from "../../../../types/GameState";

import GameResources from "../../../../types/GameResources";
import { resetLevelState, setIsAdvancingLevel, setIsNextLevelReady, setIsPlaythroughStateUpdated, setSteppingFinished } from "../../gameStateSlice";
import gameStepActionWrapper from "../wrapperThunk/gameStepWrapperThunk";
import updatePlaythroughStateThunk from "../apiThunk/updatePlaythroughStateThunk";
import postNextLevelThunk from "../apiThunk/postNextLevelThunk";
import postResetLevelThunk from "../apiThunk/postResetLevelThunk";
import { resetLevelResources } from "../../gameResourcesSlice";

/**
 * Performs tasks like requesting the current Playthrough State, sending a request for the next level and resetting internal variables for the initialization phase
 * @param param0 an object like: `{ gameState: GameState, gameResources: GameResources }`, where `GameState` and `GameResources` are from the Redux store
 */
const advanceGameLevel =
    ({ gameState, gameResources }: { gameState: GameState, gameResources: GameResources }) => async (dispatch: AppDispatch) => {

        const { token } = gameResources;

        dispatch(setIsAdvancingLevel(true));

        // Update the internal copy of the playthrough state, which holds the level number as well
        if (!gameState.advanceTasks.isPlaythroughStateUpdated) {
            await gameStepActionWrapper(dispatch, gameState, 'Updating playthrough state', updatePlaythroughStateThunk, { token });
            dispatch(setSteppingFinished(true));
            dispatch(setIsPlaythroughStateUpdated(true));
        }
        // Get the next level, based on whether the current level was WON or LOST
        else if (gameState.advanceTasks.isPlaythroughStateUpdated && !gameState.advanceTasks.isNextLevelReady) {
            if ( gameResources.mapState?.map.status === "WON" ) await gameStepActionWrapper(dispatch, gameState, 'Getting next level', postNextLevelThunk, { token });
            else await gameStepActionWrapper(dispatch, gameState, 'Resetting current level :(', postResetLevelThunk, { token });
            
            dispatch(setSteppingFinished(true));
            dispatch(setIsNextLevelReady(true));
        }
        // Reset internal variables for the initiazliation phase
        else if(gameState.advanceTasks.isNextLevelReady) {
            dispatch(resetLevelState({ taskLog: gameState.taskLog, isPlaying: gameState.isPlaying }));
            dispatch(resetLevelResources({ keepPlaythroughState: true }));
            dispatch(setSteppingFinished(true));
        }

        dispatch(setIsAdvancingLevel(false));

    };

export default advanceGameLevel;
