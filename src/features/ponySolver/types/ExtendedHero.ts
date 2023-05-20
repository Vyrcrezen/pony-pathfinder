import Hero from "./Hero";
import HeroAction from "./HeroAction";
import HeroMovement from "./HeroMovement";
import Path from "./Path";

export default interface ExtendedHero extends Hero {
    heroAction: HeroAction;
    heroPath?: Path;
}
