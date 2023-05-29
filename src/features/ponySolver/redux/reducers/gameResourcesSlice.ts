import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import ReduxStore from "../../../../global/redux/types/ReduxStore";
import initialPonyStoreState from "../initialPonyStoreState";
import MapState from "../../types/MapState";
import MapResource from "../../types/MapResource";
import createBaseMap from "../../util/createBaseMap";
import addDynamicAgentsToMap from "../../util/addDynamicAgentsToMap";
import createGraphFrom2dArray from "../../util/createGraphFrom2dArray";

import getPathToClosestTarget from "../../util/getPathToClosestTarget";
import ApproveHeroTurnResponse from "../../types/ApproveHeroTurnResponse";
import PlaythroughState from "../../types/PlaythroughState";
import vyFloodFill from "../../util/vyFloodFill";
import _ from 'lodash';
import vyCombineHeatMaps from "../../util/vyCombineHeatMaps";
import getDefaultGameMap from "../../initializers/getDefaultGameMap";
import getDefaultGameState from "../../initializers/getDefaultGameState";
import getDefaultGameResources from "../../initializers/getDefaultGameResources";
import getHeroAction from "../../util/getHeroAction";
import GhostHeatSettings from "../../types/GhostHeatSettings";
import BulletHeatSettings from "../../types/BulletHeatSettings";

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
            state.gameMap = addDynamicAgentsToMap(_.cloneDeep(state.mapState));
        },
        generateHeatMap: (state, action: PayloadAction<{ ghostHeatSettings?: GhostHeatSettings, bulletHeatSettings?: BulletHeatSettings }>) => {
            if (!state.mapState ) return;

            // Generate a 2d number array with 0 everywhere
            const blankHeatMap: number[][] = Array.from({length: state.mapState!.map.height}, () => new Array(state.mapState!.map.width).fill(0));

            // Resolve ghost heat settings
            const ghostHeatSettings = action?.payload?.ghostHeatSettings;

            // Create an array of heatmaps for each enemy
            const enemyHeatMaps: number[][][] = state.mapState.map.enemies.reduce((acc, enemy) => {

                const multiplicationFactor =  (
                                                enemy.bulletDamage * (ghostHeatSettings?.bulletDamageWeight ?? 1)
                                                + enemy.onTouchDamage * (ghostHeatSettings?.touchDamageWeight ?? 1)
                                                + enemy.moveProbability * (ghostHeatSettings?.moveProbabilityWeight ?? 0)
                                                + enemy.shootProbability * (ghostHeatSettings?.shootProbabilityWeight ?? 0)
                                              ) * (ghostHeatSettings?.flatMultiplier ?? 1)

                if ( enemy.health > 0 ) {
                    acc.push(vyFloodFill({
                        mapWidth: state.mapState!.map.width,
                        mapHeight: state.mapState!.map.height,
                        startingCell: { x: enemy.position.x, y: enemy.position.y },
                        heatSourceCell: { x: enemy.position.x, y: enemy.position.y },
                        heatCalcFormula: ghostHeatSettings?.heatFormula,
                        heatCalcVerticalAdjustment: ghostHeatSettings?.formulaVerticalAdjustement,
                        cutoffThreshold: ghostHeatSettings?.heatCutoffThreshold ?? 0.1,
                        valueMultiplicationFactor: multiplicationFactor
                    }));
                }

                return acc;
            }, [] as number[][][]);

            // Resolve ghost heat settings
            const bulletHeatSettings = action?.payload?.bulletHeatSettings;

            // Create an array of heat maps for each bullet
            const bulletHeatMaps = state.mapState.map.bullets.map(bullet => {

                const multiplicationFactor = (bullet.damage * (bulletHeatSettings?.bulletDamageWeight ?? 1)) * (bulletHeatSettings?.flatMultiplier ?? 1);

                return vyFloodFill({
                    mapWidth: state.mapState!.map.width,
                    mapHeight: state.mapState!.map.height,
                    startingCell: { x: bullet.position.x, y: bullet.position.y },
                    heatSourceCell: { x: bullet.position.x, y: bullet.position.y },
                    heatCalcFormula: bulletHeatSettings?.heatFormula,
                    heatCalcVerticalAdjustment: bulletHeatSettings?.heatCutoffThreshold,
                    cutoffThreshold: bulletHeatSettings?.heatCutoffThreshold ?? 0.1,
                    valueMultiplicationFactor: multiplicationFactor
            });
        });

            // Combine all heat map arrays into a single array of heat maps
            const combinedHeatMap = [blankHeatMap, ...enemyHeatMaps, ...bulletHeatMaps];

            // If we only have the blank heat map, return that (if there are neither enemies nor bullets)
            if (combinedHeatMap.length === 1) state.heatMap = combinedHeatMap[0];
            else {
                const summedHeatMap = vyCombineHeatMaps(...combinedHeatMap);
                state.heatMap = summedHeatMap;
            }

            
        },
        generateGameMapGraph: (state) => {
            if (!state.baseMap || !state.heatMap) return;
            state.gameMapGraph = createGraphFrom2dArray(state.baseMap, state.heatMap);
        },
        generateHeroPath: (state) => {
            if (!state.mapState || !state.gameMapGraph || !state.gameMap) return;

            const hero = state.gameMap.heroes[0];
            const heroGraphPoint = `${hero.position.x}-${hero.position.y}`;
            const targetGraphPoints = state.mapState.map.treasures.reduce((acc, treasure) => {
                if (!treasure.collectedByHeroId) {
                    acc.push(`${treasure.position.x}-${treasure.position.y}`);
                }
                return acc;
            }, [] as string[]);

            const closestTarget = getPathToClosestTarget(state.gameMapGraph, heroGraphPoint, targetGraphPoints);

            hero.heroPath = { ...closestTarget, heroId: hero.id};
        },
        selectHeroAction: (state) => {
            state.gameMap?.heroes.forEach(hero => {
                if (hero.heroPath) {
                    hero.heroAction = getHeroAction({heroPath: hero.heroPath, gameResources: state});
                }
            })
        },
        resetLevelResources: (state, action: PayloadAction<{ keepPlaythroughState?: boolean }>) => {
            return getDefaultGameResources({ token: state.token, playthroughState: action.payload.keepPlaythroughState ? state.playthroughState : undefined});
        }
    },
});

export const {
    addGameToken,
    updateMapResource,
    updateMapState,
    updatePlaythroughState,
    updateApproveHeroTurnResponse,
    generateBaseMap,
    generateHeatMap,
    generateGameMap,
    generateGameMapGraph,
    generateHeroPath,
    selectHeroAction,
    resetLevelResources
} = gameResourcesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: ReduxStore) => state;

export default gameResourcesSlice.reducer;
