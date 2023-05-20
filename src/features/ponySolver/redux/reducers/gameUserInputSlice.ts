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
        }
    },
});

export const {
    setHeatMapOpacity,
    setIsHeatValueDisplayEnabled
} = gameUserInputSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: ReduxStore) => state;

export default gameUserInputSlice.reducer;
