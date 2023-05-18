import { Slider} from "@mui/material";
import React from "react";
import { setHeatMapOpacity } from "../../redux/reducers/gameUserInputSlice";
import { useAppDispatch } from "../../../../global/redux/hooks";

export default function MapControls() {

    const dispatch = useAppDispatch();

    return (
        <div className="d-flex flex-row w-100">
                <Slider
                    className="w-100"
                    aria-label="Heat map slider"
                    defaultValue={20}
                    valueLabelDisplay="auto"
                    step={10}
                    marks
                    min={0}
                    max={100}
                    onChange={(_event, value) => dispatch(setHeatMapOpacity(Array.isArray(value) ? value[0] : value))}
                />
        </div>
    );
}