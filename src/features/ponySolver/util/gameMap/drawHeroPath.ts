import importMapAssets from "../../imports/importMapAssets";
import drawToCanvasRotated from "../drawToCanvasRotated";
import getMovementDirection from "../getMovementDirection";

function drawHeroPath(ctx: CanvasRenderingContext2D, rowIndex: number, columnIndex: number, x: number, y: number, cellSize: number, heroPath: string[] | undefined, mapAssets?: Awaited<ReturnType<typeof importMapAssets>>) {

    console.log('Entered the heroPath function');
    console.log(heroPath);
    console.log(mapAssets);

    if (!heroPath || !mapAssets) return;


    console.log('Now drawing hoof prints');

    for( let i = 1; i < heroPath.length - 1; i++) {
        const currentPosition = heroPath[i].split('-').map(pos => +pos);
        const nextPosition = heroPath[i + 1].split('-').map(pos => +pos);

        console.log(`Current pathItem: ${heroPath[i]}`);

        if (!Array.isArray(currentPosition) || !Array.isArray(nextPosition)) throw new Error('Bad parthing graph string in drawHeroPath');

        const movementDirection = getMovementDirection(currentPosition, nextPosition);

        console.log('movementDirection');
        console.log(movementDirection);

        // const posX =  currentPosition[1] * cellSize - (numCols * cellSize) / 2;
        // const posY = currentPosition[0] * cellSize - (numRows * cellSize) / 2;

        // if (movementDirection === 'MOVE_DOWN') drawToCanvasRotated(ctx, mapAssets.hoofPrints.image, cellSize, { x: posX, y: posY }, 180);
        // else if (movementDirection === 'MOVE_UP') drawToCanvasRotated(ctx, mapAssets.hoofPrints.image, cellSize, { x: posX, y: posY }, 0);
        // else if (movementDirection === 'MOVE_LEFT') drawToCanvasRotated(ctx, mapAssets.hoofPrints.image, cellSize, { x: posX, y: posY }, 90);
        // else if (movementDirection === 'MOVE_RIGHT') drawToCanvasRotated(ctx, mapAssets.hoofPrints.image, cellSize, { x: posX, y: posY }, -90);
    }

}
