import Coordinate from "../types/Coordinate";
import HeroAction from "../types/HeroAction";
import HeroMovement from "../types/HeroMovement";

function getMovementDirection(start: Coordinate, end: Coordinate): HeroMovement;
function getMovementDirection(start: number[], end: number[]): HeroMovement;
 function getMovementDirection(start: Coordinate | number[], end: Coordinate | number[]): HeroMovement {
    let intendedAction: HeroMovement = "NOTHING";

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
