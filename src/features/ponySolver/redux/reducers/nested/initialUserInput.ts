import UserInput from "../../../types/UserInput";

const initialUserInput: UserInput = {
    heatMapOpacity: 20,
    isHeatValueDisplayEnabled: false,
    graphEdgeMultiplier: 10,

    // Ghost heat settings
    ghostHeatSettings: {
        bulletDamageWeight: 1,
        touchDamageWeight: 1,
        shootProbabilityWeight: 0,
        moveProbabilityWeight: 0.7,
    
        heatCutoffThreshold: 0.1,
        heatFormula: '-0.7log(x+0.55)-0.2',
        formulaVerticalAdjustement: 0,
    },

    bulletHeatSettings: {
        bulletDamageWeight: 1,
        formulaVerticalAdjustement: 0,
        
        heatCutoffThreshold: 0.1,
        heatFormula: '-0.5log(x+0.55)-0.2'
    }
}

export default initialUserInput;
