import { Button, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../global/redux/hooks";
import { generateGameMapGraph, generateHeroPath } from "../../../redux/reducers/gameResourcesSlice";
import { setGraphEdgeMultiplier, setWebWorkerCount } from "../../../redux/reducers/gameUserInputSlice";
import generateHeatMapThunk from "../../../redux/reducers/thunks/taskThunk/generateHeatMapThunk";

export default function MapRefreshControls() {

    const state = useAppSelector(state => state.ponySolver);
    const dispatch = useAppDispatch();

    // Initialize web worker count based on user hardware
    useEffect(() => {
        const numberOfLogicalProcessors = Math.floor(navigator.hardwareConcurrency / 2) || 1;
        dispatch(setWebWorkerCount(numberOfLogicalProcessors))
    }, []);

    return (
        <div className="d-flex flex-column align-items-center rounded vy-secondary p-3 mb-2">
            <div className="p-0 w-100 d-flex flex-row justify-content-evenly">
                <Button
                    onClick={() => dispatch(generateHeatMapThunk({ gameResources: state.resources, userInput: state.userInput, bulletHeatSettings: state.userInput.bulletHeatSettings, ghostHeatSettings: state.userInput.ghostHeatSettings }))}
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
            <TextField
                className="mt-3 w-75"
                fullWidth
                label='Workers (multi-threading):'
                value={state.userInput.webWorkerCount}
                variant='standard'
                size="small"
                onChange={(event) => {
                    if (!Number.isNaN(+event.target.value)) dispatch(setWebWorkerCount(+event.target.value));
                }}
            />

        </div>
    );
}

