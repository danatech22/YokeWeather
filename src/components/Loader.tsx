import React from "react";
import { Stack } from "@mui/material";

const Loader = () => {
  const sun = require("../img/sun.gif");
  return (
    <>
      <Stack
        sx={{ marginTop: 20 }}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <img className="loader" src={sun} alt="loading" />
      </Stack>
    </>
  );
};

export default Loader;
