import { Button, Card, CardContent, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import { ViewProps } from "../models/ViewProps";
import Prices from "../components/Prices";
import { useState } from "react";
import { PriceItem } from "../models/Project";
import { v4 } from "uuid";






const PricesView = (props: ViewProps) => {

    const [priceName, setPriceName] = useState<string>("");
    const [newPriceMin, setNewPriceMin] = useState<number>(60);
    const [newPriceMax, setNewPriceMax] = useState<number>(180);



    function newPrice() {
            
            const defaultPrice = props.project.prices[0];

            const targetPrice = Math.round((newPriceMin + newPriceMax) / 2);
            const newPriceItem: PriceItem = {
                id: v4(),
                name: priceName,
                value: targetPrice,
                min: newPriceMin,
                max: newPriceMax,
            };
    
            const newPrices = [...props.project.prices, newPriceItem];
    
            props.onUpdate({ ...props.project, prices: newPrices });
    
            setPriceName("");
    }



    function updateNewValue(e: any) {
        console.log(e.target.value);
        
        setPriceName(e.target.value);
    }


    const avgPrice = props.project.prices.reduce((acc, priceItem) => acc + priceItem.value, 0) / props.project.prices.length;

    return (
        <Container maxWidth="lg">
            <Paper elevation={4} sx={{ padding: "1rem" }}>
                <Typography variant="h4">Prices</Typography>

                <Stack direction="column" spacing={3} >

                    <Card>
                        <CardContent>
                            <Typography variant="h5">Average price</Typography>
                            <Typography variant="h6">{avgPrice}</Typography>
                        </CardContent>
                    </Card>

                    <Prices project={props.project} onUpdate={props.onUpdate} ></Prices>

                    <Card>
                        <CardContent>
                            <Stack direction="row" spacing={3}>
                                <TextField label="New pricegroup name" variant="outlined" value={priceName} onChange={updateNewValue}></TextField>
                                <TextField label="Minimum price" variant="outlined" value={newPriceMin} onChange={(e) => setNewPriceMin(parseInt(e.target.value))} type="number"></TextField>
                                <TextField label="Maximum price" variant="outlined" value={newPriceMax} onChange={(e) => setNewPriceMax(parseInt(e.target.value))} type="number"></TextField>

                                <Button variant="contained" onClick={newPrice}>Add</Button>
                            </Stack>
                        </CardContent>
                    </Card>


                </Stack>

            </Paper>
        </Container>
    )

}


export default PricesView;