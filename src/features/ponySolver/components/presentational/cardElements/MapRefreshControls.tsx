import { Button, TextField } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../../global/redux/hooks";
import { generateHeatMap, generateGameMapGraph, generateHeroPath } from "../../../redux/reducers/gameResourcesSlice";
import { setGraphEdgeMultiplier } from "../../../redux/reducers/gameUserInputSlice";

export default function MapRefreshControls() {

    const state = useAppSelector(state => state.ponySolver);
    const dispatch = useAppDispatch();

    return (
        <div className="d-flex flex-column align-items-center rounded vy-secondary p-3 my-2">
            <div className="p-0 w-100 d-flex flex-row justify-content-evenly">
                <Button
                    onClick={() => dispatch(generateHeatMap({ bulletHeatSettings: state.userInput.bulletHeatSettings, ghostHeatSettings: state.userInput.ghostHeatSettings }))}
                    disabled={!state.state.isInitialized}
                    variant='contained'
                    color='primary'>
                    Update heat map
                </Button>
                <Button
                    onClick={() => {
                        dispatch(generateGameMapGraph({ userInput: state.userInput }));
                        dispatch(generateHeroPath())
                    }}
                    disabled={!state.state.runtimeTasks.isHeatMapUpdated}
                    variant='contained'
                    color='primary'>
                    Update pathing
                </Button>
            </div>
            <TextField
                className="mt-3 w-75"
                fullWidth
                label='Graph value multiplier:'
                defaultValue={state.userInput.graphEdgeMultiplier}
                variant='standard'
                size="small"
                onBlur={(event) => dispatch(setGraphEdgeMultiplier(+event.target.value))}
            />

        </div>
    );
}

