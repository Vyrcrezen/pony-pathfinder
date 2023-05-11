import React from "react";
import { useAppSelector } from "../../../../global/redux/hooks";

export default function GameState() {

    const state = useAppSelector(state => state.ponySolver);

    return (
        <div className="d-flex flex-column align-items-center w-100 rounded vy-secondary mt-3 p-3">
            <p className="text-center">
                Current state: <span className="fs-4">{state.gameplayState.tasks[0]}</span>

            </p>
            <span>{state.gameplayState.tasks[1] ?? ''}</span>
            <br />
            <span>{state.gameplayState.tasks[2] ?? ''}</span>
            <br />
            <span>{state.gameplayState.tasks[3] ?? ''}</span>
        </div>
    );
}
