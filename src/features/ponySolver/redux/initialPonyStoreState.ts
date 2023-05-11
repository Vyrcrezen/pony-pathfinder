import PonySolverStore from "./types/PonySolverStore";

const initialPonyStoreState: PonySolverStore = {
    token: "",
    gameplayState: {
        isInitialized: false,
        isBeingInitialized: false,
        tasks: ["Not started"],
    },
    isPlaying: false,
    mapState: undefined,
    mapResources: undefined,
    obstacleMap: undefined,
};

export default initialPonyStoreState;
