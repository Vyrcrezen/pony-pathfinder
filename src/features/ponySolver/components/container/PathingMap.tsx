import React from 'react';
import GameMap from '../presentational/GameMap';
import DebugGameMap from '../presentational/DebugGameMap';
import HeatMap from '../presentational/HeatMap';

export default function PathingMap() {

    return (
        <div className='d-flex flex-column align-items-center w-100 rounded vy-secondary mt-3 p-3'>
            <GameMap />
            <div>Heat map:</div>
            <HeatMap />
            <DebugGameMap />
        </div>
    );
}
