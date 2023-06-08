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
import UserInput from "../../types/UserInput";
import VyFloodFillManager from "../../workers/floodFill/VyFloodFillManager";

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
            state.mapState = {...action.payload, map: { ...action.payload.map, height: action.payload.map.width, width: action.payload.map.height}};
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
        setHeatMap: (state, action: PayloadAction<number[][]>) => {
            state.heatMap = action.payload;
        },
        generateGameMapGraph: (state, action: PayloadAction<{ userInput: UserInput }>) => {
            if (!state.baseMap || !state.heatMap) return;
            const userInput = action.payload.userInput;
            
            state.gameMapGraph = createGraphFrom2dArray(state.baseMap, state.heatMap, userInput.graphEdgeMultiplier);
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
    generateGameMap,
    generateGameMapGraph,
    generateHeroPath,
    selectHeroAction,
    resetLevelResources
} = gameResourcesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: ReduxStore) => state;

export default gameResourcesSlice.reducer;
