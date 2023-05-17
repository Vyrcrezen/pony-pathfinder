import React, { useEffect, useRef } from "react";
import { useAppSelector } from "../../../../global/redux/hooks";
import { Grid } from "@mui/material";
import MapEntities from "../../types/MapEntities";
import rotate2DArray from "../../util/rotate2dArray";

export default function GameMap() {

    const state = useAppSelector(state => state.ponySolver);

    const alignedMap = (state.resources.gameMap ?? []);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {

        console.log(canvasRef.current, Array.isArray(alignedMap), Array.isArray(alignedMap[0]));

        if (canvasRef.current && Array.isArray(alignedMap) && Array.isArray(alignedMap[0])) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            if (ctx) {
                const cellSize = 40;
                const numRows = alignedMap.length;
                const numCols = alignedMap[0].length;

                canvas.width = cellSize * numCols;
                canvas.height = cellSize * numRows;

                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate(-Math.PI / 2);  

                alignedMap.forEach((row, rowIndex) => {
                    row.forEach((cell, columnIndex) => {
                        const x = columnIndex * cellSize - (numCols * cellSize) / 2;
                        const y = rowIndex * cellSize - (numRows * cellSize) / 2;

                        ctx.fillStyle = cell === MapEntities.OBSTACLE ? 'black' : cell === MapEntities.HERO ? 'green' : cell === MapEntities.ENEMY ? 'red' : cell === MapEntities.BULLET ? 'orange' : cell === MapEntities.TREASURE ? 'blue' : cell === MapEntities.COLLECTED_TREASURE ? 'gray' : 'white';
                        ctx.fillRect(x, y, cellSize, cellSize);
                    })
                });

                ctx.rotate(Math.PI / 2);   
                ctx.translate(-canvas.width / 2, -canvas.height / 2);

            }
        }

    }, [state.resources.gameMap]);

    return <canvas ref={canvasRef} />;
}
