import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import PonyReducerAction from '../../../types/PonyReducerAction';
import postResetLevel from "../../../../api/postResetLevel";

const postResetLevelThunk = ({token}: {token: string}) => async (dispatch: Dispatch<AnyAction>) => {

    const response = await postResetLevel(token);

    if (!response) throw new Error();

    dispatch({ type: PonyReducerAction.UPDATE_PLAYTHROUGH_STATE, payload: response.playthroughState });
}

export default postResetLevelThunk;
