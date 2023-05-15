import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import PonyReducerAction from '../../../types/PonyReducerAction';
import getPlaythroughState from "../../../../api/getPlaythroughState";
import postNextLevel from "../../../../api/postNextLevel";

const postNextLevelThunk = ({token}: {token: string}) => async (dispatch: Dispatch<AnyAction>) => {

    const response = await postNextLevel(token);

    if (!response) throw new Error();

    dispatch({ type: PonyReducerAction.UPDATE_PLAYTHROUGH_STATE, payload: response.playthroughState });
}

export default postNextLevelThunk;
