import { FormControlLabel, FormGroup, Slider, Switch } from "@mui/material";
import React from "react";
import { setHeatMapOpacity, setIsHeatValueDisplayEnabled } from "../../redux/reducers/gameUserInputSlice";
import { useAppDispatch, useAppSelector } from "../../../../global/redux/hooks";

export default function MapControls() {

    const userInput = useAppSelector(state => state.ponySolver.userInput);
    const dispatch = useAppDispatch();

    return (
        <div className="container d-flex flex-row align-items-center justify-content-evenly">
            <FormControlLabel control={
                <Slider
                    className="ms-2"
                    aria-label="Heat map slider"
                    defaultValue={20}
                    valueLabelDisplay="auto"
                    step={10}
                    marks
                    min={0}
                    max={100}
                    onChange={(_event, value) => dispatch(setHeatMapOpacity(Array.isArray(value) ? value[0] : value))}
                />
            }
              className="flex-fill text-nowrap" labelPlacement="start" label="Heat Map:" />
            <FormControlLabel control={
                <Switch
                    checked={userInput.isHeatValueDisplayEnabled}
                    onChange={() => dispatch(setIsHeatValueDisplayEnabled(!userInput.isHeatValueDisplayEnabled))}
                />
            }  className="flex-fill" labelPlacement="start" label="Heat Value:" />
        </div>
    );
}