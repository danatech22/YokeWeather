import React from "react";
import { useAppSelector } from "../app/hooks";
import MapBoxTwo from "../components/MapBox";
import { useGetForecastWeatherQuery } from "../services/weatherApi";

const Map = () => {
  const locationState = useAppSelector((state) => state.weatherState.location);
  const { data, isFetching } = useGetForecastWeatherQuery(locationState);
  const location = data?.location;
  const current = data?.current;
  return (
    <div>
      <MapBoxTwo location={location} current={current} />
    </div>
  );
};

export default Map;
