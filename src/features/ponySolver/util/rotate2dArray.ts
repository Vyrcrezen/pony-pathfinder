export default function rotate2DArray<T>(array: T[][]) {
    const rotatedArray: T[][] = [];

    if (!Array.isArray(array[0])) return array;

    for( let i = 0; i < array[0].length; i++ ){
        const newRow = [];
        for( let j = 0; j < array.length; j++ ){
            newRow.push(array[j][ array[j].length - 1 - i ])
        }
        rotatedArray.push(newRow);
    }

    return rotatedArray;
  }