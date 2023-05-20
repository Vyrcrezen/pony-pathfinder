import Graph from "node-dijkstra";
import MapResource from "./MapResource";
import MapState from "./MapState";
import ApproveHeroTurnResponse from "./ApproveHeroTurnResponse";
import PlaythroughState from "./PlaythroughState";
import GameMap from "./GameMap";

export default interface GameResources {
    token: string,
    mapState?: MapState,
    mapResources?: MapResource,
    approveHeroTurnResponse?: ApproveHeroTurnResponse,
    playthroughState?: PlaythroughState,
    baseMap?: number[][],
    heatMap?: number[][],
    gameMap: GameMap,
    gameMapGraph?: {
        [prop: string]: {
            [prop: string]: number;
        }
    },
    // heroPath?: string[],
}
