import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import PonyReducerAction from '../../../types/PonyReducerAction';
import getMapState from "../../../../api/getMapState";

const updateMapStateThunk = ({token}: {token: string}) => async (dispatch: Dispatch<AnyAction>) => {

    const response = await getMapState(token);

    if (!response) throw new Error();

    dispatch({ type: PonyReducerAction.UPDATE_MAP_STATE, payload: response });
}

export default updateMapStateThunk;
