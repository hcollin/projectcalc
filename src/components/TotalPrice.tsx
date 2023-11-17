import { Card, CardContent, Typography } from "@mui/material";
import { Project } from "../models/Project";
import { calculatePrice, numberWithSpaces } from "../utils/projectUtils";

const TotalPrice = ({ project }: { project: Project }) => {
	const price = calculatePrice(project);
	return (
		<Card elevation={5}>
			<CardContent>
				<Typography variant="body1">Total Price</Typography>
				<Typography variant="h6">{numberWithSpaces(price)} €</Typography>
			</CardContent>
		</Card>
	);
};

export default TotalPrice;
