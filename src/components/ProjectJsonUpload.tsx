import { Box, Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { validateObjectAsProject } from "../utils/projectUtils";
import { Project } from "../models/Project";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { formatTs } from "../utils/TimeUtils";

interface ProjectJsonFileCheck {
	isValidJson: boolean;
	isValidProjectFile: boolean;
	lastModified: number;
	allChecksPassed: boolean;
}

const ProjectJsonUpload = ({ onLoadProject }: { onLoadProject: (p: Project) => void }) => {
	const [file, setFile] = useState<File | null>(null);
	const [contents, setContents] = useState<string | null>(null);

	const [check, setCheck] = useState<ProjectJsonFileCheck | null>(null);

	const [loadedProject, setLoadedProject] = useState<Project | null>(null);

	useEffect(() => {
		if (contents !== null && file !== null) {
			const jsonCheck: ProjectJsonFileCheck = {
				isValidJson: false,
				isValidProjectFile: false,
				lastModified: 0,
				allChecksPassed: false,
			};

			if (file) {
				jsonCheck.lastModified = file.lastModified;
			}

			try {
				const parsed = JSON.parse(contents);
				console.log("Parsed", parsed);
				jsonCheck.isValidJson = true;

				if (validateObjectAsProject(parsed)) {
					jsonCheck.isValidProjectFile = true;
					setLoadedProject(parsed as Project);
				}

				if (jsonCheck.isValidJson && jsonCheck.isValidProjectFile) {
					jsonCheck.allChecksPassed = true;
				}
				setCheck(jsonCheck);
			} catch (e) {
				console.error("Error parsing json", e);
				setCheck(jsonCheck);
			}
		}

		if (file === null) {
			setContents(null);
			setCheck(null);
			setFile(null);
			setLoadedProject(null);
		}
	}, [contents, file]);

	function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.files) {
			const f = e.target.files[0];
			setFile(f);
			try {
				const reader = new FileReader();
				reader.onload = (e) => {
					const text = e.target?.result;
					// console.log("TEXT", text);
					if (text) {
						setContents(text as string);
					}
				};
				reader.readAsText(f);
			} catch (e) {
				console.error("Error reading file", e);
			}
		}
	}

	function handleConfirm() {
        if (loadedProject) {
            onLoadProject(loadedProject);
        }

    }

	return (
		<>
			<Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
				<TextField label="Project Json file" variant="outlined" size="small" type="file" onChange={handleFileChange} />
				<Button variant="contained" color="primary" onClick={handleConfirm} disabled={!check?.allChecksPassed}>
					Load project
				</Button>
			</Stack>
			{file && (
				<Box sx={{ mb: 1, mt: 1, backgroundColor: "background.paper" }}>
					<Stack direction="row" spacing={2} sx={{ p: 1 }} alignItems="center" justifyContent="space-around">
						<Typography variant="subtitle2">Validation</Typography>
						{check?.isValidJson && (
							<Stack direction="row" spacing={1}>
								<CheckCircleIcon color="success" /> <Typography>JSON format</Typography>
							</Stack>
						)}
						{check?.isValidJson === false && (
							<Stack direction="row" spacing={1}>
								<ErrorIcon color="error" /> <Typography>JSON format</Typography>
							</Stack>
						)}
						{check?.isValidProjectFile && (
							<Stack direction="row" spacing={1}>
								<CheckCircleIcon color="success" /> <Typography>Project file</Typography>
							</Stack>
						)}
						{check?.isValidProjectFile === false && (
							<Stack direction="row" spacing={1}>
								<ErrorIcon color="error" /> <Typography>Project file</Typography>
							</Stack>
						)}
					</Stack>
				</Box>
			)}
			{file && (
				<Card>
					<CardContent>
						{loadedProject && loadedProject.name && (
							<Box>
								<Typography variant="subtitle1"> Project Name: {loadedProject.name}</Typography>
							</Box>
						)}
						{file && file?.name && (
							<Box>
								<Typography variant="subtitle2"> File name: {file.name}</Typography>
							</Box>
						)}
						{check?.lastModified && (
							<Box>{check?.lastModified && <Typography variant="subtitle2"> Last Modified: {formatTs(check.lastModified)}</Typography>}</Box>
						)}
					</CardContent>
				</Card>
			)}

			{!file && <Typography>No file selected yet</Typography>}
		</>
	);
};

export default ProjectJsonUpload;
