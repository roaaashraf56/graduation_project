import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';

// Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import PeopleIcon from '@mui/icons-material/People';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import DescriptionIcon from '@mui/icons-material/Description';

const drawerWidth = 172;

function ResponsiveDrawer() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const menuItems = [
    { text: "Home", icon: <DashboardIcon /> },
    { text: "Vehicles", icon: <DriveEtaIcon /> },
    { text: "Drivers", icon: <PeopleIcon /> },
    { text: "Maintenance", icon: <CarRepairIcon /> },
    { text: "Reports", icon: <DescriptionIcon /> },
  ];

  const drawer = (
    <div>
      <Toolbar />
      <Divider sx={{ borderColor: '#1f1f1f50' }} />

      <List
        sx={{
          color: 'var(--sidebar-text)',
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",   // CENTER ITEMS VERTICALLY
          height: "80vh",             // MAKE THE LIST AREA TALL

          '& .MuiListItemIcon-root': { color: 'var(--sidebar-text)' },
          '& .MuiSvgIcon-root': { fontSize: 22 },
          '& .MuiListItemText-primary': { fontSize: 18 },

          '& .MuiListItemButton-root': {
            borderRadius: '8px',
            mx: 1,
            my: '10px',               // SPACING BETWEEN ITEMS
            paddingY: "10px",
            transition: "0.2s",
          },

          '& .MuiListItemButton-root:hover': {
            backgroundColor: 'var(--sidebar-hover)',
          },
        }}
      >
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: 25 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Mobile Button */}
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{
          position: 'fixed',
          top: 5,
          left: 5,
          zIndex: 1300,
          display: { xs: 'block', sm: 'none' }
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            backgroundColor: 'var(--sidebar-bg)',
            color: 'var(--sidebar-text)',
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: '1px solid #1f1f1f50',
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            backgroundColor: "var(--sidebar-bg)",
            color: "var(--sidebar-text)",
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "1px solid #11182730",
          },
        }}
        open
      >
        {drawer}
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
