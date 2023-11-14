import { Box, Button, FormControlLabel, IconButton, Radio, RadioGroup, Slider, Typography } from "@mui/material";
import { PHASETYPE, ProjectPhase } from "../models/Project";
import { useState } from "react";

import ModeIcon from '@mui/icons-material/Mode';


const PhaseSlider = ({ phase, onUpdate }: { phase: ProjectPhase, onUpdate: (p: ProjectPhase) => void }) => {

    const [value, setValue] = useState<number>(phase.weeks);
    const [optsOpen, setOptsOpen] = useState<boolean>(false);

    function handleSliderChange(e: any, value: number | number[]) {
        setValue(value as number);
    }

    function handleCommit() {
        onUpdate({ ...phase, weeks: value });
    }

    function handleTypeChange(e: any) {
        
        onUpdate({ ...phase, type: e.target.value });
        setOptsOpen(false);
    }

    const phaseTypes = [
        [PHASETYPE.CONSULTING, "Consulting"],
        [PHASETYPE.RAMPUP, "Rampup"],
        [PHASETYPE.DEFAULT, "Development"],
        [PHASETYPE.RAMPDOWN, "Rampdown"],
        [PHASETYPE.MAINTENANCE, "Maintenance"],
    ];

    return (
        <Box>
            <Typography variant="body1" component="div">
                {phase.type} phase for {value} weeks
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <IconButton onClick={() => setOptsOpen(!optsOpen)}><ModeIcon /></IconButton >
                <Slider
                    value={value}
                    min={1}
                    max={52}
                    onChange={handleSliderChange}
                    onChangeCommitted={handleCommit}
                />
            </Box>

            {optsOpen && <Box>
                <RadioGroup
                    value={phase.type}
                    onChange={handleTypeChange}
                >
                    {phaseTypes.map((type) => {
                        return (
                            <FormControlLabel value={type[0]} control={<Radio />} label={type[1]} key={`${phase.id}-${type[0]}`} />
                        )
                    })}



                </RadioGroup>
            </Box>}

        </Box>
    )
}

export default PhaseSlider;