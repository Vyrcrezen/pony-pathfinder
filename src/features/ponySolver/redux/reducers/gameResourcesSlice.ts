import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import ReduxStore from "../../../../global/redux/types/ReduxStore";
import initialPonyStoreState from "../initialPonyStoreState";
import MapState from "../../types/MapState";
import MapResource from "../../types/MapResource";
import createObstacleMap from "../../util/createObstacleMap";
import addDynamicAgentsToMap from "../../util/addDynamicAgentsToMap";
import createGraphFrom2dArray from "../../util/createGraphFrom2dArray";

import Graph from "node-dijkstra";

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

        generateObstacleMap: (state) => {
            if (!state.mapState || !state.mapResources) return;

            const width = state.mapState.map.width;
            const height = state.mapState.map.height;
            const obstacles = state.mapResources.compressedObstacles.coordinateMap;

            const obstacleMap = createObstacleMap({ height, width, obstacles });
            const dynamicUpdatedMap = addDynamicAgentsToMap(obstacleMap, state.mapState);

            const pathingGraph = createGraphFrom2dArray(dynamicUpdatedMap);

            console.log(dynamicUpdatedMap);
            console.log(pathingGraph);

            const graph = new Graph(pathingGraph);
            console.log(graph);

            const heroGraphPoint = `${state.mapState.heroes[0].position.x}-${state.mapState.heroes[0].position.y}`;
            const treasureGraphPoint = `${state.mapState.map.treasures[0].position.x}-${state.mapState.map.treasures[0].position.y}`

            const pathResult = graph.path(heroGraphPoint, treasureGraphPoint);
            console.log('pathResult');
            console.log(pathResult);
            
            state.obstacleMap = dynamicUpdatedMap;
        },
    },
});

export const {
    addGameToken,
    updateMapResource,
    updateMapState,
    generateObstacleMap,
} = gameResourcesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: ReduxStore) => state;

export default gameResourcesSlice.reducer;
