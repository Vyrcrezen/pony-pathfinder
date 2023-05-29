import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../global/redux/hooks";
import initializeGameStateThunk from "../redux/reducers/thunks/pipeline/initializeGameLevelThunk";
import runGameplayLoopThunk from "../redux/reducers/thunks/pipeline/runGameplayLoopThunk";
import advanceGameLevel from "../redux/reducers/thunks/pipeline/advanceGameLevel";

/**
 * 
 * @returns A React component without any visual element. React needs every hook call to be inside a React component, so that it can keep track of the virtual DOM.
 */
const GameSolver: React.FC = () => {
    const state = useAppSelector((state) => state.ponySolver);
    const dispatch = useAppDispatch();

    // This hook is called whenever the game's itnernal states change
    useEffect(() => {
        // If either playing, or if a new step was requested
        if (state.state.isPlaying || (state.state.isStepping && !state.state.isStepFinished)) {
            // The first phase of the game is the initialization phase
            if(!state.state.isInitialized && !state.state.isBeingInitialized) {
                dispatch(initializeGameStateThunk({ gameState: state.state, gameResources: state.resources }));
            }
            // The second phase is the gamaplay loop, which follows the initialization phase
            else if(state.state.isInitialized && !state.state.isRunning && !state.state.isLevelOver) {
                dispatch(runGameplayLoopThunk({ gameState: state.state, gameResources: state.resources, userInput: state.userInput }));
            }
            // The advance phase is the final phase, which is reposnsible for requesting the next level and preparing the internal states and values for the next initialization phase
            else if (state.state.isLevelOver && !state.state.isAdvancingLevel && !state.state.isAdvancingFinished) {
                dispatch(advanceGameLevel({ gameState: state.state, gameResources: state.resources }))
            }
        }
    }, [state.state]);
    return null;
};

export default GameSolver;
