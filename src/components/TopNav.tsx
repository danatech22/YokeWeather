import React, { FC, useState } from "react";
import {
  MemoryRouter,
  Link,
  matchPath,
  useLocation,
  PathMatch,
} from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Tabs,
  Tab,
  Typography,
} from "@mui/material";
import { Menu, Dashboard, Star, Map } from "@mui/icons-material";

//The interfaces
interface RouterProps {
  children: React.ReactNode;
}

//Determine if you are on the client side or server side
const Router: FC<RouterProps> = ({ children }) => {
  if (typeof window === "undefined") {
    return <StaticRouter location="/">{children}</StaticRouter>;
  }

  return (
    <MemoryRouter initialEntries={["/"]} initialIndex={0}>
      {children}
    </MemoryRouter>
  );
};

//To find the right url match
function useRouteMatch(patterns: string[]): PathMatch<string> | null {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

const TopNav = ({ window }: any) => {
  const logo = require("../img/logo.png");
  const routeMatch = useRouteMatch(["/", "/map", "/saves"]);
  const currentTab = routeMatch?.pattern.path;
  const [mobileOpen, setMobileOpen] = useState<boolean | undefined>(false);

  //Handle Drawer//
  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen);
  };

  //Drawer//
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <img src={logo} alt="logo" />
      <Divider />
      <List>
        <Tabs
          value={currentTab}
          orientation="vertical"
          indicatorColor="primary"
        >
          <Tab
            icon={<Dashboard />}
            label="Dashboard"
            value="/"
            to="/"
            component={Link}
          />
          <Tab
            icon={<Map />}
            label="Map"
            value="/map"
            to="/map"
            component={Link}
          />
          <Tab
            icon={<Star />}
            label="Saves"
            value="/saves"
            to="/saves"
            component={Link}
          />
        </Tabs>
      </List>
    </Box>
  );

  //Determine the container
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: { sm: "none" } }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <Menu />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Cloudie
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="nav">
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
              width: 240,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Toolbar />
    </Box>
  );
};

export default TopNav;
