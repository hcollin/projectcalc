import { useContext, useEffect, useState } from "react";
import {
	AppBar,
	Box,
	Drawer,
	FormControlLabel,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Paper,
	Stack,
	Switch,
	Toolbar,
	Typography,
	useTheme,
} from "@mui/material";

import { Project } from "../models/Project";

import { calculatePrice, getAllocatedHoursForProject, getTotalHours, numberWithSpaces } from "../utils/projectUtils";
import { hoursToReadableTime } from "../utils/TimeUtils";

import FileMenuOptions from "../components/FileMenuOptions";
import RecentFilesList from "../components/RecentFilesList";

import MenuIcon from "@mui/icons-material/Menu";
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";
import GroupsIcon from "@mui/icons-material/Groups";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import TableViewIcon from "@mui/icons-material/TableView";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "../ToggleColorMode";

const MainMenuTop = ({
	project,
	active,
	onViewModeUpdate,
	updateProject,
}: {
	project: Project;
	active: string;
	onViewModeUpdate: (a: string) => void;
	updateProject: (p: Project) => void;
}) => {
	const theme = useTheme();
	const colorMode = useContext(ColorModeContext);

	const [menuState, setMenuState] = useState<boolean>(false);
	
	
	const price = calculatePrice(project);
	const billableHours = getAllocatedHoursForProject(project);

	const duration = hoursToReadableTime(getTotalHours(project));

	function openMenu() {
		setMenuState(true);
	}

	function changeView(view: string) {
		if (view !== active) {
			onViewModeUpdate(view);
			setMenuState(false);
		}
	}

	function closeMenu() {
		setMenuState(false);
	}

	function updeteProjectAndCloseMenu(p: Project) {
		updateProject(p);
		setMenuState(false);
	}

	console.log("THEME PALETTE MODE:", theme.palette.mode);

	return (
		<>
			<AppBar color="primary">
				<Toolbar>
					<IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 1 }} onClick={openMenu}>
						<MenuIcon />
					</IconButton>

					<IconButton sx={{ mr: 2 }} onClick={colorMode.toggleColorMode} color="inherit">
						{theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
					</IconButton>

					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="text.accent">
						Project Calculator
					</Typography>
					<Stack direction="row" spacing={3} justifyContent="space-between" alignItems="center">
						<Box sx={{ display: "flex", flexDirection: "column" }}>
							<Typography variant="mini" color="text.secondary">Name</Typography>
							<Typography variant="body1" color="accent.main">
								{project.name || "no name yet"}
							</Typography>
						</Box>
						<Box sx={{ display: "flex", flexDirection: "column" }}>
							<Typography variant="mini" color="text.secondary">Total Price</Typography>
							<Typography variant="body1" color="accent.main">
								{numberWithSpaces(price)} €
							</Typography>
						</Box>
						<Box sx={{ display: "flex", flexDirection: "column" }}>
							<Typography variant="mini" color="text.secondary">Billable hours</Typography>
							<Typography variant="body1" color="accent.main">
								{billableHours} h
							</Typography>
						</Box>
						<Box sx={{ display: "flex", flexDirection: "column" }}>
							<Typography variant="mini" color="text.secondary">Duration</Typography>
							<Typography variant="body1" color="accent.main">
								{duration.months}m {duration.days}d {duration.hours}h
							</Typography>
						</Box>
					</Stack>
				</Toolbar>
			</AppBar>
			<Drawer anchor="left" variant="temporary" open={menuState} onClose={() => setMenuState(false)}>
				<Paper sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0.5rem", height: "100%" }} elevation={2}>
					<List>
						<ListItem disablePadding>
							<ListItemButton onClick={() => changeView("prices")}>
								<ListItemIcon>
									<SettingsIcon />
								</ListItemIcon>
								<ListItemText primary="Settings" />
							</ListItemButton>
						</ListItem>

						<ListItem disablePadding>
							<ListItemButton onClick={() => changeView("phases")}>
								<ListItemIcon>
									<CalendarViewWeekIcon />
								</ListItemIcon>
								<ListItemText primary="Phases" />
							</ListItemButton>
						</ListItem>

						<ListItem disablePadding>
							<ListItemButton onClick={() => changeView("teams")}>
								<ListItemIcon>
									<GroupsIcon />
								</ListItemIcon>
								<ListItemText primary="Teams" />
							</ListItemButton>
						</ListItem>

						<ListItem disablePadding>
							<ListItemButton onClick={() => changeView("summary")}>
								<ListItemIcon>
									<TableViewIcon />
								</ListItemIcon>
								<ListItemText primary="Summary" />
							</ListItemButton>
						</ListItem>

						<ListItem disablePadding>
							<ListItemButton onClick={() => changeView("charts")}>
								<ListItemIcon>
									<StackedBarChartIcon />
								</ListItemIcon>
								<ListItemText primary="Charts" />
							</ListItemButton>
						</ListItem>

						{/* <ListItem disablePadding>
							<ListItemButton onClick={() => changeView("timeline")}>
								<ListItemIcon>
									<ViewTimelineIcon />
								</ListItemIcon>
								<ListItemText primary="Timeline" />
							</ListItemButton>
						</ListItem> */}

						<FileMenuOptions project={project} updateProject={updateProject} onAction={closeMenu} />

						<RecentFilesList onLoadProject={updeteProjectAndCloseMenu} project={project} />
					</List>
				</Paper>
			</Drawer>
		</>
	);
};

export default MainMenuTop;
