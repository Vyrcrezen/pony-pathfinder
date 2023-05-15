import MapEntities from "../types/MapEntities";
import MapState from "../types/MapState";

export default function addDynamicAgentsToMap(
    obstacleMap: number[][],
    mapState: MapState
) {
    const updatedMap = JSON.parse(JSON.stringify(obstacleMap));

    // Adding Treasures
    if (mapState && mapState.map.treasures) {
        mapState.map.treasures.forEach((treasure) => {
            updatedMap[treasure.position.x][treasure.position.y] =
            treasure.collectedByHeroId ? MapEntities.COLLECTED_TREASURE : MapEntities.TREASURE;
        });
    }

    // Adding Enemies
    if (mapState && mapState.map.enemies) {
        mapState.map.enemies.forEach((enemy) => {
            updatedMap[enemy.position.x][enemy.position.y] = MapEntities.ENEMY;
        });
    }

    // Adding Bullets
    if (mapState && mapState.map.bullets) {
        mapState.map.bullets.forEach((bullet) => {
            updatedMap[bullet.position.x][bullet.position.y] =
                MapEntities.BULLET;
        });
    }

    // Adding Hero
    if (mapState && mapState.heroes) {
        mapState.heroes.forEach((hero) => {
            updatedMap[hero.position.x][hero.position.y] = MapEntities.HERO;
        });
    }

    return updatedMap;
}
