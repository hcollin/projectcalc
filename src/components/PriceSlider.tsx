import { Box, Button, Card, CardContent, Grid, Slider, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { PriceItem } from "../models/Project";

import DeleteIcon from "@mui/icons-material/Delete";
import RemoveButton from "./buttons/RemoveButton";
import { getConf } from "../data/settings";
export interface PriceSliderProps {
	priceItem: PriceItem;
	onUpdate: (price: PriceItem) => void;
	removePrice: (price: PriceItem) => void;
}

const PriceSlider = (props: PriceSliderProps) => {
	const [value, setValue] = useState<number>(0);

	useEffect(() => {
		setValue(props.priceItem.value);
	}, [props.priceItem.value]);

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

	const dayPrice = value * getConf("time.workingDay");

	return (
		<Box sx={{pr: 2, pl: 2}}>
			<Grid container spacing={2} >
				<Grid item xs={6} lg={2}>
					<Typography variant="body1" component="div">
						{props.priceItem.name}
					</Typography>
				</Grid>

				<Grid item xs={12} lg={7} order={{ xs: 4, lg: 2 }} >
					<Slider
						value={value}
						min={min}
						max={max}
						onChange={handleChange}
						onChangeCommitted={handleCommit}
						marks={[
							{ value: min, label: `${min} €/h` },
							{ value: max, label: `${max} €/h` },
						]}


					/>
				</Grid>
				<Grid item xs={5} lg={2} order={{ xs: 2, lg: 3 }}>
					<Stack direction="row" spacing={1} alignItems="center" justifyContent="space-evenly">
						<Typography variant="body1" component="div" >
							{value} €/h
						</Typography>
						<Typography variant="body2" component="div" >
							{dayPrice} €/day
						</Typography>
					</Stack>
				</Grid>

				<Grid item xs={1} lg={1} order={{ xs: 3, lg: 4 }}>
					<Stack direction="row" alignItems="center" justifyContent="center">
						<RemoveButton onClick={removePrice} disabled={props.priceItem.id === "defaultprice"} noText />
					</Stack>
				</Grid>

			</Grid>
		</Box>
	);
};

export default PriceSlider;
