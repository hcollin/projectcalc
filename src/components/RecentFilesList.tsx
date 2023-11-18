import { Box, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography } from "@mui/material";

import FileOpenIcon from "@mui/icons-material/FileOpen";
import { ProjectFileListItem, loadProjectFileList, loadProjectFromLocalStorage, removeFileFromLocalStorage } from "../utils/fileUtils";
import { Project } from "../models/Project";
import { useState } from "react";
import ErrorNotification from "./ErrorNotification";
import { formatTs } from "../utils/TimeUtils";
import RemoveButton from "./buttons/RemoveButton";
import ConfirmModal from "./ConfirmModal";

const RecentFilesList = ({ project, onLoadProject }: { project: Project; onLoadProject: (p: Project) => void }) => {
	const [errMsg, setErrMsg] = useState<string | null>(null);
	const [recentFiles, setRecentFiles] = useState<ProjectFileListItem[]>(loadProjectFileList());

	const [targetFileName, setTargetFileName] = useState<string | null>(null);

	// const recentFiles = loadProjectFileList();

	function loadFile() {
		const fn = targetFileName;
		if (!fn) return;
		const p = loadProjectFromLocalStorage(fn);
		if (p) {
			onLoadProject(p);
		} else {
			setErrMsg(`Could not load file ${fn} from local storage`);
		}
	}

	function removeFile(fn: string) {
		console.log("Remove file", fn);
		removeFileFromLocalStorage(fn);
		setRecentFiles(loadProjectFileList());
	}

	function handleConfirm() {
		if (targetFileName !== null) {
            loadFile();
			setTargetFileName(null);
		}
	}

	function cancelModal() {
		setTargetFileName(null);
	}

	return (
		<>
			<Divider />
			<ListSubheader disableSticky>Projects in local storage</ListSubheader>
			{recentFiles.length === 0 && (
				<Typography variant="body2" align="center" sx={{ mt: 2 }} color="gray">
					No recent files...
				</Typography>
			)}
			{recentFiles.length > 0 &&
				recentFiles.map((fileInStorage) => {
					const isCurrentProject = project.id === fileInStorage.id;

					return (
						<ListItem
							disablePadding
							dense={true}
							secondaryAction={
								<RemoveButton
									onClick={() => {
										removeFile(fileInStorage.fn);
									}}
									noText
								/>
							}
						>
							<ListItemButton onClick={() => setTargetFileName(fileInStorage.fn)}>
								<ListItemIcon>
									<FileOpenIcon />
								</ListItemIcon>
								<ListItemText
									primary={fileInStorage.name}
									secondary={formatTs(fileInStorage.modified)}
									sx={{ color: isCurrentProject ? "primary.main" : "primary", mr: 3 }}
								/>
							</ListItemButton>
						</ListItem>
					);
				})}

			{errMsg !== null && <ErrorNotification message={errMsg} onClose={() => setErrMsg(null)} />}
			<ConfirmModal onConfirm={handleConfirm} onCancel={cancelModal} open={targetFileName !== null} message={`Load recent project?`}  />
		</>
	);
};

export default RecentFilesList;
