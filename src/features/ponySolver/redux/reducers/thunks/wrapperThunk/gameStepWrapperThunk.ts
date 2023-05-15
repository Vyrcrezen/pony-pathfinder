import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { AppDispatch } from "../../../../../../global/redux/store";
import GameState from "../../../../types/GameState";
import { pushTaskDescription } from "../../gameStateSlice";

type ThunkType<T> = (arg: T) => (dispatch: Dispatch<AnyAction>) => Promise<void>

function gameStepActionWrapper (dispatch: AppDispatch, gameState: GameState, taskDescription: string, simpleAction: AnyAction): void;
async function gameStepActionWrapper<T> (dispatch: AppDispatch, gameState: GameState, taskDescription: string, thunk: ThunkType<T>, thunkArg?: T): Promise<void>
async function gameStepActionWrapper<T> (dispatch: AppDispatch, gameState: GameState, taskDescription: string, action: AnyAction | ThunkType<T | undefined>, thunkArg?: T) {
  
    if (gameState.isPlaying || (gameState.isStepping && !gameState.isStepFinished)) {
      dispatch(pushTaskDescription(taskDescription));

      if (typeof action === 'function') await dispatch(action(thunkArg));
      else dispatch(action);
      
      dispatch(pushTaskDescription(`${taskDescription} finished`));  
    }
  };

export default gameStepActionWrapper;
