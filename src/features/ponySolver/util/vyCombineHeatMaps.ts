

export default function vyCombineHeatMaps(...heatMaps: number[][][]) {

    // Merge heat maps
    let mergedHeatMap = heatMaps.reduce((acc, heatMap) => {
        if (!acc) acc = heatMap;
        else {
            acc = heatMap.map((heatRow, rowIndex) => {
                return heatRow.map((cell, columnIndex) => cell + acc[rowIndex][columnIndex]);
            });
        }

        return acc;
    });

    // Find the highest value
    const highestValue = mergedHeatMap.reduce((highestValue, heatRow) => {

        const highestRowValue = heatRow.reduce((acc, cell) => acc < cell ? cell : acc, 0);
        return highestValue < highestRowValue ? highestRowValue : highestValue;
    }, 0);

    // Dive each value by the highest value, resulting in a range of value between 0 and 1
    if (highestValue !== 0 && highestValue !== 1) {
        mergedHeatMap = mergedHeatMap.map(row => {
            return row.map(cell => Number.parseFloat((cell / highestValue).toFixed(3)));
        });
    }

    return mergedHeatMap;
}
