
//postApproveHeroTurn
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import PonyReducerAction from '../../../types/PonyReducerAction';
import postApproveHeroTurn from "../../../../api/postApproveHeroTurn";
import GameResources from "../../../../types/GameResources";
import HeroAction from "../../../../types/HeroAction";

const performHeroActionThunk = ({gameResources}: {gameResources: GameResources}) => async (dispatch: Dispatch<AnyAction>) => {

    // const heroId = gameResources.gameMap?.heroes[0].id;
    // const heroPath = gameResources.gameMap?.heroes[0].heroPath;
    // if (!heroId || !heroPath) return;

    // const heroAction = selectHeroAction({heroPath, gameResources})

    const hero = gameResources.gameMap.heroes[0];
    const response = await postApproveHeroTurn(gameResources.token, hero.heroAction, hero.id);

    if (!response) throw new Error();

    dispatch({ type: PonyReducerAction.UPDATE_APPROVE_HERO_TURN_RESPONSE, payload: response });

}

export default performHeroActionThunk;
