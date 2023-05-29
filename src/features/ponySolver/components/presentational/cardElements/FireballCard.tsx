import React, { useState } from "react";

import fireballPortraitImg from './../../../media/images/fireball-portrait.png';
import { TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../../global/redux/hooks";
import { setBulletBulletDamageWeight, setBulletFlatMultiplier, setBulletFormulaVerticalAdjustement, setBulletHeatCutoffThreshold, setBulletHeatFormula, setGhostBulletDamageWeight, setGhostFormulaVerticalAdjustement, setGhostHeatCutoffThreshold, setGhostHeatFormula, setGhostMoveProbabilityWeight, setGhostTouchDamageWeight } from "../../../redux/reducers/gameUserInputSlice";
import { evaluate } from "mathjs";

export default function FireballCard() {

    const [formulaError, setFormulaError] = useState(false);
    const [formulaErrorMessage, setFormulaErrorMessage] = useState('');

    const bulletHeatSettings = useAppSelector(state => state.ponySolver.userInput.bulletHeatSettings);
    const dispatch = useAppDispatch();

    return (
        <div className="rounded vy-secondary p-3">
            <div className="container p-0">
                <div className="row gx-2">
                    <div className="col gx-2">
                        <div className="d-flex flex-row align-items-start">
                            <img className="img-fluid rounded vy-img-fit vy-profile-img me-2" src={fireballPortraitImg} alt="Player character" />
                            <div className="d-flex flex-column flex-grow-1">
                                <h5>Bullets</h5>
                                <TextField
                                    className="mb-2"
                                    fullWidth
                                    label='Bullet damage weight:'
                                    defaultValue={bulletHeatSettings.bulletDamageWeight}
                                    variant='standard'
                                    size="small"
                                    onBlur={(event) => dispatch(setBulletBulletDamageWeight(+event.target.value))}
                                />
                                <TextField
                                    className="mb-2"
                                    fullWidth
                                    label='Heat cutoff threshold:'
                                    defaultValue={bulletHeatSettings.heatCutoffThreshold}
                                    variant='standard'
                                    size="small"
                                    onBlur={(event) => dispatch(setBulletHeatCutoffThreshold(+event.target.value))}
                                />
                                <TextField
                                    className="mb-2"
                                    fullWidth
                                    label='Formula vertical adj.:'
                                    defaultValue={bulletHeatSettings.formulaVerticalAdjustement}
                                    variant='standard'
                                    size="small"
                                    onBlur={(event) => dispatch(setBulletFormulaVerticalAdjustement(+event.target.value))}
                                />
                                <TextField
                                    className="mb-2"
                                    fullWidth
                                    label='Flat multiplier:'
                                    defaultValue={bulletHeatSettings.flatMultiplier}
                                    variant='standard'
                                    size="small"
                                    onBlur={(event) => dispatch(setBulletFlatMultiplier(+event.target.value))}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-2 gx-2">
                    <TextField
                        label='Heat formula'
                        defaultValue={bulletHeatSettings.heatFormula}
                        variant='standard'
                        size="small"
                        onBlur={(event) => {
                            try {
                                evaluate(event.target.value, { x: 1});
                                setFormulaError(false);
                            }
                            catch (err) {
                                setFormulaError(true);
                                if (err instanceof Error) setFormulaErrorMessage(err.message);
                            }
                            
                            if (!formulaError) dispatch(setBulletHeatFormula(event.target.value));
                            
                        }}
                        error={formulaError}
                        helperText={formulaError && `Invalid formula. ${formulaErrorMessage}`}
                    />
                </div>
            </div>
        </div>
    );
}
