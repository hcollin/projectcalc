import { useState } from "react";
import { Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ConfirmModal from "./ConfirmModal";

import { Project } from "../models/Project";

import { emptyProjectData } from "../data/emptyProject";

import SaveIcon from "@mui/icons-material/Save";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import AddIcon from "@mui/icons-material/Add";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { saveProjectToLocalStorage } from "../utils/fileUtils";

const FileMenuOptions = ({ project, updateProject, onAction }: { project: Project; updateProject: (p: Project) => void; onAction: () => void }) => {
	const [modalConfirmTarget, setModalConfirmTarget] = useState<string | null>(null);
    const [modalText, setModalText] = useState<string>("");

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
        setModalConfirmTarget("saveProject")
    }

    function askLoadProject() {

    }

    function askDownloadProject() {

    }

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

			<ListItem disablePadding>
				<ListItemButton onClick={askNewProject}>
					<ListItemIcon>
						<AddIcon />
					</ListItemIcon>
					<ListItemText primary="New Empty Project" />
				</ListItemButton>
			</ListItem>

			<ListItem disablePadding>
				<ListItemButton onClick={() => setModalConfirmTarget("loadProject")}>
					<ListItemIcon>
						<FileOpenIcon />
					</ListItemIcon>
					<ListItemText primary="Load Project" />
				</ListItemButton>
			</ListItem>

			<ListItem disablePadding>
				<ListItemButton onClick={askSaveProject}>
					<ListItemIcon>
						<SaveIcon />
					</ListItemIcon>
					<ListItemText primary="Save Project" />
				</ListItemButton>
			</ListItem>

			<ListItem disablePadding>
				<ListItemButton onClick={loadProject}>
					<ListItemIcon>
						<FileDownloadIcon />
					</ListItemIcon>
					<ListItemText primary="Download Project" />
				</ListItemButton>
			</ListItem>

			<ConfirmModal onConfirm={handleConfirm} onCancel={cancelModal} open={modalConfirmTarget !== null} message={modalText} />
		</>
	);
};

export default FileMenuOptions;
