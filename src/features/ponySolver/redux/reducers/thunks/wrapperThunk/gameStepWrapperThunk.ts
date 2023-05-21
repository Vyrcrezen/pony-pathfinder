import { Action, ActionCreator, ActionCreatorWithPayload, ActionCreatorWithoutPayload, AnyAction, Dispatch } from "@reduxjs/toolkit";
import { AppDispatch } from "../../../../../../global/redux/store";
import GameState from "../../../../types/GameState";
import { pushTaskDescription } from "../../gameStateSlice";

type ThunkType<T> = (arg: T) => (dispatch: Dispatch<AnyAction>) => Promise<void>

function gameStepActionWrapper<T> (dispatch: AppDispatch, gameState: GameState, taskDescription: string, simpleAction: ActionCreatorWithoutPayload): void;
async function gameStepActionWrapper<T> (dispatch: AppDispatch, gameState: GameState, taskDescription: string, thunk: ThunkType<T>, actionArg?: T): Promise<void>
async function gameStepActionWrapper<T> (dispatch: AppDispatch, gameState: GameState, taskDescription: string, action: AnyAction | ThunkType<T | undefined>, actionArg?: T) {
  
    if (gameState.isPlaying || (gameState.isStepping && !gameState.isStepFinished)) {
      dispatch(pushTaskDescription(taskDescription));

      if (typeof action === 'function') await dispatch(action(actionArg));
      else dispatch(action);
    }
  };

export default gameStepActionWrapper;
