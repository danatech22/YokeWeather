import React, { useState, useEffect } from "react";
import Map, {
  Marker,
  NavigationControl,
  FullscreenControl,
  Popup,
  GeolocateControl,
} from "react-map-gl";
// import { Control } from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css";
import { Typography, Stack, Button } from "@mui/material";
import { Location, Current } from "../services/model";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { setItemSaved, setLocation, setSaves } from "../services/weatherSlice";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiZGFuYXRlY2gyMiIsImEiOiJjbGV3aXF4dXcwZjBzM3drY2d5ZnJ6ZnJkIn0.QPEQSYm0vjbaL1oR2lAjfQ";

interface Props {
  current: Current | undefined;
  location: Location | undefined;
}

interface ViewState {
  longitude?: number;
  latitude?: number;
  zoom: number;
}

const MapBoxTwo = ({ location, current }: Props) => {
  const [viewport, setViewport] = useState<ViewState>({
    longitude: -100,
    latitude: 50,
    zoom: 10,
  });
  const [showPopup, setShowPopup] = useState(false);
  const saves = useAppSelector((state) => state.weatherState.saves);
  const fahrenheit = useAppSelector((state) => state.weatherState.fahrenheit);
  const savedToLocal = useAppSelector((state) => state.weatherState.itemSaved);
  const dispatch = useAppDispatch();

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

  //   const Geocoder = () => {
  //     const geoMap = new MapboxGeocoder({
  //       accessToken: MAPBOX_TOKEN,
  //       marker: false,
  //       collapsed: true
  //     })
  //     useControl(() => geoMap)
  //     geoMap.on('result', (e) => {
  //       dispatch(setLocation(e.result.text))

  //     })
  //   }
  return (
    <>
      <Map
        initialViewState={{
          latitude: location?.lat,
          longitude: location?.lon,
          zoom: 10,
        }}
        style={{ width: 800, height: 600 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <Marker
          longitude={location?.lon}
          latitude={location?.lat}
          anchor="bottom"
        >
          <Stack
            justifyContent="center"
            alignItems="center"
            onClick={() => setShowPopup(true)}
          >
            <img
              className="mapbox-img"
              src={current ? current?.condition.icon : ""}
              alt="weather logo"
            />
            <Typography color="primary" variant="h6">
              {fahrenheit ? `${current?.temp_f}°F` : `${current?.temp_c}°C`}
            </Typography>
          </Stack>
        </Marker>
        {/* <Geocoder /> */}
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        {showPopup && (
          <Popup
            longitude={-122.4}
            latitude={37.8}
            anchor="top"
            closeOnClick={false}
            onClose={() => setShowPopup(false)}
          >
            You are here
          </Popup>
        )}
      </Map>
      <Button
        onClick={() => {
          if (location) {
            addSaves(location);
          } else {
            return null;
          }
          dispatch(setItemSaved(!savedToLocal));
        }}
        sx={
          savedToLocal
            ? { margin: "0 !important", backgroundColor: "green" }
            : { margin: "0 !important", backgroundColor: "" }
        }
        variant={"contained"}
      >
        {savedToLocal ? "Location Saved" : "Save location"}
      </Button>
    </>
  );
};

export default MapBoxTwo;
