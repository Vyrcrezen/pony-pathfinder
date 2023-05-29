import { Button, TextField } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../../global/redux/hooks";
import { addGameToken, resetLevelResources } from "../../../redux/reducers/gameResourcesSlice";
import { resetLevelState, setIsStepping, toggleIsPlaying } from "../../../redux/reducers/gameStateSlice";

/**
 * 
 * @returns The token widget, where the player can input their game token, and control the flow of the game: playing, stopping, stepping and resetting.
 */
export default function ControlCard() {

    const dispatch = useAppDispatch();
    const state = useAppSelector(state => state.ponySolver);

    return (
        <div className='vy-secondary p-2 rounded flex-grow-1'>
            <TextField
                fullWidth
                label='Token'
                variant='outlined'
                multiline
                minRows={2}
                onChange={(event) => dispatch(addGameToken(event.target.value))}
            />
            <div className='d-flex flex-row justify-content-evenly mt-3'>
                <Button
                    onClick={() => {
                        if (!state.resources.token) window.open('https://ponypanic.io/');
                        else dispatch(toggleIsPlaying());
                    }}
                    variant='contained'
                    color='primary'>
                    {!state.resources.token ? 'Get Token' : state.state.isPlaying ? 'Pause' : 'Play'}
                </Button>
                <Button
                    onClick={() => dispatch(setIsStepping(true))}
                    variant='contained'
                    color='primary'
                    disabled={state.state.isPlaying || !state.resources.token ? true : false}
                >
                    Step
                </Button>
                <Button
                    variant='contained'
                    disabled={!state.resources.token}
                    onClick={() => {
                        dispatch(resetLevelState({}));
                        dispatch(resetLevelResources({}));
                    }}
                >
                    Reset
                </Button>
            </div>
        </div>
    );
}
