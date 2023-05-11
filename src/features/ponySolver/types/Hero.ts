import Coordinate from "./Coordinate";

export default interface Hero {
    id: number;
    playerId: number;
    position: Coordinate;
    health: number;
    score: number;
}
