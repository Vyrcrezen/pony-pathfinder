import MapResource from "./MapResource";
import MapState from "./MapState";

export default interface GameResources {
    token: string,
    mapState?: MapState,
    mapResources?: MapResource,
    obstacleMap?: number[][]
}
