import initialGameResources from "./reducers/nested/initialGameResources";
import initialGameState from "./reducers/nested/initialGameState";
import initialUserInput from "./reducers/nested/initialUserInput";
import PonySolverStore from "./types/PonySolverStore";

const initialPonyStoreState: PonySolverStore = {
    resources: initialGameResources,
    state: initialGameState,
    userInput: initialUserInput
};

export default initialPonyStoreState;
