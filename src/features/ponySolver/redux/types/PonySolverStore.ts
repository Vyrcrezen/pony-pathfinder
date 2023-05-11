import GameplayState from "../../types/GameplayState"
import MapResource from "../../types/MapResource"
import MapState from "../../types/MapState"

export default interface PonySolverStore {
    token: string,
    isPlaying: boolean,
    gameplayState: GameplayState;
    mapState?: MapState,
    mapResources?: MapResource,
    obstacleMap?: number[][]
}
