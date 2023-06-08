import Coordinate from "./Coordinate";

export default interface FloodFillArguments {
    mapWidth: number;
    mapHeight: number;
    startingCell: Coordinate;
    heatSourceCell: Coordinate;
    cutoffThreshold: number;
    heatCalcFormula?: string;
    heatCalcVerticalAdjustment?: number;
    valueMultiplicationFactor?: number;
}