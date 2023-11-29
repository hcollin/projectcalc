import { ToggleButtonGroup, ToggleButton } from "@mui/material";


interface ModeTogglerProps {
    value: string;
    options: [string, string][];
    onChange: (v: string) => void;
}

const ModeToggler = (props: ModeTogglerProps) => {



    return <ToggleButtonGroup
        value={props.value}
        exclusive
        size="small"
        onChange={(e, v) => props.onChange(v)}
        aria-label="text alignment"
        color="primary"

    >
        {props.options.map((o, i) => {
            return <ToggleButton key={o[0]} value={o[0]}>{o[1]}</ToggleButton>
        })}

    </ToggleButtonGroup>;
}

export default ModeToggler;
