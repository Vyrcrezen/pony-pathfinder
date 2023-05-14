import initialGameResources from "./reducers/nested/initialGameResources";
import initialGameState from "./reducers/nested/initialGameState";
import PonySolverStore from "./types/PonySolverStore";

const initialPonyStoreState: PonySolverStore = {
    resources: initialGameResources,
    state: initialGameState
};

export default initialPonyStoreState;
