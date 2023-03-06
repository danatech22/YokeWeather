import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { savedCities } from "./model";

export interface Saves {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  localtime: string;
}

export interface WeatherState {
  location: string;
  fahrenheit: boolean;
  saves: Saves[];
  itemSaved: boolean;
}

const initialState: WeatherState = {
  location: "Ikeja",
  fahrenheit: true,
  saves: savedCities,
  itemSaved: false,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setLocation: (state: WeatherState, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    setFahrenheit: (state: WeatherState, action: PayloadAction<boolean>) => {
      state.fahrenheit = action.payload;
    },
    setSaves: (state: WeatherState, action: PayloadAction<Saves[]>) => {
      state.saves = action.payload;
    },
    setItemSaved: (state: WeatherState, action: PayloadAction<boolean>) => {
      state.itemSaved = action.payload;
    },
  },
});

export const { setLocation, setFahrenheit, setSaves, setItemSaved } =
  weatherSlice.actions;
export default weatherSlice.reducer;
