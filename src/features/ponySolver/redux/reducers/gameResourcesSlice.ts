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
        generateGameMapGraph: (state) => {
            if (!state.gameMap) return;
            state.gameMapGraph = createGraphFrom2dArray(state.gameMap);
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
    generateGameMap,
    generateGameMapGraph,
    generateHeroPath,
} = gameResourcesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: ReduxStore) => state;

export default gameResourcesSlice.reducer;
