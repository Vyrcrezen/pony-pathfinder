
export default function drawHeat(ctx: CanvasRenderingContext2D, heatMap: number[][] | undefined, rowIndex: number, columnIndex: number, posX: number, posY: number, cellSize: number, opacity: number) {
    
    if (Array.isArray(heatMap) && Array.isArray(heatMap[0]) && opacity > 0) {
        const heatValue = heatMap[columnIndex][rowIndex];
    
        const hue = 240 - (heatValue * 240);
        ctx.fillStyle = `hsl(${hue}, 100%, 50%, ${opacity / 100})`;
        ctx.fillRect(posX, posY, cellSize, cellSize);
    }
}
