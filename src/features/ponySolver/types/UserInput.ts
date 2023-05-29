import GhostHeatSettings from "./GhostHeatSettings";
import BulletHeatSettings from "./BulletHeatSettings";

export default interface UserInput {
    heatMapOpacity: number;
    isHeatValueDisplayEnabled: boolean;

    graphEdgeMultiplier: number;

    // Ghost heat settings
    ghostHeatSettings: GhostHeatSettings;

    // Bullet heat settings
    bulletHeatSettings: BulletHeatSettings;
}
