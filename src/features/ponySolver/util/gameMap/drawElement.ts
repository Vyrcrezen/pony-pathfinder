import importMapAssets from "../../imports/importMapAssets";
import MapEntities from "../../types/MapEntities";

export default function drawElement(ctx: CanvasRenderingContext2D, columnIndex: number, rowIndex: number, posX: number, posY: number, cellSize: number, cellValue: number, mapAssets?: Awaited<ReturnType<typeof importMapAssets>>) {
    
    if (mapAssets) {

        ctx.fillStyle = 'rgb(141, 235, 207)';
        ctx.fillRect(posX, posY, cellSize, cellSize);

        if (cellValue === MapEntities.HERO) ctx.drawImage(mapAssets.ponyChar.image, posX, posY, cellSize, cellSize);
        if (cellValue === MapEntities.TREASURE) ctx.drawImage(mapAssets.fruit.image, posX, posY, cellSize, cellSize);
        if (cellValue === MapEntities.COLLECTED_TREASURE) ctx.drawImage(mapAssets.fruitCore.image, posX, posY, cellSize, cellSize);
        if (cellValue === MapEntities.ENEMY) ctx.drawImage(mapAssets.ghost.image, posX, posY, cellSize, cellSize);
        if (cellValue === MapEntities.BULLET) ctx.drawImage(mapAssets.fireball.image, posX, posY, cellSize, cellSize);
        if (cellValue === MapEntities.OBSTACLE) {
            // const obstacleId = Math.floor(Math.random() * 4 + 1);
            const obstacleId = ((columnIndex + rowIndex) % 4) + 1;

            ctx.drawImage( obstacleId === 1 ? mapAssets.carOne.image : obstacleId === 2 ? mapAssets.carTwo.image : obstacleId === 3 ? mapAssets.carThree.image : mapAssets.carFour.image, posX, posY, cellSize, cellSize);

            // drawToCanvasRotated(ctx, mapAssets.carFour.image, cellSize, { x, y }, Math.floor(Math.random() * 180 + 1));
        }
    }
    else {
        ctx.fillStyle = cellValue === MapEntities.OBSTACLE ? 'black' : cellValue === MapEntities.HERO ? 'green' : cellValue === MapEntities.ENEMY ? 'red' : cellValue === MapEntities.BULLET ? 'orange' : cellValue === MapEntities.TREASURE ? 'blue' : cellValue === MapEntities.COLLECTED_TREASURE ? 'gray' : 'white';
        ctx.fillRect(posX, posY, cellSize, cellSize);
    }
}
