import { generateObstacleMap} from "../../gameResourcesSlice";
import updateMapStateThunk from "../fetchDataThunk/updateMapStateThunk";
import { AppDispatch } from "../../../../../../global/redux/store";
import updateMapResourceThunk from "../fetchDataThunk/updateMapResourceThunk";
import { gsPushTaskDescription, gsSetIsBeingInitialized, gsSetIsInitialized } from "../../gameStateSlice";

const initializeGameStateThunk = ({token}: {token: string}) => async (dispatch: AppDispatch) => {

    dispatch(gsSetIsBeingInitialized(true));

    dispatch(gsPushTaskDescription("Fetching mapState"));
    await dispatch(updateMapStateThunk({ token }));
    dispatch(gsPushTaskDescription("mapState Loaded"));

    dispatch(gsPushTaskDescription("Fetching mapResources"));
    await dispatch(updateMapResourceThunk({ token }))
    dispatch(gsPushTaskDescription("mapResources Loaded"));

    dispatch(gsPushTaskDescription("generating obstacleMap"));
    await dispatch(generateObstacleMap());
    dispatch(gsPushTaskDescription("obstacleMap generated"));

    dispatch(gsSetIsBeingInitialized(false));
    dispatch(gsSetIsInitialized(true));
}

export default initializeGameStateThunk;
