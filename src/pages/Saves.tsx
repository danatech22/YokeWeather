import React from "react";
import { Box, Stack } from "@mui/material";
import SavedItem from "../components/SavedItem";

const Saves = () => {
  return (
    <Box p={4}>
      <Stack>
        <SavedItem />
      </Stack>
    </Box>
  );
};

export default Saves;
