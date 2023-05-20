import Bullet from "./Bullet";
import Coordinate from "./Coordinate";
import Enemy from "./Enemy";
import ExtendedHero from "./ExtendedHero";
import HeroMovement from "./HeroMovement";
import Path from "./Path";
import Treasure from "./Treasure";

type GameMap = { heroes: ExtendedHero[], enemies: Enemy[], treasures: Treasure[], bullets: Bullet[]};

export default GameMap;
