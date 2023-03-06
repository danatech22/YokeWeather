export interface Current {
  cloud: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
  feelslike_c: number;
  feelslike_f: number;
  gust_kph: number;
  gust_mph: number;
  humidity: number;
  is_day: number;
  last_updated: string;
  last_updated_epoch: number;
  precip_in: number;
  precip_mm: number;
  pressure_in: number;
  pressure_mb: number;
  temp_c: number;
  temp_f: number;
  uv: number;
  vis_km: number;
  vis_miles: number;
  wind_degree: number;
  wind_dir: string;
  wind_kph: number;
  wind_mph: number;
}

interface Hour {
  chance_of_rain: number;
  chance_of_snow: number;
  cloud: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
  dewpoint_c: number;
  dewpoint_f: number;
  feelslike_c: number;
  feelslike_f: number;
  gust_kph: number;
  gust_mph: number;
  heatindex_c: number;
  heatindex_f: number;
  humidity: number;
  is_day: number;
  precip_in: number;
  precip_mm: number;
  pressure_in: number;
  pressure_mb: number;
  temp_c: number;
  temp_f: number;
  time: string;
  time_epoch: number;
  uv: number;
  vis_km: number;
  vis_miles: number;
  will_it_rain: number;
  will_it_snow: number;
  wind_degree: number;
  wind_dir: string;
  wind_kph: number;
  wind_mph: number;
  windchill_c: number;
  windchill_f: number;
}

export interface ForecastDay {
  astro: {
    is_moon_up: number;
    is_sun_up: number;
    moon_illumination: string;
    moon_phase: string;
    moonrise: string;
    moonset: string;
    sunrise: string;
    sunset: string;
  };
  date: string;
  date_epoch: number;
  day: {
    avghumidity: number;
    avgtemp_c: number;
    avgtemp_f: number;
    avgvis_km: number;
    avgvis_miles: number;
    condition: {
      code: number;
      icon: string;
      text: number;
    };
    daily_chance_of_rain: number;
    daily_chance_of_snow: number;
    daily_will_it_rain: number;
    daily_will_it_snow: number;
    maxtemp_c: number;
    maxtemp_f: number;
    maxwind_kph: number;
    maxwind_mph: number;
    mintemp_c: number;
    mintemp_f: number;
    totalprecip_in: number;
    totalprecip_mm: number;
    totalsnow_cm: number;
    uv: 8;
  };
  hour: Hour[] | undefined;
}

export interface Forecast {
  forecastday: ForecastDay[];
}

export interface Location {
  country: string;
  lat: number;
  localtime: string;
  localtime_epoch: number;
  lon: number;
  name: string;
  region: string;
  tz_id: string;
}

export const savedCities = [
  {
    name: "Ikeja",
    region: "Lagos",
    country: "Nigeria",
    lat: 6.6,
    lon: 3.34,
    tz_id: "Africa/Lagos",
    localtime_epoch: 1678105818,
    localtime: "2023-03-06 13:30",
  },
  {
    name: "Sydney",
    region: "New South Wales",
    country: "Australia",
    lat: -33.88,
    lon: 151.22,
    tz_id: "Australia/Sydney",
    localtime_epoch: 1678106366,
    localtime: "2023-03-06 23:39",
  },
  {
    name: "Tokyo",
    region: "Tokyo",
    country: "Japan",
    lat: 35.69,
    lon: 139.69,
    tz_id: "Asia/Tokyo",
    localtime_epoch: 1678106374,
    localtime: "2023-03-06 21:39",
  },
  {
    name: "Berlin",
    region: "Berlin",
    country: "Germany",
    lat: 52.52,
    lon: 13.4,
    tz_id: "Europe/Berlin",
    localtime_epoch: 1678106411,
    localtime: "2023-03-06 13:40",
  },
  {
    name: "Moscow",
    region: "Moscow City",
    country: "Russia",
    lat: 55.75,
    lon: 37.62,
    tz_id: "Europe/Moscow",
    localtime_epoch: 1678106405,
    localtime: "2023-03-06 15:40",
  },
  {
    country: "United States of America",
    lat: 40.71,
    localtime: "2023-03-06 7:41",
    localtime_epoch: 1678106492,
    lon: -74.01,
    name: "New York",
    region: "New York",
    tz_id: "America/New_York",
  },
  {
    name: "London",
    region: "City of London, Greater London",
    country: "United Kingdom",
    lat: 51.52,
    lon: -0.11,
    tz_id: "Europe/London",
    localtime_epoch: 1678106514,
    localtime: "2023-03-06 12:41",
  },
  {
    name: "Mumbai",
    region: "Maharashtra",
    country: "India",
    lat: 18.98,
    lon: 72.83,
    tz_id: "Asia/Kolkata",
    localtime_epoch: 1678106521,
    localtime: "2023-03-06 18:12",
  },
  {
    name: "Toronto",
    region: "Ontario",
    country: "Canada",
    lat: 43.67,
    lon: -79.42,
    tz_id: "America/Toronto",
    localtime_epoch: 1678106534,
    localtime: "2023-03-06 7:42",
  },
  {
    name: "Rome",
    region: "Lazio",
    country: "Italy",
    lat: 41.9,
    lon: 12.48,
    tz_id: "Europe/Rome",
    localtime_epoch: 1678106596,
    localtime: "2023-03-06 13:43",
  },
  {
    name: "Shanghai",
    region: "Shanghai",
    country: "China",
    lat: 31.01,
    lon: 121.41,
    tz_id: "Asia/Shanghai",
    localtime_epoch: 1678106612,
    localtime: "2023-03-06 20:43",
  },
  {
    name: "Dubai",
    region: "Dubai",
    country: "United Arab Emirates",
    lat: 25.25,
    lon: 55.28,
    tz_id: "Asia/Dubai",
    localtime_epoch: 1678106620,
    localtime: "2023-03-06 16:43",
  },
  {
    name: "Paris",
    region: "Ile-de-France",
    country: "France",
    lat: 48.87,
    lon: 2.33,
    tz_id: "Europe/Paris",
    localtime_epoch: 1678106558,
    localtime: "2023-03-06 13:42",
  },
  {
    name: "Singapore",
    region: "",
    country: "Singapore",
    lat: 1.29,
    lon: 103.86,
    tz_id: "Asia/Singapore",
    localtime_epoch: 1678106644,
    localtime: "2023-03-06 20:44",
  },
  {
    name: "Amsterdam",
    region: "North Holland",
    country: "Netherlands",
    lat: 52.37,
    lon: 4.89,
    localtime: "2023-03-06 13:44",
    localtime_epoch: 1678106659,
    tz_id: "Europe/Amsterdam",
  },
];
