import { Button, Card, CardContent, Container, Paper, Stack, Typography } from "@mui/material";
import Phases from "../components/Phases";
import { ViewProps } from "../models/ViewProps";

import AddIcon from "@mui/icons-material/Add";
import { ProjectPhase, PHASETYPE } from "../models/Project";

const PhasesView = (props: ViewProps) => {
	function addNewPhase() {
		const newPhase: ProjectPhase = {
			id: Math.random().toString(36).substr(2, 9),
			type: PHASETYPE.DEFAULT,
			weeks: 4,
		};

		const newPhases = [...props.project.phases, newPhase];

		props.onUpdate({ ...props.project, phases: newPhases });
	}

	return (
		<Container maxWidth="lg">
			<Paper elevation={4} sx={{ padding: "1rem" }}>
				<Typography variant="h4">Project Phases</Typography>
				<Stack direction="column" spacing={1}>
					<Phases project={props.project} onUpdate={props.onUpdate}></Phases>

					<Card>
						<CardContent>
							<Stack direction="row" spacing={3}>
                                
								<Button variant="contained" onClick={addNewPhase} size="small" startIcon={<AddIcon />}>
									Add
								</Button>
							</Stack>
						</CardContent>
					</Card>
				</Stack>
			</Paper>
		</Container>
	);
};

export default PhasesView;
