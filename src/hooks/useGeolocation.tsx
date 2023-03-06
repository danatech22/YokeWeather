import { useEffect, useState } from "react";

interface Location {
  coords: {
    latitude: number;
    longitude: number;
  };
}

interface Props {
  loaded: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
  error: any;
}

const useGeolocation = () => {
  const [geoLocation, setGeoLocation] = useState<Props>({
    loaded: false,
    coordinates: { lat: 0, lng: 0 },
    error: null,
  });

  const successMsg = (location: Location) => {
    setGeoLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
      error: null,
    });
  };

  const errorMsg = (error: any) => {
    setGeoLocation({
      loaded: true,
      coordinates: { lat: 0, lng: 0 },
      error,
    });
  };

  const options = {
    enableHighAccuracy: true,
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      errorMsg({
        code: 0,
        message: "Geolocation not enabled or supported",
      });
    }
    navigator.geolocation.getCurrentPosition(successMsg, errorMsg, options);
    // eslint-disable-next-line
  }, []);
  return geoLocation;
};

export default useGeolocation;
