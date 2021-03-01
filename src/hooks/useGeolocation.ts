import { useEffect, useState } from 'react';

export interface GeolocationState {
  /**
   * Is user allowed access to Geolocation API
   */
  readonly allowed: boolean;
  /**
   * 'latitude' property of GeolocationCoordinates
   */
  readonly lat?: number;
  /**
   * 'longitude' property of GeolocationCoordinates
   */
  readonly lng?: number;
}

const useGeolocation = (): GeolocationState => {
  const initialState: GeolocationState = {
    allowed: false,
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    let canceled = false;

    navigator.geolocation.getCurrentPosition(({ coords }) => {
      if (canceled) {
        return;
      }
      setState({
        allowed: true,
        lat: coords.latitude,
        lng: coords.longitude
      });
    }, (error) => {
      if (canceled) {
        return;
      }
      // TODO: Currently it treat any error as user disallowed access, should handle errors properly
      setState(initialState);
    }, {
      enableHighAccuracy: true,
    });

    return () => {
      canceled = true;
    };
  });

  return state;
}

export default useGeolocation;

