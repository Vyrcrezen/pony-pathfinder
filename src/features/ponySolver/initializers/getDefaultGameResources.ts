import _ from "lodash";
import GameResources from "../types/GameResources";
import getDefaultGameMap from "./getDefaultGameMap";
import PlaythroughState from "../types/PlaythroughState";

export default function getDefaultGameResources(Options?: {token?: string, playthroughState?: PlaythroughState}) {
    const defaultGameResources: GameResources = {
        token: Options?.token ?? "",
        mapState: undefined,
        mapResources: undefined,
        approveHeroTurnResponse: undefined,
        playthroughState: Options?.playthroughState ?? undefined,
        baseMap: [],
        heatMap: [],
        gameMap: getDefaultGameMap(),
        gameMapGraph: {},
    };

    return _.cloneDeep(defaultGameResources);
}
