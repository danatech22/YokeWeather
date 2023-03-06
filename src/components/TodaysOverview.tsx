import React from "react";
import { Box, Typography, Grid, Stack, Paper } from "@mui/material";
import { Colors } from "../helpers/colors";
import Moment from "react-moment";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Current, Forecast } from "../services/model";
import { useAppSelector } from "../app/hooks";

interface Props {
  current: Current | undefined;
  forecast: Forecast | undefined;
}

const TodaysOverview = ({ current, forecast }: Props) => {
  const fahrenheit = useAppSelector((state) => state.weatherState.fahrenheit);
  const date = new Date();
  const currentHour = date.getHours();

  const dayOneHours = forecast?.forecastday[0].hour;
  const dayTwoHours = forecast?.forecastday[1].hour;
  const hours48Length = dayTwoHours ? dayOneHours?.concat(dayTwoHours) : null;

  const todaysOverviewItems = [
    {
      item: "High",
      value: fahrenheit
        ? `${forecast?.forecastday[0]?.day.maxtemp_f}°F`
        : `${forecast?.forecastday[0]?.day.maxtemp_c}°C`,
    },
    {
      item: "Low",
      value: fahrenheit
        ? `${forecast?.forecastday[0]?.day.mintemp_f}°F`
        : `${forecast?.forecastday[0]?.day.mintemp_c}°C`,
    },
    { item: "Wind", value: `${current?.wind_mph}mph` },
    {
      item: "Rain",
      value: `${forecast?.forecastday[0]?.day?.daily_chance_of_rain}%`,
    },
    { item: "Pressure", value: `${current?.pressure_in}in` },
    { item: "Humidity", value: current?.uv },
  ];

  return (
    <Box sx={{ marginTop: "2rem" }}>
      <Typography sx={{ marginBottom: "1rem" }} color="primary" variant="h6">
        Todays Overview
      </Typography>
      <Swiper
        spaceBetween={15}
        slidesPerView={10}
        slidesOffsetBefore={20}
        breakpoints={{
          1920: {
            slidesPerView: 12,
          },
          1280: {
            slidesPerView: 9,
          },
          1020: {
            slidesPerView: 7,
          },
          600: {
            slidesPerView: 5,
          },
          480: {
            slidesPerView: 6,
          },
          320: {
            slidesPerView: 4,
          },
          0: {
            slidesPerView: 3,
          },
        }}
      >
        {hours48Length?.slice(currentHour).map((hour) => {
          const dateToFormatHour = hour.time;
          return (
            <SwiperSlide>
              <Box key={hour.time}>
                <Paper
                  sx={{
                    backgroundImage: Colors.backgroundImage,
                    width: "5rem",
                  }}
                >
                  <Stack justifyContent="center" alignItems="center">
                    <Typography variant="subtitle2" color="secondary">
                      {" "}
                      <Moment format="hhA" date={dateToFormatHour} />
                    </Typography>
                    <img src={hour.condition.icon} alt="weather icon" />
                    <Typography color="secondary">
                      {fahrenheit ? `${hour.temp_f}°F` : `${hour.temp_c}°C`}
                    </Typography>
                    <Typography color="secondary">
                      {hour.chance_of_rain}%
                    </Typography>
                  </Stack>
                </Paper>
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Grid
        sx={{ paddingTop: 2 }}
        container
        columns={{ xs: 4, sm: 8, md: 12 }}
        justifyContent="center"
        alignItems="center"
      >
        {todaysOverviewItems.map(({ item, value }) => (
          <Grid item key={item}>
            <Paper
              sx={{
                backgroundColor: Colors.grey,
                padding: "2rem",
                width: 50,
                height: 50,
              }}
              elevation={0}
            >
              <Stack>
                <Typography color="secondary.dark" variant="subtitle2">
                  {item}
                </Typography>
                <Typography variant="subtitle2"> {value} </Typography>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TodaysOverview;
