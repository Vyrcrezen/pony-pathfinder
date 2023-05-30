import React from 'react';
import GameMap from '../container/GameMap';
import MapControls from '../presentational/MapControls';
import MapSideElement from './MapSideElement';

/**
 * 
 * @returns The map area, which includes the map, and the heat settings for the the Ghosts and Bullets/Fireballs
 */
export default function MapArea() {

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-lg-8 flex-grow-1 map-element mb-2">
                    <div className='d-flex flex-column align-items-center h-100 rounded vy-secondary'>
                        <GameMap />
                        <MapControls />
                    </div>
                </div>
                <div className="col-lg-4 flex-grow-1 map-side-element">
                    <MapSideElement />
                </div>
            </div>
        </div>

    );
}
