import { Box, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material";

import PriceChangeIcon from '@mui/icons-material/PriceChange';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import GroupsIcon from '@mui/icons-material/Groups';
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline';
import { useEffect, useState } from "react";

const MainMenuRight = ({ active, onUpdate, isOpen }: { active: string, onUpdate: (a: string) => void, isOpen: boolean }) => {

    const [open, setOpen] = useState(false);
 
    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    function changeView(view: string) {
        if (view !== active) {
            onUpdate(view);
            
        }

    }

    console.log("menustate", isOpen);

    return (
        <Drawer
            anchor="left"
            variant="persistent"
            open={open}
            onClose={() => setOpen(false)}
        >
            <Paper sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0.5rem", height: "100%" }} elevation={2}>
                <Typography variant="h3" component="div" sx={{ color: "primary.main" }} >
                    PrCa
                </Typography>


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
    )

}

export default MainMenuRight;