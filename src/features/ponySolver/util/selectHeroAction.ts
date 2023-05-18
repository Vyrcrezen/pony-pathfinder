import Enemy from "../types/Enemy";
import GameResources from "../types/GameResources";
import HeroAction from "../types/HeroAction";
import getMovementDirection from "./getMovementDirection";

export default function selectHeroAction({ heroPath, gameResources }: { heroPath: string[], gameResources: GameResources }) {

    const pathCoordinates = heroPath.map(graphVertex => ({ x: +graphVertex.split('-')[0], y: +graphVertex.split('-')[1] }));

    console.log('Now selecting hero action');
    console.log('intended hero path:');
    console.log(heroPath);
    console.log(gameResources);

    // Determine the intended movement
    let intendedAction: HeroAction = getMovementDirection(pathCoordinates[0], pathCoordinates[1]);

    let targetEnemy: Enemy;
    // Find enemies to hit
    gameResources.mapState?.map.enemies.forEach(enemy => {
        if (enemy.health > 0) {
            if (pathCoordinates[0].x + 2 === enemy.position.x && pathCoordinates[0].y === enemy.position.y && intendedAction === "MOVE_RIGHT") intendedAction = "KICK_RIGHT";
            else if (pathCoordinates[0].x - 2 === enemy.position.x && pathCoordinates[0].y === enemy.position.y && intendedAction === "MOVE_LEFT") intendedAction = "KICK_LEFT";
            else if (pathCoordinates[0].y + 2 === enemy.position.y && pathCoordinates[0].x === enemy.position.x && intendedAction === "MOVE_UP") intendedAction = "KICK_UP";
            else if (pathCoordinates[0].y - 2 === enemy.position.y && pathCoordinates[0].x === enemy.position.x && intendedAction === "MOVE_DOWN") intendedAction = "KICK_DOWN";
        }
    });

    // Defend against bullets that are next to the hero, and they are heading towards each other
    gameResources.mapState?.map.bullets.forEach(bullet => {
        if (
            (pathCoordinates[0].x + 1 === bullet.position.x && pathCoordinates[0].y === bullet.position.y && bullet.direction === "LEFT" && intendedAction === "MOVE_RIGHT")
            || (pathCoordinates[0].x - 1 === bullet.position.x && pathCoordinates[0].y === bullet.position.y && bullet.direction === "RIGHT" && intendedAction === "MOVE_LEFT")
            || (pathCoordinates[0].y + 1 === bullet.position.y && pathCoordinates[0].x === bullet.position.x && bullet.direction === "UP" && intendedAction === "MOVE_DOWN")
            || (pathCoordinates[0].y - 1 === bullet.position.y && pathCoordinates[0].x === bullet.position.x && bullet.direction === "DOWN" && intendedAction === "MOVE_UP")
        ) intendedAction = "USE_SHIELD";
    });

    // Prevent running to a position, where the bullet is going to be next turn, if they are heading towards each other
    gameResources.mapState?.map.bullets.forEach(bullet => {
        if (
            (pathCoordinates[0].x + 2 === bullet.position.x && pathCoordinates[0].y === bullet.position.y && bullet.direction === "LEFT" && intendedAction === "MOVE_RIGHT")
            || (pathCoordinates[0].x - 2 === bullet.position.x && pathCoordinates[0].y === bullet.position.y && bullet.direction === "RIGHT" && intendedAction === "MOVE_LEFT")
            || (pathCoordinates[0].y + 2 === bullet.position.y && pathCoordinates[0].x === bullet.position.x && bullet.direction === "UP" && intendedAction === "MOVE_DOWN")
            || (pathCoordinates[0].y - 2 === bullet.position.y && pathCoordinates[0].x === bullet.position.x && bullet.direction === "DOWN" && intendedAction === "MOVE_UP")
        ) intendedAction = "USE_SHIELD";
    });

    // Prevent running into bullets that are next to the hero diagonally
    gameResources.mapState?.map.bullets.forEach(bullet => {
        if (
            (pathCoordinates[0].x + 1 === bullet.position.x && pathCoordinates[0].y + 1 === bullet.position.y && bullet.direction === "DOWN" && intendedAction === "MOVE_RIGHT")
            || (pathCoordinates[0].x + 1 === bullet.position.x && pathCoordinates[0].y + 1 === bullet.position.y && bullet.direction === "LEFT" && intendedAction === "MOVE_UP")

            || (pathCoordinates[0].x + 1 === bullet.position.x && pathCoordinates[0].y - 1 === bullet.position.y && bullet.direction === "UP" && intendedAction === "MOVE_RIGHT")
            || (pathCoordinates[0].x + 1 === bullet.position.x && pathCoordinates[0].y - 1 === bullet.position.y && bullet.direction === "LEFT" && intendedAction === "MOVE_DOWN")

            || (pathCoordinates[0].y - 1 === bullet.position.y && pathCoordinates[0].x - 1  === bullet.position.x && bullet.direction === "RIGHT" && intendedAction === "MOVE_DOWN")
            || (pathCoordinates[0].y - 1 === bullet.position.y && pathCoordinates[0].x - 1  === bullet.position.x && bullet.direction === "UP" && intendedAction === "MOVE_LEFT")


            || (pathCoordinates[0].y + 1 === bullet.position.y && pathCoordinates[0].x - 1 === bullet.position.x && bullet.direction === "DOWN" && intendedAction === "MOVE_LEFT")
            || (pathCoordinates[0].y + 1 === bullet.position.y && pathCoordinates[0].x - 1 === bullet.position.x && bullet.direction === "RIGHT" && intendedAction === "MOVE_UP")
        ) intendedAction = "USE_SHIELD";
    });

    console.log(`CHOSEN ACTION: ${intendedAction}`);
    return intendedAction;
}
