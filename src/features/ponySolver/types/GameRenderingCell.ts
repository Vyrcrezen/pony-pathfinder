import Bullet from "./Bullet";
import Enemy from "./Enemy";
import ExtendedHero from "./ExtendedHero";
import HeroMovement from "./HeroMovement";
import Path from "./Path";
import Treasure from "./Treasure";


type GameRenderingCell = ({ type: 'hero', data: ExtendedHero } | { type: 'treasure', data: Treasure } | { type: 'enemy', data: Enemy } | { type: 'bullet', data: Bullet } | { type: 'heroAttack', data: { heroId: number } } | { type: 'heroPath', data: { direction: HeroMovement, path: Path} } | { type: 'obstacle', data: { type: 'wall' } } )[];

export default GameRenderingCell;
