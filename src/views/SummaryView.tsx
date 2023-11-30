import { Container, Paper, Tab, Tabs, Typography } from "@mui/material";
import { ViewProps } from "../models/ViewProps";
import { useState } from "react";
import ProjectCostTable from "../components/ProjectCostTable";
import ProjectHoursTable from "../components/ProjectHoursTable";
import useStoredState from "../hooks/useStoredState";

const SummaryView = (props: ViewProps) => {

    const [activeTab, setActiveTab] = useStoredState<number>("summary-activetab", 0);

    function handleTabChange(e: React.SyntheticEvent, value: number) {
        setActiveTab(value);
    }

	return (
		<Container maxWidth="xl" sx={{ mt: 10 }}>
			<Paper elevation={4} sx={{ padding: "1rem" }}>
				<Typography variant="h4">Project Summary</Typography>

                <Tabs value={activeTab} onChange={handleTabChange}>
                    <Tab label="Cost Table" />
                    <Tab label="Hours Table" />

                </Tabs>

                {activeTab === 0 && <ProjectCostTable project={props.project} />}
                {activeTab === 1 && <ProjectHoursTable project={props.project} />}


			</Paper>
		</Container>
	);
};

export default SummaryView;
