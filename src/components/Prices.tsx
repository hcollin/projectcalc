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

    function removePrice(price: PriceItem) {
            // Don't allow to remove the first price (the default one)
            if(price.id === props.project.prices[0].id) { return }

            const newPrices = props.project.prices.filter((priceItem) => {
                return priceItem.id !== price.id;
            });
    
            props.onUpdate({ ...props.project, prices: newPrices });
    }



    return (
        <>

            {props.project.prices.map((priceItem, index) => {

                return (
                    <Card key={`price-item-${priceItem.name}`} elevation={6}>
                        <CardContent>
                            <PriceSlider priceItem={priceItem} onUpdate={priceUpdate} removePrice={removePrice}/>
                        </CardContent>
                    </Card>
                );

            })}


        </>
    )
}

export default Prices;