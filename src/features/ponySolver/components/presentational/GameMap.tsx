import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../../global/redux/hooks";
import MapEntities from "../../types/MapEntities";
import importMapAssets from "../../imports/importMapAssets";
import rotate2DArray from "../../util/rotate2dArray";
import drawToCanvasRotated from "../../util/drawToCanvasRotated";
import drawElement from "../../util/gameMap/drawElement";
import drawHeat from "../../util/gameMap/drawHeat";
import drawHeroPath from "../../util/gameMap/drawHeroPath";

export default function GameMap() {

    const [mapAssets, setMapAssets] = useState<Awaited<ReturnType<typeof importMapAssets>>>();

    const state = useAppSelector(state => state.ponySolver);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    // Import the assets
    useEffect(() => {
        if (!mapAssets) {
            importMapAssets()
            .then(assets => setMapAssets(assets))
            .catch(err => console.log(err));
        }
    }, []);

    useEffect(() => {
        const alignedMap = rotate2DArray(state.resources.gameMap ?? []);

        if (canvasRef.current && Array.isArray(alignedMap) && Array.isArray(alignedMap[0])) {
            const canvas = canvasRef.current;
            const parentNode = canvas.parentElement;
            const ctx = canvas.getContext('2d');

            if (ctx && parentNode) {

                const numRows = alignedMap.length;
                const numCols = alignedMap[0].length;
                const cellSize = Math.round(parentNode.clientWidth / numRows);

                canvas.width = cellSize * numCols;
                canvas.height = cellSize * numRows;

                ctx.translate(canvas.width / 2, canvas.height / 2);
                // ctx.rotate(-Math.PI / 2);  

                alignedMap.forEach((row, rowIndex) => {
                    row.forEach((cell, columnIndex) => {
                        const x = columnIndex * cellSize - (numCols * cellSize) / 2;
                        const y = rowIndex * cellSize - (numRows * cellSize) / 2;

                        // Draw main map elements
                        drawElement(ctx, columnIndex, rowIndex, x, y, cellSize, cell, mapAssets);

                        // Draw hoof prints
                        // drawHeroPath(ctx, rowIndex, columnIndex, x, y, cellSize, state.resources.heroPath, mapAssets);

                        // Overlay the heat map
                        drawHeat(ctx, state.resources.heatMap, rowIndex, columnIndex, x, y, cellSize, state.userInput.heatMapOpacity);
                        
                    })
                });

                // ctx.rotate(Math.PI / 2);   
                ctx.translate(-canvas.width / 2, -canvas.height / 2);

            }
        }

    }, [state.resources.heroPath, state.resources.gameMap, state.resources.heatMap, state.userInput.heatMapOpacity]);

    return (
        <div className="m-3 w-100" >
            <canvas ref={canvasRef} />
        </div>
    );
}
