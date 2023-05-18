import Graph from "node-dijkstra";
import MapResource from "./MapResource";
import MapState from "./MapState";
import ApproveHeroTurnResponse from "./ApproveHeroTurnResponse";
import PlaythroughState from "./PlaythroughState";

export default interface GameResources {
    token: string,
    mapState?: MapState,
    mapResources?: MapResource,
    approveHeroTurnResponse?: ApproveHeroTurnResponse,
    playthroughState?: PlaythroughState,
    baseMap?: number[][],
    heatMap?: number[][],
    gameMap?: number[][],
    gameMapGraph?: {
        [prop: string]: {
            [prop: string]: number;
        }
    },
    heroPath?: string[],
}
