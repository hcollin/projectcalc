import { Box, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material";

import PriceChangeIcon from '@mui/icons-material/PriceChange';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import GroupsIcon from '@mui/icons-material/Groups';


const MainMenuRight = ({ active, onUpdate }: { active: string, onUpdate: (a: string) => void }) => {

    function changeView(view: string) {
        if (view !== active) {
            onUpdate(view);
        }

    }

    return (
        <Drawer
            anchor="left"
            variant="permanent"
            open={true}
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

                </List>
            </Paper>
        </Drawer>
    )

}

export default MainMenuRight;