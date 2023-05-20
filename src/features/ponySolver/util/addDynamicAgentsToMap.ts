import getDefaultGameMap from "../initializers/getDefaultGameMap";
import GameMap from "../types/GameMap";
import MapEntities from "../types/MapEntities";
import MapState from "../types/MapState";
import Treasure from "../types/Treasure";

export default function addDynamicAgentsToMap(
    mapState: MapState
): GameMap {
    // const updatedMap = JSON.parse(JSON.stringify(obstacleMap)) as number[][];

    const updatedMap: GameMap = getDefaultGameMap();

    // Adding Treasures
    if (mapState && mapState.map.treasures) {
        updatedMap.treasures = mapState.map.treasures;
    }

    // Adding Enemies
    if (mapState && mapState.map.enemies) {
        updatedMap.enemies = mapState.map.enemies;
    }

    // Adding Bullets
    if (mapState && mapState.map.bullets) {
        updatedMap.bullets = mapState.map.bullets;
    }

    // Adding Hero
    if (mapState && mapState.heroes) {
        updatedMap.heroes = mapState.heroes.map(hero => ({ ...hero, heroAction: 'NOTHING' }));
    }

    return updatedMap;
}
