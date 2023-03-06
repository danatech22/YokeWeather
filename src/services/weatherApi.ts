import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Current, Forecast } from "./model";

export interface WeatherApiResponse {
  location: {
    country: string;
    lat: number;
    localtime: string;
    localtime_epoch: number;
    lon: number;
    name: string;
    region: string;
    tz_id: string;
  };
  current: Current;
  forecast: Forecast;
}

export interface DataResponse {
  country: "Nigeria";
  id: 1715013;
  lat: 9.18;
  lon: 7.18;
  name: "Abuja";
  region: "Federal Capital Territory";
  url: "abuja-federal-capital-territory-nigeria";
}

export interface DataResponse extends Array<DataResponse> {}

const baseUrl: string = `https://weatherapi-com.p.rapidapi.com/`;

const weatherHeaders: { [key: string]: string } = {
  "X-RapidAPI-Key": "bdb05c643amsh34105d2e4c7e7ddp17f265jsn42e36be3f35d",
  "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
};

interface RequestWeatherParams {
  url: string;
  headers: { [key: string]: string };
}

const requestWeather = ({
  url,
  headers,
}: RequestWeatherParams): RequestWeatherParams => ({ url, headers });

// Define a service using a base URL and expected endpoints
export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getForecastWeather: builder.query<WeatherApiResponse, string>({
      query: (location: string) =>
        requestWeather({
          url: `forecast.json?q=${location}&days=3`,
          headers: weatherHeaders,
        }),
    }),
    getSearchWeather: builder.query<DataResponse, string>({
      query: (search) =>
        requestWeather({
          url: `search.json?q=${search}&days=3`,
          headers: weatherHeaders,
        }),
    }),
  }),
});

export const { useGetForecastWeatherQuery, useGetSearchWeatherQuery } =
  weatherApi;
