import Coordinate from "./Coordinate";

export default interface Bullet {
    id: number;
    position: Coordinate;
    damage: number;
    direction: "LEFT" | "RIGHT" | "UP" | "DOWN";
    shotByEnemyId: number;
}
