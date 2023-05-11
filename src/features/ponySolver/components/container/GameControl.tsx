import { TextField, Button } from '@mui/material';
import React, { useEffect } from 'react';
import { addGameToken, toggleIsPlaying } from '../../redux/reducers/ponySolverSlice';
import { useAppDispatch, useAppSelector } from '../../../../global/redux/hooks';
import getNextAction from '../../logic/runGameSolver';
import GetNextAction from '../../logic/runGameSolver';

export default function GameControl() {

    const state = useAppSelector(state => state.ponySolver);
    const dispatch = useAppDispatch();

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
                        {state.isPlaying ? 'Pause' : 'Play'}
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
