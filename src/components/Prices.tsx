import { Card, CardContent, Typography } from "@mui/material";
import { PriceItem, Project } from "../models/Project";
import PriceSlider from "./PriceSlider";


export interface PricesProps {
    project: Project;
    onUpdate: (project: Project) => void;
}

const Prices = (props: PricesProps) => {

    function priceUpdate(price: PriceItem) {

        const newPrices = props.project.prices.map((priceItem) => {
            if (priceItem.name === price.name) {
                return price;
            }
            return priceItem;
        });

        props.onUpdate({ ...props.project, prices: newPrices });

    }

    const avgPrice = props.project.prices.reduce((acc, priceItem) => acc + priceItem.value, 0) / props.project.prices.length;

    return (
        <Card>
            <CardContent>

                <Typography variant="h5" component="div" sx={{ color: "primary.main" }}>
                    Prices  ({avgPrice.toFixed(2)} €/h)
                </Typography>

                {props.project.prices.map((priceItem, index) => {
                    return (
                        <PriceSlider priceItem={priceItem} onUpdate={priceUpdate} key={`price-item-${priceItem.name}`} />
                    );

                })}

            </CardContent>
        </Card>
    )
}

export default Prices;