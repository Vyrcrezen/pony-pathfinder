import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../../global/redux/hooks";
import MapEntities from "../../types/MapEntities";
import importMapAssets from "../../imports/importMapAssets";
import rotate2DArray from "../../util/rotate2dArray";
import drawToCanvasRotated from "../../util/drawToCanvasRotated";
import drawElement from "../../util/gameMap/drawElement";
import drawHeat from "../../util/gameMap/drawHeat";
import getGameRenderingMap from "../../util/gameMap/getGameRenderingMap";
import GameRenderingCell from "../../types/GameRenderingCell";

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
        if (!state.resources.baseMap || !state.resources.gameMap) return;
        const alignedMap = rotate2DArray<GameRenderingCell>( getGameRenderingMap( state.resources.baseMap, state.resources.gameMap));
        let alignedHeatMap: number[][] | undefined = undefined;
        if (state.resources.heatMap) alignedHeatMap = rotate2DArray<number>(state.resources.heatMap);

        console.log('aligned heat map');
        console.log(alignedHeatMap);

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
                        drawHeat(ctx, alignedHeatMap, rowIndex, columnIndex, x, y, cellSize, state.userInput);
                        
                    })
                });

                // ctx.rotate(Math.PI / 2);   
                ctx.translate(-canvas.width / 2, -canvas.height / 2);

            }
        }

    }, [state.resources.gameMap, state.resources.heatMap, state.userInput]);

    return (
        <div className="m-3 w-100" >
            <canvas ref={canvasRef} />
        </div>
    );
}
