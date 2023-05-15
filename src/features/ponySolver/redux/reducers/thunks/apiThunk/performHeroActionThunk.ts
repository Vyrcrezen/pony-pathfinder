
//postApproveHeroTurn
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import PonyReducerAction from '../../../types/PonyReducerAction';
import postApproveHeroTurn from "../../../../api/postApproveHeroTurn";
import GameResources from "../../../../types/GameResources";
import HeroAction from "../../../../types/HeroAction";

const performHeroActionThunk = ({gameResources}: {gameResources: GameResources}) => async (dispatch: Dispatch<AnyAction>) => {

    const heroId = gameResources.mapState?.heroes[0].id;
    const heroPath = gameResources.heroPath;
    if (!heroId || !heroPath) return;

    const pathCoordinates = heroPath.map(graphVertex => ({ x: graphVertex.split('-')[0], y: graphVertex.split('-')[1] }));

    let heroAction: HeroAction = "USE_SHIELD";
    if (pathCoordinates[0].x > pathCoordinates[1].x) heroAction = "MOVE_LEFT"
    else if (pathCoordinates[0].x < pathCoordinates[1].x) heroAction = "MOVE_RIGHT"
    else if (pathCoordinates[0].y > pathCoordinates[1].y) heroAction = "MOVE_DOWN"
    else if (pathCoordinates[0].y < pathCoordinates[1].y) heroAction = "MOVE_UP"

    console.log(`Selected hero action: ${heroAction}`);

    const response = await postApproveHeroTurn(gameResources.token, heroAction, heroId);

    if (!response) throw new Error();

    dispatch({ type: PonyReducerAction.UPDATE_APPROVE_HERO_TURN_RESPONSE, payload: response });
}

export default performHeroActionThunk;
