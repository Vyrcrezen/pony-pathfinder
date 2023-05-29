import { useAppSelector } from "../../../global/redux/hooks";
import MapEntities from "../types/MapEntities";
import mapHeatToGraphValue from "./mapHeatToGraphValue";

/**
 * 
 * @param array 
 * @param heatMap 
 * @returns 
 */
export default function createGraphFrom2dArray(array: number[][], heatMap: number[][], graphEdgeMultiplier: number) {
     
    if (!Array.isArray(array) || !Array.isArray(array[0])) throw new Error('createGraphFrom2dArray received an argument which isn\'t an array');

    const resultGraph: {[prop: string]: { [prop: string]: number }} = {};

    array.forEach((row, rowIndex) => {
        row.forEach((cell, columnIndex) => {

            if (cell !== MapEntities.OBSTACLE) {
                const vertex: { [prop: string]: number } = {};

                // Add left adjacent vertex, except obstacle
                if (columnIndex > 0 && array[rowIndex][columnIndex-1] !== MapEntities.OBSTACLE) {
                    vertex[`${rowIndex}-${columnIndex - 1}`] = (mapHeatToGraphValue(heatMap[rowIndex][columnIndex], graphEdgeMultiplier) + mapHeatToGraphValue(heatMap[rowIndex][columnIndex-1], graphEdgeMultiplier)) || 1;
                };
                // Add top adjacent vertex, except obstacle
                if (rowIndex > 0 && array[rowIndex-1][columnIndex] !== MapEntities.OBSTACLE) {
                    vertex[`${rowIndex-1}-${columnIndex}`] = (mapHeatToGraphValue(heatMap[rowIndex][columnIndex], graphEdgeMultiplier) + mapHeatToGraphValue(heatMap[rowIndex-1][columnIndex], graphEdgeMultiplier)) || 1;
                }
                // Add right adjacent vertex, except obstacle
                if (columnIndex < array[rowIndex].length-1 && array[rowIndex][columnIndex+1] !== MapEntities.OBSTACLE) {
                    vertex[`${rowIndex}-${columnIndex+1}`] = (mapHeatToGraphValue(heatMap[rowIndex][columnIndex], graphEdgeMultiplier) + mapHeatToGraphValue(heatMap[rowIndex][columnIndex+1], graphEdgeMultiplier)) || 1;
                }
                // Add bottom adjacent vertex, except obstacle
                if (rowIndex < array.length-1 && array[rowIndex+1][columnIndex] !== MapEntities.OBSTACLE) {
                    vertex[`${rowIndex+1}-${columnIndex}`] = (mapHeatToGraphValue(heatMap[rowIndex][columnIndex], graphEdgeMultiplier) + mapHeatToGraphValue(heatMap[rowIndex+1][columnIndex], graphEdgeMultiplier)) || 1;
                }
    
    
                resultGraph[`${rowIndex}-${columnIndex}`] = vertex;
            }
        });
    });

    return resultGraph;

}
