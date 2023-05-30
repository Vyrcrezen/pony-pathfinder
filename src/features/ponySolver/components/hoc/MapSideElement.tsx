import React from "react";
import PlayerCard from "../presentational/cardElements/PlayerCard";
import GhostCard from "../presentational/cardElements/GhostCard";
import MapRefreshControls from "../presentational/cardElements/MapRefreshControls";
import FireballCard from "../presentational/cardElements/FireballCard";

export default function MapSideElement() {
    return (
        <div className="" >
            <MapRefreshControls />
            <GhostCard />
            <FireballCard />
        </div>
    );
}
