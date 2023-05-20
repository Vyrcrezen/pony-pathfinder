import UserInput from "../../types/UserInput";
import mapHeatToGraphValue from "../mapHeatToGraphValue";

export default function drawHeat(ctx: CanvasRenderingContext2D, heatMap: number[][] | undefined, rowIndex: number, columnIndex: number, posX: number, posY: number, cellSize: number, userInput: UserInput) {
    
    if (Array.isArray(heatMap) && Array.isArray(heatMap[0]) && userInput.heatMapOpacity > 0) {
        const heatValue = heatMap[rowIndex][columnIndex];
    
        const hue = 240 - (heatValue * 240);
        ctx.fillStyle = `hsl(${hue}, 100%, 50%, ${userInput.heatMapOpacity / 100})`;
        ctx.fillRect(posX, posY, cellSize, cellSize);

        if (userInput.isHeatValueDisplayEnabled) {
            ctx.fillStyle = `hsl(${hue}, 100%, 10%)`;
            ctx.font = '12px Arial';
            ctx.fillText(`${mapHeatToGraphValue(heatValue)}`, posX, posY, cellSize);
        }
    }
}
