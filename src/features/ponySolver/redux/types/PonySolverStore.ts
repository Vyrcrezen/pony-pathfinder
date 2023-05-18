import GameResources from "../../types/GameResources";
import GameState from "../../types/GameState"
import UserInput from "../../types/UserInput";

export default interface PonySolverStore {
    state: GameState;
    resources: GameResources;
    userInput: UserInput
}
