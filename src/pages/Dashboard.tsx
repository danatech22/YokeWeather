import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLocation, WeatherState } from "../services/weatherSlice";
import { Box, Typography, Stack, Divider } from "@mui/material";
import { useGetForecastWeatherQuery } from "../services/weatherApi";
import Moment from "react-moment";
import useGeoLocation from "../hooks/useGeolocation";
import WeatherChart from "../components/Charts";
import TodaysOverview from "../components/TodaysOverview";
import SearchBar from "../components/SearchBar";
import ThreeDayForecast from "../components/ThreeDayForecast";
import Loader from "../components/Loader";
import { useAppDispatch, useAppSelector } from "../app/hooks";

const Dashboard = () => {
  const getGeoLocation = useGeoLocation();
  const isLoadingLocation = getGeoLocation.loaded;
  const locationState = useAppSelector((state) => state.weatherState.location);
  const { data, isFetching } = useGetForecastWeatherQuery(locationState);

  const dispatch = useAppDispatch();

  const current = data?.current;
  const forecast = data?.forecast;
  const location = data?.location;
  const dateToFormat = location?.localtime;

  useEffect(() => {
    let currentLocation: string = "";

    if (locationState) {
      currentLocation = locationState;
    } else {
      currentLocation = "Italy";
    }

    dispatch(setLocation(currentLocation));
  }, [dispatch, locationState]);

  if (isFetching || !isLoadingLocation) return <Loader />;

  return (
    <Box p={4}>
      <Stack
        direction={{ sm: "column", md: "row" }}
        justifyContent="space-between"
        sx={{ paddingBottom: 2 }}
      >
        <Stack>
          <Typography variant="h5"> {location?.name} </Typography>
          <Typography variant="subtitle2"> {location?.region} </Typography>
          <Typography variant="subtitle2">
            <Moment format="LL" date={{ dateToFormat }} />
          </Typography>
        </Stack>
        <SearchBar location={location} />
      </Stack>
      <Divider />
      <TodaysOverview current={current} forecast={forecast} />
      <ThreeDayForecast forecast={forecast} />
      <WeatherChart forecast={forecast} />
    </Box>
  );
};

export default Dashboard;
