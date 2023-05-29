
/**
 * This function turns a heat value into a graph edge value for Dijkstra's algorithm
 * @param value heat value
 * @param multiplier multiplier applied to the heat value
 * @returns edge value rounded to whole integer
 */
export default function mapHeatToGraphValue(value: number, multiplier: number) {
    return Math.round(value * multiplier);
}
