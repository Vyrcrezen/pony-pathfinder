import React from "react";

import playerPortraitImg from './../../../media/images/hero-portrait.png';
import { LinearProgress } from "@mui/material";
import { useAppSelector } from "../../../../../global/redux/hooks";
import getReadableHeroAction from "../../../util/getReadableHeroAction";

/**
 * 
 * @returns The player card, which includes the player image, the current level, player health and the next player ection. Clicking on the player image will log the `Redux store` to the console.
 */
export default function PlayerCard() {

    const state = useAppSelector(state => state.ponySolver);

    // Retrieve the values which are to be displayed
    const storeResources = useAppSelector(state => state.ponySolver.resources);
    const heroHealth = Math.round((storeResources.gameMap.heroes[0]?.health ?? 1) * 100);
    const heroAction = storeResources.gameMap.heroes[0]?.heroAction ?? "NOTHING";
    const readableHeroAction = heroAction === 'NOTHING' ? 'Thinking' : getReadableHeroAction(heroAction);

    return (
        <div className="d-flex flex-wrap rounded vy-secondary p-2 flex-grow-1">
            <div className="image-container">
                <img
                    className="img-fluid rounded vy-img-fit vy-profile-img"
                    src={playerPortraitImg}
                    alt="Player character"
                    onClick={() => console.log(state)}
                />
            </div>
            <div className="description-container ms-2 flex-grow-1">
                <h5 className="m-0">Player</h5>
                <small>Level: {storeResources?.playthroughState?.currentLevel ?? '??'}</small>
                <div className="position-relative">
                    <LinearProgress className="rounded" color="error" variant="determinate" value={heroHealth} sx={{ height: 20 }} />
                    <div className="progress-value">{heroHealth}</div>
                </div>
                <div className="mt-2">{readableHeroAction}</div>
            </div>
        </div>
    );
}
