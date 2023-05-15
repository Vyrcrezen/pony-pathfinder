import GameResources from "../../../types/GameResources";

const initialGameResources: GameResources = {
    token: "",
    mapState: undefined,
    mapResources: undefined,
    approveHeroTurnResponse: undefined,
    baseMap: [],
    gameMap: [],
    gameMapGraph: {},
    heroPath: undefined
}

export default initialGameResources;