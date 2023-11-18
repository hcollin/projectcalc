import { useState } from "react";
import { Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography } from "@mui/material";
import ConfirmModal from "./ConfirmModal";

import { Project } from "../models/Project";
import { saveProjectToLocalStorage } from "../utils/fileUtils";

import { emptyProjectData } from "../data/emptyProject";

import SaveIcon from "@mui/icons-material/Save";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import AddIcon from "@mui/icons-material/Add";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';


const FileMenuOptions = ({ project, updateProject, onAction }: { project: Project; updateProject: (p: Project) => void; onAction: () => void }) => {
	const [modalConfirmTarget, setModalConfirmTarget] = useState<string | null>(null);
	const [modalText, setModalText] = useState<string>("");

	const [showMore, setShowMore] = useState<boolean>(false);

	function handleConfirm() {
		if (modalConfirmTarget === "newProject") {
			newProject();
		}
		if (modalConfirmTarget === "saveProject") {
			saveProject();
		}
		if (modalConfirmTarget === "loadProject") {
			loadProject();
		}
		setModalConfirmTarget(null);
		onAction();
	}

	function askNewProject() {
		setModalText("Create new empty project?");
		setModalConfirmTarget("newProject");
	}

	function askSaveProject() {
		setModalText("Save current project?");
		setModalConfirmTarget("saveProject");
	}

	function askLoadProject() {}

	function askDownloadProject() {}

	function newProject() {
		updateProject(emptyProjectData);
	}

	function saveProject() {
		console.log("Saving project");
		saveProjectToLocalStorage(project);
		setModalConfirmTarget(null);
	}

	function loadProject() {
		setModalConfirmTarget(null);
	}

	function cancelModal() {
		setModalConfirmTarget(null);
	}

	return (
		<>
			<Divider />

			<ListSubheader disableSticky>File menu</ListSubheader>

			<ListItem disablePadding>
				<ListItemButton onClick={askNewProject}>
					<ListItemIcon>
						<AddIcon />
					</ListItemIcon>
					<ListItemText primary="New Empty Project" />
				</ListItemButton>
			</ListItem>

			{showMore && (
				<ListItem disablePadding>
					<ListItemButton onClick={() => setModalConfirmTarget("loadProject")}>
						<ListItemIcon>
							<FileOpenIcon />
						</ListItemIcon>
						<ListItemText primary="Upload Project" />
					</ListItemButton>
				</ListItem>
			)}

			<ListItem disablePadding>
				<ListItemButton onClick={askSaveProject}>
					<ListItemIcon>
						<SaveIcon />
					</ListItemIcon>
					<ListItemText primary="Save Project" />
				</ListItemButton>
			</ListItem>

			{showMore && <ListItem disablePadding>
				<ListItemButton onClick={loadProject}>
					<ListItemIcon>
						<FileDownloadIcon />
					</ListItemIcon>
					<ListItemText primary="Download Project" />
				</ListItemButton>
			</ListItem>}

			<ListItem disablePadding>
				<ListItemButton onClick={() => setShowMore(!showMore)} sx={{justifyContent: "center"}}>
					<ListItemIcon>
						{!showMore && <ExpandMoreIcon />}
						{showMore && <ExpandLessIcon />}
					</ListItemIcon>
					
				</ListItemButton>
			</ListItem>

			<ConfirmModal onConfirm={handleConfirm} onCancel={cancelModal} open={modalConfirmTarget !== null} message={modalText} />
		</>
	);
};

export default FileMenuOptions;
