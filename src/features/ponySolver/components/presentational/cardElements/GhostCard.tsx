import React, { useState } from "react";

import ghostPortraitImg from './../../../media/images/ghost-portrait.png';
import { TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../../global/redux/hooks";
import { setGhostBulletDamageWeight, setGhostFlatMultiplier, setGhostFormulaVerticalAdjustement, setGhostHeatCutoffThreshold, setGhostHeatFormula, setGhostMoveProbabilityWeight, setGhostTouchDamageWeight } from "../../../redux/reducers/gameUserInputSlice";
import { evaluate } from "mathjs";

export default function GhostCard() {

    const [formulaError, setFormulaError] = useState(false);
    const [formulaErrorMessage, setFormulaErrorMessage] = useState('');

    const ghostHeatSettings = useAppSelector(state => state.ponySolver.userInput.ghostHeatSettings);
    const dispatch = useAppDispatch();

    return (
        <div className="rounded vy-secondary p-3 mb-2">
            <div className="container p-0">
                <div className="row gx-2">
                    <div className="col gx-2">
                        <div className="d-flex flex-row align-items-start">
                            <img className="img-fluid rounded vy-img-fit vy-profile-img me-2" src={ghostPortraitImg} alt="Player character" />
                            <div className="d-flex flex-column flex-grow-1">
                                <h5>Ghosts</h5>
                                <TextField
                                    className="mb-2"
                                    fullWidth
                                    label='Touch damage weight:'
                                    defaultValue={ghostHeatSettings.touchDamageWeight}
                                    variant='standard'
                                    size="small"
                                    onBlur={(event) => dispatch(setGhostTouchDamageWeight(+event.target.value))}
                                />
                                <TextField
                                    className="mb-2"
                                    fullWidth
                                    label='Bullet damage weight:'
                                    defaultValue={ghostHeatSettings.bulletDamageWeight}
                                    variant='standard'
                                    size="small"
                                    onBlur={(event) => dispatch(setGhostBulletDamageWeight(+event.target.value))}
                                />
                                <TextField
                                    className="mb-2"
                                    fullWidth
                                    label='Move probability weight:'
                                    defaultValue={ghostHeatSettings.moveProbabilityWeight}
                                    variant='standard'
                                    size="small"
                                    onBlur={(event) => dispatch(setGhostMoveProbabilityWeight(+event.target.value))}
                                />
                                <TextField
                                    className="mb-2"
                                    fullWidth
                                    label='Shoot probability weight:'
                                    defaultValue={ghostHeatSettings.shootProbabilityWeight}
                                    variant='standard'
                                    size="small"
                                    onBlur={(event) => dispatch(setGhostMoveProbabilityWeight(+event.target.value))}
                                />
                                <TextField
                                    className="mb-2"
                                    fullWidth
                                    label='Heat cutoff threshold:'
                                    defaultValue={ghostHeatSettings.heatCutoffThreshold}
                                    variant='standard'
                                    size="small"
                                    onBlur={(event) => dispatch(setGhostHeatCutoffThreshold(+event.target.value))}
                                />
                                <TextField
                                    className="mb-2"
                                    fullWidth
                                    label='Formula vertical adj.:'
                                    defaultValue={ghostHeatSettings.formulaVerticalAdjustement}
                                    variant='standard'
                                    size="small"
                                    onBlur={(event) => dispatch(setGhostFormulaVerticalAdjustement(+event.target.value))}
                                />
                                <TextField
                                    className="mb-2"
                                    fullWidth
                                    label='Flat multiplier:'
                                    defaultValue={ghostHeatSettings.flatMultiplier}
                                    variant='standard'
                                    size="small"
                                    onBlur={(event) => dispatch(setGhostFlatMultiplier(+event.target.value))}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-2 gx-2">
                    <TextField
                        label='Heat formula'
                        defaultValue={ghostHeatSettings.heatFormula}
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
                            
                            if (!formulaError) dispatch(setGhostHeatFormula(event.target.value));
                            
                        }}
                        error={formulaError}
                        helperText={formulaError && `Invalid formula. ${formulaErrorMessage}`}
                    />
                </div>
            </div>
        </div>
    );
}
