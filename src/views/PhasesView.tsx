import { Box, Button, Card, CardContent, CardHeader, Chip, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import Phases from "../components/Phases";
import { ViewProps } from "../models/ViewProps";

import AddIcon from "@mui/icons-material/Add";
import { ProjectPhase, PHASETYPE } from "../models/Project";
import { matchTeamsToPhases } from "../utils/projectUtils";
import ProjectTimeline from "../components/ProjectTimeline";
import { useState } from "react";
import ModalWrapper from "../components/ModalWrapper";
import { v4 } from "uuid";
import { PERSONROLE, Person, SENIORITY } from "../models/People";


interface PremadePhase {
	name: string;
	type: PHASETYPE;
	weeks: number;
	features: string[];
	teamName: string;
	teamMembers: Partial<Person>[];

}


const PREMADEPHASES: (PremadePhase | string)[] = [
	"Innovate & Advice",

	{

		name: "Technical Architecture Review",
		type: PHASETYPE.CONSULTING,
		weeks: 6,
		features: ["Kickoff workshop", "Workshop #2", "Workshop #3", "Report"],
		teamName: "I&A Consulting Team",
		teamMembers: [
			{
				name: "Lead Solution Architect",
				roles: [[PERSONROLE.Architect, SENIORITY.Lead], [PERSONROLE.Manager, SENIORITY.Mid]],
				allocation: 0.4,
				pricegroup: "Consultant"
			},
			{
				name: "Software Architect",
				roles: [[PERSONROLE.Architect, SENIORITY.Senior], [PERSONROLE.Developer, SENIORITY.Senior]],
				allocation: 0.4,
				pricegroup: "Consultant"
			},
		]

	},

	"Maintenance Mode",

];


const PhasesView = (props: ViewProps) => {

	const [newPhaseModalOpen, setNewPhaseModalOpen] = useState<boolean>(false);

	function addNewPhase() {
		const newPhase: ProjectPhase = {
			id: Math.random().toString(36).substr(2, 9),
			type: PHASETYPE.DEFAULT,
			weeks: 4,
			teamAllocations: [],
			startAfter: [],
			features: []
		};

		const newPhases = [...props.project.phases, newPhase];

		props.onUpdate(matchTeamsToPhases({ ...props.project, phases: newPhases }));
	}


	function addPremadePhase(phase: ProjectPhase) {

	}



	return (
		<Container maxWidth="xl" sx={{ mt: 10 }}>
			<Paper elevation={4} sx={{ padding: "1rem" }}>
				<Typography variant="h4">Project Phases</Typography>

				<Stack direction="column" spacing={1}>
					<Box sx={{ padding: "1rem 0" }}>
						<ProjectTimeline project={props.project} onUpdate={props.onUpdate} />
					</Box>

					<Phases project={props.project} onUpdate={props.onUpdate}></Phases>

					<Card>
						<CardContent>
							<Stack direction="row" spacing={3}>
								<Button variant="contained" onClick={addNewPhase} size="small" startIcon={<AddIcon />}>
									Add new phase
								</Button>

								<Button variant="contained" onClick={() => setNewPhaseModalOpen(true)} size="small" startIcon={<AddIcon />}>
									Add pre-made phase
								</Button>
							</Stack>
						</CardContent>
					</Card>

					{newPhaseModalOpen &&
						<ModalWrapper onClose={() => setNewPhaseModalOpen(false)}>
							<Box>
								<Typography variant="h5">Add pre-made phase</Typography>
							</Box>

							{PREMADEPHASES.map((phase, index) => {

								if (typeof phase === "string") {
									return (
										<Box sx={{ width: "100%", p: 0, m: 0 }}>
											<Typography key={index} variant="body2">
												{phase}
											</Typography>
										</Box>
									);
								}

								return <PreMadePhase key={phase.name} premadePhase={phase} createPhase={addPremadePhase} />

							})}


						</ModalWrapper>

					}


				</Stack>
			</Paper>
		</Container>
	);
};


const PreMadePhase = ({ premadePhase, createPhase }: { premadePhase: PremadePhase; createPhase: (p: ProjectPhase) => void }) => {


	function createNewPhase() {

	}

	return ( 
		<Card elevation={7} sx={{p: 2, m: 1}}>
			<Grid container spacing={1} alignItems="center" justifyContent="flex-start">
				<Grid xs={5}>
					<Typography variant="h6">{premadePhase.name}</Typography>
					<Typography variant="subtitle2">{premadePhase.weeks} weeks with {premadePhase.teamName}</Typography>
				</Grid>

				<Grid xs={7}>
					<Stack direction="row" spacing={2} flexWrap="wrap">
						{premadePhase.features.map((feature, index) => {
							return (<Chip key={`feature-${index}`} label={feature} size="small" color="primary" />)
						})}
					</Stack>
				</Grid>

			</Grid>
		</Card>

	)


}


export default PhasesView;
