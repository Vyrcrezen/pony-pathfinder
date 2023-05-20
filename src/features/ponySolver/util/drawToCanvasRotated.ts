import Coordinate from "../types/Coordinate";

export default function drawToCanvasRotated(ctx: CanvasRenderingContext2D, image: HTMLImageElement, cellSize: number, coordinate: Coordinate, degress: number) {

    ctx.translate(coordinate.x + (cellSize / 2), coordinate.y + (cellSize / 2));
    ctx.rotate((degress / 180) * Math.PI);
    ctx.drawImage(image, -cellSize / 2, -cellSize / 2, cellSize, cellSize);
    ctx.rotate(-(degress / 180) * Math.PI);
    ctx.translate(-(coordinate.x + (cellSize / 2)), -(coordinate.y + (cellSize / 2)));
}
