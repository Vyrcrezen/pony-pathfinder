import React from 'react';
import GameSolver from '../../logic/GameSolver';
import PlayerCard from '../presentational/cardElements/PlayerCard';
import ControlCard from '../presentational/cardElements/ControlCard';
import GameState from './GameState';

/**
 * 
 * @returns The first row of the game UI: `ControlCard`, `GameState`, `PlayerCard`. Also includes the `GameSolver` component which encapsulates the game logic with all the Redux action and thunk dispatch calls.
 */
export default function GameControl() {

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
