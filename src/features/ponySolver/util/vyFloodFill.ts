import { distance, divide, format, evaluate } from "mathjs";
import Coordinate from "../types/Coordinate";

interface FloodFillArguments {
    mapWidth: number;
    mapHeight: number;
    startingCell: Coordinate;
    heatSourceCell: Coordinate;
    cutoffThreshold: number;
    heatCalcFormula?: string;
    heatCalcVerticalAdjustment?: number;
    valueMultiplicationFactor?: number;
}

const formulaList = ['3^(-5*x)-0.6', '-2log(x+0.55)-0.2'];

export default function vyFloodFill({mapWidth, mapHeight, startingCell, heatSourceCell, cutoffThreshold, heatCalcFormula = formulaList[1], heatCalcVerticalAdjustment = 0, valueMultiplicationFactor = 1}: FloodFillArguments) {

    const heatMap = Array.from({length: mapHeight}, () => new Array(mapWidth).fill(0));
    const touchedMap = Array.from({length: mapHeight}, () => new Array(mapWidth).fill(0));
    const maxDistance = Math.sqrt(Math.pow(mapWidth, 2) + Math.pow(mapHeight, 2));
    const cellQueue: Coordinate[] = [startingCell];

    while (cellQueue.length > 0) {

        const targetCell = cellQueue[0];

        const heatDistance = divide(distance([targetCell.x, targetCell.y], [heatSourceCell.x, heatSourceCell.y]), maxDistance);
        const scope = { x: heatDistance };
        const rawHeadValue = evaluate(heatCalcFormula, scope) * valueMultiplicationFactor;
        const heatValue = Number.parseFloat(format(rawHeadValue + heatCalcVerticalAdjustment, { notation: 'fixed', precision: 3 } ));

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
