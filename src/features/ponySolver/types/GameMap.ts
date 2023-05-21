import Bullet from "./Bullet";
import Enemy from "./Enemy";
import ExtendedHero from "./ExtendedHero";
import Treasure from "./Treasure";

type GameMap = {heroes: ExtendedHero[], enemies: Enemy[], treasures: Treasure[], bullets: Bullet[]};

export default GameMap;
