import Coordinate from "../types/Coordinate";

/**
 * @param ctx `CanvasRenderingContext2D`, the 2d context of a canvas
 * @param image The image to be rendered, `HTMLImageElement`
 * @param cellSize the size of the cells, assuming that they are squares 
 * @param coordinate the X and Y position on the canvas, where the image should be drawn: `{ x: number, y: number }`
 * @param degress The degree by which the image should be rotated around the center of its cell
 */
export default function drawToCanvasRotated(ctx: CanvasRenderingContext2D, image: HTMLImageElement, cellSize: number, coordinate: Coordinate, degress: number) {

    // move the origin of the canvas' context to the center of the cell, and rotate it
    ctx.translate(coordinate.x + (cellSize / 2), coordinate.y + (cellSize / 2));
    ctx.rotate((degress / 180) * Math.PI);
    ctx.drawImage(image, -cellSize / 2, -cellSize / 2, cellSize, cellSize);
    // Restore the context origin
    ctx.rotate(-(degress / 180) * Math.PI);
    ctx.translate(-(coordinate.x + (cellSize / 2)), -(coordinate.y + (cellSize / 2)));
}
