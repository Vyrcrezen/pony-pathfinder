import React, { useEffect, useRef } from "react";
import { useAppSelector } from "../../../../global/redux/hooks";
import { Grid } from "@mui/material";
import MapEntities from "../../types/MapEntities";
import rotate2DArray from "../../util/rotate2dArray";

export default function HeatMap() {

    const state = useAppSelector(state => state.ponySolver);

    const heatMap = (state.resources.heatMap ?? []);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current && Array.isArray(heatMap) && Array.isArray(heatMap[0])) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            if (ctx) {
                const cellSize = 20;
                const numRows = heatMap.length;
                const numCols = heatMap[0].length;

                canvas.width = cellSize * numCols;
                canvas.height = cellSize * numRows;

                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate(-Math.PI / 2);  

                heatMap.forEach((row, rowIndex) => {
                    row.forEach((cell, columnIndex) => {
                        const x = columnIndex * cellSize - (numCols * cellSize) / 2;
                        const y = rowIndex * cellSize - (numRows * cellSize) / 2;

                        const hue = 240 - (cell * 240);

                        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
                        ctx.fillRect(x, y, cellSize, cellSize);
                    })
                });

                ctx.rotate(Math.PI / 2);   
                ctx.translate(-canvas.width / 2, -canvas.height / 2);
            }
        }

    }, [state.resources.heatMap]);

    return <canvas ref={canvasRef} />;
}
