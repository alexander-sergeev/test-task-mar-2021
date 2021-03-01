import React from 'react';
import GoogleMapReact from 'google-map-react';
import MapMarker from '../../components/MapMarker/MapMarker';
import { useTranslation } from 'react-i18next';
import useGeolocation from '../../hooks/useGeolocation';
import CentredMessage from '../../components/CentredMessage/CentredMessage';
import googleMapReact from 'google-map-react';

const MAP_ZOOM = 11;
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;

const Home = () => {
  const { t } = useTranslation();

  const geo = useGeolocation();

  if (!geo.allowed || geo.lat == null || geo.lng == null) {
    return (
      <CentredMessage>{t('Allow access to geolocation')}</CentredMessage>
    );
  }
  
  const coords: googleMapReact.Coords = { lat: geo.lat, lng: geo.lng };
  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
      defaultCenter={coords}
      defaultZoom={MAP_ZOOM}
    >
      <MapMarker
        lat={geo.lat}
        lng={geo.lng}
        title={t('Your position on map')}
      />
    </GoogleMapReact>
  );
}


export default Home;
