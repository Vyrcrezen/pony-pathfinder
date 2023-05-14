import { TextField, Button } from '@mui/material';
import React, { useEffect } from 'react';
import { addGameToken } from '../../redux/reducers/gameResourcesSlice';
import { useAppDispatch, useAppSelector } from '../../../../global/redux/hooks';
import getNextAction from '../../logic/runGameSolver';
import GetNextAction from '../../logic/runGameSolver';
import { gsSetIsInitialized, toggleIsPlaying } from '../../redux/reducers/gameStateSlice';

export default function GameControl() {

    const dispatch = useAppDispatch();

    const state = useAppSelector(state => state.ponySolver);

    console.log('Current Redux store:');
    console.log(state);

    return (
        <div className='d-flex flex-column rounded w-75 rounded vy-secondary'>
            <div className='p-4'>
                <TextField
                    fullWidth
                    label='Token'
                    variant='outlined'
                    multiline
                    minRows={4}
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
                        variant='contained'>
                        Reset
                    </Button>
                </div>
            </div>
            <GetNextAction />
        </div>
    );
}
