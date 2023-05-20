import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../global/redux/hooks";
import initializeGameStateThunk from "../redux/reducers/thunks/pipeline/initializeGameLevelThunk";
import runGameplayLoopThunk from "../redux/reducers/thunks/pipeline/runGameplayLoopThunk";
import advanceGameLevel from "../redux/reducers/thunks/pipeline/advanceGameLevel";


const GameSolver: React.FC = () => {
    const state = useAppSelector((state) => state.ponySolver);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (state.state.isPlaying || (state.state.isStepping && !state.state.isStepFinished)) {
            if(!state.state.isInitialized && !state.state.isBeingInitialized) {
                console.log('dispatching initializeGameStateThunk');
                dispatch(initializeGameStateThunk({ gameState: state.state, gameResources: state.resources }));
            }
            else if(state.state.isInitialized && !state.state.isRunning && !state.state.isLevelOver) {
                console.log('dispatching runGameplayLoopThunk');
                dispatch(runGameplayLoopThunk({ gameState: state.state, gameResources: state.resources }));
            }
            else if (state.state.isLevelOver && !state.state.isAdvancingLevel && !state.state.isAdvancingFinished) {
                dispatch(advanceGameLevel({ gameState: state.state, gameResources: state.resources }))
            }
        }
    }, [state.state]);
    return null;
};

export default GameSolver;
