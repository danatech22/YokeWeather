import React from "react";
import { Button, Paper, Typography, Stack } from "@mui/material";
import { setLocation, setSaves } from "../services/weatherSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

const SavedItem = () => {
  const saves = useAppSelector((state) => state.weatherState.saves);
  console.log(saves);
  const dispatch = useAppDispatch();

  const addSaves = (item: any) => {
    let itemList = [...saves];
    let addArray = true;

    for (let i = 0; i < saves.length; i++) {
      if (saves[i].name === item.name) {
        itemList.splice(i, 1);
        addArray = false;
      }
    }
    if (addArray) {
      itemList.push(item);
    }
    dispatch(setSaves([...itemList]));
  };
  return (
    <Stack spacing={2}>
      {saves.length === 0
        ? "No Locations Are Saved!"
        : saves?.map((local) => (
            <Paper
              sx={{ padding: 2 }}
              elevation={1}
              key={local.name}
              onClick={() => dispatch(setLocation(local.name))}
            >
              <Typography variant="h6">
                {local.name} {local.region}
              </Typography>
              <Typography sx={{ marginBottom: 2 }} variant="subtitle2">
                {local.country}
              </Typography>
              <Stack direction="row" justifyContent="space-between">
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => addSaves(local)}
                >
                  Delete
                </Button>
              </Stack>
            </Paper>
          ))}
    </Stack>
  );
};

export default SavedItem;
