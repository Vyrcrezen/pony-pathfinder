import React from 'react';
import GameControl from '../container/GameControl';
import PathingMap from '../container/PathingMap';
import { ThemeProvider } from '@mui/material';
import defaultTheme from '../../../../global/mui/defaultTheme';
import DebugReduxStore from '../container/DebugReduxStore';
import GameState from '../container/GameState';

export default function GameSolverUi() {

    return (
        <ThemeProvider theme={defaultTheme} >
            <div className='container d-flex flex-column align-items-center'>
                <div className='d-flex flex-column align-items-center mt-3 p-3 w-75'>
                    <GameControl />
                    <GameState />
                    <PathingMap />
                    <DebugReduxStore />
                </div>
            </div>
        </ThemeProvider>
    );

}
