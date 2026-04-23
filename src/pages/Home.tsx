import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";

import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import ListSubheader from "@mui/material/ListSubheader";
// import EventIcon from '@mui/icons-material/Event';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import SettingsIcon from '@mui/icons-material/Settings';
// import MailIcon from '@mui/icons-material/Mail';
import BusinessIcon from "@mui/icons-material/Business";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const drawerWidth = 240;

const Home = () => {
  const navigate = useNavigate();
  const menuItems = [
    // { text: "Dashboard", path: "Dashboard" },
    { text: "Manage Employees", path: "ManageEmployees" },
  ];
  const icons = [ <PersonIcon />];
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        color="default"
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Toolbar>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              backgroundColor: "#2563EB", // น้ำเงิน
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 1,
            }}
          >
            <BusinessIcon sx={{ color: "#fff", fontSize: 20 }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            HRM
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <IconButton
            onClick={() => {
              navigate("/");
            }}
          >
            <LogoutIcon />
          </IconButton>

          <Box sx={{ ml: 2, mr: 2, textAlign: "right" }}>
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              สมชาย กล้าหาญ
            </Typography>
            <Typography variant="subtitle2">Admin</Typography>
          </Box>
          <Avatar sx={{ width: 30, height: 30 }} />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <Typography variant="body2" sx={{ fontWeight: "bold", m: 2 }}>
              MAIN MENU
            </Typography>
            {menuItems.map((item, idx) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={() => navigate(item.path)}>
                  <ListItemIcon>{icons[idx]}</ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontSize: 14,
                        fontWeight: 500,
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          p: 3,
          mt: 8,
          backgroundColor: "#f1f7fb",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
export default Home;
