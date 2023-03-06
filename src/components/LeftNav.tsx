import React, { FC } from "react";
import { Tabs, Tab, Button } from "@mui/material";
import {
  MemoryRouter,
  Link,
  matchPath,
  useLocation,
  PathMatch,
} from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { Dashboard, Map, Star } from "@mui/icons-material";
import { LeftNavContainer } from "../theme/styled";
import { useAppDispatch } from "../app/hooks";

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

const LeftNav = () => {
  const logo = require("../img/logo.png");
  const routeMatch = useRouteMatch(["/", "/map", "/saves"]);
  const currentTab = routeMatch?.pattern.path;
  const dispatch = useAppDispatch();
  return (
    <LeftNavContainer>
      <div className="nav-img">
        <img src={logo} alt="logo" />
      </div>
      <Tabs value={currentTab} orientation="vertical" indicatorColor="primary">
        <Tab
          icon={<Dashboard />}
          label="Info"
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
        <Button />
      </Tabs>
    </LeftNavContainer>
  );
};

export default LeftNav;
