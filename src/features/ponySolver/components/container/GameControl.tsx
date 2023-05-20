import { TextField, Button } from '@mui/material';
import React, { useEffect } from 'react';
import { addGameToken } from '../../redux/reducers/gameResourcesSlice';
import { useAppDispatch, useAppSelector } from '../../../../global/redux/hooks';
import getNextAction from '../../logic/GameSolver';
import GameSolver from '../../logic/GameSolver';
import { setIsInitialized, setIsStepping, toggleIsPlaying } from '../../redux/reducers/gameStateSlice';
import vyFloodFill from '../../util/vyFloodFill';
import GameState from './GameState';
import MapControls from './MapControls';

export default function GameControl() {

    const dispatch = useAppDispatch();

    const state = useAppSelector(state => state.ponySolver);

    console.log('Current Redux store:');
    console.log(state);

    // console.log('Testing Flood fill');
    // vyFloodFill({ mapWidth: 10, mapHeight: 10, startingCell: { x: 5, y: 5 }, heatSourceCell: { x: 5, y: 5 }, cutoffThreshold: 0.1 });

    return (
        <div className='container rounded vy-secondary'>
            <div className='row'>
                <div className='col'>
                    <div className='p-2'>
                        <TextField
                            fullWidth
                            label='Token'
                            variant='outlined'
                            multiline
                            minRows={2}
                            onBlur={(event) => dispatch(addGameToken(event.target.value))}
                        />
                        <div className='d-flex flex-row justify-content-evenly mt-3'>
                            <Button
                                onClick={() => dispatch(toggleIsPlaying())}
                                variant='contained'
                                color='primary'>
                                {state.state.isPlaying ? 'Pause' : 'Play'}
                            </Button>
                            <Button
                                onClick={() => dispatch(setIsStepping(true))}
                                variant='contained'
                                color='primary'
                                disabled={state.state.isPlaying ? true : undefined}
                            >
                                {'Step'}
                            </Button>
                            <Button
                                variant='contained'>
                                Reset
                            </Button>
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <GameState />
                </div>
            </div>


            <GameSolver />
        </div>
    );
}
