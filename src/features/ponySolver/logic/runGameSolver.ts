import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../global/redux/hooks";
import initializeGameStateThunk from "../redux/reducers/thunks/pipeline/initializeGameStateThunk";


const GetNextAction: React.FC = () => {
    const state = useAppSelector((state) => state.ponySolver);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (state.state.isPlaying) {
            if(!state.state.isInitialized && !state.state.isBeingInitialized) {
                console.log('dispatching initializeGameStateThunk');
                dispatch(initializeGameStateThunk({ token: state.resources.token }));
            }
        }
    }, [state.state]);
    return null;
};

export default GetNextAction;
