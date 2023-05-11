import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../global/redux/hooks";
import initializeGameStateThunk from "../redux/reducers/thunks/pipeline/initializeGameStateThunk";


const GetNextAction: React.FC = () => {
    const state = useAppSelector((state) => state.ponySolver);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (state.isPlaying) {
            if(!state.gameplayState.isInitialized && !state.gameplayState.isBeingInitialized) {
                dispatch(initializeGameStateThunk({ token: state.token }));
            }
        }
    }, [state.isPlaying, state.mapState, state.mapResources, state.obstacleMap]);
    return null;
};

export default GetNextAction;
