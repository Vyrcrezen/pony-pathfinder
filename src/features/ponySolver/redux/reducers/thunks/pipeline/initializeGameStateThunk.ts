import { generateObstacleMap, gsPushTaskDescription, gsSetisBeingInitialized, gsSetisInitialized } from "../../ponySolverSlice";
import updateMapStateThunk from "../fetchDataThunk/updateMapStateThunk";
import { AppDispatch } from "../../../../../../global/redux/store";
import updateMapResourceThunk from "../fetchDataThunk/updateMapResourceThunk";

const initializeGameStateThunk = ({token}: {token: string}) => async (dispatch: AppDispatch) => {

    dispatch(gsSetisBeingInitialized(true));

    dispatch(gsPushTaskDescription("Fetching mapState"));
    await dispatch(updateMapStateThunk({ token }));
    dispatch(gsPushTaskDescription("mapState Loaded"));

    dispatch(gsPushTaskDescription("Fetching mapResources"));
    await dispatch(updateMapResourceThunk({ token }))
    dispatch(gsPushTaskDescription("mapState Loaded"));

    dispatch(gsPushTaskDescription("generating obstacleMap"));
    await dispatch(generateObstacleMap());
    dispatch(gsPushTaskDescription("obstacleMap generated"));

    dispatch(gsSetisBeingInitialized(false));
    dispatch(gsSetisInitialized(true));
}

export default initializeGameStateThunk;
