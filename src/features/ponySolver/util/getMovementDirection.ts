import Coordinate from "../types/Coordinate";
import HeroAction from "../types/HeroAction";

function getMovementDirection(start: Coordinate, end: Coordinate): HeroAction;
function getMovementDirection(start: number[], end: number[]): HeroAction;
 function getMovementDirection(start: Coordinate | number[], end: Coordinate | number[]): HeroAction {
    let intendedAction: HeroAction = "USE_SHIELD";

    if (!Array.isArray(start) && !Array.isArray(end) ) {
        if (start.x > end.x) intendedAction = "MOVE_LEFT";
        else if (start.x < end.x) intendedAction = "MOVE_RIGHT";
        else if (start.y > end.y) intendedAction = "MOVE_DOWN";
        else if (start.y < end.y) intendedAction = "MOVE_UP";
    }
    else if (Array.isArray(start) && Array.isArray(end) ) {
        if (start[0] > end[0]) intendedAction = "MOVE_LEFT";
        else if (start[0] < end[0]) intendedAction = "MOVE_RIGHT";
        else if (start[1] > end[1]) intendedAction = "MOVE_DOWN";
        else if (start[1] < end[1]) intendedAction = "MOVE_UP";
    }

    return intendedAction;
}

export default getMovementDirection;
