import { Box, Button, Card, CardContent, Slider, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { PriceItem } from "../models/Project";

import DeleteIcon from '@mui/icons-material/Delete';
export interface PriceSliderProps {
    priceItem: PriceItem;
    onUpdate: (price: PriceItem) => void;
    removePrice: (price: PriceItem) => void;
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

    function removePrice() {
        props.removePrice(props.priceItem);
    }

    const min = props.priceItem.min || 50;
    const max = props.priceItem.max || 150;


    return (

        <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body2" component="div" sx={{ width: "15rem" }}>
                {props.priceItem.name}
            </Typography>


            <Slider
                value={value}
                min={min}
                max={max}
                onChange={handleChange}
                onChangeCommitted={handleCommit}
                marks={
                    [
                        { value: min, label: `${min} €/h` },
                        { value: max, label: `${max} €/h` },
                    ]
                }
            />
            <Typography variant="body1" component="div" sx={{ width: "8rem" }}>
                {value} €/h
            </Typography>

            <Button variant="contained" color="error" onClick={removePrice} disabled={props.priceItem.id === "defaultprice"}>
                Delete
            </Button>
        </Stack>

    )
}


export default PriceSlider;