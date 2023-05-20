import Bullet from "./Bullet";
import Enemy from "./Enemy";
import Hero from "./Hero";
import Treasure from "./Treasure";

export default interface MapState {
    message: string;
    map: {
        id: number;
        width: number;
        height: number;
        elapsedTickCount: number;
        status: "CREATED" | "PLAYING" | "WON" | "LOST";
        treasures: Treasure[];
        enemies: Enemy[];
        bullets: Bullet[];
        isGameOver: boolean;
    };
    heroes: Hero[];
}
