import importMapAssets from "../../imports/importMapAssets";
import GameRenderingCell from "../../types/GameRenderingCell";
import drawToCanvasRotated from "../drawToCanvasRotated";

/**
 * @param ctx `CanvasRenderingContext2D`, the 2d context of a canvas
 * @param columnIndex the column index inside the game map, where the currently being drawn value is
 * @param rowIndex the row index inside the game map, where the currently being drawn value is
 * @param posX the X position on the canvas, where the image is to be drawn
 * @param posY the Y position on the canvas, where the image is to be drawn
 * @param cellSize the size of the cells, assuming that they are squares 
 * @param cellValue a `discriminated union` type with a `type` property which is a string, and a `data` property which is determined by the `type` value
 * @param mapAssets an array holding the `img` elements to render
 */
export default function drawElement(ctx: CanvasRenderingContext2D, columnIndex: number, rowIndex: number, posX: number, posY: number, cellSize: number, cellValue: GameRenderingCell, mapAssets?: Awaited<ReturnType<typeof importMapAssets>>) {
    
    if (mapAssets) {

        ctx.fillStyle = 'rgb(141, 235, 207)';
        ctx.fillRect(posX, posY, cellSize, cellSize);

        // Each cell holds an array of values which it needs to draw, ranging from the enemies, to the hoofprints or the "heroAttack" value
        cellValue.forEach(value => {
            if (value.type === 'obstacle') {
                // Select the obstacle based on constant values to avoid them changing between renders
                const obstacleId = ((columnIndex + rowIndex) % 4) + 1;
                ctx.drawImage( obstacleId === 1 ? mapAssets.carOne.image : obstacleId === 2 ? mapAssets.carTwo.image : obstacleId === 3 ? mapAssets.carThree.image : mapAssets.carFour.image, posX, posY, cellSize, cellSize);
            }
            else if (value.type === 'heroPath') {
                // These are the hoofprints which show the path the hero intends to take
                const degress = value.data.direction === 'MOVE_UP' ? 0 : value.data.direction === 'MOVE_RIGHT' ? 90 : value.data.direction === 'MOVE_DOWN' ? 180 : -90;
                drawToCanvasRotated(ctx, mapAssets.hoofPrints.image, cellSize, { x: posX, y: posY }, degress);
            }
            else if (value.type === 'enemy') {
                if (value.data.health > 0) ctx.drawImage(mapAssets.ghost.image, posX, posY, cellSize, cellSize);
                else ctx.drawImage(mapAssets.ghostLamp.image, posX, posY, cellSize, cellSize);
                
            }
            else if (value.type === 'bullet') {
                ctx.drawImage(mapAssets.fireball.image, posX, posY, cellSize, cellSize);

                // The fireballs can have a small arrow showing the direction they travel
                if (value.data.direction === 'LEFT') drawToCanvasRotated(ctx, mapAssets.arrowSlim.image, cellSize, { x: posX, y: posY }, 0);
                if (value.data.direction === 'UP') drawToCanvasRotated(ctx, mapAssets.arrowSlim.image, cellSize, { x: posX, y: posY }, 90);
                if (value.data.direction === 'RIGHT') drawToCanvasRotated(ctx, mapAssets.arrowSlim.image, cellSize, { x: posX, y: posY }, 180);
                if (value.data.direction === 'DOWN') drawToCanvasRotated(ctx, mapAssets.arrowSlim.image, cellSize, { x: posX, y: posY }, -90);
            }
            else if (value.type === 'treasure') {
                if (value.data.collectedByHeroId) ctx.drawImage(mapAssets.fruitCore.image, posX, posY, cellSize, cellSize);
                else ctx.drawImage(mapAssets.fruit.image, posX, posY, cellSize, cellSize);
            }
            else if (value.type === 'hero') {
                ctx.drawImage(mapAssets.ponyChar.image, posX, posY, cellSize, cellSize);

                // If the hero is about to use the shield, draw a shield image over the hero
                if (value.data.heroAction === 'USE_SHIELD') ctx.drawImage(mapAssets.shield.image, posX, posY, cellSize, cellSize);
            }
            else if (value.type === 'heroAttack') {
                ctx.drawImage(mapAssets.sword.image, posX, posY, cellSize, cellSize);
            }
        });
    }
    // else {
    //     ctx.fillStyle = cellValue === MapEntities.OBSTACLE ? 'black' : cellValue === MapEntities.HERO ? 'green' : cellValue === MapEntities.ENEMY ? 'red' : cellValue === MapEntities.BULLET ? 'orange' : cellValue === MapEntities.TREASURE ? 'blue' : cellValue === MapEntities.COLLECTED_TREASURE ? 'gray' : 'white';
    //     ctx.fillRect(posX, posY, cellSize, cellSize);
    // }
}
