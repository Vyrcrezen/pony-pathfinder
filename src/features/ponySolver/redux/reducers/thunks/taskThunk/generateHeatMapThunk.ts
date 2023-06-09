import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import GhostHeatSettings from "../../../../types/GhostHeatSettings";
import BulletHeatSettings from "../../../../types/BulletHeatSettings";
import MapState from "../../../../types/MapState";
import VyFloodFillManager from "../../../../workers/floodFill/VyFloodFillManager";
import Enemy from "../../../../types/Enemy";
import Bullet from "../../../../types/Bullet";
import GameResources from "../../../../types/GameResources";
import FloodFillArguments from "../../../../types/FloodFillArguments";
import vyCombineHeatMaps from "../../../../util/vyCombineHeatMaps";
import PonyReducerAction from "../../../types/PonyReducerAction";
import UserInput from "../../../../types/UserInput";
import HeatMapJob from "../../../../types/HeatMapJob";

type MergedEntities = { type: 'ghost', data: Enemy } | { type: 'bullet', data: Bullet };

const generateHeatMapThunk = ({ gameResources, userInput, ghostHeatSettings, bulletHeatSettings }: {gameResources: GameResources, userInput: UserInput, ghostHeatSettings?: GhostHeatSettings, bulletHeatSettings?: BulletHeatSettings }) => async (dispatch: Dispatch<AnyAction>) => {

    if (!gameResources.mapState ) return;

    // Getting workers
    const workers = VyFloodFillManager.getWorkers(userInput.webWorkerCount);
    const workerCount = VyFloodFillManager.getWorkerCount();

    // Generate a 2d number array with 0 everywhere
    const blankHeatMap: number[][] = Array.from({length: gameResources.mapState!.map.height}, () => new Array(gameResources.mapState!.map.width).fill(0));

    const mergedEntities: MergedEntities[] = [];

    // Merging ghosts and bullets for easier handling
    mergedEntities.push(...gameResources.mapState.map.enemies.reduce((acc, enemy) => {

        if (enemy.health > 0) {
            acc.push({ type: 'ghost', data: enemy });
        }

        return acc;
    }, [] as MergedEntities[]));

    mergedEntities.push(...gameResources.mapState.map.bullets.map<MergedEntities>(bullet => ({
        type: 'bullet',
        data: bullet
    })));

    // Distributing calculations to web workers
    const calculationResults = mergedEntities.reduce((acc, entity, entityIndex) => {

        // Select the user setting and the worker
        const usedSettings = entity.type === 'ghost' ? ghostHeatSettings : bulletHeatSettings;
        const worker = workers[entityIndex % workerCount];

        // Assemble the heat map generation arguments
        const floodFillArguments: FloodFillArguments = {
            mapWidth: gameResources.mapState!.map.width,
            mapHeight: gameResources.mapState!.map.height,
            startingCell: { x: entity.data.position.x, y: entity.data.position.y },
            heatSourceCell: { x: entity.data.position.x, y: entity.data.position.y },
            heatCalcFormula: usedSettings?.heatFormula,
            heatCalcVerticalAdjustment: usedSettings?.formulaVerticalAdjustement,
            cutoffThreshold: usedSettings?.heatCutoffThreshold ?? 0.1,
            valueMultiplicationFactor: 1
        }

        // Promisify the worker's response
        const promise = new Promise<number[][]>((resolve, reject) => {

            const onMessage = (event: MessageEvent<HeatMapJob>) => {
                const result = event.data;
                // Every event listener will receive this message, makes sure its our message
                if (result.jobId === entityIndex) {
                    worker.removeEventListener('message', onMessage);
                    resolve(result.heatMap);
                }
            }
            worker.addEventListener('message', onMessage);
            worker.postMessage({floodFillArguments, jobId: entityIndex})
        });

        // Add the worker promise to the accumulator
        acc.push(promise);

        return acc;

    }, [] as Array<Promise<number[][]>>);

    const resolvedCalculations = await Promise.all(calculationResults);

    // Combine all heat map arrays into a single array of heat maps
    const combinedHeatMap = [blankHeatMap, ...resolvedCalculations];

    // If we only have the blank heat map, return that (if there are neither enemies nor bullets)
    let finalHeatMap = combinedHeatMap[0];
    if (combinedHeatMap.length > 1) {
        finalHeatMap = vyCombineHeatMaps(...combinedHeatMap);
    }

    dispatch({ type: PonyReducerAction.SET_HEAT_MAP, payload: finalHeatMap });

}

export default generateHeatMapThunk;