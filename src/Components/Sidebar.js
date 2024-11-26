import React, { useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, useLocation } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import GroupIcon from "@mui/icons-material/Group";
import SchoolIcon from "@mui/icons-material/School";
import "@fontsource/poppins"; // Import Poppins font

const drawerWidth = 240;

const navItems = [
  { label: "Dashboard", path: "/Dashboard", icon: <DashboardCustomizeIcon /> },
  { label: "Data Guru", path: "/DataGuru", icon: <GroupIcon /> },
  { label: "Data Siswa", path: "/DataSiswa", icon: <SchoolIcon /> },
];

const theme = createTheme({
  palette: {
    primary: { main: "#FFB6C1" }, // Pastel pink color
    secondary: { main: "#87CEFA" }, // Pastel blue color
    background: { default: "#FFF5F7" }, // Soft background color
  },
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
    h6: { fontWeight: 700 },
    body1: { fontWeight: 500 },
  },
});

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCollapseToggle = () => {
    setCollapsed(!collapsed);
  };

  // Close sidebar when navigating to DataGuru or DataSiswa
  useEffect(() => {
    if (
      location.pathname === "/DataGuru" ||
      location.pathname === "/DataSiswa"
    ) {
      setMobileOpen(false); // Close sidebar on these pages
    }
  }, [location.pathname]); // Trigger when location changes

  const drawerContent = (
    <Box
      sx={{
        textAlign: "center",
        background: "linear-gradient(135deg, #FFB6C1, #FFD1DC)", // Pastel gradient
        height: "100%",
        color: "#333",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 2,
        boxShadow: "inset 0px 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          my: 2,
          fontWeight: "bold",
          fontSize: collapsed ? "18px" : "24px",
          fontStyle: "italic",
          color: "#333",
        }}
      >
        {collapsed ? "D" : "Dashboard"}
      </Typography>
      <Divider sx={{ background: "#FFF", width: "80%" }} />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                textAlign: "center",
                justifyContent: collapsed ? "center" : "flex-start",
                px: 2,
                backgroundColor:
                  location.pathname === item.path ? "#FFD1DC" : "transparent",
                color: "#333",
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "#FFB6C1",
                  color: "#333",
                  transform: "scale(1.05)",
                  transition: "all 0.3s ease",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  animation: "hover-bounce 0.3s",
                }}
              >
                {item.icon}
              </Box>
              {!collapsed && (
                <ListItemText
                  primary={item.label}
                  sx={{
                    ml: 2,
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <IconButton
        onClick={handleCollapseToggle}
        sx={{
          position: "absolute",
          bottom: 10,
          left: collapsed ? 8 : drawerWidth - 48,
          color: "#333",
          "&:hover": { color: "#FFD1DC" },
        }}
      >
        {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </IconButton>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            background: "linear-gradient(135deg, #FFD1DC, #FFB6C1)",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              MY DASHBOARD
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: collapsed ? 60 : drawerWidth,
            },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: collapsed ? 60 : drawerWidth,
              transition: "width 0.3s ease",
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: `calc(100% - ${collapsed ? "60px" : `${drawerWidth}px`})`, // Dinamis berdasarkan state
            ml: { sm: collapsed ? "60px" : `${drawerWidth}px` }, // Margin dinamis
            transition: "all 0.3s ease", // Animasi halus
          }}
        >
          <Toolbar />
          {props.children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

Navbar.propTypes = {
  window: PropTypes.func,
};

export default Navbar;
