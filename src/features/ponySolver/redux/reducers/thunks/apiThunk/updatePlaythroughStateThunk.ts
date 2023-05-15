import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import PonyReducerAction from '../../../types/PonyReducerAction';
import getMapState from "../../../../api/getMapState";
import getPlaythroughState from "../../../../api/getPlaythroughState";

const updatePlaythroughStateThunk = ({token}: {token: string}) => async (dispatch: Dispatch<AnyAction>) => {

    const response = await getPlaythroughState(token);

    if (!response) throw new Error();

    dispatch({ type: PonyReducerAction.UPDATE_PLAYTHROUGH_STATE, payload: response });
}

export default updatePlaythroughStateThunk;
