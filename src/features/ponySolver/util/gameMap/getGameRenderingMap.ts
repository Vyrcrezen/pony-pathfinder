import GameMap from "../../types/GameMap";
import GameRenderingMap from "../../types/GameRenderingMap";
import Path from "../../types/Path";
import getMovementDirection from "../getMovementDirection";


export default function getGameRenderingMap(baseMap: number[][], gameMap: GameMap) {
    const gameRenderingMap: GameRenderingMap = Array.from({length: baseMap.length}, () => new Array(baseMap[0].length));
    
    // Start by adding the obstacles
    baseMap.forEach((obstacleRow, rowIndex) => {
        obstacleRow.forEach((cell, columnIndex) => {
            gameRenderingMap[rowIndex][columnIndex] = [];
            
            if (cell === 1) {
                gameRenderingMap[rowIndex][columnIndex].push({ type: "obstacle", data: { type: 'wall' } });
            }
        })
    });

    // Add hoof tracks
    gameMap.heroes.forEach(hero => {
        if (hero.heroPath) {
            hero.heroPath.coordinatePath.forEach((heroStep, stepIndex) => {
                if (stepIndex !== 0 && stepIndex !== hero.heroPath!.coordinatePath.length - 1) {
                    const direction = getMovementDirection(heroStep, hero.heroPath!.coordinatePath[stepIndex + 1]);
                    gameRenderingMap[heroStep.x][heroStep.y].push({ type: "heroPath", data: { direction: direction, path: hero!.heroPath as Path } });
                }
            });
        }
    });

    // Add treasures
    gameMap.treasures.forEach(treasure => {
        gameRenderingMap[treasure.position.x][treasure.position.y].push({ type: "treasure", data: treasure });
    });

    // Add enemies
    gameMap.enemies.forEach(enemy => {
        gameRenderingMap[enemy.position.x][enemy.position.y].push({ type: "enemy", data: enemy });
    });

    // Add bullets
    gameMap.bullets.forEach(bullet => {
        gameRenderingMap[bullet.position.x][bullet.position.y].push({ type: "bullet", data: bullet });
    });

    // Add heroes
    gameMap.heroes.forEach(hero => {
        gameRenderingMap[hero.position.x][hero.position.y].push({ type: "hero", data: hero });
    });

    // Add hero attack locations
    gameMap.heroes.forEach(hero => {
        if (hero.heroAction === 'KICK_RIGHT') gameRenderingMap[hero.position.x + 2][hero.position.y].push({ type: "heroAttack", data: { heroId: hero.id } });
        if (hero.heroAction === 'KICK_DOWN') gameRenderingMap[hero.position.x][hero.position.y - 2].push({ type: "heroAttack", data: { heroId: hero.id } });
        if (hero.heroAction === 'KICK_LEFT') gameRenderingMap[hero.position.x - 2][hero.position.y].push({ type: "heroAttack", data: { heroId: hero.id } });
        if (hero.heroAction === 'KICK_UP') gameRenderingMap[hero.position.x][hero.position.y + 2].push({ type: "heroAttack", data: { heroId: hero.id } });
    });

    return gameRenderingMap;
}
