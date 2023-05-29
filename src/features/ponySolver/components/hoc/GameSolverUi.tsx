import React from 'react';
import GameControl from '../container/GameControl';
import MapArea from '../container/MapArea';
import { ThemeProvider } from '@mui/material';
import defaultTheme from '../../../../global/mui/defaultTheme';

/**
 * 
 * @returns The pony game solver UI, including the token widget, game log, player data, ghost and bullet setting qidget and the game map.
 */
export default function GameSolverUi() {

    return (
        <ThemeProvider theme={defaultTheme} >
            <div className='d-flex flex-column align-items-center'>
                <div className='d-flex flex-column align-items-center w-100 mt-3'>
                    <GameControl />
                    <MapArea />
                    {/* <DebugReduxStore /> */}
                </div>
            </div>
        </ThemeProvider>
    );

}
