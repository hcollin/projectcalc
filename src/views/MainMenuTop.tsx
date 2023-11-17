import { AppBar, Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Stack, Toolbar, Typography } from "@mui/material";
import { Project } from "../models/Project";
import { calculatePrice, getAllocatedHoursForProject, getTotalHours, numberWithSpaces } from "../utils/projectUtils";
import { hoursToReadableTime } from "../utils/TimeUtils";
import { useState } from "react";

import MenuIcon from '@mui/icons-material/Menu';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import GroupsIcon from '@mui/icons-material/Groups';
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline';


const MainMenuTop = ({ project, active, onViewModeUpdate }: { project: Project, active: string, onViewModeUpdate: (a: string) => void }) => {

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

    return (
        <>
            <AppBar >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={openMenu}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="primary">
                        Project Calculator
                    </Typography>
                    <Stack direction="row" spacing={3} justifyContent="space-between" alignItems="center">
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="mini">Total Price</Typography>
                            <Typography variant="body1" color="primary">{numberWithSpaces(price)} €</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="mini">Billable hours</Typography>
                            <Typography variant="body1" color="primary">{billableHours} h</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="mini">Duration</Typography>
                            <Typography variant="body1" color="primary">{duration.months}m {duration.days}d {duration.hours}h</Typography>
                        </Box>
                    </Stack>
                </Toolbar>


            </AppBar>
            <Drawer
                anchor="left"
                variant="temporary"
                open={menuState}
                onClose={() => setMenuState(false)}
            >
                <Paper sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0.5rem", height: "100%" }} elevation={2}>

                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => changeView("prices")}>
                                <ListItemIcon>
                                    <PriceChangeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Prices" />
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
                            <ListItemButton onClick={() => changeView("timeline")}>

                                <ListItemIcon>
                                    <ViewTimelineIcon />
                                </ListItemIcon>
                                <ListItemText primary="Timeline" />
                            </ListItemButton>
                        </ListItem>

                    </List>
                </Paper>
            </Drawer>
        </>
    )

}

export default MainMenuTop;
