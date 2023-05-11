import Coordinate from "./Coordinate";

export default interface Enemy {
    id: number;
    position: Coordinate;
    moveProbability: number;
    shootProbability: number;
    onTouchDamage: number;
    bulletDamage: number;
    health: number;
}
