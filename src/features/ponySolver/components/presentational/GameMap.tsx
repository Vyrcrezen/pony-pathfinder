import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../../global/redux/hooks";
import MapEntities from "../../types/MapEntities";
import importMapAssets from "../../imports/importMapAssets";
import rotate2DArray from "../../util/rotate2dArray";
import drawToCanvasRotated from "../../util/drawToCanvasRotated";
import drawElement from "../../util/gameMap/drawElement";
import drawHeat from "../../util/gameMap/drawHeat";
import getGameRenderingMap from "../../util/gameMap/getGameRenderingMap";
import GameRenderingCell from "../../types/GameRenderingCell";

import blankMapImg from './../../media/images/blank-map.png';

/**
 * @returns The game map, which is a `canvas` that displays the `hero`, `treasures`, `ghosts`, `bullets` and the `heat values`.
 */
export default function GameMap() {

    const [mapAssets, setMapAssets] = useState<Awaited<ReturnType<typeof importMapAssets>>>();

    const state = useAppSelector(state => state.ponySolver);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Import the assets dynamically
    useEffect(() => {
        if (!mapAssets) {
            importMapAssets()
                .then(assets => setMapAssets(assets))
                .catch(err => console.log(err));
        }
    }, []);

    // The game map is drawn inside this hook. It's redrawn when one of its 'dependencies' change.
    useEffect(() => {
        if (!state.resources.baseMap || !state.resources.gameMap) return;
        // In order to have the map align with the original one, the object holding the list of entities is turned into a 2D array, and then rotated by 90 degrees
        const alignedMap = rotate2DArray<GameRenderingCell>(getGameRenderingMap(state.resources.baseMap, state.resources.gameMap));
        let alignedHeatMap: number[][] | undefined = undefined;
        // Rotate the heat map as well, to align with the game map
        if (state.resources.heatMap) alignedHeatMap = rotate2DArray<number>(state.resources.heatMap);

        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const parentNode = canvas.parentElement;
            const ctx = canvas.getContext('2d');

            if (ctx && parentNode) {
                // The canvas shouldn't be drawn on the padding area of the parent element
                const parentStyles = window.getComputedStyle(parentNode);
                const parentWidth = parentNode.clientWidth - parseFloat(parentStyles.paddingLeft) - parseFloat(parentStyles.paddingRight);

                // Make sure that it's actually a 2D array
                if (Array.isArray(alignedMap) && Array.isArray(alignedMap[0])) {
                    const numRows = alignedMap.length;
                    const numCols = alignedMap[0].length;
                    const cellSize = Math.round(parentWidth / numRows);

                    canvas.width = cellSize * numCols;
                    canvas.height = cellSize * numRows;

                    // Was needed for rotating the canvas, now many calculations expect to have the origin of the canvas at the center
                    ctx.translate(canvas.width / 2, canvas.height / 2);

                    alignedMap.forEach((row, rowIndex) => {
                        row.forEach((cell, columnIndex) => {
                            const x = columnIndex * cellSize - (numCols * cellSize) / 2;
                            const y = rowIndex * cellSize - (numRows * cellSize) / 2;

                            // Draw main map elements
                            drawElement(ctx, columnIndex, rowIndex, x, y, cellSize, cell, mapAssets);

                            // Overlay the heat map, takes into account the heat trapsnaprency setting
                            drawHeat(ctx, alignedHeatMap, rowIndex, columnIndex, x, y, cellSize, state.userInput, state.userInput.graphEdgeMultiplier);

                        })
                    });

                    ctx.translate(-canvas.width / 2, -canvas.height / 2);
                }
            }
        }

    }, [state.resources.baseMap, state.resources.gameMap, state.resources.heatMap, state.userInput]);

    return (
        <div className="p-3 w-100 h-100 rounded" >
            {
                state.state.isInitialized
                    ? <canvas className="rounded w-100 h-100" ref={canvasRef} />
                    : <img className="vy-img-fit w-100" src={blankMapImg} alt="" />
            }

        </div>
    );
}
