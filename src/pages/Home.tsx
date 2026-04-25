import { useState } from "react";
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
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate, Outlet } from "react-router-dom";

const drawerWidth = 240;

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  // console.log("isMobile:", isMobile);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { text: "Manage Employees", path: "ManageEmployees" },
  ];
  const icons = [<PersonIcon key="person-icon" />];

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const drawerContent = (
    <>
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          <Typography variant="body2" sx={{ fontWeight: "bold", m: 2 }}>
            MAIN MENU
          </Typography>
          {menuItems.map((item, idx) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) setMobileOpen(false);
                }}
              >
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
    </>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        color="default"
        elevation={0}
        sx={{
          zIndex: (zTheme) => zTheme.zIndex.drawer + 1,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 1, display: { xs: "inline-flex", md: "none" } }}
            aria-label="open menu"
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              backgroundColor: "#2563EB",
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

          <IconButton onClick={() => navigate("/")}>
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
          display: { xs: "none", md: "block" },
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {drawerContent}
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