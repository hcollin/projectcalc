import { Card, CardContent } from "@mui/material";
import { Project } from "../models/Project";
import { calculatePrice } from "../utils/projectUtils";




const TotalPrice = ({ project }: { project: Project }) => {

    const price = calculatePrice(project);

    return (
        <Card>
            <CardContent>
                Total Price: {numberWithSpaces(price)}€
            </CardContent>
        </Card>
    )
}

export default TotalPrice;

function numberWithSpaces(x: number): string {
    const parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
}