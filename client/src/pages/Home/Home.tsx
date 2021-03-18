import GoogleMapReact from 'google-map-react';
import MapMarker from '../../components/MapMarker/MapMarker';
import { useTranslation } from 'react-i18next';
import { useGeolocation } from 'react-use';
import googleMapReact from 'google-map-react';
import { Alert } from 'antd';
import './Home.css';

/**
 *  Map zoom which used when we don't know user location
 */
const DEFAULT_MAP_ZOOM = 7;
/**
 *  Default map coords which used when we don't know user location
 */
const DEFAULT_COORDS: googleMapReact.Coords = {
  // Great Britain coords
  lat: 53.8,
  lng: -2.42,
};
/**
 *  Map zoom which used when we know where user is
 */
const LOCATION_MAP_ZOOM = 11;
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;

const Home = () => {
  const { t } = useTranslation();

  const geo = useGeolocation({ enableHighAccuracy: true });

  let coords: googleMapReact.Coords | null = null;

  if (geo.latitude !== null && geo.longitude !== null) {
    coords = {
      lat: geo.latitude,
      lng: geo.longitude,
    };
  }

  let errorMessage = null;
  if (geo.error != null) {
    const error = geo.error as GeolocationPositionError;
    if (error.code === error.PERMISSION_DENIED) {
      errorMessage = t(`Permission denied to geolocation`);
    } else if (error.code === error.POSITION_UNAVAILABLE) {
      errorMessage = t('Geolocation unavailable');
    } else if (error.code === error.TIMEOUT) {
      errorMessage = t('Geolocation timeout');
    }
  }

  return (
    <div className="home-page">
      {errorMessage !== null && (
        <Alert message={errorMessage} type="error" banner />
      )}
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
        center={coords || DEFAULT_COORDS}
        zoom={coords ? LOCATION_MAP_ZOOM : DEFAULT_MAP_ZOOM}
      >
        {coords !== null && (
          <MapMarker
            lat={coords.lat}
            lng={coords.lng}
            title={t('Your position on map')}
          />
        )}
      </GoogleMapReact>
    </div>
  );
};

export default Home;
