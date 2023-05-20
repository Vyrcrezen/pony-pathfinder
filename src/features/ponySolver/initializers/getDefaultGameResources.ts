import _ from "lodash";
import GameResources from "../types/GameResources";
import getDefaultGameMap from "./getDefaultGameMap";

export default function getDefaultGameResources(token?: string) {
    const defaultGameResources: GameResources = {
        token: token ?? "",
        mapState: undefined,
        mapResources: undefined,
        approveHeroTurnResponse: undefined,
        baseMap: [],
        heatMap: [],
        gameMap: getDefaultGameMap(),
        gameMapGraph: {},
    };

    return _.cloneDeep(defaultGameResources);
}
