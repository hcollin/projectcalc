import { Box, Card, CardContent, Slider, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { PriceItem } from "../models/Project";


export interface PriceSliderProps {
    priceItem: PriceItem;
    onUpdate: (price: PriceItem) => void;
}


const PriceSlider = (props: PriceSliderProps) => {

    const [value, setValue] = useState<number>(0);

    useEffect(() => {
        console.log("Price props CHANGE:", props.priceItem.value);

        setValue(props.priceItem.value);
    }, [props.priceItem.value])

    function handleChange(e: any, value: number | number[]) {
        setValue(value as number);
    }

    function handleCommit() {
        props.onUpdate({ ...props.priceItem, value: value });
    }

    const min = props.priceItem.min || 50;
    const max = props.priceItem.max || 150;


    return (
        <Box sx={{ padding: "0.5rem 0rem 0.5rem .5rem" }}>
            <Typography variant="body2" component="div">
                {props.priceItem.name}
            </Typography>

            <Box sx={{ display: "flex", marginTop: "0.25rem", justifyContent: "space-between", alignItems: "center" }}>
                <Slider
                    value={value}
                    min={min}
                    max={max}
                    onChange={handleChange}
                    onChangeCommitted={handleCommit}
                />
                <Typography variant="body1" component="div" sx={{ width: "5rem", marginLeft: "1rem" }}>
                    {value} €/h
                </Typography>
            </Box>
        </Box>
    )
}


export default PriceSlider;