import React from "react";
import { useAppSelector } from "../../../../global/redux/hooks";

export default function DebugReduxStore() {
    const state = useAppSelector(state => state.ponySolver)

    return(
        <div className='d-flex flex-column w-100 rounded vy-secondary mt-3 p-3'>
            <pre>
                {JSON.stringify(state, null, 2)}
            </pre>
        </div>
    );
}
