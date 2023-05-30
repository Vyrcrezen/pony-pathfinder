import React from "react";
import { useAppSelector } from "../../../../global/redux/hooks";

/**
 * 
 * @returns A simple game log widget. For every step the game takes, it also generates a new log entry. This widget displays the last 6 of these log entries.
 */
export default function GameState() {

    const state = useAppSelector(state => state.ponySolver);

    return (
        <div className="d-flex flex-column align-items-start rounded vy-secondary p-1 flex-grow-1">
            <ul className="list-unstyled m-0 p-0">
                <li>{state.state.taskLog[0] ?? ''}</li>
                <li>{state.state.taskLog[1] ?? ''}</li>
                <li>{state.state.taskLog[2] ?? ''}</li>
                <li>{state.state.taskLog[3] ?? ''}</li>
                <li>{state.state.taskLog[4] ?? ''}</li>
                <li>{state.state.taskLog[5] ?? ''}</li>
            </ul>
        </div>
    );
}
