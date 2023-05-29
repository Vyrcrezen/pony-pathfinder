import { TextField, Button } from '@mui/material';
import React, { useEffect } from 'react';
import { addGameToken, generateHeatMap, generateHeroPath } from '../../redux/reducers/gameResourcesSlice';
import { useAppDispatch, useAppSelector } from '../../../../global/redux/hooks';
import GameSolver from '../../logic/GameSolver';
import PlayerCard from '../presentational/cardElements/PlayerCard';
import ControlCard from '../presentational/cardElements/ControlCard';
import GameState from './GameState';

export default function GameControl() {

    const dispatch = useAppDispatch();

    const state = useAppSelector(state => state.ponySolver);

    // console.log('Current Redux store:');
    // console.log(state);

    // console.log('Testing Flood fill');
    // vyFloodFill({ mapWidth: 10, mapHeight: 10, startingCell: { x: 5, y: 5 }, heatSourceCell: { x: 5, y: 5 }, cutoffThreshold: 0.1 });

    return (
        <div className='container'>
            <div className='row gy-2'>
                <div className='col-lg d-flex'>
                    <ControlCard />
                </div>
                <div className="col-lg d-flex">
                    <GameState />
                </div>
                <div className='col-lg d-flex'>
                    <PlayerCard />
                </div>
            </div>
            <GameSolver />
        </div>
    );
}
