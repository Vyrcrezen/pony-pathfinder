import React from "react";
import { useAppSelector } from "../../../../global/redux/hooks";

export default function GameState() {

    const state = useAppSelector(state => state.ponySolver);

    return (
        <div className="d-flex flex-column align-items-center w-100 rounded vy-secondary mt-3 p-3">
            <p className="text-center">
                Current state: <span className="fs-4">{state.state.taskLog[0]}</span>

            </p>
            <span>{state.state.taskLog[1] ?? ''}</span>
            <br />
            <span>{state.state.taskLog[2] ?? ''}</span>
            <br />
            <span>{state.state.taskLog[3] ?? ''}</span>
        </div>
    );
}
