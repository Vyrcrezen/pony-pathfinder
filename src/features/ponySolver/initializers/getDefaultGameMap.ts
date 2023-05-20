import _ from "lodash";
import GameMap from "../types/GameMap";

export default function getDefaultGameMap() {
    const defaultGameMap: GameMap = {
        bullets: [],
        enemies: [],
        heroes: [],
        treasures: []
    }
    
    return _.cloneDeep(defaultGameMap);
};
