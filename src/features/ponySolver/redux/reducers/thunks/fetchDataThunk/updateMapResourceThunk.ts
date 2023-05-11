import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import PonyReducerAction from '../../../types/PonyReducerAction';
import getMapResource from "../../../../api/getMapResource";

const updateMapResourceThunk = ({token}: {token: string}) => async (dispatch: Dispatch<AnyAction>) => {

    const response = await getMapResource(token);

    if (!response) throw new Error();

    dispatch({ type: PonyReducerAction.UPDATE_MAP_RESOURCE, payload: response });
}

export default updateMapResourceThunk;
