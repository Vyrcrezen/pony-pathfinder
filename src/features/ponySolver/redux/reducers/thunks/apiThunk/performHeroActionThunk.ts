
//postApproveHeroTurn
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import PonyReducerAction from '../../../types/PonyReducerAction';
import postApproveHeroTurn from "../../../../api/postApproveHeroTurn";
import GameResources from "../../../../types/GameResources";
import HeroAction from "../../../../types/HeroAction";
import selectHeroAction from "../../../../util/selectHeroAction";

const performHeroActionThunk = ({gameResources}: {gameResources: GameResources}) => async (dispatch: Dispatch<AnyAction>) => {

    const heroId = gameResources.mapState?.heroes[0].id;
    const heroPath = gameResources.heroPath;
    if (!heroId || !heroPath) return;

    const heroAction = selectHeroAction({heroPath, gameResources})

    const response = await postApproveHeroTurn(gameResources.token, heroAction, heroId);

    if (!response) throw new Error();

    dispatch({ type: PonyReducerAction.UPDATE_APPROVE_HERO_TURN_RESPONSE, payload: response });
}

export default performHeroActionThunk;
