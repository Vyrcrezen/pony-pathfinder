import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import ReduxStore from "../../../../global/redux/types/ReduxStore";
import initialPonyStoreState from "../initialPonyStoreState";

const gameUserInputSlice = createSlice({
    name: "ponySolver/userInput",
    initialState: initialPonyStoreState.userInput,
    reducers: {
        setHeatMapOpacity: (state, action: PayloadAction<number>) => {
            if (action.payload < 0 || 100 < action.payload ) return;
            state.heatMapOpacity = action.payload;
        },
        setIsHeatValueDisplayEnabled: (state, action: PayloadAction<boolean>) => {
            state.isHeatValueDisplayEnabled = action.payload;
        },
        // Ghost heat settings
        setGhostBulletDamageWeight: (state, action: PayloadAction<number>) => {
            if (typeof action.payload === 'number' && !isNaN(action.payload) )
                state.ghostHeatSettings.bulletDamageWeight = action.payload;
        },
        setGhostTouchDamageWeight: (state, action: PayloadAction<number>) => {
            if (typeof action.payload === 'number' && !isNaN(action.payload) )
                state.ghostHeatSettings.touchDamageWeight = action.payload;
        },
        setGhostShootProbabilityWeight: (state, action: PayloadAction<number>) => {
            if (typeof action.payload === 'number' && !isNaN(action.payload) )
                state.ghostHeatSettings.shootProbabilityWeight = action.payload;
        },
        setGhostMoveProbabilityWeight: (state, action: PayloadAction<number>) => {
            if (typeof action.payload === 'number' && !isNaN(action.payload) )
                state.ghostHeatSettings.moveProbabilityWeight = action.payload;
        },
        setGhostHeatFormula: (state, action: PayloadAction<string>) => {
            if (typeof action.payload === 'string' )
                state.ghostHeatSettings.heatFormula = action.payload;
        },
        setGhostHeatCutoffThreshold: (state, action: PayloadAction<number>) => {
            if (typeof action.payload === 'number' && !isNaN(action.payload) )
                state.ghostHeatSettings.heatCutoffThreshold = action.payload;
        },
        setGhostFormulaVerticalAdjustement: (state, action: PayloadAction<number>) => {
            if (typeof action.payload === 'number' && !isNaN(action.payload) )
                state.ghostHeatSettings.formulaVerticalAdjustement = action.payload;
        },
        // Bullet heat settings
        setBulletBulletDamageWeight: (state, action: PayloadAction<number>) => {
            if (typeof action.payload === 'number' && !isNaN(action.payload) )
                state.bulletHeatSettings.bulletDamageWeight = action.payload;
        },
        setBulletHeatFormula: (state, action: PayloadAction<string>) => {
            state.bulletHeatSettings.heatFormula = action.payload;
        },
        setBulletHeatCutoffThreshold: (state, action: PayloadAction<number>) => {
            if (typeof action.payload === 'number' && !isNaN(action.payload) )
                state.bulletHeatSettings.heatCutoffThreshold = action.payload;
        },
        setBulletFormulaVerticalAdjustement: (state, action: PayloadAction<number>) => {
            if (typeof action.payload === 'number' && !isNaN(action.payload) )
                state.bulletHeatSettings.formulaVerticalAdjustement = action.payload;
        },
    },
});

export const {
    setHeatMapOpacity,
    setIsHeatValueDisplayEnabled,
    setGhostBulletDamageWeight,
    setGhostTouchDamageWeight,
    setGhostMoveProbabilityWeight,
    setGhostHeatFormula,
    setGhostHeatCutoffThreshold,
    setGhostFormulaVerticalAdjustement,
    setBulletBulletDamageWeight,
    setBulletHeatFormula,
    setBulletHeatCutoffThreshold,
    setBulletFormulaVerticalAdjustement,
} = gameUserInputSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: ReduxStore) => state;

export default gameUserInputSlice.reducer;
