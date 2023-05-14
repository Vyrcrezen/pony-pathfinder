import GameResources from "../../types/GameResources";
import GameState from "../../types/GameState"

export default interface PonySolverStore {
    state: GameState;
    resources: GameResources;
}
