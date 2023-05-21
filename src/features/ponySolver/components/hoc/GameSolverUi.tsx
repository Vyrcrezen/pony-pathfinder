import React from 'react';
import GameControl from '../container/GameControl';
import MapArea from '../container/MapArea';
import { ThemeProvider } from '@mui/material';
import defaultTheme from '../../../../global/mui/defaultTheme';
import DebugReduxStore from '../container/DebugReduxStore';
import GameState from '../container/GameState';
import MapSideElement from '../container/MapSideElement';

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
