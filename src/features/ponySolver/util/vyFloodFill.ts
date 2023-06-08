import { distance, divide, format, evaluate } from "mathjs";
import Coordinate from "../types/Coordinate";
import FloodFillArguments from "../types/FloodFillArguments";

const formulaList = ['3^(-5*x)-0.6', '-2log(x+0.55)-0.2'];

/**
 * Uses a flood fill algorithm to determine the heat value of cells, given a map, a heat source and a starting position.
 * The algorithm keeps adding the target cell's neghbours, until the target cell's value drops below the `cutoffThreshold`
 * @param FloodFillArguments 
 * @returns heatMap: `number[][]`
 */
export default function vyFloodFill({mapWidth, mapHeight, startingCell, heatSourceCell, cutoffThreshold, heatCalcFormula = formulaList[1], heatCalcVerticalAdjustment = 0, valueMultiplicationFactor = 1}: FloodFillArguments) {

    // Create an empty 2d heat map and touched map
    const heatMap: number[][] = Array.from({length: mapHeight}, () => new Array(mapWidth).fill(0));
    const touchedMap = Array.from({length: mapHeight}, () => new Array(mapWidth).fill(0));
    // Calculate max distance, used to normalize distance values to be between 1 and 0
    const maxDistance = Math.sqrt(Math.pow(mapWidth, 2) + Math.pow(mapHeight, 2));
    // Add the first cell to the queue
    const cellQueue: Coordinate[] = [startingCell];

    while (cellQueue.length > 0) {

        // Work on the 0-th cell, this will be shifted at the end of the loop
        const targetCell = cellQueue[0];

        // Calculate distance from the heat source
        const heatDistance = divide(distance([targetCell.x, targetCell.y], [heatSourceCell.x, heatSourceCell.y]), maxDistance);
        // Pass the value and the formula to Math.js, and apply the multiplication factor
        const scope = { x: heatDistance };
        const rawHeadValue = evaluate(heatCalcFormula, scope) * valueMultiplicationFactor;
        // Keep only 3 decimals and discard potential negative values
        const heatValue = Math.max(Number.parseFloat(format(rawHeadValue + heatCalcVerticalAdjustment, { notation: 'fixed', precision: 3 } )), 0);

        heatMap[targetCell.x][targetCell.y] = heatValue;
        touchedMap[targetCell.x][targetCell.y] = 1;

        if (heatValue >= cutoffThreshold) {
            if ( targetCell.x - 1 >= 0 && touchedMap[targetCell.x - 1][targetCell.y] === 0 ) {
                touchedMap[targetCell.x-1][targetCell.y] = 1;
                cellQueue.push({ x: targetCell.x - 1, y: targetCell.y })
            };
            if ( targetCell.x + 1 < mapHeight && touchedMap[targetCell.x + 1][targetCell.y] === 0 ) {
                touchedMap[targetCell.x + 1][targetCell.y] = 1;
                cellQueue.push({ x: targetCell.x + 1, y: targetCell.y })
            };
            if ( targetCell.y - 1 >= 0 && touchedMap[targetCell.x][targetCell.y - 1] === 0 ) {
                touchedMap[targetCell.x][targetCell.y - 1] = 1;
                cellQueue.push({ x: targetCell.x, y: targetCell.y - 1 });
            }
            if ( targetCell.y + 1 < mapWidth && touchedMap[targetCell.x][targetCell.y + 1] === 0 ) {
                touchedMap[targetCell.x][targetCell.y + 1] = 1;
                cellQueue.push({ x: targetCell.x, y: targetCell.y + 1 });
            }
        }

        cellQueue.shift();
    }

    return heatMap;
}
