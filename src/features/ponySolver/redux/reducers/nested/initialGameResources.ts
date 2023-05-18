import GameResources from "../../../types/GameResources";

const initialGameResources: GameResources = {
    token: "",
    mapState: undefined,
    mapResources: undefined,
    approveHeroTurnResponse: undefined,
    baseMap: [],
    heatMap: [],
    gameMap: [],
    gameMapGraph: {},
    heroPath: undefined
}

export default initialGameResources;