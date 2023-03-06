import React, { FC, useEffect, useState } from "react";
import {
  Box,
  Autocomplete,
  TextField,
  InputAdornment,
  ToggleButton,
} from "@mui/material";
import { Search, Star } from "@mui/icons-material";
import { useGetSearchWeatherQuery } from "../services/weatherApi";
import { setLocation, setSaves, setItemSaved } from "../services/weatherSlice";
import { WeatherState, Saves } from "../services/weatherSlice";
import { WeatherApiResponse } from "../services/weatherApi";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Location } from "../services/model";

type Props = {
  location: Location | undefined;
};

interface DataResponse {
  country: "Nigeria";
  id: 1715013;
  lat: 9.18;
  lon: 7.18;
  name: "Abuja";
  region: "Federal Capital Territory";
  url: "abuja-federal-capital-territory-nigeria";
}

const SearchBar = ({ location }: Props) => {
  const [selected, setSelected] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  const [autoCompleteList, setAutoCompleteList] = useState<DataResponse[]>([]);
  const { data } = useGetSearchWeatherQuery(search);
  console.log(data);
  const saves = useAppSelector((state) => state.weatherState.saves);
  const dispatch = useAppDispatch();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
    if (event.key === "Enter") {
      const element = document.getElementsByClassName("text")[0] as HTMLElement;
      element.click();
      event.currentTarget.value = "";
    }
  };

  const addSaves = (item: Location) => {
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

  useEffect(() => {
    if (data) {
      setAutoCompleteList(data);
    }
  }, [data]);
  console.log(autoCompleteList + "GGGGGvvvvvGG");

  useEffect(() => {
    const savedItemsString = localStorage.getItem("savedItems");
    console.log(savedItemsString);
    if (savedItemsString) {
      const savedItems = JSON.parse(savedItemsString) as Saves[];

      let isSaved = false;

      for (let i = 0; i < savedItems.length; i++) {
        if (savedItems[i].name === location?.name) {
          isSaved = true;
          break;
        }
      }

      setSelected(isSaved);
      dispatch(setItemSaved(isSaved));
    }
  }, [saves]);

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "flex-end", gap: "1rem" }}>
        <Autocomplete
          sx={{ width: "15rem", padding: 0 }}
          freeSolo
          disableClearable
          filterOptions={(x) => x}
          id="search"
          onChange={(event, value) => dispatch(setLocation(value))}
          options={autoCompleteList.map((data) => data.country)}
          renderInput={(params) => (
            <TextField
              className="text"
              placeholder="Search Locations"
              onKeyDown={handleKeyDown}
              {...params}
              InputProps={{
                ...params.InputProps,
                type: "search",
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <ToggleButton
          sx={{ width: "4rem" }}
          value="check"
          color="primary"
          selected={selected}
          onChange={() => {
            setSelected(!selected);
            if (location) {
              addSaves(location);
            } else {
              return null;
            }
          }}
        >
          <Star />
        </ToggleButton>
      </Box>
    </div>
  );
};

export default SearchBar;
