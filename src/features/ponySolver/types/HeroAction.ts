import HeroMovement from "./HeroMovement";

type HeroAction = HeroMovement | "USE_SHIELD" | "KICK_LEFT" | "KICK_RIGHT" |"KICK_UP" | "KICK_DOWN";

export default HeroAction;
