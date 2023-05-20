import React, { useEffect, useRef } from "react";
import { useAppSelector } from "../../../../global/redux/hooks";
import { Grid } from "@mui/material";
import MapEntities from "../../types/MapEntities";
import rotate2DArray from "../../util/rotate2dArray";

export default function DebugGameMap() {

    const state = useAppSelector(state => state.ponySolver);

    const alignedMap = (state.resources.gameMap ?? []);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    // useEffect(() => {

    //     if (canvasRef.current && Array.isArray(alignedMap) && Array.isArray(alignedMap[0])) {
    //         const canvas = canvasRef.current;
    //         const ctx = canvas.getContext('2d');

    //         if (ctx) {
    //             const cellSize = 20;
    //             const numRows = alignedMap.length;
    //             const numCols = alignedMap[0].length;

    //             canvas.width = cellSize * numCols;
    //             canvas.height = cellSize * numRows;

    //             alignedMap.forEach((row, rowIndex) => {
    //                 row.forEach((cell, columnIndex) => {
    //                     const x = columnIndex * cellSize;
    //                     const y = rowIndex * cellSize;

    //                     ctx.fillStyle = cell === MapEntities.OBSTACLE ? 'black' : cell === MapEntities.HERO ? 'green' : cell === MapEntities.ENEMY ? 'red' : cell === MapEntities.BULLET ? 'orange' : cell === MapEntities.TREASURE ? 'blue' : 'white';
    //                     ctx.fillRect(x, y, cellSize, cellSize);
    //                 })
    //             });
    //         }
    //     }

    // }, [state.resources.gameMap]);

    return <canvas ref={canvasRef} />;
}
