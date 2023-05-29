import UserInput from "../../types/UserInput";
import mapHeatToGraphValue from "../mapHeatToGraphValue";

/**
 * @param ctx `CanvasRenderingContext2D`, the 2d context of a canvas
 * @param heatMap a 2D number array, holding the heat value for each cell
 * @param rowIndex the row index inside the game map, where the currently being drawn value is
 * @param columnIndex the column index inside the game map, where the currently being drawn value is
 * @param posX the X position on the canvas, where the image is to be drawn
 * @param posY the Y position on the canvas, where the image is to be drawn
 * @param cellSize the size of the cells, assuming that they are squares 
 * @param userInput The UserInput store slice, which includes the `heatMapOpacity` and `isHeatValueDisplayEnabled` settings
 */
export default function drawHeat(ctx: CanvasRenderingContext2D, heatMap: number[][] | undefined, rowIndex: number, columnIndex: number, posX: number, posY: number, cellSize: number, userInput: UserInput, multiplier: number) {
    
    if (Array.isArray(heatMap) && Array.isArray(heatMap[0]) && userInput.heatMapOpacity > 0) {
        // retrieve the heat value of the current cell
        const heatValue = heatMap[rowIndex][columnIndex];
    
        // set the color using hsla, where the heat value controls the hue
        const hue = 240 - (heatValue * 240);
        ctx.fillStyle = `hsl(${hue}, 100%, 50%, ${userInput.heatMapOpacity / 100})`;
        ctx.fillRect(posX, posY, cellSize, cellSize);

        // draw the numeric value as well, depending on a user input parameter
        if (userInput.isHeatValueDisplayEnabled) {
            
            ctx.fillStyle = `hsl(${hue}, 100%, 10%)`;
            ctx.strokeStyle = `hsl(${hue}, 100%, 90%)`;
            ctx.lineWidth = 1;
            ctx.font = '12px Arial';
            ctx.strokeText(`${mapHeatToGraphValue(heatValue, multiplier)}`, posX+(cellSize/2), posY+(cellSize/2), cellSize);
            ctx.fillText(`${mapHeatToGraphValue(heatValue, multiplier)}`, posX+(cellSize/2), posY+(cellSize/2), cellSize);
        }
    }
}
