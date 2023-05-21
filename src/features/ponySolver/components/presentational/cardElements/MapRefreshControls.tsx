import { Button } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../../global/redux/hooks";
import { generateHeatMap, generateGameMapGraph, generateHeroPath } from "../../../redux/reducers/gameResourcesSlice";

export default function MapRefreshControls() {

    const state = useAppSelector(state => state.ponySolver);
    const dispatch = useAppDispatch();

    return (
        <div className="rounded vy-secondary p-3 mb-2">
            <div className="p-0 d-flex flex-row justify-content-evenly">
                <Button
                    onClick={() => dispatch(generateHeatMap({ bulletHeatSettings: state.userInput.bulletHeatSettings, ghostHeatSettings: state.userInput.ghostHeatSettings }))}
                    disabled={!state.state.isInitialized}
                    variant='contained'
                    color='primary'>
                    Update heat map
                </Button>
                <Button
                    onClick={() => {
                        dispatch(generateGameMapGraph());
                        dispatch(generateHeroPath())
                    }}
                    disabled={!state.state.runtimeTasks.isHeatMapUpdated}
                    variant='contained'
                    color='primary'>
                    Update pathing
                </Button>
            </div>
        </div>
    );
}

