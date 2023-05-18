import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import ReduxStore from "../../../../global/redux/types/ReduxStore";
import initialPonyStoreState from "../initialPonyStoreState";
import MapState from "../../types/MapState";
import MapResource from "../../types/MapResource";
import createBaseMap from "../../util/createBaseMap";
import addDynamicAgentsToMap from "../../util/addDynamicAgentsToMap";
import createGraphFrom2dArray from "../../util/createGraphFrom2dArray";

import getClosestTarget from "../../util/getClosestTarget";
import ApproveHeroTurnResponse from "../../types/ApproveHeroTurnResponse";
import PlaythroughState from "../../types/PlaythroughState";
import vyFloodFill from "../../util/vyFloodFill";
import _ from 'lodash';
import vyCombineHeatMaps from "../../util/vyCombineHeatMaps";

const gameResourcesSlice = createSlice({
    name: "ponySolver/resources",
    initialState: initialPonyStoreState.resources,
    reducers: {
        addGameToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        updateMapResource: (state, action: PayloadAction<MapResource>) => {
            state.mapResources = action.payload;
        },
        updateMapState: (state, action: PayloadAction<MapState>) => {
            state.mapState = action.payload;
        },
        updatePlaythroughState: (state, action: PayloadAction<PlaythroughState>) => {
            state.playthroughState = action.payload;
        },
        updateApproveHeroTurnResponse: (state, action: PayloadAction<ApproveHeroTurnResponse>) => {
            state.approveHeroTurnResponse = action.payload;
        },
        generateBaseMap: (state) => {
            if (!state.mapState || !state.mapResources) return;

            const width = state.mapState.map.width;
            const height = state.mapState.map.height;
            const obstacles = state.mapResources.compressedObstacles.coordinateMap;

            state.baseMap = createBaseMap({ height, width, obstacles });
        },
        generateGameMap: (state) => {
            if (!state.mapState || !state.baseMap) return;
            state.gameMap = addDynamicAgentsToMap(state.baseMap, state.mapState);
        },
        generateHeatMap: (state) => {
            if (!state.mapState ) return;

            const blankHeatMap = Array.from({length: state.mapState!.map.height}, () => new Array(state.mapState!.map.width).fill(0));

            const enemyHeatMaps = state.mapState.map.enemies.map(enemy => vyFloodFill({
                mapWidth: state.mapState!.map.width,
                mapHeight: state.mapState!.map.height,
                startingCell: { x: enemy.position.x, y: enemy.position.y },
                heatSourceCell: { x: enemy.position.x, y: enemy.position.y },
                cutoffThreshold: 0.1,
                valueMultiplicationFactor: enemy.onTouchDamage
            }));

            const bulletHeatMaps = state.mapState.map.bullets.map(bullet => vyFloodFill({
                mapWidth: state.mapState!.map.width,
                mapHeight: state.mapState!.map.height,
                startingCell: { x: bullet.position.x, y: bullet.position.y },
                heatSourceCell: { x: bullet.position.x, y: bullet.position.y },
                cutoffThreshold: 0.1,
                valueMultiplicationFactor: bullet.damage
            }));

            const combinedHeatMap = [blankHeatMap, ...enemyHeatMaps, ...bulletHeatMaps];

            console.log("combinedHeatMap");
            console.log(combinedHeatMap);

            if (combinedHeatMap.length === 1) state.heatMap = combinedHeatMap[0];
            else {
                // const summedHeatMap = _.zipWith(...combinedHeatMap, (a, b) => {
                //     console.log('a, b');
                //     console.log(a);
                //     console.log(b);
                //     return a.map((val, i) => val + b[i])
                // });
                const summedHeatMap = vyCombineHeatMaps(...combinedHeatMap);
                state.heatMap = summedHeatMap;
            }

            
        },
        generateGameMapGraph: (state) => {
            if (!state.gameMap || !state.heatMap) return;
            state.gameMapGraph = createGraphFrom2dArray(state.gameMap, state.heatMap);
        },
        generateHeroPath: (state) => {
            if (!state.mapState || !state.gameMapGraph) return;

            const heroGraphPoint = `${state.mapState.heroes[0].position.x}-${state.mapState.heroes[0].position.y}`;
            const targetGraphPoints = state.mapState.map.treasures.reduce((acc, treasure) => {
                if (!treasure.collectedByHeroId) {
                    acc.push(`${treasure.position.x}-${treasure.position.y}`);
                }
                return acc;
            }, [] as string[]);

            const closestTarget = getClosestTarget(state.gameMapGraph, heroGraphPoint, targetGraphPoints);

            state.heroPath = closestTarget;
        },
    },
});

export const {
    addGameToken,
    updateMapResource,
    updateMapState,
    updateApproveHeroTurnResponse,
    generateBaseMap,
    generateHeatMap,
    generateGameMap,
    generateGameMapGraph,
    generateHeroPath,
} = gameResourcesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: ReduxStore) => state;

export default gameResourcesSlice.reducer;
