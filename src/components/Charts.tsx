import React, { useState } from "react";
import { Button, Typography, Stack } from "@mui/material";
import { ContentContainer } from "../theme/styled";
import { Colors } from "../helpers/colors";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  LineController,
  BarController,
  BarElement,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { Forecast } from "../services/model";
import zoomPlugin from "chartjs-plugin-zoom";
import { useAppSelector } from "../app/hooks";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  LineController,
  BarController,
  BarElement,
  zoomPlugin
);

interface Props {
  forecast: Forecast | undefined;
}

const Charts = ({ forecast }: Props) => {
  const [hourly, setHourly] = useState<boolean>(true);
  const daysDates: string[] = [];
  const daysIcons: string[] = [];
  const daysTemps: number[] = [];
  const hourlyIcons: string[] = [];
  const hourlyTemps: number[] = [];
  const hourlyTimes: string[] = [];

  const fahrenheit = useAppSelector((state) => state.weatherState.fahrenheit);

  const dayOneHours = forecast?.forecastday[0].hour;
  const dayTwoHours = forecast?.forecastday[0].hour;
  const hours48Length = dayTwoHours ? dayOneHours?.concat(dayTwoHours) : null;

  const date = new Date();
  const currentHour = date.getHours();

  hours48Length?.slice(currentHour).forEach((hour) => {
    const time = new Date(hour.time);
    const convertedTime = time.toLocaleString("en-US", {
      hour: "numeric",
      hour12: true,
    });
    hourlyTemps.push(fahrenheit ? hour?.temp_f : hour?.temp_c);
    hourlyTimes.push(convertedTime);
    hourlyIcons.push(hour.condition.icon);
  });

  forecast?.forecastday.forEach((days) => {
    const day = new Date(days.date);
    const convertedDay = day.toLocaleDateString();
    daysTemps.push(fahrenheit ? days?.day.maxtemp_f : days?.day.maxtemp_c);
    daysDates.push(convertedDay);
    daysIcons.push(days.day.condition.icon);
  });

  const tempData = {
    labels: hourly ? hourlyTimes : daysDates,
    datasets: [
      {
        data: hourly ? hourlyTemps : daysTemps,
        backgroundColor: Colors.blue,
        borderColor: Colors.blue,
      },
    ],
  };

  const options: any = {
    responsive: true,
    scales: {
      yAxis: {
        display: false,
      },
      xAxis: {
        min: 0,
        max: 4,
        offset: true,
        grid: {
          drawBorder: false,

          display: false,
        },
        ticks: {
          padding: 15,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        color: "black",

        formatter: function (value: string) {
          const icon = fahrenheit ? "°F" : "°C";
          return value + icon;
        },
      },
      zoom: {
        plugins: {
          zoom: {
            pan: {
              enabled: true,
              mode: "x",
            },
            zoom: {
              enabled: true,
              mode: "y",
            },
          },
        },
      },
    },
  };

  return (
    <ContentContainer>
      <Stack direction="row" spacing={2}>
        <Typography variant="h6">
          {`Forecast ${fahrenheit ? "°F" : "°C"}`}
        </Typography>
        <Button
          onClick={() => {
            hourly ? setHourly(false) : setHourly(true);
          }}
          variant="text"
        >
          {hourly ? "Show Daily" : "Show Hourly"}
        </Button>
      </Stack>
      <Chart type="bar" options={options} data={tempData} />
    </ContentContainer>
  );
};

export default Charts;
